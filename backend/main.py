from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas
from ai import categorize_expense
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return( "Welcome to the Expense Tracker API!")

@app.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = models.User(username=user.username, password=user.password)
    db.add(new_user)
    db.commit()
    return {"message": "User created"}

@app.post("/login")
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(
        models.User.username == user.username,
        models.User.password == user.password
    ).first()

    if db_user:
        return {"user_id": db_user.id}
    return {"error": "Invalid credentials"}

@app.post("/expense")
def add_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    category = categorize_expense(expense.description)

    new_expense = models.Expense(
        amount=expense.amount,
        description=expense.description,
        category=category,
        user_id=expense.user_id
    )

    db.add(new_expense)
    db.commit()
    return {"message": "Expense added", "category": category}

@app.get("/expenses/{user_id}")
def get_expenses(user_id: int, db: Session = Depends(get_db)):
    expenses = db.query(models.Expense).filter(models.Expense.user_id == user_id).all()
    return expenses