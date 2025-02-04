import pandas as pd

date = "date"
balance = "balance"

TEST_FILE = "C:\\Users\\henry\\Documents\\CS Proj\\Job Materials\\Casca\\model\\bank_statements\\Llyods Bank.xlsx"

df = pd.read_excel(TEST_FILE)

print(df.head())