module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('Category', {
        // Model attributes are defined here
        // allowNull defaults to true
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        // Other model options go here
    });
    console.log('Category synced: ',Category === sequelize.models.Category); // true
    return Category
}