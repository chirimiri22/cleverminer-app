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
2. Run `python main.py`

With Docker:
1. `docker-compose up --build backend` 
Check parent `README.md` and `docker-compose.yml` for more details.

## Build exec for Electron
1. Install `pyinstaller` with `pip install pyinstaller`
2. Generate the binary (for current OS): `pyinstaller --onefile main.py --distpath ./dist`
3. Test it by running (only for Mac/Linux): `./dist/main `

