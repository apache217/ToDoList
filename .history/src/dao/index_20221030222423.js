const MongoClient = require('mongodb').MongoClient;

const index = {
    async getConnection() {
        return MongoClient.connect(process.env.MONGO_CONNECTION_STRING);
    },
    useDefaultDb(connection) {
        return connection.db(process.env.MONGO_DB_NAME);
    }
};

module.exports = index;
