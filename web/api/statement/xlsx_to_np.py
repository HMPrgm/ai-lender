import pandas as pd
import numpy as np

date = "Date"
balance = "Balance"

TEST_FILE = "C:\\Users\\henry\\Documents\\CS Proj\\Job Materials\\Casca\\model\\bank_statements\\Llyods Bank.xlsx"

df = pd.read_excel(TEST_FILE)

df[date] = pd.to_datetime(df[date])

first_date = df[date].min()
df[date] = (df[date] - first_date).dt.days

arr = df[[date,balance]].to_numpy()

print(arr)