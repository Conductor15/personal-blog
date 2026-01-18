const express = require("express");
const router = express.Router();    
const controller = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/client" ,controller.indexClient);
router.get("/admin" ,authMiddleware.requireAuth, controller.indexAdmin);
router.get("/:slug" ,controller.detail);
router.get("/client/:slug" ,controller.detailClient);
router.post("/create" ,authMiddleware.requireAuth, controller.create);

router.patch("/:slug" , authMiddleware.requireAuth, controller.delete);
router.patch("/:slug/edit" , authMiddleware.requireAuth, controller.edit);




module.exports = router;