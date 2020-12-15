const { BugReport, sequelize, ProjectUsers } = require('../models');
const { OK, INTERNAL_SERVER_ERROR, NO_CONTENT, BAD_REQUEST, NOT_FOUND } = require('http-status-codes');
const { SUCCESS, ERROR, FAIL } = require('../config/app.config');
const { catchAsync } = require('../utils');

// exports.createBugReport = async ({
//   user, name, description, severity, priority, status, projectId,
// }, BugReportModel = BugReport) => {
//   const bugReport = await BugReportModel.create({
//     creator: user.id,
//     name,
//     description,
//     severity,
//     priority,
//     status,
//     project: projectId,
//   });
//   return bugReport;
// };

exports.createBugReport = catchAsync(async (req, res) => {
  const { projectId, name, description, severity, priority, status } = req.body;
  const { user } = req;
  const db = sequelize;
  try {
    const newBugReport = await db.transaction(async (transaction) => {
      const projectUser = await ProjectUsers.findOne(
        {
          where: {
            userId: user.id,
            projectId,
          },
        },
        { transaction },
      );
      console.log(projectUser);

      if (projectUser) {
        const bugReport = await BugReport.create(
          {
            creator: user.id,
            name,
            description,
            severity,
            priority,
            status,
            project: projectId,
          },
          { transaction },
        );
        return bugReport;
      }
      return null;
    });

    if (newBugReport) {
      return res.status(OK).json({ status: SUCCESS, data: { bugReport: newBugReport } });
    }
    return res
      .status(BAD_REQUEST)
      .json({ status: FAIL, message: 'Unable to create bug report for this project', data: null });
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ status: ERROR, message: 'Unable to create bug report', data: null });
  }
});

exports.deleteBugReportById = ({ idParamName }) =>
  catchAsync(async (req, res) => {
    const { [idParamName]: id } = req.params;
    const deletedCount = await BugReport.destroy({
      where: {
        id,
        creator: req.user.id,
      },
    });

    if (deletedCount) {
      return res
        .status(OK)
        .json({ status: SUCCESS, message: 'Bug report successfully deleted', data: { deletedCount } });
    }
    return res.status(BAD_REQUEST).json({ status: FAIL, message: 'Delete unsuccessful' });
  });

exports.getBugReportById = async (id) => {
  const bugReport = await BugReport.findByPk(id);
  return bugReport;
};

exports.updateBugReportById = async (id, user) => {};
