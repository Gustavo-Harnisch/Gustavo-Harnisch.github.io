# Gustavo Harnisch - Portfolio

**Neobrutalist Code Lab** - Portafolio personal de Gustavo Harnisch, estudiante de Ingenieria Civil Informatica en la UCM.

Sitio web construido como una experiencia de una sola pagina, con navegacion lateral, animaciones suaves y una estetica tecnica inspirada en terminales, codigo y competencia algoritmica.

## Sitio

[Abrir GitHub Pages](https://gustavo-harnisch.github.io/)

## Vista rapida

- Portafolio de una sola pagina para presentar perfil academico, proyectos e intereses tecnicos.
- Interfaz responsive con tema oscuro, sidebar fija y navegacion por secciones.
- Proyectos adicionales publicados como paginas estaticas dentro del mismo dominio.

## Contenido

- **Inicio:** presentacion principal y enlaces rapidos.
- **Sobre mi:** perfil, stack tecnologico y datos destacados.
- **Areas de interes:** algoritmos, aprendizaje automatico y matematicas aplicadas.
- **Proyectos:** accesos a trabajos publicados en el sitio.
- **ICPC:** experiencia en competencia algoritmica representando a la UCM.
- **Contacto:** enlaces a GitHub y al repositorio.

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
