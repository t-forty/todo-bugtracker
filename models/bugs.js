module.exports = (sequelize, Sequelize) => {
    const Bug = sequelize.define('Bug', {
        // Model attributes are defined here
        // allowNull defaults to true
        // maps to Todo, Bug = Todo, type = bug
        Bug: {
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
    console.log('Bugs synced: ',Bug === sequelize.models.Bug); // true
    return Bug
}