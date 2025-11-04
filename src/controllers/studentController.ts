import { Request, Response, NextFunction } from "express";
import Student, { IStudent } from "../models/Student";

// ✅ Add new student
export const addStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, marks, class: studentClass } = req.body;

    if (!name || marks == null || !studentClass) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const student: IStudent = await Student.create({
      name,
      marks,
      class: studentClass,
    });

    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

// ✅ Get all students (with optional class filter)
export const getStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query: any = {};
    if (req.query.class) {
      query.class = req.query.class;
    }

    const students = await Student.find(query);
    res.json(students);
  } catch (err) {
    next(err);
  }
};

// ✅ Get specific student marks by ID
export const getStudentMarks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      res.status(400).json({ message: "Invalid student ID format" });
      return;
    }

    const student = await Student.findById(id);

    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.status(200).json({
      name: student.name,
      marks: student.marks,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// ✅ Update student info
export const updateStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.json(updatedStudent);
  } catch (err) {
    next(err);
  }
};

// ✅ Delete student
export const deleteStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    next(err);
  }
};
