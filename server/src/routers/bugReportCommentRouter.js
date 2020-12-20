const { Router } = require('express');

const { getBugReportComments } = require('../controllers/bugReportCommentController');
const { paginate, sort, selectFields } = require('../middleware/queryMiddleware');
const { requireAuth } = require('../middleware/authMiddleware');

const { BUG_REPORT_COMMENT_SELECTABLE_FIELDS, BUG_REPORT_COMMENT_SORTABLE_FIELDS, BUG_REPORT_SELECTABLE_FIELDS } = require('../config/app.config');

const router = Router();

router.use(requireAuth);

router.get('/',
  paginate({ maximumPageSize: 20, defaultPageSize: 20 }),
  sort(BUG_REPORT_COMMENT_SORTABLE_FIELDS),
  selectFields(BUG_REPORT_SELECTABLE_FIELDS),
  getBugReportComments,
);

module.exports = router;
