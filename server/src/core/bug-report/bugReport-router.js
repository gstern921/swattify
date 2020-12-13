const { Router } = require('express');
const { OK, INTERNAL_SERVER_ERROR } = require('http-status-codes');
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

router.delete('/:id', ensureAuth, async (req, res) => {});

module.exports = router;
