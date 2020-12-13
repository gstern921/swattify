const { Router } = require('express');
const { OK, INTERNAL_SERVER_ERROR, NO_CONTENT, BAD_REQUEST } = require('http-status-codes');
const { ensureAuth } = require('../../infrastructure/auth/auth-middleware');
const BugReport = require('./BugReportModel');
const { SUCCESS, ERROR } = require('../../config/app.config');

const router = Router();

// name
// description
// severity
// priority
// status

router.post('/', ensureAuth, async (req, res, next) => {
  const { name, description, severity, priority, status, projectId } = req.body;
  const userId = req.user.id;
  try {
    const bugReport = await BugReport.create({
      name,
      description,
      severity,
      priority,
      status,
      userId,
      projectId,
    });
    return res.status(OK).json({ status: SUCCESS, bugReport });
  } catch (e) {
    console.log(e);
    return res.status(INTERNAL_SERVER_ERROR).json({ status: ERROR, message: 'Unable to create bug report', e });
  }
});

router.delete('/:id', ensureAuth, async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const deletedCount = await BugReport.destroy({
      where: {
        userId,
        id,
      },
    });

    if (deletedCount) {
      return res.status(NO_CONTENT).json({ message: 'success', deleted: deletedCount });
    }
    return res.status(BAD_REQUEST).json({ message: 'Delete unsuccessful' });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Unable to delete' });
  }
});

module.exports = router;
