from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import CreditInput

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "ArthSetu backend is running"}

@app.post("/api/v1/evaluate")
def evaluate(data: CreditInput):
    return {
        "probability_of_default": 0.18,
        "risk_category": "Low Risk",
        "decision": "Approved - Auto",
        "loan_limit": 50000,
        "shap_explanations": {
            "annual_income": -0.12,
            "savings_balance": -0.08,
            "spending_ratio": 0.15,
            "utility_bill_late_count": 0.09,
            "credit_history_length_months": -0.05
        }
    }