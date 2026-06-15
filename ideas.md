# Ideas de Diseño — Gustavo Harnisch Portfolio

## Tres Enfoques Estilísticos

### 1. Terminal Hacker
**Tema:** Estética de terminal oscura con código en tiempo real, verde fosforescente sobre negro profundo.
**Probabilidad:** 0.03

### 2. Neobrutalist Code Lab
**Tema:** Brutalismo digital con bordes crudos, tipografía monospace pesada, colores eléctricos sobre fondos oscuros. Sensación de IDE experimental.
**Probabilidad:** 0.07

### 3. Cosmic Algorithm
**Tema:** Fondo espacial profundo con partículas de código flotantes, gradientes de neón frío (cian/violeta), sensación de matemáticas del universo.
**Probabilidad:** 0.02

---

## Enfoque Elegido: **Neobrutalist Code Lab** ✓

### Design Movement
Neobrutalism Digital — la estética cruda del software experimental, donde el código es arte y la interfaz es un laboratorio.

### Core Principles
1. **Código como ornamento** — fragmentos de código reales decorando la UI como elementos visuales
2. **Contraste radical** — fondos casi negros con acentos eléctricos de un solo color dominante
3. **Tipografía monospace como protagonista** — JetBrains Mono para todo el texto técnico, Syne para títulos
4. **Bordes y grillas visibles** — líneas que revelan la estructura, como un wireframe que cobró vida

### Color Philosophy
- **Fondo base:** `#0a0e1a` — azul noche profundo, no negro puro
- **Acento primario:** `#00d4ff` — cian eléctrico, el color de los terminales modernos
- **Acento secundario:** `#7c3aed` — violeta código, para profundidad
- **Texto principal:** `#e2e8f0` — blanco suave, no puro
- **Texto muted:** `#64748b` — gris azulado
- **Líneas/bordes:** `#1e293b` — azul oscuro visible

El cian `#00d4ff` es el color firma — aparece en cursores, highlights, badges y elementos interactivos.

### Layout Paradigm
Asimétrico con columna lateral fija: la navegación es una barra lateral izquierda estrecha con iconos de terminal. El contenido principal ocupa el resto con secciones que se revelan como bloques de código. No hay layout centrado convencional.

### Signature Elements
1. **Cursor parpadeante** — un cursor de terminal `|` animado en el hero
2. **Líneas de código decorativas** — fragmentos de Python/C++ flotando en el fondo con baja opacidad
3. **Badges tipo `git tag`** — las tecnologías se muestran como etiquetas de terminal con `$` prefijo

### Interaction Philosophy
Cada hover revela información adicional como si fuera un `man page`. Los clics tienen feedback inmediato con sonido visual (flash de color). El scroll activa animaciones de "compilación" donde el texto aparece carácter por carácter.

### Animation
- **Typewriter effect** en el hero: el nombre y título se escriben letra por letra (velocidad: 80ms/char)
- **Fade-in con blur** para secciones al entrar al viewport (200ms ease-out)
- **Hover en cards:** borde cian aparece con `box-shadow: 0 0 20px rgba(0,212,255,0.3)`
- **Partículas de fondo:** puntos pequeños que se mueven lentamente (canvas o CSS)
- **Stagger 50ms** en listas de tecnologías y repositorios

### Typography System
- **Display/Hero:** `Syne` — bold 700-800, para el nombre y secciones principales
- **Monospace/Código:** `JetBrains Mono` — todo lo técnico, badges, código decorativo
- **Body:** `Syne` regular 400 para texto descriptivo
- Jerarquía: 4rem hero → 2rem section → 1.25rem card → 1rem body → 0.875rem meta

### Brand Essence
**"El ingeniero que entiende los fundamentos"** — para reclutadores técnicos y la comunidad open-source que valora la profundidad sobre la superficie. Diferente porque muestra el proceso de pensamiento, no solo los resultados.

Adjetivos: **Riguroso · Curioso · Construido-desde-cero**

### Brand Voice
Headlines directos y técnicos, sin florituras. CTAs como comandos de terminal.
- Ejemplo 1: `> Gustavo Harnisch — Civil Computer Engineering`
- Ejemplo 2: `$ git clone https://github.com/Gustavo-Harnisch`

### Wordmark & Logo
Un símbolo `<GH/>` en estilo JSX/HTML tag — las iniciales como un componente de código. Monocromo cian sobre fondo oscuro.

### Signature Brand Color
`#00d4ff` — Cian Terminal. Inconfundiblemente tech, frío y preciso.
