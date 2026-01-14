const express = require("express");
const router = express.Router();    
const controller = require("../controllers/post.controller");


router.get("/client" ,controller.indexClient);
router.get("/admin" ,controller.indexAdmin);
router.get("/:slug" ,controller.detail);
router.post("/create" ,controller.create);

router.patch("/:slug" ,controller.delete);
router.patch("/:slug/edit" ,controller.edit);




module.exports = router;