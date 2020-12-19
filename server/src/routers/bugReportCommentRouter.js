const { Router } = require('express');

const { getBugReportComments } = require('../controllers/bugReportCommentController');
const { paginate } = require('../middleware/queryMiddleware');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.use(requireAuth);

router.get('/', paginate({ maximumPageSize: 20, defaultPageSize: 20 }), getBugReportComments);

module.exports = router;
