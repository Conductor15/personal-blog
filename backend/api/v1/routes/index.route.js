const postRoute = require("./post.route")
const categoryRoute = require("./category.route")
const dashboardRoute = require("./dashboard.route")


module.exports = (app) => {
    const version = "/api/v1"
    app.use(version + "/posts", postRoute)
    app.use(version + "/categories", categoryRoute)
    app.use(version + "/dashboard", dashboardRoute)

}