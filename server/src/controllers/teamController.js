const Team = require("../models/Team");

// GET /team
exports.getTeam = async (req, res) => {
  try {
    const team = await Team.find();
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: "Error fetching team" });
  }
};

// POST /team (add one member)
exports.addTeamMember = async (req, res) => {
  try {
    const member = new Team(req.body);
    await member.save();
    res.json({ message: "Team member added", member });
  } catch (err) {
    res.status(500).json({ message: "Error adding member" });
  }
};

// PUT /team (update whole array)
exports.updateTeam = async (req, res) => {
  try {
    await Team.deleteMany(); // clear old team
    const members = await Team.insertMany(req.body);
    res.json({ message: "Team updated", members });
  } catch (err) {
    res.status(500).json({ message: "Error updating team" });
  }
};

// DELETE /team (remove all)
exports.deleteTeam = async (req, res) => {
  try {
    await Team.deleteMany();
    res.json({ message: "All team members removed" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting team" });
  }
};
