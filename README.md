# Portafolio de Juan Diego Suárez

Portafolio web profesional desarrollado con HTML, CSS y JavaScript vanilla.

## 📁 Estructura del proyecto

```
portafolio/
├── index.html          # Página principal
├── servicios.html      # Página de servicios detallada
├── gracias.html        # Página de agradecimiento
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript
├── components/
│   └── footer.html     # Componente footer reutilizable
├── img/
│   └── perfil.jpeg     # Imagen de perfil
└── README.md           # Este archivo
```

## 🚀 Cómo usar

1. **Abrir el portafolio**: Simplemente abre `index.html` en tu navegador
2. **Navegación**: Usa el menú superior para navegar entre secciones
3. **Formulario de contacto**: Funciona con sistema de backup automático

## 📧 Configuración del formulario de contacto

### Método actual (Mailto backup)
- **Funcionamiento**: Abre el cliente de correo del usuario
- **Ventajas**: Funciona inmediatamente sin configuración
- **Experiencia**: El usuario puede editar el mensaje antes de enviar

### Para configurar Formspree (recomendado para producción):

1. **Registrarse en Formspree**:
   - Ir a https://formspree.io
   - Crear cuenta gratis
   - Verificar el email juan.suva25@gmail.com

2. **Obtener el endpoint**:
   - Formspree te dará un endpoint como: `https://formspree.io/f/xXXXXXXX`

3. **Actualizar el código**:
   ```javascript
   // En script.js, descomenta y actualiza esta sección:
   const response = await fetch('https://formspree.io/f/TU_ENDPOINT', {
       method: 'POST',
       body: formData,
       headers: {
           'Accept': 'application/json'
       }
   });
   ```

4. **Activar el endpoint**:
   - Envía un mensaje de prueba
   - Confirma en tu email
   - ¡Listo!

### Características del formulario:

✅ **Validación completa** - Campos obligatorios y formato de email
✅ **Estados de carga** - Spinner mientras se procesa
✅ **Mensajes informativos** - Éxito y errores claros
✅ **Backup automático** - Mailto si falla el servicio principal
✅ **Página de agradecimiento** - Experiencia profesional
✅ **Responsive** - Funciona en todos los dispositivos
✅ **Anti-spam** - Protección integrada

## 🎨 Características del diseño

- **Moderna y profesional** - Diseño clean enfocado en tecnología
- **Completamente responsive** - Mobile-first approach
- **Animaciones suaves** - Efectos de hover y transiciones
- **Paleta de colores tech** - Azul primario con acentos
- **Tipografía Inter** - Legible y moderna
- **Performance optimizada** - Carga rápida
- **Componentes modulares** - Footer reutilizable y dinámico

## 🧩 Arquitectura de Componentes

El portafolio utiliza un sistema de componentes modulares para evitar duplicación de código:

### Footer Dinámico
- **Ubicación**: `components/footer.html`
- **Carga**: Automática vía JavaScript
- **Beneficios**: 
  - ✅ Sin duplicación de código
  - ✅ Actualización centralizada
  - ✅ Animación de entrada suave
  - ✅ Tooltips en enlaces sociales

### Cómo funciona:
1. Las páginas contienen un `<div id="footer-placeholder"></div>`
2. JavaScript carga automáticamente `components/footer.html`
3. Se inserta dinámicamente con animación
4. Tooltips y efectos se activan automáticamente

### Para agregar más componentes:
1. Crear archivo en `components/`
2. Añadir placeholder en las páginas HTML
3. Crear función de carga en `script.js`
4. Llamar la función en `DOMContentLoaded`

## 🔧 Personalización

### Cambiar colores:
Edita las variables CSS en `styles.css`:
```css
:root {
    --primary: #6366f1;        /* Color primario */
    --secondary: #f59e0b;      /* Color secundario */
    --accent: #10b981;         /* Color de acento */
}
```

### Cambiar información personal:
1. **Datos de contacto**: Actualizar en `index.html` y `script.js`
2. **Experiencia laboral**: Modificar la sección timeline en `index.html`
3. **Habilidades**: Editar la sección skills
4. **Servicios**: Actualizar tanto `index.html` como `servicios.html`

### Cambiar imagen de perfil:
- Reemplazar `img/perfil.jpeg` con tu foto
- Mantener formato cuadrado (1:1) para mejores resultados
- Tamaño recomendado: 400x400px mínimo

## 📱 Compatibilidad

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Dispositivos móviles
- ✅ Tabletas

## 🚀 Despliegue

### GitHub Pages:
1. Subir archivos a repositorio GitHub
2. Ir a Settings > Pages
3. Seleccionar rama main
4. Tu sitio estará en: `usuario.github.io/repositorio`

### Netlify:
1. Conectar repositorio GitHub
2. Deploy automático
3. Dominio personalizado disponible

### Vercel:
1. Importar proyecto
2. Deploy automático
3. Dominio personalizado disponible

## 📄 Licencia

Este proyecto es de uso personal. Puedes modificarlo libremente para tu propio portafolio.

## 🤝 Contacto

- **Email**: juan.suva25@gmail.com
- **GitHub**: [@juansuv](https://github.com/juansuv)
- **Ubicación**: Pereira, Colombia

---

Desarrollado con ❤️ por Juan Diego Suárez