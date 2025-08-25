// script.js — horario por columnas (días) con datos como *strings*
// Requiere un contenedor <div id="horario"></div> en el HTML.
// Lee un CSV separado por ';' cuya primera columna es "Hora" y el resto son días
// (p. ej., Lunes;Martes;Miércoles;Jueves;Viernes;Sabado).
// No hace conversiones numéricas: todo se maneja como texto para simplificar el DOM.

async function cargarHorarioPorDias() {
  const root = document.getElementById("horario");
  if (!root) return;
  root.innerHTML = ""; // limpiar

  try {
    // 1) Cargar CSV como texto
    const res = await fetch("data/horario.csv", { cache: "no-store" });
    if (!res.ok) throw new Error("No se pudo cargar horario.csv");
    const csvText = await res.text();

    // 2) Parsear CSV (separador ';') SIN convertir a números
    //    - Mantiene espacios internos; recorta bordes para DOM limpio.
    const lines = csvText
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(l => l.length > 0);

    if (lines.length === 0) {
      root.textContent = "El CSV está vacío.";
      return;
    }

    const header = lines[0].split(";").map(h => h.trim());
    if (header.length < 2 || header[0].toLowerCase() !== "hora") {
      root.textContent = "Cabecera inválida. La primera columna debe llamarse 'Hora'.";
      return;
    }

    const dayHeaders = header.slice(1); // días dinámicos según CSV

    // 3) Convertir filas a una matriz de celdas string
    const rows = lines.slice(1).map(line => line.split(";").map(c => c.trim()));

    // 4) Crear grilla: una columna por día
    const grid = document.createElement("div");
    grid.className = "horario-grid";
    grid.style.display = "grid";
    grid.style.gap = "1rem";
    grid.style.gridTemplateColumns = `repeat(${dayHeaders.length}, minmax(180px, 1fr))`;

    // 5) Por cada día, construir su columna con tarjetas .slot
    dayHeaders.forEach((dayName, dayIdx) => {
      const col = document.createElement("div");
      col.className = "dia-col";

      const h2 = document.createElement("h2");
      h2.textContent = dayName; // usar el texto tal cual viene del CSV
      col.appendChild(h2);

      rows.forEach(cells => {
        const hora = (cells[0] ?? "").trim(); // texto tal cual
        const contenido = (cells[dayIdx + 1] ?? "").trim();

        // Si hay contenido para este día/horario, creamos un bloque .slot
        if (contenido) {
          const slot = document.createElement("div");
          slot.className = "slot";

          const materiaEl = document.createElement("div");

          materiaEl.className = "materia";
          materiaEl.textContent = contenido; // string literal

          const horaEl = document.createElement("div");
          horaEl.className = "hora";
          horaEl.textContent = hora; // NO se parsea, se deja como string

          
          slot.appendChild(materiaEl);
          slot.appendChild(horaEl);
          
          col.appendChild(slot);
        }
      });

      grid.appendChild(col);
    });

    root.appendChild(grid);
  } catch (err) {
    console.error(err);
    const p = document.createElement("p");
    p.textContent = "No se pudo cargar el horario. Verifica el CSV (cabeceras y separador ';').";
    root.appendChild(p);
  }
}

document.addEventListener("DOMContentLoaded", cargarHorarioPorDias);
