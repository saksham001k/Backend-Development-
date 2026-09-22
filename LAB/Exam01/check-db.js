require("dotenv").config();
const { MongoClient } = require("mongodb");

async function checkConnection() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log("MONGODB_URI is missing from .env");
    return;
  }

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000
  });

  try {
    await client.connect();

    const database = client.db(process.env.DB_NAME || "notes_lab");
    await database.command({ ping: 1 });

    console.log("MongoDB connected successfully");
    console.log("Database:", database.databaseName);
  } catch (error) {
    console.error("Connection failed:", error.message);
  } finally {
    await client.close();
  }
}

checkConnection();