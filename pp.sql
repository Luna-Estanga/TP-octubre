CREATE TABLE alumnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(50),
    apellidos VARCHAR(50),
    curso VARCHAR(50)
);

CREATE TABLE registros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(20),
    alumno INT,
    materia VARCHAR(50),
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (alumno) REFERENCES alumnos(id)
);
