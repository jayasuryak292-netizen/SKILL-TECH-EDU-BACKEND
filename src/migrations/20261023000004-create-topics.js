
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("topics", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
   subject_id: {
  type: Sequelize.INTEGER.UNSIGNED,
  allowNull: false,
  references: {
    model: "subjects",
    key: "id"
  },
  onUpdate: "CASCADE",
  onDelete: "CASCADE"
},
      title: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING(220),
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT("long"),
        allowNull: false
      },
      flowchart: {
        type: Sequelize.TEXT("long"),
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM("draft", "review", "published"),
        allowNull: false,
        defaultValue: "draft"
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.addIndex("topics", ["subject_id", "slug"], {
      unique: true,
      name: "topics_subject_id_slug_unique"
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("topics");
  }
};
