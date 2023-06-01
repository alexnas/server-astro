const sequelize = require('../config/db.config');
const { DataTypes } = require('sequelize');

const Person = sequelize.define('person', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: false, allowNull: false },
  surname: { type: DataTypes.STRING, unique: false, allowNull: false },
  birthday: { type: DataTypes.STRING, unique: false, allowNull: false },
  timezone: { type: DataTypes.INTEGER, unique: false, allowNull: false },
  birthplace: { type: DataTypes.STRING, unique: false, allowNull: false },
  description: { type: DataTypes.STRING },
});

const Zodiac = sequelize.define('zodiac', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sun: { type: DataTypes.STRING, unique: false, allowNull: false },
  moon: { type: DataTypes.STRING, unique: false, allowNull: false },
  mercury: { type: DataTypes.STRING, unique: false, allowNull: false },
  venus: { type: DataTypes.STRING, unique: false, allowNull: false },
  mars: { type: DataTypes.STRING, unique: false, allowNull: false },
  jupiter: { type: DataTypes.STRING, unique: false, allowNull: false },
  saturn: { type: DataTypes.STRING, unique: false, allowNull: false },
  uranus: { type: DataTypes.STRING, unique: false, allowNull: false },
  neptune: { type: DataTypes.STRING, unique: false, allowNull: false },
  pluto: { type: DataTypes.STRING, unique: false, allowNull: false },
  retro: { type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: [] },
  description: { type: DataTypes.STRING },
});

Person.hasOne(Zodiac, {
  foreignKey: 'personId',
});
Zodiac.belongsTo(Person, {
  foreignKey: 'personId',
});

module.exports = {
  Person,
  Zodiac,
};
