const { Router } = require('express');
const { ensureAuth } = require('../middleware/authMiddleware');
const {
  createBugReport,
  deleteBugReportById,
  getBugReportById,
  updateBugReportById,
  getAllBugReports,
} = require('../controllers/bugReportController');

const {
  BUG_REPORT_SORTABLE_FIELDS,
  BUG_REPORT_SELECTABLE_FIELDS,
  BUG_REPORT_COMMENT_SELECTABLE_FIELDS,
  BUG_REPORT_COMMENT_SORTABLE_FIELDS
} = require('../config/app.config');

const { createCommentForBugReportId, getBugReportCommentsByReportId } = require('../controllers/bugReportCommentController');

const { paginate, sort, selectFields } = require('../middleware/queryMiddleware');

const router = Router();

router.use(ensureAuth);

router.get('/',
  paginate({ maximumPageSize: 20, defaultPageSize: 20 }),
  sort(BUG_REPORT_SORTABLE_FIELDS),
  selectFields(BUG_REPORT_SELECTABLE_FIELDS),
  getAllBugReports);

// Create Bug Report
router.post('/', (req, res) => createBugReport(req.body.projectId)(req, res));

// Get Bug Report By ID
router.get('/:bugReportId', (req, res) => getBugReportById(req.params.bugReportId)(req, res));

// Delete Bug Report By ID
router.delete('/:bugReportId', (req, res) => deleteBugReportById(req.params.bugReportId)(req, res));

router.patch('/:bugReportId', (req, res) => updateBugReportById(req.params.bugReportId)(req, res));

router.get('/:bugReportId/comments',
  paginate({ maximumPageSize: 20, defaultPageSize: 20 }),
  sort(BUG_REPORT_COMMENT_SORTABLE_FIELDS),
  selectFields(BUG_REPORT_COMMENT_SELECTABLE_FIELDS),
  (req, res) => getBugReportCommentsByReportId(req.params.bugReportId)(req, res));

router.post('/:bugReportId/comments', (req, res, next) => createCommentForBugReportId(req.params.bugReportId)(req, res, next));

module.exports = router;
