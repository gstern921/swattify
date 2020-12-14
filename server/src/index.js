process.on('uncaughtException', (err) => {
  console.log(`Uncaught Exception! 💥 ${err.name}, ${err.message}`);

  process.exit(1);
});

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });

const app = require('./app');

const { PORT, IS_PROD } = require('./config/app.config');
const { NODE_ENV } = require('./config/app.config');

const { requireEnvironmentVariables } = require('./utils');
const { REQUIRED_ENVIRONMENT_VARIABLES } = require('./config/app.config');

requireEnvironmentVariables(REQUIRED_ENVIRONMENT_VARIABLES);

const { sequelize: db, User, Project, BugReport, ProjectUsers } = require('./models');
db.authenticate().then(async () => {
  if (!IS_PROD) {
    await Project.sync({ force: true });
    await BugReport.sync({ force: true });
    await ProjectUsers.sync({ force: true });
    // await User.sync({ force: true });
    // await db.sync({ force: true });
  }
  console.log('Connected to database...');
  const server = app.listen(PORT, () => {
    console.log(`Running in ${NODE_ENV} mode on port ${PORT}`);
  });

  process.on('unhandledRejection', (err) => {
    console.log(`Unhandled Rejection! 💥 ${err.name}, ${err.message}`);
    if (server && typeof server.close === 'function') {
      server.close(() => process.exit(1));
    }
  });

  process.on('SIGTERM', (err) => {
    console.log('👋 SIGTERM RECEIVED! Shutting down gracefully');
    if (server && typeof server.close === 'function') {
      server.close(() => console.log('💥 Process terminated!'));
    }
  });
}
);
