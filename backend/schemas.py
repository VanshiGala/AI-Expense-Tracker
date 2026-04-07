from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class ExpenseCreate(BaseModel):
    amount: float
    description: str
    user_id: int

class ExpenseOut(BaseModel):
    id: int
    amount: float
    description: str
    category: str

    class Config:
        orm_mode = True