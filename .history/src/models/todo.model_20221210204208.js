import Sequelize, { STRING, BOOLEAN } from "sequelize";
const sequelize = new Sequelize("postgres::memory:");

const TodoSchema = sequelize.define("todo", {
  title: { type: STRING, allowNull: false },
  isCompleted: { type: BOOLEAN, allowNull: false },
  _idUser: { type: BOOLEAN, allowNull: false },
});

export default TodoSchema;
