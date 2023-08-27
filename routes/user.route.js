const { Router } = require("express")
const { myProfilePage, updateProfile } = require("../controllers/user.controller")
const { protected } = require("../middlewares/auth")
const router = Router()

router.get('/profile', protected, myProfilePage)
router.post('/profile', protected, updateProfile)

module.exports = router