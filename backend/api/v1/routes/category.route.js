const express = require("express");
const router = express.Router();    
const controller = require("../controllers/category.controller");


router.get("/" ,controller.index);

router.post("/create" ,controller.create);

router.get("/:slug" ,controller.detail);

router.patch("/:slug" ,controller.delete);



module.exports = router;