// script.js — versión adaptada para el nuevo CSV (Hora;Lunes;Martes;Miércoles;Jueves;Viernes)
// Renderiza una tarjeta (.clase) por cada celda no vacía con su día y franja horaria.

async function cargarHorario() {
  const cont = document.getElementById("horario");
  cont.innerHTML = ""; // limpia

  try {
    const res = await fetch("horario.csv", { cache: "no-store" });
    if (!res.ok) throw new Error("No se pudo cargar horario.csv");

    const texto = await res.text();
    const filas = texto.trim().split(/\r?\n/);

    if (filas.length < 2) throw new Error("El CSV no tiene contenido");

    // Cabecera esperada: Hora;Lunes;Martes;Miércoles;Jueves;Viernes
    const cab = filas[0].split(";").map(s => s.trim());
    const dias = cab.slice(1); // [Lunes, Martes, Miércoles, Jueves, Viernes]

    for (let i = 1; i < filas.length; i++) {
      if (!filas[i].trim()) continue;
      const cols = filas[i].split(";").map(s => s.replace(/^"(.*)"$/, "$1").trim());

      // Asegura longitud 6 columnas
      while (cols.length < 6) cols.push("");

      const hora = cols[0];
      for (let d = 1; d <= 5; d++) {
        const textoClase = cols[d];
        if (!textoClase) continue;

        // Crea tarjeta
        const card = document.createElement("article");
        card.className = "clase";

        const h3 = document.createElement("h3");
        h3.textContent = textoClase;
        card.appendChild(h3);

        const info = document.createElement("p");
        info.textContent = `${dias[d - 1]} • ${hora}`;
        info.style.margin = "0";
        info.style.opacity = "0.85";
        card.appendChild(info);

        cont.appendChild(card);
      }
    }
  } catch (err) {
    console.error(err);
    const msg = document.createElement("p");
    msg.textContent = "No se pudo cargar el horario. Revisa el formato del CSV o el nombre del archivo.";
    cont.appendChild(msg);
  }
}

// Ejecuta al cargar la página
document.addEventListener("DOMContentLoaded", cargarHorario);