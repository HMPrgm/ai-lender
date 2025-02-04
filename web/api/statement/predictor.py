import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

from data.xlsx_to_np import xlsx_to_np
from data.model_handler import get_linear_regression_model_v0, data_to_features
from data.data_processing import consistancy_from_linear_reg_model, slope_from_linear_reg_model, history_from_nparray, balance_change

def predictions_from_spreadsheet(df: pd.DataFrame):
    arr = xlsx_to_np(df)

    X, y = data_to_features(arr)
    model = get_linear_regression_model_v0(X,y)

    slope = slope_from_linear_reg_model(model)
    consistancy = consistancy_from_linear_reg_model(y, model.predict(X))
    days = history_from_nparray(arr)
    change_in_balance = balance_change(arr)
    
    return {
        'slope': slope,
        'consistancy': consistancy,
        'days': days,
        'change_in_balance': change_in_balance,
    }
