const mongoClient = require('mongodb').MongoClient;

class Mongo {
    constructor(url, db) {
        this.url = url;
        this.db = db;
    }

    setURL(url) {
        this.url = url;
    }

    setDB(db) {
        this.db = db;
    }

    async createConnection(callback) {
        try {
            const client = await mongoClient.connect(this.url, { useUnifiedTopology: true });
            if (callback) callback(null, client);
            return client
        } catch (err) {
            if (callback) callback(err, null);
            throw (err)
        }
    }

    async getDBClient(db, callback) {
        try {
            const client = await this.createConnection();
            const database = client.db(!!db ? db : this.db);
            if (callback) callback(null, database);
            return database;
        } catch (err) {
            if (callback) callback(err, null);
            throw (err);
        }
    }

    async getCollectionClient(collection, callback) {
        try {
            const db = await this.getDBClient();
            const clt = db.collection(collection);
            if (callback) callback(null, clt);
            return clt;
        } catch (err) {
            if (callback) callback(err, null);
            throw (err);
        }
    }

    async insertDocument(collection, data, callback) {
        try {
            const clt = await this.getCollectionClient(collection);
            let res;
            if (Array.isArray(data)) res = await clt.insertMany(data);
            else res = await clt.insertOne(data);
            if (callback) callback(null, res);
            return res;
        } catch (err) {
            if (callback) callback(err, null);
            throw (err);
        }
    }

    async findDocument(collection, filter, callback) {
        try {
            const clt = await this.getCollectionClient(collection);
            const res = await clt.find(filter).toArray();
            if (callback) callback(null, res);
            return res;
        } catch (err) {
            if (callback) callback(err, null);
            throw (err);
        }
    }

    async updateDocument(collection, filter, update, callback) {
        try {
            const clt = await this.getCollectionClient(collection);
            const res = await clt.updateMany(filter, update);
            if (callback) callback(null, res);
            return res;
        } catch (err) {
            if (callback) callback(err, null);
            throw (err);
        }
    }

    async deleteDocument(collection, filter, callback) {
        try {
            const clt = await this.getCollectionClient(collection);
            const res = await clt.deleteMany(filter);
            if (callback) callback(null, res);
            return res;
        } catch (err) {
            if (callback) callback(err, null);
            throw (err);
        }
    }
}

module.exports = Mongo;