module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Classes", {
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
      },
      teacher_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      class_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Classes");
  },
};
