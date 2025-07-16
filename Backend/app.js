const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");
const studentRoutes = require("./routes/student.route");
connectToDb();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/students", studentRoutes);

app.get('/api/user', async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret'); // Token verify karein
        const user = await User.findById(decoded.id); // User data fetch karein
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = app;
