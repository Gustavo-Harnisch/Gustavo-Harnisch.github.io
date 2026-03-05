# react-web (React + Vite)

Código fuente del sitio que se publica en `https://gustavo-harnisch.github.io/`.

## Requisitos

- Node.js + npm

## Comandos

- `npm install` (primera vez)
- `npm run dev` (modo desarrollo)
- `npm run build` (genera `dist/`)
- `npm run preview` (previsualizar build)

## Deploy a GitHub Pages (este repo)

Este repositorio publica la página desde la raíz (por eso existe `index.html` + `assets/` en `/`).

Flujo recomendado:
1. Construir con `npm run build`.
2. Copiar el contenido de `react-web/dist/` a la raíz del repo (sobrescribiendo `index.html` y `assets/`).

Nota: `node_modules/` no se versiona.
