const { Router } = require('express');
const { NO_CONTENT, OK } = require('http-status-codes');
const { ensureAuth } = require('../../infrastructure/auth/auth-middleware');
const Project = require('./ProjectModel');

const router = Router();

// Create New Project
router.post('/', ensureAuth, async (req, res) => {
  const { name, description, logoUrl, isPublic } = req.body;
  const userId = req.user.id;
  const projectCreationObj = { name, description, logoUrl, isPublic, projectOwnerId: userId };
  if (!req.isAuthenticated()) {
    try {
      const project = new Project(projectCreationObj);
      return res.status(200).json({ status: 'success', project });
    } catch (e) {
      return res.status(500).json({ status: 'error', e });
    }
  }
  try {
    const project = await Project.create(projectCreationObj);

    console.log(project);
    return res.status(200).json({ status: 'success', project, userId });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'fail', err });
  }
});

router.delete('/:id', ensureAuth, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const result = await Project.destroy({
    where: {
      id,
      projectOwnerId: userId,
    },
  });

  return res.status(OK).json({ result });
});

module.exports = router;
