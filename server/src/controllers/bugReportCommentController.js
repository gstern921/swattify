const { StatusCodes } = require('http-status-codes');
const { BugReport, sequelize, ProjectUsers, BugReportComment } = require('../models');
const { SUCCESS, ERROR, FAIL } = require('../config/app.config');
const { catchAsync } = require('../utils');
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } = StatusCodes;

exports.getBugReportCommentsByReportId = (bugReportId) =>
  catchAsync(async (req, res) => {
    try {
      const { totalCount, rows } = await BugReportComment.findAndCountAll({
        where: {
          bugReportId,
        },
        limit: req.paginateLimit,
        offset: req.paginateOffset,
        order: req.sortFields,
        attributes: req.includedFields,

      });
      const count = rows.length;
      return res.status(OK).json({
        status: SUCCESS,
        count,
        data: rows,
        totalCount,
      });
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR).json({ status: ERROR, message: 'Something went wrong' });
    }
  });

exports.createCommentForBugReportId = (bugReportId) =>
  catchAsync(async (req, res, next) => {
    const { text } = req.body;
    const { user } = req;

    const db = sequelize;
    try {
      const newComment = await db.transaction(async (transaction) => {
        const bugReport = await BugReport.findByPk(bugReportId, { transaction });
        if (!bugReport) {
          return res.status(NOT_FOUND).json({
            status: FAIL,
            message: 'No bug report with that id exists',
            data: null,
          });
        }
        const project = await bugReport.getProject();

        if (!project) {
          return res
            .status(NOT_FOUND)
            .json({ status: FAIL, message: 'Not able to find project with that bug report', data: null });
        }

        const projectHasUser = await project.hasUser(user, { transaction });

        if (!projectHasUser) {
          return res.status(UNAUTHORIZED).json({
            status: FAIL,
            message: 'You may not comment on a bug report from a project you are not a member of',
            data: null,
          });
        }
        const bugReportComment = await BugReportComment.create(
          { text, userId: user.id, bugReportId: bugReport.id },
          { transaction },
        );
        if (bugReportComment) {
          return res
            .status(OK)
            .json({ status: SUCCESS, message: 'Comment created successfully', data: { comment: bugReportComment } });
        }
        return bugReportComment;
      });
    } catch (err) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: ERROR, message: 'Something went wrong, unable to create comment.', data: null });
    }
  });

exports.deleteBugReportCommentById = (id) => catchAsync(async (req, res) => {});

exports.getBugReportCommentById = (id) => catchAsync(async (req, res) => {});

exports.updateBugReportCommentById = (id) => catchAsync(async (req, res) => {});
