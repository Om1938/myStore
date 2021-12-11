const { MongoClient } = require("mongodb");

let db = (async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
  const dbName = process.env.DB_NAME || "myStore";

  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Conected to MongoDB");
    return client.db(dbName);
  } catch (err) {
    console.log("Unable to connect to mongo DB" + err);
  }
})();

module.exports = db;
