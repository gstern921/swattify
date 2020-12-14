const { Router } = require('express');
const { OK, BAD_REQUEST } = require('http-status-codes');
const {FAIL, SUCCESS} = require('../config/app.config');
const { ensureAuth } = require('../middleware/authMiddleware');
const { createProject, deleteProjectById } = require('../controllers/projectController');

const router = Router();

// Create New Project
router.post('/', ensureAuth, async (req, res) => {
  const { name, description, logoUrl, isPublic } = req.body;
  const { user } = req;
  const projectCreationObj = { name, description, logoUrl, isPublic };
  try {
    const project = await createProject(projectCreationObj, user);
    console.log('in router projectOwnerId: ', project.projectOwnerId);
    return res.status(200).json({ status: 'success', data: { project }, userId: user.id });
  } catch (err) {
    return res.status(500).json({ status: 'fail', err });
  }
});

router.delete('/:id', ensureAuth, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const result = await deleteProjectById({ id, userId });

  if (!result) {
    return res.status(BAD_REQUEST).json({
      status: FAIL,
      message: 'Unable to delete project',
    });
  }
  return res.status(OK).json({ status: SUCCESS, message: 'Project successfully deleted' });
});

module.exports = router;
