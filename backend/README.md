# Cleverminer Backend

This folder contains the backend for the Cleverminer app, built with Python and served using `uvicorn`.

## Files
- `main.py`: The main backend script, implementing the API.
- `src`: Just helper functions and classes.
- `requirements.txt`: List of Python dependencies.

## Prerequisites
- Python 3.8+
- `pip install -r requirements.txt` (Python package manager)

## Build exec for Electron
Generate the binary (for current OS):
```bash
pyinstaller --onefile main.py --distpath ./dist
```
Test it by running (only for Mac/Linux):
```bash
./dist/main 
```