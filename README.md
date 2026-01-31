# fresh__cart (ecomm)

An Angular 19 e‑commerce demo app with server‑side rendering (SSR) using @angular/ssr and an Express server. The project includes Tailwind CSS, FontAwesome, ngx-owl-carousel-o, and ngx-toastr for UI/UX.

This README is tailored to the repository contents (Angular CLI project "ecomm", SSR server, and scripts found in package.json and angular.json).

## Table of contents
- [Highlights](#highlights)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting started (local development)](#getting-started-local-development)
- [Available scripts](#available-scripts)
- [Build & Server-Side Rendering (SSR)](#build--server-side-rendering-ssr)
- [Project structure notes](#project-structure-notes)
- [Environment variables](#environment-variables)
- [Styling / Assets](#styling--assets)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License & contact](#license--contact)

## Highlights
- Angular 19 application (project name: `ecomm`).
- Server-side rendering configured via `@angular/ssr` and an Express server entry at `src/server.ts`.
- Tailwind CSS + PostCSS integrated.
- Uses FontAwesome, ngx-owl-carousel-o, ngx-toastr for UI.
- Static assets served from the `public` folder.

## Tech stack
- Angular 19 (core packages in dependencies)
- Angular CLI / devkit build system
- TypeScript (~5.7)
- Tailwind CSS
- Express (for SSR server)
- Other notable libraries: @fortawesome/fontawesome-free, ngx-owl-carousel-o, ngx-toastr, jwt-decode

## Prerequisites
- Node.js (v18+ recommended)
- npm (or yarn)
- Angular CLI (optional, you can use npm scripts)

## Getting started (local development)
1. Clone the repository
```bash
git clone https://github.com/youssefemadsalem/fresh__cart.git
cd fresh__cart
```

2. Install dependencies
```bash
npm install
```

3. Run the development server (client-side dev server):
```bash
npm start
# or
ng serve
```
Open http://localhost:4200 (default ng serve port) unless changed.

Notes:
- Development build configuration is defined in `angular.json` (project `ecomm`, `sourceRoot: src`).
- Styles are using `src/styles.scss` and Tailwind is configured via `tailwind.config.js`.

## Available scripts
(From repository package.json)

- `ng` — Angular CLI
- `start` — `ng serve` (development server)
- `build` — `ng build` (builds project; outputPath = `dist/ecomm`)
- `watch` — `ng build --watch --configuration development`
- `test` — `ng test`
- `serve:ssr:ecomm` — `node dist/ecomm/server/server.mjs` (run the built SSR server bundle)

Use `npm run <script>` to execute any of the above scripts.

## Build & Server-Side Rendering (SSR)
The project is configured for SSR. Key points:

- Angular build output path: `dist/ecomm` (see `angular.json`).
- Server entry & SSR:
  - `src/main.server.ts` bootstraps the server-side application.
  - `src/server.ts` contains an Express server that:
    - Serves static files from the browser build (resolved as `../browser` relative to the server bundle).
    - Uses the Angular SSR engine to render remaining routes.
    - Exposes `reqHandler` for the Angular CLI / dev-server when needed.
    - When executed as main module, listens on `PORT` (defaults to `4000` inside `src/server.ts`).
- To produce SSR bundles:
  - Run the appropriate Angular SSR build command (project uses Angular CLI; if you have a specific SSR build command configured in CI or scripts, run it). After building, start the SSR server with:
    ```bash
    npm run build
    # then (after a proper SSR build that generates the server bundle)
    npm run serve:ssr:ecomm
    ```
  - `serve:ssr:ecomm` runs `node dist/ecomm/server/server.mjs` per package.json.

Tip: Depending on your Angular CLI/SSR configuration you may need to run both client and server builds (e.g., `ng run ecomm:build:production` and `ng run ecomm:server:production`) — verify or add CI scripts if needed.

## Project structure notes
Important files and locations found in the repo:
- `angular.json` — Angular workspace configuration (project `ecomm`, `outputPath: dist/ecomm`, `index: src/index.html`, `server` entry `src/main.server.ts`, SSR entry `src/server.ts`)
- `package.json` — project metadata and scripts
- `src/main.ts` — client bootstrap
- `src/main.server.ts` — server bootstrap for SSR
- `src/server.ts` — Express SSR server and request handler
- `src/styles.scss` — global styles (Tailwind + custom styles)
- `public/` — static assets served by the app

## Environment variables
- `PORT` — (optional) port for the Node/Express server (defaults to `4000` in `src/server.ts`).
- Add other env vars as needed (API URLs, auth secrets, payment keys). Create a `.env` or other secret management per your deployment practice.

## Styling / Assets
- Tailwind is included; `tailwind.config.js` is present.
- Global styles referenced in `angular.json` include:
  - FontAwesome CSS
  - ngx-owl-carousel-o prebuilt themes
  - ngx-toastr CSS
  - `src/styles.scss`

Static assets are copied from `public` during the build.

## Testing
- Unit tests: `npm run test` (Karma / Jasmine configured as devDependencies)
- Add or extend tests in `src/app` as needed.

## Deployment
Common SSR deployment flow:
1. Build client and server bundles using Angular CLI SSR build targets.
2. Ensure `dist/ecomm` contains `server/server.mjs` and `browser` assets.
3. Deploy the `dist/ecomm` folder to a Node host (e.g., VPS, Docker container, or hosting provider that supports Node).
4. Start server:
   ```bash
   node dist/ecomm/server/server.mjs
   ```
5. Configure environment variables and a process manager (pm2, systemd, or Docker) for production reliability.

Docker example (outline)
```dockerfile
# Example Dockerfile outline
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build  # ensure SSR build steps are appropriate
EXPOSE 4000
CMD ["node", "dist/ecomm/server/server.mjs"]
```
Adjust build steps to run SSR server build targets as needed.

## License & contact
- Add a LICENSE file or specify preferred license here (e.g., MIT).
- Maintained by: youssefemadsalem — https://github.com/youssefemadsalem
