const { Router } = require('express');
const { OK, INTERNAL_SERVER_ERROR, NO_CONTENT, BAD_REQUEST, NOT_FOUND } = require('http-status-codes');
const { ensureAuth } = require('../middleware/authMiddleware');
const { createBugReport, deleteBugReportById, getBugReportById, updateBugReportById } = require('../controllers/bugReportController');
const { SUCCESS, ERROR, FAIL } = require('../config/app.config');
const { catchAsync } = require('../utils/index');

const router = Router();

const idParamName = 'bugReportId';

// Get Bug Report By ID
router.get(
  `/:${idParamName}`,
  ensureAuth,
  getBugReportById({ idParamName }),
);

// Create Bug Report
router.post('/', ensureAuth, createBugReport);

// Delete Bug Report By ID
router.delete(`/:${idParamName}`,
  ensureAuth,
  deleteBugReportById({ idParamName }));

router.patch(
  `/:${idParamName}`,
  ensureAuth,
  updateBugReportById({ idParamName }),
);

module.exports = router;
