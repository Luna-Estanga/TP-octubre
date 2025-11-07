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
let registros = [];
const alumnos = [
    //  '4°3' alumnbiriroersjnasdnaisd lloro
    { id: 1, nombre: 'Luna', apellido: 'Estanga', curso: '4°3' }, 
    { id: 2, nombre: 'Santiago', apellido: 'Villarroel', curso: '4°3' },
    { id: 3, nombre: 'Aramis', apellido: 'Hurtado', curso: '4°3' },
    { id: 4, nombre: 'Fabrizio', apellido: 'Jauregui', curso: '4°3' },
    { id: 5, nombre: 'Lucas', apellido: 'Brem', curso: '4°3' },
    { id: 6, nombre: 'Florencia', apellido: 'Gonzales', curso: '4°3' },
    { id: 7, nombre: 'Bruno', apellido: 'Zapico', curso: '4°3' },
    { id: 8, nombre: 'Ian', apellido: 'Gutierrez', curso: '4°3' },
    
    // '4°4' aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaayuda quiero tomar coca
    { id: 9, nombre: 'Micaela', apellido: 'Gómez', curso: '4°4' }, 
    { id: 10, nombre: 'Elias', apellido: 'Pereyra', curso: '4°4' },
];
function cargarLista(e) {
    const materiaSeleccionada = e.target.value;
    console.log("Materia seleccionada:", materiaSeleccionada);
    registros = []; 
    mostrarRegistros(); 
    const selectCurso = document.querySelector('.cursos');
    if (selectCurso && selectCurso.value) {
        cargarAlumnos(selectCurso.value);
    }
}
function manejarCambioCurso(event) {
    const cursoSeleccionado = event.target.value;
    registros = [];
    mostrarRegistros(); 
    
    if (!cursoSeleccionado) {
        document.getElementById("tabla-alumnos").innerHTML = "";
        return;
    }
    cargarAlumnos(cursoSeleccionado);
}
function manejarCambioCurso(event) {
    const cursoSeleccionado = event.target.value;
    if (!cursoSeleccionado) {
        document.getElementById("tabla-alumnos").innerHTML = "";
        return;
    }
    cargarAlumnos(cursoSeleccionado);
}
function cargarAlumnos(cursoFiltro) {
    const tbody = document.getElementById("tabla-alumnos");
    if (!tbody) return;
    const alumnosFiltrados = alumnos.filter(a => a.curso === cursoFiltro);
    if (!cursoFiltro) {
        tbody.innerHTML = "";
        return;
    }
    tbody.innerHTML = ""; 
    alumnosFiltrados.forEach((a) => {
        const registroActual = registros.find(r => r.id === a.id);
        const tipoActual = registroActual ? registroActual.tipo : '';
        const getOpacity = (tipoBoton) => { 
            if (registroActual && registroActual.tipo === tipoBoton) {
                return '1';
            }
            if (registroActual && registroActual.tipo !== tipoBoton) {
                return '0.4';
            }
            return '1'; 
        };
        
        tbody.innerHTML += `
            <tr data-alumno-id="${a.id}">
                <td>${a.id}</td>
                <td>${a.apellido}</td>
                <td>${a.nombre}</td>
                <td class="acciones"> 
                    <button class="btn p-btn" 
                        onclick="registrarAsistencia(${a.id}, 'P', this)" 
                        style="opacity: ${getOpacity('P')}">P</button>
                    <button class="btn t-btn" 
                        onclick="registrarAsistencia(${a.id}, 'T', this)" 
                        style="opacity: ${getOpacity('T')}">T</button>
                    <button class="btn a-btn" 
                        onclick="registrarAsistencia(${a.id}, 'A', this)" 
                        style="opacity: ${getOpacity('A')}">A</button>
                    <button class="btn ra-btn" 
                        onclick="registrarAsistencia(${a.id}, 'RA', this)" 
                        style="opacity: ${getOpacity('RA')}">RA</button>
                    <button class="btn ap-btn" 
                        onclick="registrarAsistencia(${a.id}, 'AP', this)" 
                        style="opacity: ${getOpacity('AP')}">AP</button>
                </td>
            </tr>
        `;
    });
}
function registrarAsistencia(id, tipo, boton) {
    const alumno = alumnos.find(a => a.id === id);
    if (!alumno) return;
    const botones = boton.parentElement.querySelectorAll('button');
    botones.forEach(b => b.style.opacity = '0.4');
    boton.style.opacity = '1';
    const existente = registros.find(r => r.id === id);

    if (existente) {
        existente.tipo = tipo; 
    } else {
        registros.push({
            id: alumno.id,
            apellido: alumno.apellido,
            nombre: alumno.nombre,
            tipo: tipo,
            horaIngreso: "",
            horaEgreso: ""
        });
    }
    mostrarRegistros();
}
function mostrarRegistros() {
    const tbody = document.getElementById("tabla-registro");
    tbody.innerHTML = ""; 

    registros.forEach((r, i) => {
        tbody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${r.apellido}</td>
                <td>${r.nombre}</td>
                <td>${r.tipo}</td>
                <td><input type="time" value="${r.horaIngreso}" onchange="cambiarHora(${r.id}, this.value, 'ingreso')"></td>
                <td><input type="time" value="${r.horaEgreso}" onchange="cambiarHora(${r.id}, this.value, 'egreso')"></td>
                <td class="acciones">
                    <button class="btn e-btn" onclick="editarRegistro(${r.id})">E</button>
                    <button class="btn x-btn" onclick="eliminarRegistro(${r.id})">X</button>
                </td>
            </tr>
        `;
    });
}

function cambiarHora(id, valor, tipo) {
    const registro = registros.find(r => r.id === id);
    if (!registro) return;
    if (tipo === "ingreso") registro.horaIngreso = valor;
    if (tipo === "egreso") registro.horaEgreso = valor;
}

function eliminarRegistro(id) {
    registros = registros.filter(r => r.id !== id);
    cargarAlumnos(document.querySelector('.cursos').value); 
    mostrarRegistros();
}

function editarRegistro(id) {
    alert("Editar registro de ID: " + id + ". Implementa tu lógica de edición aquí.");
}
window.onload = () => {
    const tablaAlumnos = document.getElementById("tabla-alumnos");
    if (tablaAlumnos) tablaAlumnos.innerHTML = "";
};
