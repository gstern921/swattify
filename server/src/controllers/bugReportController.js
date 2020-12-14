const { BugReport, sequelize, ProjectUsers } = require('../models');

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

exports.createBugReport = async (
  { user, projectId, name, description, severity, priority, status },
  db = sequelize,
) => {
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

  return newBugReport;
};

exports.deleteBugReportById = async (user, bugReportId) => {
  const result = await BugReport.destroy({
    where: {
      id: bugReportId,
      creator: user.id,
    },
  });
  console.log(result);
  return result;
};
