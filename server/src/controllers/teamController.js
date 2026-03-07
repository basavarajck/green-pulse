const Team = require("../models/Team");
const logger = require("../config/logger");

// GET /team
exports.getTeam = async (req, res) => {
  try {
    const team = await Team.find().lean();
    res.json(team);
  } catch (err) {
    logger.error("Error fetching team:", err);
    res.status(500).json({ message: "Error fetching team" });
  }
};

// POST /team (add one member)
exports.addTeamMember = async (req, res) => {
  try {
    const member = new Team(req.body);
    await member.save();
    logger.info(`Team member added: ${member._id} by ${req.user.id}`);
    res.json({ message: "Team member added", member });
  } catch (err) {
    logger.error("Error adding member:", err);
    res.status(500).json({ message: "Error adding member" });
  }
};

// PUT /team (update whole array)
exports.updateTeam = async (req, res) => {
  try {
    await Team.deleteMany(); // clear old team
    const members = await Team.insertMany(req.body);
    logger.info(`Team updated with ${members.length} members by ${req.user.id}`);
    res.json({ message: "Team updated", members });
  } catch (err) {
    logger.error("Error updating team:", err);
    res.status(500).json({ message: "Error updating team" });
  }
};

// DELETE /team (remove all)
exports.deleteTeam = async (req, res) => {
  try {
    await Team.deleteMany();
    logger.info(`All team members removed by ${req.user.id}`);
    res.json({ message: "All team members removed" });
  } catch (err) {
    logger.error("Error deleting team:", err);
    res.status(500).json({ message: "Error deleting team" });
  }
};
