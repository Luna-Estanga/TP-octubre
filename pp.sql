CREATE DATABASE tp;
USE tp;

CREATE TABLE cursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  anio INT,
  division VARCHAR(10),
  esp VARCHAR(50)
);

CREATE TABLE materias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  curso INT,
  FOREIGN KEY (curso) REFERENCES cursos(id)
);

CREATE TABLE alumnos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  curso INT,
  FOREIGN KEY (curso) REFERENCES cursos(id)
);

CREATE TABLE asistencias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  alumno INT,
  materia INT,
  tipo VARCHAR(5),
  fecha DATE DEFAULT (CURRENT_DATE),
  hora TIME DEFAULT (CURRENT_TIME),
  FOREIGN KEY (alumno) REFERENCES alumnos(id),
  FOREIGN KEY (materia) REFERENCES materias(id)
);
