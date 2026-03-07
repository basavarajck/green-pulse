# Maintenance and Operations Guide

## Daily Operations

### 1. Health Check
**Frequency**: Every day (automated via cron/monitoring)

```bash
# Check server health
curl https://api.yourdomain.com/health

# Expected response
{
  "status": "ok",
  "uptime": 86400,
  "database": "connected",
  "memory": { "used": "50 MB", "total": "512 MB" }
}
```

**Action**: If status is not "ok", check error logs immediately.

### 2. Monitor Error Logs
```bash
# View last 50 errors
tail -n 50 server/logs/error.log

# Watch errors in real-time
tail -f server/logs/error.log
```

**Red Flags**:
- Repeated database connection errors
- Authentication failures
- 500 Internal Server errors
- Memory limit warnings

### 3. Check Response Times
```bash
# View recent HTTP requests with timing
tail -n 100 server/logs/http.log | grep -E "[0-9]+ ms"
```

**Action**: If response times > 500ms consistently, investigate:
- Database query performance
- Connection pool saturation
- Memory usage

---

## Weekly Maintenance

### 1. Log File Management
**Frequency**: Every Monday

```bash
# Check log file sizes
du -h server/logs/*.log

# Logs auto-rotate at 5MB max
# Manually archive old logs if needed
cd server/logs
tar -czf logs-archive-$(date +%Y%m%d).tar.gz *.log.1 *.log.2
rm *.log.1 *.log.2
```

### 2. Database Index Review
**Frequency**: Every week

```javascript
// Connect to MongoDB
use production-db

// Check index usage statistics
db.blogs.aggregate([{ $indexStats: {} }])
db.events.aggregate([{ $indexStats: {} }])
db.projects.aggregate([{ $indexStats: {} }])

// Look for indexes with low "ops" count (unused indexes)
// Consider removing unused indexes
```

### 3. Security Updates
**Frequency**: Every week

```bash
cd server
npm audit

# Fix automatically
npm audit fix

# Review high/critical vulnerabilities
npm audit --audit-level=high
```

### 4. Performance Metrics
```bash
# Check database query performance
# In MongoDB Atlas dashboard:
# - Go to "Performance" tab
# - Review slow queries (>100ms)
# - Check index recommendations
```

---

## Monthly Maintenance

### 1. Full Database Backup
**Frequency**: 1st of every month

#### Using MongoDB Atlas
1. Login to MongoDB Atlas
2. Navigate to Clusters > Backup
3. Create a manual snapshot
4. Download snapshot for local storage

#### Using mongodump (Self-hosted)
```bash
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/production-db" \
  --out="/backups/$(date +%Y%m%d)"

# Compress backup
tar -czf backup-$(date +%Y%m%d).tar.gz /backups/$(date +%Y%m%d)

# Upload to S3/Cloud Storage
aws s3 cp backup-$(date +%Y%m%d).tar.gz s3://your-backup-bucket/
```

### 2. Dependency Updates
**Frequency**: Last week of every month

```bash
cd server
npm outdated

# Update non-breaking changes
npm update

# For major version updates, test in staging first
npm install package-name@latest

# Run tests after updates
npm test  # if tests exist
```

### 3. Clear Old Data
**Frequency**: Last day of month

```javascript
// Remove old logs older than 90 days (if needed)
db.logs.deleteMany({
  createdAt: { $lt: new Date(Date.now() - 90*24*60*60*1000) }
})

// Archive old announcements (older than 6 months)
db.announcements.updateMany(
  { date: { $lt: new Date(Date.now() - 180*24*60*60*1000) } },
  { $set: { archived: true } }
)
```

### 4. Performance Audit
```bash
# Analyze bundle size (frontend)
cd client
npm run build -- --analyze

# Check for unused dependencies
npm install -g depcheck
depcheck

# Backend performance
cd ../server
node --inspect src/app.js  # Enable profiling
# Use Chrome DevTools for CPU/memory profiling
```

---

## Quarterly Maintenance

### 1. Major Updates
**Frequency**: Every 3 months

```bash
# Update Node.js
nvm install 20  # or latest LTS
nvm use 20

# Update MongoDB driver
npm install mongoose@latest

# Verify compatibility
npm test
```

### 2. Load Testing
**Frequency**: Every quarter

```bash
# Install artillery
npm install -g artillery

# Create load test config
cat > loadtest.yml << EOF
config:
  target: 'https://api.yourdomain.com'
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Warm up"
    - duration: 120
      arrivalRate: 50
      name: "Sustained load"
    - duration: 60
      arrivalRate: 100
      name: "Spike test"
scenarios:
  - flow:
    - get:
        url: "/blogs"
    - get:
        url: "/events"
EOF

# Run load test
artillery run loadtest.yml
```

**Expected Results**:
- 95th percentile response time: <500ms
- Error rate: <1%
- Successful requests: >99%

### 3. Security Audit
**Frequency**: Every quarter

```bash
# Run comprehensive security audit
npm audit --production

# Check for outdated packages with known vulnerabilities
npx snyk test

# Review authentication logs for suspicious activity
grep "Authentication failed" server/logs/combined.log | wc -l

# Review rate limit hits
grep "Too many requests" server/logs/http.log
```

### 4. Database Optimization
```javascript
// Analyze collection statistics
db.blogs.stats()
db.events.stats()

// Rebuild indexes if needed
db.blogs.reIndex()

// Compact database (requires downtime)
db.runCommand({ compact: 'blogs', force: true })
```

---

## Incident Response

### Critical Issues (Site Down)

#### 1. Check Server Status
```bash
# Ping server
curl -I https://api.yourdomain.com/health

# If no response, check hosting platform
# Vercel: https://vercel.com/dashboard
# Railway: railway status
# Render: Check dashboard
```

#### 2. Check Recent Deployments
```bash
# Rollback to previous version
git log --oneline -10
git revert <last-commit>
git push

# Redeploy
vercel --prod  # or railway up
```

#### 3. Check Database Connection
```bash
# Test MongoDB connection
mongosh "mongodb+srv://cluster.mongodb.net/production-db"

# Check Atlas dashboard for:
# - Connection limits reached
# - Disk space issues
# - Network errors
```

### High Priority (Errors or Slow Response)

#### 1. Identify Issue
```bash
# Check error logs
tail -n 100 server/logs/error.log

# Check for patterns
grep "Error" server/logs/combined.log | tail -n 50
```

#### 2. Database Query Issues
```javascript
// Find slow queries
db.setProfilingLevel(2)  // Log all queries
// Wait 1 minute
db.system.profile.find({ millis: { $gt: 100 } }).sort({ ts: -1 }).limit(10)
```

#### 3. Memory Issues
```bash
# Check memory usage via /health endpoint
curl https://api.yourdomain.com/health | jq '.memory'

# If memory is high, restart server
# On Railway/Render: Use dashboard to restart
# On Vercel: Redeploy will restart
```

### Medium Priority (Warning Signs)

#### 1. Increased Error Rate
```bash
# Count errors in last hour
grep -c "error" server/logs/combined.log | tail -n 100

# If >10 errors/hour, investigate:
tail -f server/logs/error.log
```

#### 2. Slow Queries
```bash
# Check HTTP request times
grep "ms" server/logs/http.log | awk '{print $NF}' | sort -n | tail -n 20

# If many requests >500ms, optimize queries
```

---

## Monitoring Setup

### 1. Uptime Monitoring
**Recommended Tools**:
- UptimeRobot (free for 50 monitors)
- Pingdom
- StatusCake

**Setup**:
```bash
# Monitor these endpoints
https://api.yourdomain.com/health  # Every 5 minutes
https://yourdomain.com             # Every 5 minutes
```

### 2. Error Tracking
**Recommended**: Sentry (free tier available)

```bash
cd server
npm install @sentry/node

# server/src/app.js
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1
});

app.use(Sentry.Handlers.requestHandler());
// ... routes ...
app.use(Sentry.Handlers.errorHandler());
```

### 3. Log Aggregation
**Recommended**: Papertrail, Loggly, or Datadog

```bash
# Forward logs to external service
# Most hosting platforms have integrations
# Railway: Settings > Observability > Logging
# Render: Dashboard > Logs > Add drain
```

### 4. Performance Monitoring
**Recommended**: New Relic, AppDynamics

```bash
npm install newrelic

# Add to app.js
require('newrelic');
```

---

## Backup & Recovery

### Backup Strategy

#### 1. Automated Daily Backups
```bash
# Create cron job for daily backups
crontab -e

# Add line (runs at 2 AM daily)
0 2 * * * /path/to/backup-script.sh
```

**backup-script.sh**:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d)
mongodump --uri="$MONGO_URI" --out="/backups/$DATE"
tar -czf "/backups/$DATE.tar.gz" "/backups/$DATE"
rm -rf "/backups/$DATE"
# Keep only last 30 days
find /backups -name "*.tar.gz" -mtime +30 -delete
```

#### 2. Weekly Full Backups
- Store on separate cloud storage (S3, Google Cloud Storage)
- Keep for 90 days

#### 3. Monthly Archive
- Store indefinitely for compliance/audit

### Recovery Procedures

#### Restore from Backup
```bash
# Extract backup
tar -xzf backup-20240115.tar.gz

# Restore to database
mongorestore --uri="$MONGO_URI" --drop backup-20240115/

# Verify restoration
mongosh "$MONGO_URI"
> db.blogs.count()
> db.users.count()
```

#### Point-in-Time Recovery (MongoDB Atlas)
1. Go to MongoDB Atlas > Backups
2. Select snapshot before incident
3. Click "Restore"
4. Choose "Download" or "Restore to cluster"

---

## Scaling Checklist

### When to Scale

**Indicators**:
- Response time > 500ms consistently
- CPU usage > 80%
- Memory usage > 90%
- Connection pool constantly maxed out
- Rate limit frequently hit by legitimate users

### Scaling Steps

#### 1. Vertical Scaling (More Resources)
```bash
# Increase server resources
# Railway: Settings > Change plan
# Render: Settings > Upgrade instance type
```

#### 2. Horizontal Scaling (More Instances)
```bash
# Deploy multiple instances behind load balancer
# Vercel: Automatic horizontal scaling
# Railway: Settings > Scaling > Replicas
```

#### 3. Database Scaling
```bash
# Increase connection pool
maxPoolSize: 20  # from 10

# Add read replicas (MongoDB Atlas M10+)
# Atlas: Clusters > Edit > Add read nodes

# Implement caching (Redis)
npm install ioredis
```

#### 4. CDN for Static Assets
- Cloudflare (free tier available)
- AWS CloudFront
- Fastly

---

## Contact & Escalation

### Service Providers
- **Hosting**: [Your hosting provider dashboard]
- **Database**: MongoDB Atlas support
- **Domain**: [Your domain registrar]
- **Email**: [Your email service]

### Emergency Procedures
1. Check `/health` endpoint
2. Review error logs
3. Check hosting platform status
4. If database issue, check MongoDB Atlas
5. If critical, rollback to last working version
6. Document incident for post-mortem

### Post-Incident Review
After resolving critical issues:
1. Document what happened
2. Root cause analysis
3. Steps taken to resolve
4. Preventive measures
5. Update runbooks/documentation

---

## Useful Commands Reference

### Server Management
```bash
# View logs
tail -f server/logs/error.log
tail -f server/logs/combined.log
tail -f server/logs/http.log

# Check disk space
df -h

# Check memory
free -h

# Check processes
ps aux | grep node
```

### Database Commands
```javascript
// Connection status
db.serverStatus().connections

// Current operations
db.currentOp()

// Kill long-running query
db.killOp(<opid>)

// Check index usage
db.collection.aggregate([{$indexStats:{}}])
```

### Git Commands
```bash
# View recent changes
git log --oneline -10

# Rollback
git revert <commit-hash>

# Compare environments
git diff production main
```

---

## Compliance & Documentation

### Required Documentation
- [x] Production Deployment Guide (this file)
- [x] Testing Guide
- [x] Vulnerability Report
- [x] Fixes Applied Changelog

### Regular Reviews
- Security audit: Quarterly
- Performance review: Monthly
- Documentation update: When changes occur
- Disaster recovery test: Semi-annually

---

## End of Guide

For issues or questions, refer to:
- **PRODUCTION-DEPLOYMENT.md** for deployment procedures
- **TESTING-GUIDE.md** for testing procedures
- **Error logs** in `server/logs/` directory
- **Health endpoint**: `https://api.yourdomain.com/health`
