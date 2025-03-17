from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Create FastAPI instance
app = FastAPI(title="Simple API")

# Add CORS middleware to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define data model for the POST request
class UserData(BaseModel):
    name: str
    message: str

# Create POST endpoint
@app.post("/api/submit")
async def submit_data(data: UserData):
    try:
        # In a real app, you might save to database here
        print(f"Received data: {data}")

        # Return success response
        return {
            "status": "success",
            "message": f"Hello, {data.name}! Your message was received.",
            "data": data.dict()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    # Run the server
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
