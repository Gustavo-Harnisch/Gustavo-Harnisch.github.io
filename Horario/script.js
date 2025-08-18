// script.js — vista por columnas (días) usando <div>, responsive para móvil.
// Requiere un contenedor <div id="horario"></div> en el HTML.
// Lee un CSV con cabeceras: Hora;Lunes;Martes;Miércoles;Jueves;Viernes

function parseStartMinutes(rango) {
  // "HH:MM - HH:MM" -> minutos desde 00:00 del inicio
  const m = rango.match(/^\s*(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})\s*$/);
  if (!m) return Number.MAX_SAFE_INTEGER;
  const hh = parseInt(m[1], 10), mm = parseInt(m[2], 10);
  return hh * 60 + mm;
}

async function cargarHorarioPorDias() {
  const root = document.getElementById("horario");
  root.innerHTML = ""; // limpiar

  try {
    const res = await fetch("horario.csv", { cache: "no-store" });
    if (!res.ok) throw new Error("No se pudo cargar horario.csv");
    const texto = await res.text();

    const filas = texto.trim().split(/\r?\n/);
    if (filas.length < 2) throw new Error("CSV vacío o sin cabeceras");

    const cab = filas[0].split(";").map(s => s.trim());
    const dias = cab.slice(1); // [Lunes, Martes, Miércoles, Jueves, Viernes]

    // Acumula por día
    const porDia = Object.fromEntries(dias.map(d => [d, []]));

    for (let i = 1; i < filas.length; i++) {
      if (!filas[i].trim()) continue;
      const cols = filas[i].split(";").map(s => s.replace(/^"(.*)"$/, "$1").trim());
      while (cols.length < 6) cols.push("");

      const hora = cols[0];
      const startMin = parseStartMinutes(hora);
      for (let d = 1; d <= 5; d++) {
        const textoClase = cols[d];
        if (!textoClase) continue;
        porDia[dias[d - 1]].push({ hora, startMin, texto: textoClase });
      }
    }

    // Ordena cada día por hora de inicio
    for (const d of dias) {
      porDia[d].sort((a, b) => a.startMin - b.startMin);
    }

    // Construye layout de 5 columnas
    const grid = document.createElement("div");
    grid.className = "horario-grid";

    dias.forEach(dia => {
      const col = document.createElement("section");
      col.className = "dia-col";

      const h2 = document.createElement("h2");
      h2.className = "dia-titulo";
      h2.textContent = dia;
      col.appendChild(h2);

      if (porDia[dia].length === 0) {
        const empty = document.createElement("p");
        empty.className = "dia-vacio";
        empty.textContent = "—";
        col.appendChild(empty);
      } else {
        porDia[dia].forEach(({hora, texto}) => {
          const card = document.createElement("div");
          card.className = "clase";

          const title = document.createElement("h3");
          title.textContent = texto;
          card.appendChild(title);

          const meta = document.createElement("p");
          meta.className = "clase-meta";
          meta.textContent = hora;
          card.appendChild(meta);

          col.appendChild(card);
        });
      }

      grid.appendChild(col);
    });

    root.appendChild(grid);
  } catch (e) {
    console.error(e);
    const p = document.createElement("p");
    p.textContent = "No se pudo cargar el horario. Verifica el CSV (cabeceras y separador ;).";
    root.appendChild(p);
  }
}

document.addEventListener("DOMContentLoaded", cargarHorarioPorDias);