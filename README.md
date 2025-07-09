# Cleverminer App

A desktop and web application built with Electron, React frontend, and Python backend for data mining tasks. The repo also offers a configuration for running the app in Docker.

**Walkthrough video**: https://youtu.be/nhuQ1MMtaQU?si=ZLWvzfQRMquimF9m

**App Demo**: https://cleverminer-fe.netlify.app/ (ALERT: Please note that it may take up to 10 minutes for the BE to load - be patient when first loading the dataset.)

## Project Structure
- **`backend/`**: Python API server.
- **`frontend/`**: React-based UI.
- **`electron-app/`**: Electron wrapper for desktop app.
- **`nginx/`**: Helper folder for Docker set up, so that the app runs smoothly.

## Run app with Docker
Build the application and run it:
```bash
docker-compose up --build --force-recreate --remove-orphans 
```

Run the app:
```bash
docker-compose up 
```

Then the application will be accessible at http://localhost:3000.
