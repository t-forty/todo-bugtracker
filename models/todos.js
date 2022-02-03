module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define('Todo', {
        // Model attributes are defined here
        // allowNull defaults to true
        todo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        summary: {
            type: Sequelize.STRING,
            allowNull: false
        },
        project: {
            type: Sequelize.STRING,
        },
        type: {
            type: Sequelize.STRING,
        },
        category: {
            type: Sequelize.STRING,
        },
        creator: {
            type: Sequelize.STRING,
            allowNull: false
        },
        assignedTo: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        // Other model options go here
    });
    console.log('todo synced: ',Todo === sequelize.models.Todo); // true
    return Todo
}