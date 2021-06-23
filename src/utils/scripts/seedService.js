const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();



module.exports = class SeedService {

    constructor() {
        this.dbUser = process.env.MONGO_DB_USER;
        this.dbPass = process.env.MONGO_DB_PASS;
        this.dbName = process.env.MONGO_DB_NAME;
        this.dbCluster = process.env.MONGO_DB_CLUSTER;
        this.uri = `mongodb+srv://${this.dbUser}:${this.dbPass}@${this.dbCluster}/${this.dbName}?retryWrites=true&w=majority`;
        this.client = new MongoClient(this.uri, { useUnifiedTopology: true });
    }

    connect() {
        if (!SeedService.connection) {
            SeedService.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        reject(err);
                    }
                    console.log('Connected succesfully to mongo');
                    resolve(this.client.db(this.dbName));
                });
            });
        }

        return SeedService.connection;
    }

    insert(collection, data) {
        return this.connect()
            .then(db => {
                return db.collection(collection).insertOne(data);
            })
            .then(result => result.insertedId)
    }
}