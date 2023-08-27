const db = require("../models/index")
const Users = db.users
const bcrypt = require("bcryptjs")

// desc:        GET the user login page
// METHOD:      GET
// route:       /auth/login
const userLoginPage = async (req, res) => {
    try {
        const isAuthenticated = req.session.isLogged
        res.render("auth/login", {
            title: "User login page",
            isAuthenticated
        })
    } catch (error) {
        console.log(error);
    }
}

// desc:        Login user  
// METHOD:      POST
// route:       /auth/login
const userLogin = async (req, res) => {
    try {
        const isThisUser = await Users.findOne({ where: { email: req.body.email } })
        if (isThisUser) {
            const isThisPassword = await bcrypt.compare(req.body.password, isThisUser.password)
            if (isThisPassword) {
                req.session.isLogged = true
                req.session.user = isThisUser
                req.session.save(err => {
                    if (err) {
                        throw err
                    } else {
                        return res.redirect("/diary/my")
                    }
                })
            } else { return res.redirect("/auth/login") }
        } else {
            return res.redirect("/auth/login")
        }
    } catch (error) {
        console.log(error);
    }
}

// desc:        logout user
// METHOD:      GET
// route:       /auth/logout
const logout = async (req, res) => {
    await req.session.destroy((err) => {
        if (err) {
            throw err
        } else[
            res.redirect("/auth/login")
        ]
    })
}

// desc:        get user register page
// METHOD:      get
// route:       /auth/register
const getRegisterPage = (req, res) => {
    try {
        res.render("auth/register", {
            title: "Registration"
        })
    } catch (error) {
        console.log(error);
    }
}

// desc:        register user
// METHOD:      post
// route:       /auth/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password, password2 } = req.body
        if (password === password2) {
            const existUser = await Users.findOne({ where: { email } })
            if (existUser) {
                return res.redirect("/auth/register")
            } else {
                if (name, password, email) {
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(password, salt)
                    await Users.create({
                        name,
                        email,
                        password: hashedPassword
                    })
                    res.redirect("/auth/login")
                }
            }
        }
        return res.redirect("/auth/register")
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    userLoginPage,
    userLogin,
    logout,
    getRegisterPage,
    registerUser
}