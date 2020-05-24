import pandas as pd
import numpy as np
from bokeh.models import ColumnDataSource
from bokeh.plotting import figure, output_file, show


def Main():
    car_data = pd.read_csv('cars-sample.csv')

    # clean data
    car_data = car_data[np.all(car_data != "NA", axis=1)]


    # Data preparation
    y = car_data.loc[: , "MPG"]
    x = car_data.loc[: , "Weight"]
    name = car_data.loc[:,"Manufacturer"]
    Categorical = pd.unique(car_data.loc[: , "Manufacturer"])

    colormap = {'ford': 'red', 'bmw': 'green', 'mercedes': 'blue','honda': 'yellow','toyota':'purple'}
    colors = [colormap[x] for x in car_data["Manufacturer"]]


    # Configuring plot output file
    output_file("bokeh.html", title="Bokeh")

    # Create the figure and define some properties
    fig = figure(title="Bokeh", x_axis_label='Weight', y_axis_label='MPG')




        # Add the line
    fig.scatter(x, y,radius=x/100,
                fill_alpha=0.5,
                color=colors,
                muted_alpha=0.1)
                # legend=name)

    # Show results, similar to matplotlib
    show(fig)


if __name__ == '__main__': Main()