import pygal
import numpy as np
from numpy import genfromtxt
from pygal.style import Style
import pygal.util
#returns the column (minus the header) of a given header
def getcol(array=None,index=0,type=float):
    return np.array(array[1:,index],dtype=type)

#returns the index of a given header
def getindex(array=None,d=""):
    for i in range(0,array.shape[1]):
        if array[0,i] == d:
            return i
    return None

def fetchRows(array=None,d="",index=0):
    CompanyCars = []
    for i in range(0,array.shape[0]):
        #print(array[0,i])
        if array[i,index] == d:
            CompanyCars.append(array[i,:])
    return np.asarray(CompanyCars,dtype=None)

#fetches unique categorical data
def getCategorical(array=None,index=0):
    return np.unique(array[1:,index])

def WeighttoSize(weight):
    temp = np.copy(weight)
    for i in range(temp.shape[0]):
        temp[i] = temp[i]/500
    return temp


def Main():
    custom_style = Style(
        opacity='.5', #these dont change dot opacity
        opacity_hover='.9', #these dont change dot opacity
        colors=('rgba(250, 54, 54, 0.5)', 'rgba(100, 94, 54, 0.5)', 'rgba(100, 54, 154, 0.5)', 'rgba(100, 254, 94, 0.5)', 'rgba(50, 54, 254, 0.5)') # this is actually how you change opacity to dots
    )

    xy_chart = pygal.XY(stroke=False,style=custom_style,x_title='Weight',y_title='MPG')
    xy_chart.title = 'Pygal'

    # fetch data
    my_data = genfromtxt('cars-sample.csv', delimiter=',', dtype=None, encoding='ascii')

    # clean Data
    my_data = my_data[np.all(my_data != "NA", axis=1)]

    Man_index = getindex(my_data, '"Manufacturer"')
    MPG_index = getindex(my_data, '"MPG"')
    Weight_index = getindex(my_data, '"Weight"')

    Categorical = getCategorical(my_data, Man_index)

    for i in range(len(Categorical)):
        company_data = fetchRows(my_data,Categorical[i],Man_index)
        MPG = getcol(company_data, MPG_index)
        Weight = getcol(company_data, Weight_index)

        data = []
        for A, B in zip(Weight, MPG):
            points = (A,B)
            data.append({'value':points,'node': {'r': A/1000}})
        xy_chart.add(Categorical[i],data)

    xy_chart.render_to_png(filename='pygal.png')


if __name__ == '__main__': Main()


