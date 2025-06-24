# Cleverminer Backend

This folder contains the backend for the Cleverminer app, built with Python and served using `uvicorn`.

## Files
- `main.py`: The main backend script, implementing the API.
- `src`: Just helper functions and classes.
- `requirements.txt`: List of Python dependencies.

## Prerequisites
- Python 3.8+
- `pip install -r requirements.txt` (Python package manager)

## How to run
For local development:
1. Install packages with previous command (make sure you're in the correct environment)
2. Uncomment the last lines in `main.py`
3. Run `python main,.py`

With Docker:
`docker-compose up --build backend` and `docker-compose.yml`
Check parent README.md for more details.

## Build exec for Electron
Generate the binary (for current OS):
```bash
pyinstaller --onefile main.py --distpath ./dist
```
Test it by running (only for Mac/Linux):
```bash
./dist/main 
```