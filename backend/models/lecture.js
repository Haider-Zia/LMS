const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Lecture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate({ Person, Class }) {
      // define association here
      this.belongsTo(Person, { foreignKey: "teacher_id" });
      this.belongsTo(Class, { foreignKey: "class_id" });
    }
  }
  Lecture.init(
    {
      lecture_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        onDelete: "cascade",
        references: {
          model: "Person",
          key: "person_id",
        },
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        onDelete: "cascade",
        references: {
          model: "Class",
          key: "class_id",
        },
      },
      lecture_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "Lecture name must not be empty" } },
      },
      lecture_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "Lecture URL must not be empty" } },
      },
    },
    {
      sequelize,
      modelName: "Lecture",
    }
  );
  return Lecture;
};
