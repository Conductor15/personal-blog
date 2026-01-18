const express = require("express");
const router = express.Router();    
const controller = require("../controllers/category.controller");
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/" ,controller.index);

router.post("/create" ,authMiddleware.requireAuth, controller.create);

router.get("/:slug" ,controller.detail);

router.patch("/:slug" ,authMiddleware.requireAuth,controller.delete);



module.exports = router;