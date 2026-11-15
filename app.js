import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dataRouter from "./routers/data.router.js";
import path from "path";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000','http://localhost:8000', 'https://pscwbapplications.in'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

//Handle preflight requests
app.options('*', cors())

const __dirname = path.resolve();

app.use("/admin", dataRouter);
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
  })
  // To start the server
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
