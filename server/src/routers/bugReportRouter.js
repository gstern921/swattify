const { Router } = require('express');
const { OK, INTERNAL_SERVER_ERROR, NO_CONTENT, BAD_REQUEST, NOT_FOUND } = require('http-status-codes');
const { ensureAuth } = require('../middleware/authMiddleware');
const { createBugReport, deleteBugReportById, getBugReportById } = require('../controllers/bugReportController');
const { SUCCESS, ERROR, FAIL } = require('../config/app.config');
const { catchAsync } = require('../utils/index');

const router = Router();

// Get Bug Report By ID
router.get(
  '/:bugReportId',
  ensureAuth,
  catchAsync(async (req, res) => {
    const { bugReportId: id } = req.params;
    try {
      const bugReport = await getBugReportById(id);
      if (bugReport) {
        return res.status(OK).json({ status: SUCCESS, data: bugReport });
      }
      return res.status(NOT_FOUND).json({ status: FAIL, message: 'Unable to find that bug report', data: null });
    } catch (err) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: ERROR, message: 'An error occured while searching for that bug report', data: null });
    }
  }),
);

// Create Bug Report
router.post('/', ensureAuth, createBugReport);

// Delete Bug Report By ID
router.delete('/:bugReportId',
  ensureAuth,
  deleteBugReportById({
    idParamName: 'bugReportId',
  }));

router.patch(
  '/:id',
  ensureAuth,
  catchAsync(async (req, res) => {
    console.log();
    return null;
  }),
);

module.exports = router;
