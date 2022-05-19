const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate({ Person, Lecture }) {
      this.belongsTo(Person, { foreignKey: "teacher_id" });
      this.hasMany(Lecture, {
        foreignKey: "class_id",
        onDelete: "cascade",
        hooks: true,
      });
      // define association here
    }
  }
  Class.init(
    {
      class_id: {
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
      teacher_email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Person",
          key: "email",
        },
      },
      class_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "Class name must not be empty" } },
      },
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
