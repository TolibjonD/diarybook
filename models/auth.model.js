module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING(120),
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING(120),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(120),
            allowNull: false
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            default: false,
        }
    }, { timestamps: true });
    return Users
}