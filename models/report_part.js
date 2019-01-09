/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('report_part', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_report: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'report',
        key: 'id'
      }
    },
    id_part: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'part',
        key: 'id'
      }
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'report_part'
  });
};
