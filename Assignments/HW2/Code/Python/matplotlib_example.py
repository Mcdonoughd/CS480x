import matplotlib.pyplot as plt
import numpy as np
from numpy import genfromtxt

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
        temp[i] = temp[i]/50
    return temp


def Main():
    fig = plt.figure()
    plt.ylabel('MPG')
    plt.xlabel('Weight')

    #fetch data
    my_data = genfromtxt('cars-sample.csv', delimiter=',', dtype=None, encoding='ascii')

    # clean Data
    my_data = my_data[np.all(my_data != "NA", axis=1)]

    Man_index = getindex(my_data, '"Manufacturer"')
    MPG_index = getindex(my_data,'"MPG"')
    Weight_index = getindex(my_data, '"Weight"')


    Categorical = getCategorical(my_data,Man_index)

    for i in range(len(Categorical)):
        company_data = fetchRows(my_data,Categorical[i],Man_index)


        MPG = getcol(company_data, MPG_index)
        Weight = getcol(company_data, Weight_index)

        s = WeighttoSize(Weight)

        l = plt.scatter(Weight, MPG, s=s, alpha=0.5, label=Categorical[i])
        plt.legend()


    MPG = getcol(my_data, MPG_index)
    plt.xticks(np.arange(2000, 6000, 1000.0))
    plt.yticks(np.arange(np.min(MPG), np.max(MPG) + 1, 10.0))
    plt.grid(True)
    plt.title("MatPlotLib")
    fig.show()
    plt.show()

if  __name__ =='__main__': Main()