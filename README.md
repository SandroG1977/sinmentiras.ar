# sinmentiras.ar

Proyecto frontend base con React y Vite.

## Requisitos

- Node.js 24.14.1
- npm 11.11.0 o compatible

Si usas `nvm`, puedes cargar la versión correcta con:

```bash
nvm use
```

## Scripts

- `npm run dev`: levanta el servidor de desarrollo
- `npm run build`: genera la build de producción
- `npm run preview`: sirve la build localmente
- `npm run lint`: ejecuta ESLint
- `npm run test`: ejecuta tests con Vitest
- `npm run test:run`: ejecuta tests una sola vez
- `npm run test:coverage`: ejecuta tests con cobertura (100% requerido)

## Inicio rápido

```bash
nvm use
npm install
npm run dev
```

## CI/CD

### CI (GitHub Actions)

El workflow de CI está en `.github/workflows/ci.yml` y corre en cada `push` y `pull_request` a `main`:

1. `npm ci`
2. `npm run lint`
3. `npm run test:coverage`
4. `npm run build`

### CD (GitHub Actions)

El workflow de CD está en `.github/workflows/cd.yml`:

- `staging`: deploy automático cuando CI en `main` finaliza OK.
- `production`: deploy manual (`workflow_dispatch`) para release/beta.

### Secrets por environment

Configura los siguientes secrets en **Settings > Environments** para `staging` y `production`:

- `SSH_PRIVATE_KEY`: private key del servidor destino.
- `SSH_KNOWN_HOSTS`: salida de `ssh-keyscan <host>`.
- `DEPLOY_USER`: usuario SSH.
- `DEPLOY_HOST`: host SSH.
- `DEPLOY_PATH`: ruta remota donde se publica `dist/`.

### Recomendación de protección de rama

En `main`, habilita branch protection y exige que el check de CI esté en verde antes de mergear.
Para `production`, usa reviewers obligatorios en el environment para aprobar deploy manual.
