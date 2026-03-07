# 🧪 Manual Testing Guide - Green Pulse

**Date:** March 7, 2026  
**Test Duration:** ~30-45 minutes  
**Tester:** You!

---

## 🚀 BEFORE YOU START

### 1. Start Both Servers

```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client  
npm run dev
```

**Expected:**
- ✅ Backend: `🚀 Server running on port 4000`
- ✅ Frontend: `Local: http://localhost:5174/` (or 5173)
- ✅ Database: `✅ Connected to MongoDB Atlas`

### 2. Open Developer Tools
- Press `F12` in your browser
- Keep **Console** tab open throughout testing
- Watch for any red errors

---

## 📋 TEST CHECKLIST

### ✅ PHASE 1: Basic Navigation (5 min)

| Test | Steps | Expected Result | Status |
|------|-------|----------------|--------|
| **Homepage loads** | Go to http://localhost:5174 | Page loads without errors | ☐ |
| **Navbar links** | Click each nav link | All pages load | ☐ |
| **Footer displays** | Scroll to bottom | Footer visible | ☐ |
| **Responsive design** | Resize browser (mobile size) | Layout adapts | ☐ |
| **No console errors** | Check F12 console | No red errors | ☐ |

---

### ✅ PHASE 2: Public Pages (10 min)

#### A. Events Page (`/events`)
- [ ] Page loads
- [ ] Events display (or "No events" message)
- [ ] Filter buttons work (Upcoming/Past)
- [ ] Images load or show placeholder
- [ ] External links open (if any events exist)
- [ ] No console errors

#### B. Blogs Page (`/blogs`)
- [ ] Blog cards display
- [ ] Click a blog → opens detail page
- [ ] Author info shows
- [ ] Tags display
- [ ] Images load
- [ ] Back button works

#### C. Team Page (`/team`)
- [ ] Team members display
- [ ] Photos load
- [ ] Social links work (LinkedIn, GitHub, etc.)
- [ ] Positions show correctly

#### D. Projects Page (`/projects`)
- [ ] Project cards display
- [ ] Tech stack tags show
- [ ] Links work (GitHub, Live demo)
- [ ] Images load

#### E. Research Page (`/research`)
- [ ] Research domains display
- [ ] Can click to view details
- [ ] Content readable

#### F. Announcements Page (`/announcements`)
- [ ] Announcements display
- [ ] Dates formatted correctly
- [ ] Most recent first

---

### ✅ PHASE 3: Authentication (10 min)

#### Register New Account
```
Steps:
1. Click "Login" in navbar
2. Click "Sign up" link
3. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123!
4. Click "Sign up"
```

**Expected:**
- ✅ Form validates (shows errors for invalid input)
- ✅ Success message or redirect
- ✅ Token saved in localStorage (check F12 → Application → Local Storage)

**Test Results:**
- [ ] Registration works
- [ ] Password validation works
- [ ] Email validation works
- [ ] Token stored

---

#### Login with Email/Password
```
Steps:
1. Go to /login
2. Enter credentials:
   - Email: test@example.com
   - Password: Test123!
3. Click "Sign in"
```

**Expected:**
- ✅ Redirects to dashboard/home
- ✅ Navbar shows logout/profile
- ✅ No errors in console

**Test Results:**
- [ ] Login successful
- [ ] Wrong password shows error
- [ ] Invalid email shows error

---

#### Google OAuth Login
```
Steps:
1. Go to /login
2. Click "Google" button
3. Google popup appears
4. Select account
```

**Expected:**
- ✅ Redirects to Google login
- ✅ After success, redirects back to site
- ✅ User logged in
- ✅ Token in localStorage

**Test Results:**
- [ ] Google button redirects
- [ ] OAuth flow completes
- [ ] User logged in after

**If it fails:**
- Check server console for errors
- Check frontend console for errors
- Verify Google Cloud Console settings:
  - JavaScript origins: `http://localhost:5174`
  - Redirect URI: `http://localhost:4000/auth/google/callback`

---

#### GitHub OAuth Login
```
Steps:
1. Go to /login
2. Click "GitHub" button
3. GitHub auth page appears
4. Click "Authorize"
```

**Test Results:**
- [ ] GitHub button redirects
- [ ] OAuth flow completes
- [ ] User logged in after

---

### ✅ PHASE 4: Admin Features (15 min)

**Note:** You must be logged in as admin. Check `server/src/config/adminEmails.js` for admin emails.

#### Create Event
```
Steps:
1. Go to /events
2. Look for "Add Event" button (only visible to admins)
3. Click "Add Event"
4. Fill form:
   - Title: Test Event
   - Date: (pick future date)
   - Description: Test description
   - Image URL: (optional)
   - Link: https://example.com
   - Is Upcoming: Yes
5. Click "Submit"
```

**Test Results:**
- [ ] Form appears
- [ ] All fields work
- [ ] Can submit successfully
- [ ] New event appears on page
- [ ] No console errors

**Edge Cases to Test:**
- [ ] Empty title → shows error
- [ ] Invalid date → shows error
- [ ] Missing required fields → shows error

---

#### Edit Event
```
Steps:
1. Find the event you created
2. Click "Edit" button
3. Change title to "Updated Test Event"
4. Click "Save"
```

**Test Results:**
- [ ] Edit form pre-fills with existing data
- [ ] Can update successfully
- [ ] Changes reflect immediately

---

#### Delete Event
```
Steps:
1. Click "Delete" button on test event
2. Confirm deletion
```

**Test Results:**
- [ ] Confirmation dialog appears
- [ ] Event removed from list
- [ ] No errors

---

#### Test Same for Other Sections
Repeat Create/Edit/Delete tests for:
- [ ] Blogs
- [ ] Projects
- [ ] Announcements
- [ ] Team Members
- [ ] Research

---

### ✅ PHASE 5: Breaking Point Tests (5 min)

These tests deliberately try to break the app:

#### Test 1: Invalid Input
```
Try to create an event with:
- Title: <script>alert('XSS')</script>
- Date: "not a date"
- Link: javascript:alert(1)
```

**Expected:**
- ✅ Input sanitized or rejected
- ✅ No script execution
- ✅ Validation errors shown

**Test Results:**
- [ ] XSS prevented
- [ ] Invalid dates rejected
- [ ] Malicious links blocked

---

#### Test 2: Network Failure
```
Steps:
1. Open Network tab in DevTools
2. Set throttling to "Offline"
3. Try to load a page
```

**Expected:**
- ✅ Graceful error message (not blank screen)
- ✅ Can retry
- ✅ App doesn't crash

**Test Results:**
- [ ] Offline mode handled gracefully

---

#### Test 3: Large Data
```
Try to create a blog with:
- Title: 500 characters long
- Content: 10,000 characters
- 50 tags
```

**Expected:**
- ✅ Length limits enforced
- ✅ No 500 server errors
- ✅ Performance acceptable

**Test Results:**
- [ ] Handles large input

---

#### Test 4: Rapid Clicking
```
Steps:
1. Click "Create Event" button 20 times rapidly
```

**Expected:**
- ✅ Only creates one event
- ✅ Button disabled after first click
- ✅ No duplicate submissions

**Test Results:**
- [ ] Prevents duplicate submissions

---

#### Test 5: Expired Token
```
Steps:
1. Login
2. Manually delete token from localStorage (F12 → Application → Local Storage)
3. Try to create/edit something
```

**Expected:**
- ✅ Redirects to login
- ✅ Shows "Unauthorized" message
- ✅ Doesn't crash

**Test Results:**
- [ ] Token expiry handled

---

#### Test 6: Direct URL Access
```
Try accessing:
- http://localhost:5174/admin (if exists)
- http://localhost:5174/events/invalid-id
- http://localhost:5174/nonexistent-page
```

**Expected:**
- ✅ Protected routes redirect to login
- ✅ Invalid IDs show 404 page
- ✅ Unknown routes show 404

**Test Results:**
- [ ] Protected routes secured
- [ ] 404 pages work

---

## 🐛 COMMON ISSUES TO WATCH FOR

### Red Flags in Console:
```
❌ "Uncaught ReferenceError" → Missing import
❌ "Cannot read property of undefined" → Missing null check
❌ "401 Unauthorized" → Token issue
❌ "CORS error" → Backend not allowing frontend
❌ "Network request failed" → Backend not running
```

### Visual Issues:
- Broken images (check image URLs)
- Overlapping text (responsive design issue)
- Buttons not clickable (z-index or pointer-events issue)
- Forms not submitting (missing form handler)

---

## 📊 TESTING RESULTS TEMPLATE

Copy this and fill it out:

```
=== GREEN PULSE - TEST RESULTS ===
Date: _______________
Tester: _______________

PHASE 1 - Navigation: ___/5 passed
PHASE 2 - Public Pages: ___/6 passed
PHASE 3 - Authentication: ___/4 methods tested
PHASE 4 - Admin Features: ___/6 sections tested
PHASE 5 - Breaking Points: ___/6 tests passed

Critical Issues Found: ______
High Issues Found: ______
Medium Issues Found: ______

OVERALL: ☐ PASS  ☐ FAIL  ☐ PARTIAL

Notes:
___________________________________
___________________________________
```

---

## 🚨 NEXT STEPS BASED ON RESULTS

### If Everything Works:
✅ Great! Move to production deployment

### If 1-3 Issues Found:
⚠️ Document them and prioritize fixes

### If 4+ Issues Found:
🔴 Stop and fix critical issues before proceeding

---

## 🆘 NEED HELP?

While testing, if you find:
- **Crashes**: Note the exact steps to reproduce
- **Errors**: Copy the full error message from console
- **Weird behavior**: Take a screenshot

Then share with me and I'll help fix it!

---

**Happy Testing! 🎉**
