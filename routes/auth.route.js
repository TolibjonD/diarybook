const { Router } = require("express")
const {
    userLoginPage,
    userLogin,
    logout,
    getRegisterPage,
    registerUser,

} = require("../controllers/auth.controller")
const { guest } = require("../middlewares/auth")
const router = Router()

router.get("/login", guest, userLoginPage)
router.post("/login", guest, userLogin)
router.get('/logout', logout)
router.get("/register", guest, getRegisterPage)
router.post("/register", guest, registerUser)

module.exports = router