const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate({ Class, Lecture }) {
      // define association here
      this.hasMany(Class, {
        foreignKey: "teacher_id",
        onDelete: "cascade",
        hooks: true,
      });
      this.hasMany(Lecture, {
        foreignKey: "teacher_id",
        onDelete: "cascade",
        hooks: true,
      });
    }
  }
  Person.init(
    {
      person_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Email must not be empty" },
          isEmail: { msg: "Must be a valid email format" },
        },
      },
      pass: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "Password must not be empty" } },
      },
      person_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "Person type must not be empty" } },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: "Person",
      modelName: "Person",
    }
  );
  return Person;
};
