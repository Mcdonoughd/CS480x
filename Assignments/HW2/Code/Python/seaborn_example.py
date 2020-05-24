import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def Main():

    sns.set(style="whitegrid")

    car_data = pd.read_csv('cars-sample.csv')

    #clean data
    car_data = car_data[np.all(car_data != "NA", axis=1)]

    Categorical = pd.unique(car_data.loc[: , "Manufacturer"])

    # Draw a scatter plot while assigning point colors and sizes to different
    # variables in the dataset
    f, ax = plt.subplots()
    sns.despine(f, left=True, bottom=True)

    sns.scatterplot(x="Weight", y="MPG",
                    hue="Manufacturer", size="Weight",
                    hue_order=Categorical,
                     linewidth=0, alpha=0.5,
                    data=car_data, ax=ax)
    plt.title('Seaborn')
    plt.show()

if  __name__ =='__main__': Main()