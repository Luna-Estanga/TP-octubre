-- crear base d datos
CREATE DATABASE IF EXISTS asistencia;
USE asistencia;

-- tabla de cursos
CREATE TABLE IF NOT EXISTS cursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

-- tabla de alumnos
CREATE TABLE IF NOT EXISTS alumnos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  curso_id INT,
  FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

-- tabla de asistencias
CREATE TABLE IF NOT EXISTS asistencias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  alumno_id INT,
  tipo ENUM('A','P','T','RA','AP'),
  hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha DATE DEFAULT (CURRENT_DATE),
  FOREIGN KEY (alumno_id) REFERENCES alumnos(id)
);
