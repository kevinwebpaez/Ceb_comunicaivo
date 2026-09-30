# Migración del Portal CEB a Astro

## 1. Instalar dependencias (dentro de tu proyecto Astro)

    npm install alpinejs tailwindcss @tailwindcss/vite

## 2. Copiar archivos

Copia el contenido de esta carpeta dentro de tu proyecto, respetando las rutas
y reemplazando lo que Astro creó por defecto:

- astro.config.mjs            (reemplaza el existente)
- src/layouts/Layout.astro    (reemplaza el existente)
- src/pages/                  (borra el index.astro de ejemplo antes de copiar)
- src/components/             (borra Welcome.astro si existe)
- src/styles/global.css
- src/scripts/alpine.js
- public/images/fondo.png
- .github/workflows/deploy.yml

## 3. Probar en local

    npm run dev

Abre http://localhost:4321/Ceb_comunicaivo/

## 4. Publicar en GitHub Pages

1. En tu repo: Settings > Pages > Source: **GitHub Actions**.
2. Haz commit (incluye package-lock.json) y push a la rama main.
3. El sitio se publica en https://kevinwebpaez.github.io/Ceb_comunicaivo/

Puedes borrar del repo los archivos viejos: index.html, app.py, Procfile,
requirements.txt, templates/, static/, JavaScript/ y CSS/.
