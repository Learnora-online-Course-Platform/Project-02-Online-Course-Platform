const { Progress, CourseMaterial } = require('../../models');

exports.markCompleted = async (req, res) => {
  try {
    const { courseId, materialId } = req.body;
    
    const total = await CourseMaterial.count({ where: { courseId } });
    const completedMaterials = req.body.completedCount; 
    const percent = total > 0 ? Math.round((completedMaterials / total) * 100) : 0;

    const [progress] = await Progress.findOrCreate({
      where: { userId: req.user.id, courseId },
      defaults: { percentComplete: percent, lastMaterialId: materialId }
    });

    if (progress.percentComplete !== percent || progress.lastMaterialId !== materialId) {
      progress.percentComplete = percent;
      progress.lastMaterialId = materialId;
      await progress.save();
    }

    res.json(progress);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ where: { userId: req.user.id, courseId: req.params.courseId }});
    res.json(progress || { percentComplete: 0 });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
