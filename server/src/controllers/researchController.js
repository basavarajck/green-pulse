// controllers/researchController.js
const Research = require('../models/Research');

// GET all research domains
exports.getAllResearch = async (req, res) => {
  try {
    const research = await Research.find({ isActive: true });
    res.json(research);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching research data', error: err.message });
  }
};

// GET research by domain
exports.getResearchByDomain = async (req, res) => {
  try {
    const { domain } = req.params;
    const research = await Research.findOne({ domain, isActive: true });
    
    if (!research) {
      return res.status(404).json({ message: 'Research domain not found' });
    }
    
    res.json(research);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching research domain', error: err.message });
  }
};

// CREATE or UPDATE research domain (Admin only)
exports.upsertResearch = async (req, res) => {
  try {
    const { domain } = req.body;
    
    const research = await Research.findOneAndUpdate(
      { domain },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    
    res.json({ message: 'Research domain updated', research });
  } catch (err) {
    res.status(500).json({ message: 'Error updating research domain', error: err.message });
  }
};

// ADD project to domain (Admin only)
exports.addProject = async (req, res) => {
  try {
    const { domain } = req.params;
    const projectData = req.body;
    
    const research = await Research.findOne({ domain });
    if (!research) {
      return res.status(404).json({ message: 'Research domain not found' });
    }
    
    research.projects.push(projectData);
    await research.save();
    
    res.json({ message: 'Project added', research });
  } catch (err) {
    res.status(500).json({ message: 'Error adding project', error: err.message });
  }
};

// UPDATE project (Admin only)
exports.updateProject = async (req, res) => {
  try {
    const { domain, projectId } = req.params;
    const updateData = req.body;
    
    const research = await Research.findOne({ domain });
    if (!research) {
      return res.status(404).json({ message: 'Research domain not found' });
    }
    
    const projectIndex = research.projects.findIndex(
      p => p._id.toString() === projectId
    );
    
    if (projectIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    research.projects[projectIndex] = { 
      ...research.projects[projectIndex].toObject(), 
      ...updateData 
    };
    await research.save();
    
    res.json({ message: 'Project updated', research });
  } catch (err) {
    res.status(500).json({ message: 'Error updating project', error: err.message });
  }
};

// DELETE project (Admin only)
exports.deleteProject = async (req, res) => {
  try {
    const { domain, projectId } = req.params;
    
    const research = await Research.findOneAndUpdate(
      { domain },
      { $pull: { projects: { _id: projectId } } },
      { new: true }
    );
    
    if (!research) {
      return res.status(404).json({ message: 'Research domain not found' });
    }
    
    res.json({ message: 'Project deleted', research });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err.message });
  }
};

// ADD achievement (Admin only)
exports.addAchievement = async (req, res) => {
  try {
    const { domain } = req.params;
    const achievementData = req.body;
    
    const research = await Research.findOneAndUpdate(
      { domain },
      { $push: { achievements: achievementData } },
      { new: true }
    );
    
    if (!research) {
      return res.status(404).json({ message: 'Research domain not found' });
    }
    
    res.json({ message: 'Achievement added', research });
  } catch (err) {
    res.status(500).json({ message: 'Error adding achievement', error: err.message });
  }
};

// DELETE research domain (Admin only)
exports.deleteResearch = async (req, res) => {
  try {
    const { domain } = req.params;
    
    await Research.findOneAndDelete({ domain });
    res.json({ message: 'Research domain deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting research domain', error: err.message });
  }
};
