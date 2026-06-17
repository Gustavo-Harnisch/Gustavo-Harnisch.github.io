# Gustavo Harnisch - Portfolio

**Neobrutalist Code Lab** - Portafolio personal de Gustavo Harnisch, estudiante de Ingenieria Civil Informatica en la UCM.

Sitio web construido como una experiencia de una sola pagina, con navegacion lateral, animaciones suaves y una estetica tecnica inspirada en terminales, codigo y competencia algoritmica.

## Diseno

- **Paleta:** azul noche profundo (`#0a0e1a`), cian electrico (`#00d4ff`) y violeta (`#7c3aed`)
- **Tipografia:** `Syne` para textos display y `JetBrains Mono` para bloques tecnicos
- **Animaciones:** efecto typewriter en el hero, aparicion progresiva de secciones y brillo sutil en elementos destacados
- **Layout:** sidebar fija con avatar de GitHub, navegacion por secciones y contenido principal responsive

## Secciones

1. **Inicio** - Hero con efecto typewriter, enlaces a GitHub y acceso directo a proyectos
2. **Sobre mi** - Perfil en formato JSON, stack tecnologico y estadisticas personales
3. **Areas de interes** - Machine Learning, inteligencia artificial, algoritmos y matematicas aplicadas
4. **Proyectos** - Accesos a proyectos publicados dentro del sitio
5. **ICPC** - Experiencia en competencia algoritmica representando a la UCM
6. **Contacto** - Enlaces a GitHub y al repositorio del sitio

## Stack

- **Frontend:** React 19 + TypeScript
- **Estilos:** Tailwind CSS 4 + CSS personalizado
- **Animaciones:** Framer Motion
- **Routing:** Wouter
- **Build:** Vite
- **Servidor:** Express para servir el build de produccion

## Desarrollo

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Revisar tipos
pnpm check

# Build para produccion
pnpm build

# Ejecutar build de produccion
pnpm start
```

## Estructura

```text
client/
  src/
    pages/
      Home.tsx          # Pagina principal del portafolio
      NotFound.tsx      # Pagina 404
    components/         # Componentes reutilizables y UI
    contexts/           # Theme provider
    index.css           # Tema Neobrutalist + utilidades custom
    App.tsx             # Configuracion de rutas

server/
  index.ts              # Servidor Express para produccion

shared/
  const.ts              # Constantes compartidas

Horario/                # Proyecto estatico publicado en /Horario/
pong/                   # Juego Pong publicado en /pong/
```

## Caracteristicas

- Efecto typewriter en el titulo principal
- Fondo visual con imagen y detalles de codigo
- Navegacion lateral con indicador de seccion activa
- Scroll suave entre secciones
- Componentes responsive para escritorio y mobile
- Tarjetas de proyectos con lenguaje, topics y fechas
- Seccion ICPC con enfoque competitivo y snippet estilo Python
- Build de produccion listo para GitHub Pages o servidor estatico

## Notas

- Los proyectos `Horario` y `pong` se copian al build final durante `pnpm build`.
- Las imagenes principales y el avatar se cargan desde URLs externas.
- El sitio esta pensado como portafolio personal y vitrina de proyectos.
- La carpeta `dist/` corresponde al resultado compilado.

## Autor

**Gustavo Harnisch**  
Estudiante de Ingenieria Civil Informatica - UCM - Talca, Chile  
[GitHub](https://github.com/Gustavo-Harnisch)

---

Construido con React, TypeScript, Tailwind CSS y cafe.
