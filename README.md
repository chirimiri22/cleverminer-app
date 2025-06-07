# Cleverminer App

A desktop application built with Electron, React frontend, and Python backend for data mining tasks.

## Project Structure
- **`backend/`**: Python API server.
- **`frontend/`**: React-based UI.
- **`electron-app/`**: Electron wrapper for desktop app.

## Run app with Docker
Build the application and run it:
```bash
docker-compose up --build --force-recreate --remove-orphans 
```

Run the app with Electron:
```bash
docker-compose up 
```

Then the application will be accessible at http://localhost:3000.
