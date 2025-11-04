import express, { Router } from "express";
import { validate } from "../middleware/validationMiddleware";
import { createStudentValidation, studentUpdateValidation } from "../validations/studentValidation";
import { addStudent, deleteStudent, getStudentMarks, getStudents, updateStudent } from "../controllers/studentController";


const studentRoutes: Router = express.Router();

// ✅ POST → Add new student (validated)
studentRoutes.post("/", validate(createStudentValidation), addStudent);

// ✅ GET → Get all students
studentRoutes.get("/", getStudents);

// ✅ GET → Marks of a specific student
studentRoutes.get("/:id/marks", getStudentMarks);

// ✅ PATCH → Update student info
studentRoutes.patch("/:id", validate(studentUpdateValidation), updateStudent);

// ✅ DELETE → Delete student
studentRoutes.delete("/:id", deleteStudent);

export default studentRoutes;
