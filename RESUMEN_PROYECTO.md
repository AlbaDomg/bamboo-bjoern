# 🌿 Resumen del Proyecto: Bamboo Bjørn — Grünes KI-Hosting

Este documento resume de manera concisa y clara todo el trabajo realizado en la plataforma **Bamboo Bjørn**, así como las tecnologías utilizadas y el propósito de cada una.

---

## 📌 1. Descripción General del Proyecto
**Bamboo Bjørn** es una interfaz web interactiva de hosting ecológico impulsado por inteligencia artificial (Mistral KI). Permite a los usuarios gestionar infraestructuras verdes (servidores KVM, registros de dominio, buzones de correo 100% CO₂-neutrales y métricas de telemetría en tiempo real) a través de una experiencia conversacional fluida e intuitiva.

---

## 🚀 2. Resumen del Trabajo Realizado

### A. Identidad Visual & Sistema de Avatares
- **Procesamiento de Avatares Transparentes**: Se convirtieron las imágenes estáticas (`AdminPanda.jpg`, `HackerPanda.jpg`, `PathfinderAdmin.jpg`) a formato PNG transparente mediante scripts automatizados en Python (Pillow).
- **Integración de Vídeo Dinámico**: Se incorporó el vídeo looping con canal alfa transparente (`assets/PandaVideo_sin_fondo.webm`) en la tarjeta de bienvenida de selección de rol y en la tarjeta de cliente autenticada.
- **Componente Reutilizable `BjornAvatar`**: Creado en React con animaciones sutiles de flotación (`panda-avatar`) e interacción hover zoom.
- **Optimización de Branding**: Se sustituyó el logo circular inicial por la tipografía oficial completa `assets/bambusbjørn-schriftzug.png` en el encabezado principal.
- **Eliminación de Elementos Redundantes**: Se retiraron avatares pequeños e innecesarios (como en la tarjeta de Server-Telemetrie) para lograr una estética limpia y minimalista.

### B. Maquetación, UI & Adaptabilidad Responsive
- **Rediseño de la Tarjeta de Bienvenida de Cliente (`CustomerProductsCard`)**:
  - Ampliación del contenedor principal a `max-w-5xl` para que los 3 servicios activos (*Active Domain*, *Öko-Postfächer*, *Server KVM-01*) dispongan de más de 250px por columna y no se compriman en ninguna pantalla.
- **Ordenamiento Inteligente Responsive**:
  - **En Móvil**: Disposición en orden `Etiqueta Bjørn` ➔ `Vídeo Panda Centrado` ➔ `Saludo de Bienvenida` ➔ `Tarjeta de Productos`.
  - **En Escritorio**: El vídeo se ubica como columna lateral a la derecha, mientras que los textos y productos ocupan el área principal a la izquierda.
- **Pie de Página (`footer`)**: Ajuste de márgenes inferiores en móvil (`py-2.5`) para eliminar franjas de aire sobrantes sin alterar el texto ni los enlaces (*Thermische Technologie*, *Emissionszertifikat*, *SLA 99,99%*).

### C. Experiencia de Usuario & Scroll Fluido
- **Eliminación del Rebote de Scroll**: Implementación de `overscroll-behavior-y: contain` y `-webkit-overflow-scrolling: touch` para eliminar el salto/efecto muelle en navegadores móviles y de escritorio.
- **Navegación al Inicio de Tarjeta**: Configuración de `scrollToBottomHtml` y `scrollIntoView(block: 'start')` para que, al pulsar cualquier botón o abrir paneles, la pantalla se desplace suavemente al borde superior inicial de la nueva tarjeta.

---

## 🛠️ 3. Tecnologías Utilizadas y su Propósito

| Tecnología | Utilidad / Propósito |
| :--- | :--- |
| **HTML5 (Semántico)** | Estructura base de la aplicación web, etiquetas de vídeo nativas con reproducción automática transparente (`autoplay loop muted playsinline`). |
| **JavaScript (ES6+)** | Lógica conversacional del chat, gestión del estado de autenticación, controladores de eventos e interacción fluida de scroll. |
| **React (JSX)** | Arquitectura modular de componentes para el asistente virtual (`BambooChat.jsx`, `BjornAvatar.jsx`, `CustomerProductsCard`, `KvmConfigPanel`, `DnsConfigCard`, `TelemetryCard`). |
| **Tailwind CSS** | Estilizado responsivo rápido mediante clases de utilidad, paleta de colores personalizada *luxury-nature* (`#FAF8F5`, `#789340`, `#34312D`), flexbox/grid layout y animaciones. |
| **Python (Pillow / PIL)** | Procesamiento automatizado de activos gráficos: eliminación de fondos blancos por umbral de tolerancia, reescalado e integración de favicons/iconos. |
| **WebM (con Canal Alfa)** | Formato de vídeo ligero de alta eficiencia para animaciones del asistente con fondo transparente. |
| **Web App Manifest (`manifest.json`)** | Configuración PWA para la instalación y descarga de la aplicación en dispositivos móviles y de escritorio. |
| **Git & GitHub** | Control de versiones distribuido y sincronización con el repositorio remoto `origin/main`. |

---

## ✅ Estado Actual
El proyecto está completamente actualizado, optimizado para móvil y escritorio, y sincronizado en la rama `main` listo para su presentación y entrega.
