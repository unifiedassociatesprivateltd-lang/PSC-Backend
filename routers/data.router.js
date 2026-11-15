import express from "express";
import {
  addNewStudentData,
  checkAuth,
  deleteStudentData,
  getAllStudentsData,
  getSingleStudentData,
} from "../controllers/data.controllers.js";

const dataRouter = express.Router();
dataRouter.get("/data", getAllStudentsData);
dataRouter.get("/data/:roll", getSingleStudentData);
dataRouter.post("/data", addNewStudentData);
dataRouter.delete("/data/:roll", deleteStudentData);
dataRouter.post("/check-auth", checkAuth)
export default dataRouter;
