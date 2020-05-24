import plotly.plotly as py
import plotly
import numpy as np
from numpy import genfromtxt
import plotly.graph_objs as go

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
    plotly.tools.set_credentials_file(username='Mcdonoughd', api_key='ey9uajZCngZBcnJqTPbf')

    # fetch data
    my_data = genfromtxt('cars-sample.csv', delimiter=',', dtype=None, encoding='ascii')

    # clean Data
    my_data = my_data[np.all(my_data != "NA", axis=1)]

    Man_index = getindex(my_data, '"Manufacturer"')
    MPG_index = getindex(my_data, '"MPG"')
    Weight_index = getindex(my_data, '"Weight"')

    Categorical = getCategorical(my_data, Man_index)

    data = []
    for i in range(len(Categorical)):
        company_data = fetchRows(my_data,Categorical[i],Man_index)

        MPG = getcol(company_data, MPG_index)
        Weight = getcol(company_data, Weight_index)

        trace = go.Scatter(
            x=Weight,
            y=MPG,
            name=Categorical[i],
            mode='markers',
            marker=dict(
                size=WeighttoSize(Weight*2),
                line=dict(
                    width=2,
                ),
                opacity=0.5
            )
        )
        data.append(trace)
    layout = go.Layout(
        title='Plotly',
        xaxis=dict(
            title='Weight',
            titlefont=dict(
                family='Arial, sans-serif',
                size=18,
                color='lightgrey'
            ),
            zeroline=False),
        yaxis=dict(
            title='MPG',
            titlefont=dict(
                family='Arial, sans-serif',
                size=18,
                color='lightgrey'
            ),
            zeroline=False
            )
        )

    fig = go.Figure(data=data, layout=layout)

    py.plot(fig, filename='Plotly') #plot to plotly


if __name__ == '__main__': Main()