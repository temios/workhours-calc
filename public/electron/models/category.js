/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'category',
    timestamps: false
  })
}
