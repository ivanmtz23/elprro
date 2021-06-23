import { MongoClient } from 'mongodb';
import { _config } from '../config';

export class Mongo {
    constructor() {
        this.dbName = _config.mongoDbName;
        this.dbUser = _config.mongoDbUser;
        this.dbPass = _config.MongoDbPass;
        this.dbCluster = _config.MongoDbCluster
        this.uri = `mongodb+srv://${this.dbUser}:${this.dbPass}@${this.dbCluster}/${this.dbName}?retryWrites=true&w=majority`;
        this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    connect() {
        if (!Mongo.connection) {
            Mongo.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        reject(err);
                    }
                    console.log('Connected succesfully to mongo');
                    resolve(this.client.db(this.dbName));
                });
            });
        }

        return Mongo.connection;
    }

    get(collection, query) {
        return this.connect().then(db => {
            return db
                .collection(collection)
                .find(query)
                .toArray();
        });
    }

    getById(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id) });
        });
    }

    insert(collection, data) {
        return this.connect()
            .then(db => {
                return db.collection(collection).insertOne(data);
            })
            .then(result => result.insertedId)
    }

    update(collection, id, data) {
        return this.connect()
            .then(db => {
                return db
                    .collection(collection)
                    .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
            })
            .then(result => result.upsertedId || id);
    }

    delete(collection, id) {
        return this.connect()
            .then(db => {
                return db.collection(collection).deleteOne({ _id: ObjectId(id) });
            })
            .then(() => id);
    }

}