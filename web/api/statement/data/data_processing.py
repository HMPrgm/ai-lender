import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import root_mean_squared_error

def slope_from_linear_reg_model(model: LinearRegression) -> float:
    return model.coef_[0][0]

def consistancy_from_linear_reg_model(y: np.array, y_pred: np.array) -> float:
    return root_mean_squared_error(y, y_pred, multioutput='uniform_average').item() / np.average(y)

def history_from_nparray(data: np.array):
    return data[-1,0] - data[0,0]

def balance_change(data: np.array):
    return data[-1,1] - data[0,1]