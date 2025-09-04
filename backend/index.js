const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter');
const studentRouter = require('./routers/students');
const attendanceRouter = require('./routers/attendance');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Your React app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply the CORS middleware with your options
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api/auth', authRouter);
app.use('/api/student', studentRouter);
app.use('/api/attendance', attendanceRouter);

app.get('/', (req, res) => {
  res.json({message: "hello from the server"});
});

app.listen(process.env.PORT, () => {
  console.log('listening...');
});