const db = require("../models/index")
const { Op } = require("sequelize")
const Diary = db.diary
const Comments = db.comments

const TextFilters = require("../filters/textfilter")
const { request } = require("express")

// desc:        GET ALL THE MY DIARIES
// METHOD:      GET
// permissions: AUTH
// route:       /diary/my
const myDiary = async (req, res) => {
    try {
        const isAuthenticated = req.session.isLogged
        let diaries = await Diary.findAll({
            where: { userId: req.session.user.id },
            raw: true,
            plain: false,
            include: ['user'],
            nest: true
        })
        const newFilter = new TextFilters(diaries)
        diaries = newFilter.textTrimmer(200)
        res.render("diary/my__diary", {
            title: "My diaries",
            diaries: diaries.reverse(),
            isAuthenticated
        })
    } catch (error) {
        console.log(error);
    }
}

// desc:        GET ALL  DIARIES
// METHOD:      GET
// permissions: AUTH
// route:       /diary/my
const lentaDiary = async (req, res) => {
    try {
        const isAuthenticated = req.session.isLogged
        let diaries = await Diary.findAll({
            where: { userId: { [Op.ne]: req.session.user.id } },
            raw: true,
            plain: false,
            include: ['user'],
            nest: true
        })
        const newFilter = new TextFilters(diaries)
        diaries = newFilter.textTrimmer(200)
        res.render("diary/my__diary", {
            title: "All diaries",
            diaries: diaries.reverse(),
            isAuthenticated
        })
    } catch (error) {
        console.log(error);
    }
}

// desc:        Post new diary
// METHOD:      Post
// permissions: AUTH
// route:       /diary/add-diary
const addNewDiary = async (req, res) => {
    try {
        console.log(req.session);
        const { imageUrl, text } = req.body
        if (text) {
            await Diary.create({
                imageUrl: imageUrl,
                text: text,
                userId: req.session.user.id
            })
            res.redirect("/diary/my")

        } else {
            res.redirect("/diary/my")
        }
    } catch (error) {
        console.log(error);
    }
}

// desc:        GET One diary by id
// METHOD:      GET
// permissions: AUTH
// route:       /diary/:id
const getDiaryByPk = async (req, res) => {
    try {

        const data = await Diary.findByPk(req.params.id, {
            raw: false,
            plain: true,
            include: ['comments', 'user'],
            nest: true
        })
        var isAuthor = false
        const isAuthenticated = req.session.isLogged
        const diary = await data.toJSON()
        if (diary.user.id === req.session.user.id) {
            isAuthor = true
        }
        res.render("diary/detail", {
            title: "Total information",
            diary: diary,
            comments: diary.comments.reverse(),
            isAuthenticated,
            isAuthor
        })
    } catch (error) {
        console.log(error);
    }
}

// desc:        Update diary
// METHOD:      POST
// permissions: AUTH
// route:       /diary/update/:id
const updateDiary = async (req, res) => {
    try {
        await Diary.update({ text: req.body.text }, {
            where: {
                id: req.params.id
            }
        })
        res.redirect("/diary/" + req.params.id)
    } catch (error) {
        console.log(error);
    }
}


// desc:        delete diary
// METHOD:      POST
// permissions: AUTH
// route:       /diary/:id
const deleteDiary = async (req, res) => {
    try {
        await Diary.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/diary/my")
    } catch (error) {
        console.log(error);
    }
}


// desc:        Post new comments to specific diary
// METHOD:      Post
// permissions: AUTH
// route:       /diary/comments/:id
const leaveComment = async (req, res) => {
    try {
        const comment = req.body.comment
        if (comment) {
            await Comments.create({
                username: req.session.user.name,
                text: comment,
                diaryId: req.params.id,
                userId: req.session.user.id
            })
            res.redirect("/diary/" + req.params.id)
        } else {
            res.redirect("/diary/" + req.params.id)
        }
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    myDiary,
    addNewDiary,
    getDiaryByPk,
    updateDiary,
    deleteDiary,
    leaveComment,
    lentaDiary
}