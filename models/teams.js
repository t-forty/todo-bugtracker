module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define('Team', {
        // Model attributes are defined here
        // allowNull defaults to true
        // foreign key = userID as member to team
        teamName: {
          type: Sequelize.STRING,
          allowNull: false
        }
      }, {
        // Other model options go here
      });
    console.log('Teams synced: ',Team === sequelize.models.Team); // true
    return Team
}
