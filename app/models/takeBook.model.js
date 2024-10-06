module.exports = (sequelize, DataTypes) => {
  const TakeBookHistory = sequelize.define(
    "TakeBookHistory",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      book_id: {
        type: DataTypes.UUID,
        references: {
          model: "Books",
          key: "id",
        },
      },
      borrowed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      returned_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { timestamps: true }
  );

  return TakeBookHistory;
};
