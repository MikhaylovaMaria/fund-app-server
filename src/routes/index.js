const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));
router.use("/bankAccount", require("./bankAccount.routes"));
router.use("/operations", require("./operations.routes"));
router.use("/category", require("./category.routes"));
router.use("/upload", require("./uploads.routes"));

module.exports = router;
