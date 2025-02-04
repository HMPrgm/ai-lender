import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

def get_linear_regression_model_v0(X: np.array, y: np.array) -> LinearRegression:
    
    model = LinearRegression()
    model.fit(X,y)

    return model
    
def data_to_features(data: np.array):
    X = np.reshape(data[:,0],(-1,1))
    y = np.reshape(data[:,1],(-1,1))
    return (X, y)

def calculate_residuals(y: np.array, y_pred: np.array) -> np.array:
    return y - y_pred
    
def z_score(residuals: np.array):
    mean = np.mean(residuals)
    std_dev = np.std(residuals)
    
    return (residuals - mean) / std_dev