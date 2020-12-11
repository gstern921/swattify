const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json(req.user);
});
router.get('/dashboard', (req, res) => {
  // console.log(req.session);
  res.status(200).json(req.user);
});

module.exports = router;
