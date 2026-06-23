# Gustavo Harnisch - Portfolio

Portafolio personal de Gustavo Harnisch, estudiante de Ingenieria Civil Informatica orientado al area de datos, Business Intelligence, SQL y bases de datos.

El sitio presenta perfil, proyectos y formas de contacto en una experiencia de una sola pagina construida con React, Vite y GitHub Pages. Tambien conserva proyectos estaticos publicados dentro del mismo dominio, como Horario y Pong.

## Sitio

[Abrir GitHub Pages](https://gustavo-harnisch.github.io/)

## Vista rapida

- Portafolio de una sola pagina para presentar perfil academico, enfoque de datos, proyectos e intereses tecnicos.
- Interfaz responsive con tema oscuro, navegacion superior y tarjetas de proyectos.
- Proyectos adicionales publicados como paginas estaticas dentro del mismo dominio.

## Contenido

- **Inicio:** presentacion principal con foco en datos y BI.
- **Sobre mi:** perfil, stack tecnologico y datos destacados.
- **Areas de interes:** Business Intelligence, SQL, modelado de datos, dashboards y bases de datos.
- **Proyectos:** accesos a trabajos publicados en el sitio.
- **Contacto:** enlaces a GitHub, GitHub Pages, email y LinkedIn.

## Proyectos incluidos

| Proyecto | Ruta | Descripcion |
| --- | --- | --- |
| Horario | [`/Horario/`](https://gustavo-harnisch.github.io/Horario/) | Horario universitario publicado como pagina estatica, con datos cargados desde CSV. |
| Pong | [`/pong/`](https://gustavo-harnisch.github.io/pong/) | Remake simple del clasico Pong usando canvas, HTML, CSS y JavaScript. |

## Tecnologias

- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Wouter
- Vite
- Express

## Desarrollo local

```bash
git clone https://github.com/Gustavo-Harnisch/Gustavo-Harnisch.github.io.git
cd Gustavo-Harnisch.github.io
pnpm install
pnpm dev
```

El servidor de desarrollo queda disponible normalmente en `http://localhost:3000/`.

## Scripts

| Comando | Uso |
| --- | --- |
| `pnpm dev` | Inicia Vite en modo desarrollo. |
| `pnpm check` | Revisa tipos con TypeScript. |
| `pnpm build` | Genera el build de produccion. |
| `pnpm preview` | Sirve una vista previa del build frontend. |
| `pnpm start` | Ejecuta el servidor Express sobre `dist/`. |

## Estructura

```text
.
|-- client/              # Aplicacion React
|   `-- src/
|       |-- pages/       # Home y NotFound
|       |-- components/  # Componentes reutilizables
|       |-- contexts/    # Configuracion de tema
|       `-- index.css    # Estilos globales
|-- server/              # Servidor Express para produccion
|-- shared/              # Codigo compartido
|-- Horario/             # Pagina estatica publicada en /Horario/
|-- pong/                # Juego publicado en /pong/
`-- vite.config.ts       # Configuracion de build
```

## Build

```bash
pnpm check
pnpm build
```

El build queda en `dist/`. Durante la compilacion se copian tambien los proyectos `Horario` y `pong` al resultado final.

## Autor

**Gustavo Harnisch**  
Estudiante de Ingenieria Civil Informatica - UCM - Talca, Chile  
[GitHub](https://github.com/Gustavo-Harnisch)  
[LinkedIn](https://www.linkedin.com/in/gustavo-ivar-gallegos-harnisch/)  
[Email](mailto:gusharnisch2004@gmail.com)
