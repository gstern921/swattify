const { StatusCodes } = require('http-status-codes');
const { BugReport, BugReportComment, sequelize, ProjectUsers } = require('../models');
const { SUCCESS, ERROR, FAIL } = require('../config/app.config');
const { catchAsync } = require('../utils');

const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND } = StatusCodes;

exports.getAllBugReports = catchAsync(async (req, res) => {
  try {
    const {count: totalCount, rows: bugReports} = await BugReport.findAndCountAll({
      // include: { model: BugReportComment, as: 'comments', attributes: { exclude: ['bugReportId'] } },
      limit: req.paginateLimit,
      offset: req.paginateOffset,
      order: req.sortFields,
    });
    return res.status(OK).json({
      status: SUCCESS,
      totalCount,
      count: bugReports.length,
      data: bugReports,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

exports.createBugReport = (projectId) =>
  catchAsync(async (req, res) => {
    const { name, description, severity, priority, status } = req.body;

    if (!projectId) {
      return res
        .status(BAD_REQUEST)
        .json({ status: FAIL, message: 'Cannot create bug report without project ID', data: null });
    }

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

exports.deleteBugReportById = (id) =>
  catchAsync(async (req, res) => {
    const deletedCount = await BugReport.destroy({
      where: {
        id,
        creator: req.user.id,
      },
    });

    if (deletedCount) {
      return res
        .status(OK)
        .json({ status: SUCCESS, message: 'Bug report successfully deleted', data: { count: deletedCount } });
    }
    return res.status(BAD_REQUEST).json({ status: FAIL, message: 'Delete unsuccessful' });
  });

exports.getBugReportById = (id) =>
  catchAsync(async (req, res) => {
    try {
      const bugReport = await BugReport.findByPk(id);
      if (bugReport) {
        return res.status(OK).json({ status: SUCCESS, data: { bugReport } });
      }
      return res.status(NOT_FOUND).json({ status: FAIL, message: 'Unable to find that bug report', data: null });
    } catch (err) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: ERROR, message: 'An error occured while searching for that bug report', data: null });
    }
  });

exports.updateBugReportById = (id) =>
  catchAsync(async (req, res) => {
    const creator = req.user.id;
    const { projectId, name, description, severity, priority, status } = req.body;

    try {
      const updated = await BugReport.update(
        {
          projectId,
          name,
          description,
          severity,
          priority,
          status,
        },
        {
          where: {
            id,
            creator,
          },
          returning: true,
        },
      );
      const numUpdated = updated[0];
      if (numUpdated) {
        const updatedBugReport = updated[1];
        return res.status(OK).json({
          status: SUCCESS,
          message: 'Bug report successfully updated',
          data: { count: numUpdated, bugReport: updatedBugReport },
        });
      }
      return res.status(NOT_FOUND).json({ status: FAIL, message: 'Bug report not found', data: null });
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: ERROR,
        message: 'Unable to update bug report',
        data: null,
      });
    }
  });
