const { getConnection, useDefaultDb } = require("./index");

const COLLECTION = "todos";

const repository = {
  async getAll() {
    const connection = await getConnection();
    const db = useDefaultDb(connection);

    const data = await db
      .collection(COLLECTION)
      .find()
      // .aggregate([
      // { $match: { title: "Milk" } },
      // { $group: { _id: "$title", count: { $sum: "$age" } } },
      // { $group: { _id: "$title", count: { $avg: "$age" } } },
      // { $group: { _id: "$title", count: { $sum: 1 } } },
      // { $group: { _id: "$title", maxAge: { $max: "$age" } } },
      // { $sort: { title: -1} },
      // ])
      .toArray();

    connection.close();
    return data;
  },
  async add(task) {
    const connection = await getConnection();
    const db = useDefaultDb(connection);

    const res = await db.collection(COLLECTION).insertOne(task);

    connection.close();
    return res;
  },
  async editTask(taskId, newObj) {
    const connection = await getConnection();
    const db = useDefaultDb(connection);
    const res = await db.collection(COLLECTION).updateOne(
      { _id: taskId },
      {
        $set: newObj,
      }
    );
    connection.close();
    return res;
  },
  async removeTask(taskId) {
    const connection = await getConnection();
    const db = useDefaultDb(connection);

    const removeResult = await db
      .collection(COLLECTION)
      .deleteOne({ _id: taskId });

    connection.close();
    return removeResult;
  },
};

module.exports = repository;
