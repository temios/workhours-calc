/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('report', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date_created: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '(datetime(now,localtime))'
    },
    date_updated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '(datetime(now,localtime))'
    }
  }, {
    tableName: 'report'
  })
}
