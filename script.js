const ramos = [
  // Semestre 1
  { nombre: "Biología Celular", semestre: 1, requisitos: [] },
  { nombre: "Laboratorio de Biología Celular", semestre: 1, requisitos: [] },
  { nombre: "Química General", semestre: 1, requisitos: [] },
  { nombre: "Anatomía Humana", semestre: 1, requisitos: [] },
  { nombre: "Introducción a la Tecnología Médica", semestre: 1, requisitos: [] },
  { nombre: "Elementos de Álgebra y Cálculo", semestre: 1, requisitos: [] },

  // Semestre 2
  { nombre: "Histoembriología", semestre: 2, requisitos: ["Anatomía Humana", "Biología Celular"] },
  { nombre: "Física General", semestre: 2, requisitos: ["Elementos de Álgebra y Cálculo"] },
  { nombre: "Química Orgánica", semestre: 2, requisitos: ["Química General"] },
  { nombre: "Inglés I", semestre: 2, requisitos: [] },
  { nombre: "Habilidades Comunicativas", semestre: 2, requisitos: [] },

  // Semestre 3
  { nombre: "Fisiología Humana", semestre: 3, requisitos: ["Histoembriología"] },
  { nombre: "Bioética", semestre: 3, requisitos: ["Introducción a la Tecnología Médica"] },
  { nombre: "Bioquímica", semestre: 3, requisitos: ["Química Orgánica", "Biología Celular"] },
  { nombre: "Infectología", semestre: 3, requisitos: ["Laboratorio de Biología Celular"] },
  { nombre: "Inglés II", semestre: 3, requisitos: ["Inglés I"] },
  { nombre: "Razonamiento Científico y TICS", semestre: 3, requisitos: [] },

  // Semestre 4
  { nombre: "Fisiopatología", semestre: 4, requisitos: ["Fisiología Humana"] },
  { nombre: "Farmacología General", semestre: 4, requisitos: ["Bioquímica"] },
  { nombre: "Parasitología", semestre: 4, requisitos: ["ALL"] },
  { nombre: "Inmunología diagnóstica", semestre: 4, requisitos: ["ALL"] },
  { nombre: "Inglés III", semestre: 4, requisitos: ["Inglés II"] },

  // Semestre 5
  { nombre: "Procedimientos de Tecnología Médica y Bioseguridad", semestre: 5, requisitos: [] },
  { nombre: "Salud Pública I", semestre: 5, requisitos: [] },
  { nombre: "Microbiología I", semestre: 5, requisitos: ["ALL_S1_S2_S3"] },
  { nombre: "Hematología I", semestre: 5, requisitos: ["ALL_S1_S2_S3"] },
  { nombre: "Inglés IV", semestre: 5, requisitos: ["Inglés III"] },

  // Semestre 6
  { nombre: "Salud Pública II", semestre: 6, requisitos: ["Salud Pública I"] },
  { nombre: "Microbiología II", semestre: 6, requisitos: ["Microbiología I"] },
  { nombre: "Hematología II", semestre: 6, requisitos: ["Hematología I"] },
  { nombre: "Bioquímica Clínica I", semestre: 6, requisitos: ["ALL_S1_S2_S3"] },

  // Semestre 7
  { nombre: "Educación en Salud", semestre: 7, requisitos: [] },
  { nombre: "Administración y Gestión en Salud", semestre: 7, requisitos: [] },
  { nombre: "Biología Molecular", semestre: 7, requisitos: [] },
  { nombre: "Inmunohematología", semestre: 7, requisitos: [] },
  { nombre: "Bioquímica Clínica II", semestre: 7, requisitos: ["Bioquímica Clínica I"] },
  { nombre: "Integrador I: Caso Clínico BACIMET", semestre: 7, requisitos: ["ALL_S1_S2_S3"] },

  // Semestre 8
  { nombre: "Metodología de la Investigación", semestre: 8, requisitos: [] },
  { nombre: "Gestión y Aseguramiento de la Calidad", semestre: 8, requisitos: [] },
  { nombre: "Medicina Transfusional", semestre: 8, requisitos: ["ALL_S1_S2_S3"] },
  { nombre: "Diagnóstico Molecular Clínico", semestre: 8, requisitos: ["ALL_S1_S2_S3"] },
  { nombre: "Pensamiento Crítico", semestre: 8, requisitos: [] },

  // Semestre 9
  { nombre: "Responsabilidad Social", semestre: 9, requisitos: ["ALL"] },
  { nombre: "Seminario de Investigación BACIMET", semestre: 9, requisitos: ["ALL"] },

  // Semestre 10
  { nombre: "Integrador II: Internado Clínico BACIMET", semestre: 10, requisitos: ["ALL"] },
];

// Recuperar progreso
let completados = JSON.parse(localStorage.getItem("progresoRamos")) || [];

// Generar malla
const container = document.getElementById("malla");

for (let s = 1; s <= 10; s++) {
  const semestreDiv = document.createElement("div");
  semestreDiv.className = "semestre";
  semestreDiv.innerHTML = `<h2>Semestre ${s}</h2>`;

  ramos
    .filter(r => r.semestre === s)
    .forEach(ramo => {
      const divRamo = document.createElement("div");
      divRamo.className = "ramo";

      const btn = document.createElement("button");
      btn.textContent = ramo.nombre;

      if (completados.includes(ramo.nombre)) {
        btn.classList.add("completed");
      }

      btn.onclick = () => toggleRamo(ramo.nombre);

      divRamo.appendChild(btn);
      semestreDiv.appendChild(divRamo);
    });

  container.appendChild(semestreDiv);
}

function toggleRamo(nombre) {
  const index = completados.indexOf(nombre);
  if (index > -1) {
    completados.splice(index, 1);
  } else {
    completados.push(nombre);
  }
  localStorage.setItem("progresoRamos", JSON.stringify(completados));
  location.reload();
}

// Deshabilitar según requisitos
document.querySelectorAll(".ramo button").forEach(btn => {
  const ramo = ramos.find(r => r.nombre === btn.textContent);
  const requisitos = ramo.requisitos;

  let habilitado = true;

  requisitos.forEach(req => {
    if (req === "ALL") {
      if (completados.length < ramos.length - 1) habilitado = false;
    } else if (req.startsWith("ALL_S")) {
      const semestres = req.split("_")[1].split("").map(Number);
      semestres.forEach(s => {
        const delSemestre = ramos.filter(r => r.semestre === s).map(r => r.nombre);
        if (!delSemestre.every(n => completados.includes(n))) habilitado = false;
      });
    } else {
      if (!completados.includes(req)) habilitado = false;
    }
  });

  if (!habilitado && !btn.classList.contains("completed")) {
    btn.disabled = true;
  }
});
