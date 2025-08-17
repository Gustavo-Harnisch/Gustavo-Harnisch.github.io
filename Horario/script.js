// --- Config rápida ---
const CSV_URL = "horario.csv";
const CONTAINER_ID = "horario";

// --- Helpers mínimos ---
const $ = (id) => document.getElementById(id);
const splitLine = (l) => l.split(",").map(s => s.trim());

// --- Lógica: leer CSV -> objetos -> pintar ---
async function cargarHorario() {
  const root = $(CONTAINER_ID);

  try {
    const res = await fetch(`${CSV_URL}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);

    const txt = await res.text();
    const filas = txt.trim().split(/\r?\n/);
    const sinCabecera = filas.slice(1); // asume 1ª línea = encabezado

    const items = sinCabecera
      .filter(Boolean)
      .map(splitLine)
      .map(([materia = "", dia = "", hora = ""]) => ({ materia, dia, hora }));

    if (!items.length) {
      root.innerHTML = `<p class="msg">No hay filas en el CSV.</p>`;
      return;
    }

    // Pintar
    const frag = document.createDocumentFragment();
    for (const it of items) {
      const card = document.createElement("article");
      card.className = "clase";
      card.innerHTML = `
        <h3>${it.materia || "Materia"}</h3>
        <p>${[it.dia, it.hora].filter(Boolean).join(" • ")}</p>
      `;
      frag.appendChild(card);
    }
    root.replaceChildren(frag);

  } catch (e) {
    console.error(e);
    $(CONTAINER_ID).innerHTML = `
      <p class="msg error">
        No se pudo cargar <b>horario.csv</b>. Abre con un <b>servidor local</b>
        (Live Server o <code>python -m http.server</code>).
      </p>`;
  }
}

document.addEventListener("DOMContentLoaded", cargarHorario);
