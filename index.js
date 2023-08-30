const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://admin:admin@apidb.n5pdg5o.mongodb.net/api?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const subscribersRouter = require("./routes/subscribers");
app.use("/data", subscribersRouter);

const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.listen(3001, () => console.log("Server Started"));

export default app;
