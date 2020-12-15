const { Router } = require('express');
const { ensureAuth } = require('../middleware/authMiddleware');
const { createProject, deleteProjectById, getAllProjectsByUserId } = require('../controllers/projectController');

const router = Router();

// Create New Project
router.get('/user/:id', ensureAuth, (req, res) => getAllProjectsByUserId(req.params.id)(req, res));

router.post('/', ensureAuth, createProject);

router.delete('/:id', ensureAuth, (req, res) => deleteProjectById(req.params.id)(req, res));

module.exports = router;
