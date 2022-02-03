module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        // allowNull defaults to true
        firstName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        userName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
        type: Sequelize.STRING,
        allowNull: false
        },
        role: {
          type: Sequelize.STRING,
          allowNull: false
        }
      }, {
        // Other model options go here
      });
    console.log('User synced: ',User === sequelize.models.User); // true
    return User
}
