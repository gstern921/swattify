const { Router } = require('express');
const { ensureAuth } = require('../middleware/authMiddleware');
const {
  createBugReport,
  deleteBugReportById,
  getBugReportById,
  updateBugReportById,
  getAllBugReports,
} = require('../controllers/bugReportController');

const { createCommentForBugReportId, getBugReportCommentsByReportId } = require('../controllers/bugReportCommentController');

const { paginate } = require('../middleware/queryMiddleware');

const router = Router();

router.use(ensureAuth);

router.get('/', paginate({ maximumPageSize: 20, defaultPageSize: 20 }), getAllBugReports);

// Create Bug Report
router.post('/', (req, res) => createBugReport(req.body.projectId)(req, res));

// Get Bug Report By ID
router.get('/:bugReportId', (req, res) => getBugReportById(req.params.bugReportId)(req, res));

// Delete Bug Report By ID
router.delete('/:bugReportId', (req, res) => deleteBugReportById(req.params.bugReportId)(req, res));

router.patch('/:bugReportId', (req, res) => updateBugReportById(req.params.bugReportId)(req, res));

router.get('/:bugReportId/comments', paginate({ maximumPageSize: 20, defaultPageSize: 20 }), (req, res) => getBugReportCommentsByReportId(req.params.bugReportId)(req, res));

router.post('/:bugReportId/comments', (req, res) => createCommentForBugReportId(req.params.bugReportId)(req, res));

module.exports = router;
