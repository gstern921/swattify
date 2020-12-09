var express = require("express");
var router = express.Router();
router.get("/", function (req, res, next) {
    res.send("hello from index");
});
module.exports = router;
//# sourceMappingURL=index.js.map