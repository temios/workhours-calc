/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('report', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date_created: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: sequelize.DATE
    },
    date_updated: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: sequelize.DATE
    }
  }, {
    tableName: 'report',
    timestamps: false
  })
}
