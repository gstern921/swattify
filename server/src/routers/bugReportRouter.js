const { Router } = require('express');
const { ensureAuth } = require('../middleware/authMiddleware');
const {
  createBugReport,
  deleteBugReportById,
  getBugReportById,
  updateBugReportById
} = require('../controllers/bugReportController');

const router = Router();

router.use(ensureAuth);

// Get Bug Report By ID
router.get('/:bugReportId', (req, res) => getBugReportById(req.params.bugReportId)(req, res));

// Create Bug Report
router.post('/', createBugReport);

// Delete Bug Report By ID
router.delete('/:bugReportId', (req, res) => deleteBugReportById(req.params.bugReportId)(req, res));

router.patch('/:bugReportId', (req, res) => updateBugReportById(req.params.bugReportId)(req, res));

module.exports = router;
