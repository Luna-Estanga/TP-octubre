function cargarCursos() {
    fetch('http://localhost:3000/api/cursos')
        .then(res => res.json())
        .then(data => {
            const select = document.querySelector('#cursos');
            select.innerHTML = '';
            for (let curso of data) {
                const option = document.createElement('option');
                const { anio, division, esp } = curso;
                option.textContent = `${anio} ${division} ${esp}`;
                option.value = curso.id;
                select.append(option);
            }
        })
        .catch(err => alert(err.stack));
}


cargarCursos();

function cargarMaterias(e) {
    const cursoId = e.target.value;
    fetch('http://localhost:3000/api/materias/' + cursoId)
        .then(res => res.json())
        .then(data => {
            const select = document.querySelector('#materias');
            select.innerHTML = '';
            for (let materia of data) {
                const option = document.createElement('option');
                option.textContent = materia.nombre;
                select.append(option);
            }
        });
}


function cargarAlumnos(e) {
    e.preventDefault();
    let lista = e.target.lista.value.split('\n');
    let data = [];
    for (let elem of lista) {
        let alumno = {};
        alumno.nombres = elem.split(' ')[0];
        alumno.apellidos = elem.split(' ')[1];
        alumno.curso = e.target.curso.value;
        data.push(alumno);
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    fetch('http://localhost:3000/api/alumnos', options);
    e.target.reset();
}

const alumnos = [
  { id: 1, nombre: 'Luna', apellido: 'Estanga' },
  { id: 2, nombre: 'Santiago', apellido: 'Villarroel' },
  { id: 3, nombre: 'Aramis', apellido: 'Hurtado' },
  { id: 4, nombre: 'Fabrizio', apellido: 'Jauregui' }
];

function cargarLista() {
  const tbody = document.getElementById('tabla-alumnos');
  tbody.innerHTML = '';

  alumnos.forEach(al => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${al.id}</td>
      <td>${al.apellido}</td>
      <td>${al.nombre}</td>
      <td>
        <button class="A" onclick="marcar(this, 'A')">A</button>
        <button class="P" onclick="marcar(this, 'P')">P</button>
        <button class="T" onclick="marcar(this, 'T')">T</button>
        <button class="RA" onclick="marcar(this, 'RA')">RA</button>
        <button class="AP" onclick="marcar(this, 'AP')">AP</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function marcar(boton, tipo) {
  const fila = boton.closest('tr');
  const nombre = fila.children[2].textContent;
  console.log(`Alumno ${nombre} marcado como ${tipo}`);
  boton.parentElement.querySelectorAll('button').forEach(b => b.style.opacity = '0.4');
  boton.style.opacity = '1';
}

function changeDate(event) {
  console.log('Fecha seleccionada:', event.target.value);
}
function marcar(boton, tipo) {
  const fila = boton.closest('tr');
  const nombre = fila.children[2].textContent;

  console.log(`Alumno ${nombre} marcado como ${tipo}`);

  // Cambiar opacidad
  boton.parentElement.querySelectorAll('button').forEach(b => b.style.opacity = '0.4');
  boton.style.opacity = '1';
}
// Cargar lista al inicio
window.onload = cargarLista;
