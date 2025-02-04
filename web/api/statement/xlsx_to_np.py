import pandas as pd
import numpy as np
# TEST_FILE = "C:\\Users\\henry\\Documents\\CS Proj\\Job Materials\\Casca\\model\\bank_statements\\Llyods Bank.xlsx"
def xlsx_to_np(file_path: str):
    date = "Date"
    balance = "Balance"
    try:
        df = pd.read_excel(file_path)
        df[date] = pd.to_datetime(df[date])
        first_date = df[date].min()
        df[date] = (df[date] - first_date).dt.days

        arr = df[[date,balance]].to_numpy()

        return arr
    except:
        return None