var express = require('express');
var router = express.Router();
router.get('/', function (_req, res, _next) {
    res.send('hello from api');
});
module.exports = router;
//# sourceMappingURL=api.js.map