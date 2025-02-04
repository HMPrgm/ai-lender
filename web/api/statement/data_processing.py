import numpy as np

def calculate_residuals(y: np.array, y_pred: np.array) -> np.array:
    return y - y_pred
    
def z_score(residuals: np.array):
    mean = np.mean(residuals)
    std_dev = np.std(residuals)
    
    return (residuals - mean) / std_dev