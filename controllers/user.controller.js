const { raw } = require("express")
const db = require("../models/index")
const Users = db.users
const Diary = db.diary

// desc:        GET profile page
// METHOD:      GET
// route:       /user/profile
const myProfilePage = async (req, res) => {
    try {
        const isAuthenticated = req.session.isLogged
        const user = req.session.user
        const { count, rows } = await Diary.findAndCountAll({ where: { userId: user.id } })
        res.render("user/profile", {
            title: user.name,
            isAuthenticated,
            user,
            count
        })
    } catch (error) {
        console.log(error);
    }
}

// desc:        GET profile page
// METHOD:      GET
// route:       /user/profile
const updateProfile = async (req, res) => {
    try {
        const user = req.session.user
        const { email, name } = req.body
        if (email, name) {
            await Users.update(
                { email, name },
                { where: { id: user.id }, })
            const updatedUser = await Users.findOne({ where: { id: user.id } })
            req.session.user = updatedUser
            req.session.save()
            return res.redirect("/user/profile")
        } else {
            return res.redirect("/user/profile")
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    myProfilePage,
    updateProfile
}