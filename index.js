// IMPORT INSTALLED MODULES
const express = require("express"),
    app = express(),
    hbs = require("express-handlebars"),
    dotenv = require("dotenv"),
    path = require("path"),
    session = require("express-session"),
    pgStore = require("connect-pg-simple")(session),
    csrf = require("csurf");


// IMPORT LOCAL MODULES, SCRIPTS
const pool = require("./config/db");
const { protected } = require("./middlewares/auth");
const db = require('./models/index')
// ENV CONFIG
dotenv.config()
// TEMPLATE ENGINE CONFIG
app.engine(".hbs", hbs.engine({ extname: ".hbs" }))
app.set("view engine", ".hbs")

// Reading data properly
app.use(session({
    store: new pgStore({
        pool: pool,
        tableName: "user_session"
    }),
    secret: "Secret_key",
    resave: false,
    saveUninitialized: false
}))
app.use(csrf())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "static")))

app.use((req, res, next) => {
    var token = req.csrfToken();
    res.locals.csrfToken = token;
    next()
})

// REGISTER ROUTES
app.use("/diary", protected, require("./routes/diary.route"))
app.use("/auth", require("./routes/auth.route"))
app.use("/user", require("./routes/user.route"))
app.use((req, res) => {
    if (req.session.isLogged) {
        res.redirect("/diary/my")
    }
    res.redirect("/auth/login")
})

// SERVER PORT
const PORT = process.env.PORT || 3000

// START DATABASE SYNC
const start = async () => {
    try {
        const connect = await db.sequelize.sync()

        // RUN SERVER AND INITIALIZE MAIN CONCEPTION
        app.listen(PORT, () => {
            console.log(`SERVER RUNNING ON PORT: ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()