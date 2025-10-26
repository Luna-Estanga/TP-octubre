const API_URL = "http://localhost:3000/api/students";

async function cargarAlumnos() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const tbody = document.querySelector("#tabla tbody");
  tbody.innerHTML = "";

  data.forEach(a => {
    tbody.innerHTML += `
      <tr>
        <td>${a.dni}</td>
        <td>${a.nombre}</td>
        <td>${a.apellido}</td>
        <td>${a.estado}</td>
        <td>
          <button onclick="actualizar(${a.id}, 'presente')">Presente</button>
          <button onclick="actualizar(${a.id}, 'tarde')">Tarde</button>
          <button onclick="actualizar(${a.id}, 'retiro')">Retiro</button>
        </td>
      </tr>`;
  });
}

async function actualizar(id, estado) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado })
  });
  cargarAlumnos();
}

document.querySelector("#formAlumno").addEventListener("submit", async e => {
  e.preventDefault();
  const dni = document.querySelector("#dni").value;
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dni, nombre, apellido })
  });

  e.target.reset();
  cargarAlumnos();
});

cargarAlumnos();
