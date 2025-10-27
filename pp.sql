-- crear base d datos
CREATE DATABASE asistencia;
USE asistencia;

-- Tbla e cursos
CREATE TABLE cursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

-- tbla de alumnos
CREATE TABLE alumnos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  curso_id INT,
  FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

-- asistencias
CREATE TABLE asistencias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  alumno_id INT,
  tipo ENUM('A','P','T','RA','AP'),
  hora TIME,
  fecha DATE DEFAULT (CURRENT_DATE),
  FOREIGN KEY (alumno_id) REFERENCES alumnos(id)
);

-- cursos
INSERT INTO cursos (nombre) VALUES 
('4°3 Computación'),
('4°4 Computación');

--  alumnos de 4°3 Computación
INSERT INTO alumnos (nombre, apellido, curso_id) VALUES
('Yasmin', 'Luna Estanga', 1),
('Santiago', 'Villarroel', 1),
('Aramis', 'Perez', 1),
('Fabricio', 'Jauregui', 1);

--  alumnos de 4°4 Computación
INSERT INTO alumnos (nombre, apellido, curso_id) VALUES
('Lucas', 'Brem', 2),
('Florencia', 'Gonzales', 2),
('Bruno', 'Zapico', 2),
('Ian', 'Gutierrez', 2);
