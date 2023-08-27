module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING(1000),
            allowNull: false
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: false,
        }
    }, { timestamps: true });
    return Comments
}