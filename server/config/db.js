const { MongoClient } = require("mongodb");

let db = (async () => {
  const uri = process.env.MONGO_URI || "mongodb+srv://user:27OzsIEhfiD34MYI@cluster0.xga7u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
