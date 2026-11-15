import fs from "fs";
import bcrypt from "bcrypt";

const hashedPassword = '$2a$10$/apkc7ldyIRVc25X.LO9ROWe6kOgyoHjsNFYk5lMJwDhmhVZfeTfC';

function ToLoadData() {
  const data = fs.readFileSync("Data/data.json", "utf-8");
  const dataObj = JSON.parse(data);
  return dataObj;
}
const ToSaveData = async (data) => {
  fs.writeFileSync("Data/data.json", JSON.stringify(data, null, 2));
};
export const getAllStudentsData = async (req, res) => {
  try {
    const dataObj = ToLoadData();
    res.status(200).json(dataObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSingleStudentData = async (req, res) => {
  const { roll } = req.params;
  try {
    const dataObj = ToLoadData();
    const studentData = dataObj.find((item) => item.roll === roll);
    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(studentData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addNewStudentData = async (req, res) => {
  const { roll, name, fatherName, dob, remarks, post } = req.body;
  try {
    const dataObj = ToLoadData();
    if (!roll || !name || !dob || !remarks || !post || !fatherName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (dataObj.find((item) => item.roll === roll)) {
      return res.status(400).json({ message: "Roll number already exists" });
    }
    const newStudent = {
      roll,
      name,
      fatherName,
      dob,
      remarks,
      post,
    };
    const newDataArray = [...dataObj, newStudent];
    ToSaveData(newDataArray);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteStudentData = async (req, res) => {
  const { roll } = req.params;
  try {
    const dataObj = ToLoadData();
    if (!roll) {
      return res.status(400).json({ message: "Roll number is required" });
    }
    if (!dataObj.find((item) => item.roll === roll)) {
      return res.status(404).json({ message: "Student not found" });
    }
    const newdataObj = dataObj.filter((item) => item.roll !== roll);
    ToSaveData(newdataObj);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const checkAuth=(req, res) => {
    const { password } = req.body;

    if (!password) {
      return res.status(400).send({status:false,message:'Password is required'});
    }

    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        return res.status(500).send({status:false,message:'Internal server error'});
      }
      if (result) {
        return res.status(200).send({status:true,message:'Authenticated'});
      } else {
        return res.status(401).send({status:false,message:'Unauthenticated'});
      }
    });
  };
