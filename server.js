const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// cnexión con la base de datos MySQL
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tp'
});
app.post('/api/alumnos', (req, res) => {
    const { nombres, apellidos, curso } = req.body;
    const insert = `
        INSERT INTO alumnos (nombres, apellidos, curso)
        VALUES (?, ?, ?)
    `;
    conn.query(insert, [nombres, apellidos, curso], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ msg: 'Alumno registrado correctamente' });
    });
})
// obtener asistencias por materia y fecha
app.get('/api/asistencias/:materia/:fecha', (req, res) => {
    const params = [req.params.materia, req.params.fecha];
    const q = `
        SELECT a.apellidos, a.nombres, tipo, TIME(creado) AS creado
        FROM registros r
        JOIN alumnos a ON a.id = r.alumno
        WHERE materia = ? AND DATE(creado) = ?
    `;
    
    conn.query(q, params, (err, rs) => {
        if (err) return res.status(500).json({ error: err });
        let i = 1;
        for (let r of rs) {
            r.orden = i++;
        }
        res.status(200).json(rs);
    });
});

// POST: registrar una nueva asistencia
app.post('/api/asistencias', (req, res) => {
    const { tipo, alumno, materia } = req.body;

    const check = `
        SELECT * FROM registros 
        WHERE alumno = ? AND materia = ? 
        AND DATE(creado) = CURDATE()
    `;
    conn.query(check, [alumno, materia], (err, rs) => {
        if (err) return res.status(500).json({ error: err });
        if (rs.length > 0)
            return res.status(400).json({ msg: 'No se puede registrar dos veces el mismo día' });

        const insert = `
            INSERT INTO registros (tipo, alumno, materia)
            VALUES (?, ?, ?)
        `;
        conn.query(insert, [tipo, alumno, materia], (err2) => {
            if (err2) return res.status(500).json({ error: err2 });
            res.status(201).json({ msg: 'Asistencia registrada correctamente' });
        });
    });
});

// Iniciar servidor
app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
