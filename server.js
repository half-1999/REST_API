const app = require("./app");
const dotenv = require("dotenv");

const connectToDatabase = require("./config/database");

dotenv.config({ path: "./config/config.env" });

connectToDatabase();

// Routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/leadRoutes"));
app.use("/api/mentor", require("./routes/mentorRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
