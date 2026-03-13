from pydantic import BaseModel

class CreditInput(BaseModel):
    annual_income: float
    savings_balance: float
    spending_ratio: float
    utility_bill_late_count: int
    credit_history_length_months: int