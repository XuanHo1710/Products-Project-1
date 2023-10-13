const express = require("express");
const router = express.Router();

const multer = require("multer");
const storageMulter = require("../../helper/storageMulter");
const upload = multer({ storage: storageMulter() });


const controller = require("../../controller/admin/my-account.controller");


router.get("/", controller.index);

router.get("/edit", controller.edit);

router.patch(
  "/edit",
  upload.single("avatar"),
  controller.editPatch
);

module.exports = router;