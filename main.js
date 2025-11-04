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
        .catch(err => console.error(err.stack));
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

function cargarAlumnos(cursoId) {
  fetch(`http://localhost:3000/api/alumnos/${cursoId}`)
      .then(res => res.json())
      .then(data => {
          const select = document.querySelector('#alumnos');
          select.innerHTML = '<option value="">Seleccione un alumno</option>';
          for (let alumno of data) {
              const option = document.createElement('option');
              option.textContent = `${alumno.apellido}, ${alumno.nombre}`;
              option.value = alumno.id;
              select.append(option);
          }
      });
}


const alumnos = [
    // 4°3
    { id: 1, nombre: 'Luna', apellido: 'Estanga', curso: '4°3' },
    { id: 2, nombre: 'Santiago', apellido: 'Villarroel', curso: '4°3' },
    { id: 3, nombre: 'Aramis', apellido: 'Hurtado', curso: '4°3' },
    { id: 4, nombre: 'Fabrizio', apellido: 'Jauregui', curso: '4°3' },
    { id: 5, nombre: 'Lucas', apellido: 'Brem', curso: '4°3' },
    { id: 6, nombre: 'Florencia', apellido: 'Gonzales', curso: '4°3' },
    { id: 7, nombre: 'Bruno', apellido: 'Zapico', curso: '4°3' },
    { id: 8, nombre: 'Ian', apellido: 'Gutierrez', curso: '4°3' }
];

function cargarMaterias(event) {
    const curso = event.target.value;
    const alumnosFiltrados = alumnos.filter(a => a.curso === curso);
    mostrarAlumnos(alumnosFiltrados); 
}

const cursoSeleccionado = document.getElementById("cursos").value;
const alumnosFiltrados = alumnos.filter(a => a.curso === cursoSeleccionado);

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
          <button class="P" onclick="marcar(this, 'P')">P</button>
          <button class="T" onclick="marcar(this, 'T')">T</button>
          <button class="A" onclick="marcar(this, 'A')">A</button>
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

    crearListaConBotones();
  }
  
  function crearListaConBotones() {
    const materiaId = document.querySelector('#materias').value;
    const cursoId = document.querySelector('#cursos').value;
    if (!materiaId || !cursoId) return;
    fetch(`http://localhost:3000/api/alumnos/${cursoId}`)
      .then(res => res.json())
      .then(alumnos => {
        const contenedor = document.querySelector('#lista-alumnos');
        contenedor.innerHTML = ''; 
        for (let alumno of alumnos) {
          const fila = document.createElement('div');
          fila.className = 'fila-alumno';
          const nombre = document.createElement('span');
          nombre.textContent = `${alumno.apellido}, ${alumno.nombre}`;
          nombre.className = 'nombre-alumno';
          const botones = document.createElement('div');
          botones.className = 'botones-asistencia';
          const tipos = ['Presente', 'Ausente', 'Tarde', 'Retiro Anticipado'];
          for (let tipo of tipos) {
            const boton = document.createElement('button');
            boton.textContent = tipo;
            boton.className = 'btn-asistencia';
            boton.addEventListener('click', () => {
              enviarAsistencia(tipo, alumno.id, materiaId);
            });
            botones.appendChild(boton);
          }
  
          fila.appendChild(nombre);
          fila.appendChild(botones);
          contenedor.appendChild(fila);
        }
      })
      .catch(err => console.error('Error al cargar los alumnos:', err));
  }
  
  function enviarAsistencia(tipo, alumnoId, materiaId) {
    const datos = { tipo, alumno: alumnoId, materia: materiaId };
    const options = {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('http://localhost:3000/api/asistencias', options)
      .then(res => res.json())
      .then(data => alert(JSON.stringify(data, null, 2)))
      .catch(err => alert('Error: ' + err.message));
  }
  
window.onload = crearListaConBotones;

  boton.parentElement.querySelectorAll('button').forEach(b => b.style.opacity = '0.4');
  boton.style.opacity = '1';

window.onload = cargarLista;


