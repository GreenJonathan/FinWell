from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all during dev (you can tighten later)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "FinWell Backend is running!"}

@app.get("/accounts")
def get_accounts():
    return [
        {"account_id": "123", "type": "checking", "balance": 5000},
        {"account_id": "456", "type": "savings", "balance": 12000}
    ]

@app.get("/transactions")
def get_transactions():
    return [
        {"id": "t1", "category": "food", "amount": 50},
        {"id": "t2", "category": "transport", "amount": 20},
        {"id": "t3", "category": "rent", "amount": 1000}
    ]
