const { NODE_ENV = 'development' } = process.env;
module.exports.NODE_ENV = NODE_ENV;

module.exports.PORT = process.env.PORT || '3001';

module.exports.REQUIRED_ENVIRONMENT_VARIABLES = ['PORT', 'DATABASE_URL', 'SESSION_COOKIE_NAME', 'SESSION_SECRET'];
module.exports.IS_PROD = NODE_ENV.toLowerCase() === 'production';
module.exports.DEV_DATABASE_URL = 'postgres://gary:@localhost:5432/swattify';

module.exports.DATABASE_URL = process.env.DATABASE_URL;
module.exports.CLIENT_URL = 'http://localhost:3000';
module.exports.SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME;
module.exports.SESSION_SECRET = process.env.SESSION_SECRET;

module.exports.BCRYPT_SALT_ROUNDS = 12;
module.exports.MINIMUM_PASSWORD_LENGTH = 10;
module.exports.MINIMUM_PASSWORD_UPPERCASE = 1;
module.exports.MINIMUM_PASSWORD_LOWERCASE = 1;
module.exports.MINIMUM_PASSWORD_DIGITS = 1;
module.exports.MAXIMUM_PASSWORD_LENGTH = 128;

module.exports.PROJECTS_QUERY_MAXIMUM_PAGE_SIZE = 20;
module.exports.PROJECTS_QUERY_DEFAULT_PAGE_SIZE = 20;

module.exports.USER_PAGINATE_OPTIONS = {
  maximumPageSize: 20,
  defaultPageSize: 20,
};

module.exports.USER_SELECTABLE_FIELDS = [
  'name', 'description', 'logoUrl', 'projectOwnerId'
];

module.exports.BUG_REPORT_SORTABLE_FIELDS = [
  'createdAt', 'updatedAt', 'name', 'description',
  'severity', 'priority', 'status',
];
module.exports.BUG_REPORT_SELECTABLE_FIELDS = [
  'id', 'creator', 'name', 'description', 'severity', 'priority',
  'status', 'project', 'updatedAt', 'createdAt',
];

module.exports.BUG_REPORT_COMMENT_SORTABLE_FIELDS = [
  'id', 'text', 'bugReportId', 'name', 'updatedAt', 'createdAt',
];
module.exports.BUG_REPORT_COMMENT_SELECTABLE_FIELDS = [
  'id', 'text', 'bugReportId', 'name', 'updatedAt', 'createdAt',
];

module.exports.SUCCESS = 'success';
module.exports.FAIL = 'fail';
module.exports.ERROR = 'error';
