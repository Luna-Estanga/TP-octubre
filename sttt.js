import express from "express";
import Student from "../models/student.js";

const router = express.Router();


router.get("/", async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
});


router.post("/", async (req, res) => {
  const { dni, nombre, apellido } = req.body;
  const student = await Student.create({ dni, nombre, apellido });
  res.json(student);
});


router.put("/:id", async (req, res) => {
  const { estado } = req.body;
  const student = await Student.findByPk(req.params.id);
  student.estado = estado;
  await student.save();
  res.json(student);
});

export default router;
