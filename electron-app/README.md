# Electron FE

This repository contains the frontend and backend configration for the Electron application.

## Getting Started

```bash
npm install
```

### Development

To see the preview of the application, make sure `IS_DEV` is set to true in `main.ts` and run first:

```bash
npm run start:fe
```
(start the frontend)

Then, in another terminal, run:

```bash
npm run start
```
(start the electron preview)

When dev mode is on, the backend is started just by running the python script, therefore
**backend needs to be set up before running** the electron app.

### Package
To package the application for production:
1. **change the IS_DEV to false** in `main.ts`
2. `npm run package:linux`

The only Linux was tested, other OSes may not work.

It creates a build for FE and BE, wraps them into Electron and creates an installable app.
You can use `install.sh` to install the app on your Linux system.
