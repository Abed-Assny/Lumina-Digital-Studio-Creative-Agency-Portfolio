# Lumina Digital Studio 🚀🌌

¡Bienvenido a **Lumina Digital Studio**! Este es un sitio web premium e interactivo diseñado para una agencia creativa ficticia. El proyecto destaca por su estética visual oscura (*Dark Mode*), un diseño minimalista de alto impacto y una coreografía de animaciones avanzada.

### 🌟 Un hito personal en mi aprendizaje
Este repositorio es extremadamente especial para mí: **es mi primer gran proyecto técnico desarrollado con la suite de animación GSAP (GreenSock).** Durante su creación, pasé de comprender conceptos básicos a dominar lógicas complejas de scroll, manipulación de tipografía por caracteres, control de SVG y físicas aplicadas al cursor en tiempo real. ¡Un verdadero salto de nivel en mi camino como Frontend Developer!

---

## 🛠️ Tecnologías y Plugins Utilizados

### Core Stack:
* **HTML5:** Arquitectura semántica limpia y optimizada para SEO y accesibilidad.
* **CSS3 Avanzado:** Uso de Custom Variables, Layouts híbridos (Flexbox y CSS Grid), enmascaramiento con `clip-path` y Media Queries minuciosas para asegurar la adaptabilidad.
* **JavaScript (ES6+):** Programación orientada a funciones para controlar el estado global de la interfaz, eventos de interacción y cálculos de coordenadas.

### Ecosistema de Animación (GSAP Premium Suite):
* **GSAP Core & Ticker:** Gestión centralizada de timelines y optimización de renderizado mediante `lagSmoothing`.
* **ScrollTrigger:** Control del viewport, efectos de revelado al hacer scroll y anclaje de secciones (*pinning*).
* **ScrollSmoother:** Integración de scroll inercial suave para una navegación fluida en escritorio.
* **SplitText:** Parseo dinámico de títulos y textos para generar efectos tipo *stagger* (escalonados) por letras o palabras.
* **DrawSVGPlugin:** Animación matemática de trazos sobre vectores SVG personalizados.
* **MotionPathPlugin:** Guiado de elementos tipográficos a través de rutas curvas específicas.

---

## ✨ Características Técnicas y Estructura de Código

El código está estructurado de manera modular y limpia a través de las siguientes vistas:

1. **`index.html` (Home):** El portal principal que da la bienvenida con un potente Hero section, animaciones de entrada coordinadas y el menú interactivo.
2. **`OurVision.html`:** Exposición conceptual de la marca utilizando el efecto de revelado de texto masivo *"WE BREATHE LIFE INTO PIXELS"*.
3. **`ScrollHorizontal.html`:** Una sección interactiva horizontal (*Horizontal Scroll Progress*) donde el usuario avanza de forma lateral mediante el scroll vertical del ratón, activando pasos numéricos y tarjetas informativas.
4. **`ourExpertise.html`:** Panel interactivo de habilidades donde, al pasar el cursor sobre las listas (*hover*), se intercambian dinámicamente imágenes de fondo mediante arrays de opacidad.
5. **`PortfolioGallery.html`:** Una galería asimétrica donde las imágenes del portafolio reaccionan con un sutil balanceo tridimensional siguiendo la posición del cursor.
6. **`TheAtmosphere.html`:** Sección de cierre inmersiva con efecto Parallax en imágenes de fondo y elementos flotantes SVG que rotan a diferentes velocidades según su atributo `data-speed`.

---

## 🚀 Optimizaciones de Alto Nivel Implementadas

Para lograr que un sitio con tanta carga visual se mueva con total fluidez, apliqué las siguientes técnicas de optimización:

* **Físicas de Cursor con `gsap.quickSetter`:** El cursor personalizado basado en un elemento `canvas` (`#canvasCursor`) calcula la posición del ratón en tiempo real. En lugar de usar animaciones tradicionales que saturan el DOM, `quickSetter` inyecta directamente las coordenadas en los ejes X e Y, garantizando **60 FPS estables**.
* **Efectos Magnéticos Avanzados:** Botones clave (como el menú hamburguesa) cuentan con un script de proximidad que calcula la distancia del cursor, atrayendo magnéticamente el elemento hacia el ratón de forma orgánica.
* **Control de Rendimiento Móvil (`gsap.matchMedia`):** Toda la lógica pesada de scroll horizontal, smooth scrolling y físicas de cursor se ejecuta exclusivamente en pantallas superiores a `768px`. En dispositivos móviles, el sitio se adapta de forma nativa para ahorrar batería y recursos del hardware.

---

## 📁 Estructura del Repositorio

```text
├── DOM/
│   ├── index.html               # Portal principal
│   ├── OurVision.html           # Manifiesto de marca
│   ├── ScrollHorizontal.html    # Sección de flujo horizontal
│   ├── ourExpertise.html        # Grid interactivo de servicios
│   ├── PortfolioGallery.html    # Galería interactiva con físicas de mouse
│   └── TheAtmosphere.html       # Sección inmersiva con Parallax y elementos flotantes
├── css/
│   └── style.css                # Estilos globales, variables y diseño responsivo
└── js/
    └── animations.js            # El motor principal del proyecto (Toda la lógica GSAP)
