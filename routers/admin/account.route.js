const express = require("express");
const router = express.Router();

const multer = require("multer");
const storageMulter = require("../../helper/storageMulter");
const upload = multer({ storage: storageMulter() });

const controller = require("../../controller/admin/account.controller");
const validate = require("../../validates/admin/account.validate");


router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("avatar"),
  validate.createPost,
  controller.createPost
);


router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single("avatar"),
  validate.editPatch,
  controller.editPatch
);

module.exports = router;