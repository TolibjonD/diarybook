const { Router } = require("express")
const router = Router()
const {
    myDiary,
    addNewDiary,
    getDiaryByPk,
    updateDiary,
    deleteDiary,
    leaveComment,
    lentaDiary
} = require("../controllers/diary.controllers")

router.get("/my", myDiary)
router.get("/lenta", lentaDiary)
router.post("/add-diary", addNewDiary)
router.post("/update/:id", updateDiary)
router.post("/delete/:id", deleteDiary)
router.post("/comments/:id", leaveComment)
router.get("/:id", getDiaryByPk)

module.exports = router