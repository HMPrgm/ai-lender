import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

def slope_from_linear_reg_model(model: LinearRegression) -> float:
    return model.coef_[0]

def consistancy_from_linear_reg_model(y: np.array, y_pred: np.array) -> float:
    return r2_score(y, y_pred)