const express = require("express");
const router = express.Router();

const multer = require("multer");
const storageMulter = require("../../helper/storageMulter");
const upload = multer({ storage: storageMulter() });

const controller = require("../../controller/admin/setting.controller");


router.get("/general", controller.general);

router.patch(
  "/general",
  upload.single("logo"),
  controller.generalPatch
);

module.exports = router;