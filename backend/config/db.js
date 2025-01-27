import mongoose from "mongoose";

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
