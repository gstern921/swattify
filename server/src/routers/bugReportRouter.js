const { Router } = require('express');
const { ensureAuth } = require('../middleware/authMiddleware');
const {
  createBugReport,
  deleteBugReportById,
  getBugReportById,
  updateBugReportById
} = require('../controllers/bugReportController');
const { createCommentForBugReportId } = require('../controllers/bugReportCommentController');

const router = Router();

router.use(ensureAuth);

// Get Bug Report By ID
router.get('/:bugReportId', (req, res) => getBugReportById(req.params.bugReportId)(req, res));

// Create Bug Report
router.post('/:projectId', (req, res) => createBugReport(req.params.projectId)(req, res));

// Delete Bug Report By ID
router.delete('/:bugReportId', (req, res) => deleteBugReportById(req.params.bugReportId)(req, res));

router.patch('/:bugReportId', (req, res) => updateBugReportById(req.params.bugReportId)(req, res));

router.post('/:bugReportId/comment', (req, res, next) => createCommentForBugReportId(req.params.bugReportId)(req, res, next));


module.exports = router;
