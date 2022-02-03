module.exports = (sequelize, Sequelize) => {
    const Type = sequelize.define('Type', {
        // Model attributes are defined here
        // allowNull defaults to true
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        // Other model options go here
    });
    console.log('Type synced: ',Type === sequelize.models.Type); // true
    return Type
}