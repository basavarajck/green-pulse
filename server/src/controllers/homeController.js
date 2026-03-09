const Home = require("../models/Home");
const logger = require("../config/logger");

// GET /home
exports.getHome = async (req, res) => {
  try {
    const homeData = await Home.findOne();
    res.json(homeData);
  } catch (error) {
    logger.error("Error in getHome:", error);
    res.status(500).json({ message: "Error fetching home data" });
  }
};

// PUT /home
exports.updateHome = async (req, res) => {
  try {
    const data = req.body;

    let homeData = await Home.findOne();
    if (!homeData) {
      homeData = new Home(data);
    } else {
      homeData.about = data.about;
      homeData.mission = data.mission;
      homeData.vision = data.vision;
      homeData.achievements = data.achievements;
    }

    await homeData.save();
    res.json({ message: "Home data updated", homeData });
  } catch (error) {
    logger.error("Error in updateHome:", error);
    res.status(500).json({ message: "Error updating home data" });
  }
};
