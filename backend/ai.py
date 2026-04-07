import openai

openai.api_key = "YOUR_OPENAI_KEY"

def categorize_expense(description: str):
    prompt = f"""
    Categorize this expense into one category:
    Food, Travel, Shopping, Bills, Entertainment, Other

    Expense: {description}
    Category:
    """

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return response['choices'][0]['message']['content'].strip()