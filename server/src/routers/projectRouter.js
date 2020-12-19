const { Router } = require('express');
const { ensureAuth, ensureProjectMember } = require('../middleware/authMiddleware');
const { createProject, deleteProjectById } = require('../controllers/projectController');
const { createBugReport } = require('../controllers/bugReportController');

const router = Router();

// Create New Project
router.post('/', ensureAuth, createProject);

router.delete('/:id', ensureAuth, ensureProjectMember('id'), (req, res) => deleteProjectById(req.params.id)(req, res));

module.exports = router;
