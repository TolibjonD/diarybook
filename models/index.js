const Sequelize = require("sequelize")

const sequelize = new Sequelize("diarybook", 'postgres', "2007", {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.diary = require("./diary.model")(sequelize, Sequelize)
db.comments = require("./comments.model")(sequelize, Sequelize)
db.users = require("./auth.model")(sequelize, Sequelize)

db.users.hasMany(db.diary, {
    as: "diaries",
    onDelete: "CASCADE"
})
db.users.hasMany(db.comments, {
    as: "comments",
    onDelete: "CASCADE"
})

db.diary.hasMany(db.comments, { as: "comments", onDelete: 'CASCADE' })
db.diary.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user"
})

db.comments.belongsTo(db.diary, {
    foreignKey: "diaryId",
    as: "diary",
})
db.comments.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user"
})

module.exports = db