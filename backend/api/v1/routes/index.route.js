const postRoute = require("./post.route")
const categoryRoute = require("./category.route")
const dashboardRoute = require("./dashboard.route")
const userRoute = require("./user.route")
const authRoute = require("./auth.route")

const authMiddleware = require("../middlewares/auth.middleware")

module.exports = (app) => {
    const version = "/api/v1"
    app.use(version + "/posts",authMiddleware.requireAuth, postRoute)
    app.use(version + "/categories",authMiddleware.requireAuth, categoryRoute)
    app.use(version + "/dashboard",authMiddleware.requireAuth, dashboardRoute)
    app.use(version + "/users",authMiddleware.requireAuth, userRoute)
    app.use(version + "/auth", authRoute)

}