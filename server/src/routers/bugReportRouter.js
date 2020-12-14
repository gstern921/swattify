const { Router } = require('express');
const { OK, INTERNAL_SERVER_ERROR, NO_CONTENT, BAD_REQUEST } = require('http-status-codes');
const { ensureAuth } = require('../middleware/authMiddleware');
const { createBugReport, deleteBugReportById } = require('../controllers/bugReportController');
const { SUCCESS, ERROR, FAIL } = require('../config/app.config');
const { catchAsync } = require('../utils/index');

const router = Router();

// name
// description
// severity
// priority
// status

router.post(
  '/',
  ensureAuth,
  async (req, res) => {
    const { name, description, severity, priority, status, projectId } = req.body;
    const { user } = req;

    try {
      const bugReport = await createBugReport({
        user,
        name,
        description,
        severity,
        priority,
        status,
        projectId,
      });

      if (bugReport) {
        return res.status(OK).json({ status: SUCCESS, bugReport });
      }

      return res.status(BAD_REQUEST).json({ status: FAIL, message: 'Unable to create bug report for this project' });
    } catch (e) {
      console.log(e);
      return res.status(INTERNAL_SERVER_ERROR).json({ status: ERROR, message: 'Unable to create bug report', e });
    }
  },
);

router.delete(
  '/:id',
  ensureAuth,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedCount = await deleteBugReportById(req.user, id);

    if (deletedCount) {
      return res.status(OK).json({ message: 'success', deleted: deletedCount });
    }
    return res.status(BAD_REQUEST).json({ message: 'Delete unsuccessful' });
  }),
);

module.exports = router;
