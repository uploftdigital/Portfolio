# Uploft Digital — Complete Setup Guide
### Windows 11 · VS Code · Node.js

---

## BEFORE YOU START — Prerequisites Checklist

Open **PowerShell** or **VS Code Terminal** and verify each tool:

```powershell
node --version      # Must be v18.17.0 or higher (v20+ recommended)
npm --version       # Must be v9 or higher
git --version       # Any recent version is fine
```

**If Node.js is not installed or is outdated:**
1. Go to https://nodejs.org
2. Download the **LTS** version (the left green button)
3. Run the installer — accept all defaults
4. Close and reopen your terminal, then re-run `node --version`

---

## STEP 1 — Create the Project Folder

Open **VS Code**, then open its integrated terminal:
`View → Terminal` (or press `` Ctrl + ` ``)

```powershell
# Navigate to wherever you keep your projects
cd C:\Users\YourName\Projects

# Create and enter the project folder
mkdir uploft-digital
cd uploft-digital
```

---

## STEP 2 — Copy All Code Files

Copy every file from the provided `uploft-digital` folder into `C:\Users\YourName\Projects\uploft-digital\`.

The final folder structure must look **exactly** like this:

```
uploft-digital/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── canvas/
│   │   ├── Scene.tsx
│   │   └── WebGLCanvas.tsx
│   ├── providers/
│   │   └── LenisProvider.tsx
│   ├── sections/
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ProjectShowcase.tsx
│   │   └── Services.tsx
│   └── three/
│       ├── CameraRig.tsx
│       ├── Logo3D.tsx
│       ├── LaptopMesh.tsx
│       └── Particles.tsx
├── lib/
│   └── scrollStore.ts
├── public/
│   ├── boutique.webp
│   └── cafe.webp
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

> ⚠️ **IMPORTANT:** The `public/` folder must contain `cafe.webp` and `boutique.webp`.
> These are the project screenshot images for the laptop screens.

---

## STEP 3 — Install Dependencies

In the VS Code terminal (make sure you are inside the `uploft-digital` folder):

```powershell
npm install
```

This downloads ~500 MB of packages. It will take 1–3 minutes.

**Expected output at the end:**
```
added 847 packages, and audited 848 packages in 1m
```

If you see any `WARN` messages — that is **normal**, ignore them.
If you see `ERROR` messages — see the Troubleshooting section below.

---

## STEP 4 — Start the Development Server

```powershell
npm run dev
```

**Expected output:**
```
   ▲ Next.js 15.0.3
   - Local:        http://localhost:3000
   - Network:      http://192.168.x.x:3000

 ✓ Starting...
 ✓ Ready in 2.1s
```

Now open your browser and go to: **http://localhost:3000**

You should see the black full-screen website with the 3D WebGL logo.

---

## STEP 5 — Verify It's Working

Checklist after opening http://localhost:3000:

- [ ] Page background is deep black `#030303`
- [ ] 3D geometric "U + arrow" logo is visible and slowly rotating
- [ ] Blue point lights illuminate the logo
- [ ] Scrolling causes the camera to fly forward through 3D space
- [ ] Project 1 (Chai & Chaat) overlay appears after scrolling ~33%
- [ ] Project 2 (Uploft Boutique) overlay appears after scrolling ~66%
- [ ] Services grid loads below the WebGL section
- [ ] Footer CTA is visible at the bottom

---

## STEP 6 — Build for Production

When you're ready to deploy:

```powershell
npm run build
```

This creates an optimized production build in `.next/`.

To test the production build locally:
```powershell
npm run start
```

---

## DEPLOYING TO VERCEL (Recommended)

Vercel is the company behind Next.js and has zero-config deployment.

### Option A — Vercel CLI (fastest)

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Deploy from the project folder
vercel

# Follow the prompts:
# ? Set up and deploy "uploft-digital"? → Y
# ? Which scope? → (select your account)
# ? Link to existing project? → N
# ? What's your project's name? → uploft-digital
# ? In which directory is your code located? → ./
# → Your site will be live at https://uploft-digital.vercel.app
```

### Option B — GitHub + Vercel Dashboard

1. Push the project to GitHub:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit — Uploft Digital"
   git remote add origin https://github.com/YourName/uploft-digital.git
   git push -u origin main
   ```

2. Go to https://vercel.com → New Project
3. Import your GitHub repo
4. Click **Deploy** — done!

---

## CUSTOMIZING THE CONTENT

### Change agency name / copy
Edit `components/sections/Hero.tsx` — find the text strings and update them.

### Change project info (titles, descriptions, links)
Edit `components/sections/ProjectShowcase.tsx` — update the `PROJECTS` array at the top.

### Change services
Edit `components/sections/Services.tsx` — update the `SERVICES` array at the top.

### Change contact email
Edit `components/sections/Footer.tsx` — find `hello@uploftdigital.com`.

### Add more project screenshots
1. Drop new `.webp` images into the `public/` folder
2. In `components/canvas/Scene.tsx`, change `texturePath="/cafe.webp"` to your new file

### Change the blue accent color
In `tailwind.config.ts`, change `"blue-accent": "#1a6bff"` to any hex color.
Also update `app/globals.css` → `--color-accent: #1a6bff`.

---

## TROUBLESHOOTING

### ❌ `Error: Cannot find module 'three'`
```powershell
npm install three @types/three
```

### ❌ `SyntaxError: Unexpected token 'export'`
Make sure `tsconfig.json` has `"moduleResolution": "bundler"`. (Already set in the provided file.)

### ❌ `Error: self is not defined` (in console)
This means a Three.js/R3F component is being server-rendered.
Make sure `WebGLCanvas` in `page.tsx` uses `dynamic(..., { ssr: false })`. (Already set.)

### ❌ Port 3000 already in use
```powershell
npm run dev -- -p 3001
# Then visit http://localhost:3001
```

### ❌ `npm install` fails with EACCES / permissions error
Run VS Code as Administrator:
Right-click VS Code in Start Menu → "Run as Administrator"

### ❌ Images not showing on laptop screens
Verify `public/cafe.webp` and `public/boutique.webp` exist.
The `public/` folder must be at the project root (same level as `package.json`).

### ❌ Scroll animation not working / camera not moving
Make sure Lenis is installed: `npm install lenis`
Check the browser console for errors.

### ❌ Build error: Type errors in TypeScript
Run `npm run lint` for details, or add `// @ts-ignore` above the problematic line temporarily.

---

## PERFORMANCE NOTES

- The site targets **60 FPS** on desktop GPUs (RTX 2060+ or equivalent)
- On integrated graphics (Intel UHD), frame rate may drop to 45–55 FPS — still smooth
- The `dpr={[1, 2]}` on the Canvas caps at 2× pixel ratio to prevent GPU overload on Retina screens
- On mobile, the 3D scene is still rendered but the camera path is the same
- For a low-power fallback, add `prefers-reduced-motion` media query handling in `LenisProvider.tsx`

---

## FILE SIZES (approximate after build)

| Resource | Size |
|---|---|
| JS bundle (gzipped) | ~420 KB |
| Three.js + R3F | ~310 KB |
| GSAP | ~35 KB |
| Lenis | ~8 KB |
| Images (2× WebP) | ~300–600 KB |

---

*Uploft Digital — Built with Next.js 15, Three.js, GSAP, and Lenis*
