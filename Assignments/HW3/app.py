#Python Server by Daniel McDonough and Nathan Dennler

from io import BytesIO
from pystan import StanModel
import pandas as pd
import json
import codecs
import numpy as np
from numpy import genfromtxt
import csv
import os.path
from flask import Flask, request, send_from_directory, send_file, jsonify
import flask_csv
#our Model in STAN
model = """
data {
    int<lower=0> N;
    vector[N] x;
    vector[N] y;
}
parameters {
    real alpha;
    real beta;
    real<lower=0> sigma;
}
model {
    y ~ normal(alpha + beta * x, sigma);
}
"""
sm = StanModel(model_code=model)  # compile PyStan Model


def POST_REQ(data):
    decoded = data.decode("utf-8").replace('"', "").replace("[", "").replace("]", "")  # convert into string

    D1_Array = np.asarray(decoded.split(","), dtype=None)  # convert into list

    # if there are not 610 data points in the array (including header) then something messed up
    if D1_Array.shape[0] == 610:
        error = False
        ND_Array = D1_Array.reshape(61, 10)  # convert into numpy ND array (61 entries including the head, 10 features)
        participant_id = ND_Array[1, 0]
        np.savetxt("./subjectdata/"+str(participant_id) + ".csv", ND_Array, delimiter=",", fmt='%s',
                   encoding='utf-8')  # save the participants data
        # self.send_response(200)

    # Reduse to an error CSV of zeros just for testing
    else:
        error = True
        print("Error")
        ND_Array = np.zeros((61, 10), dtype=int)
        np.savetxt("Error.csv", ND_Array, delimiter=",")  # save the participants data
        # Tell the front end that we didnt receive their data
        # self.send_response(503)

    fn = "./subjectdata/master.csv"
    print(os.getcwd())
    # if the file already exists then doent rewrite the head
    if os.path.isfile(fn):
        # append the new data to the end of Master.csv
        if not error:
            with open(fn, 'a+') as f:  # this should create a new csv is master does not exist
                writer = csv.writer(f)
                for i in range(1, 61):  # do not apend the head again
                    writer.writerow(ND_Array[i])

    # otherwise, create a new master.csv and write the header
    else:
        print("Master.csv not found")
        # append the new data to the end of Master.csv
        if not error:
            with open(fn, 'a+') as f:  # this should create a new csv is master does not exist
                writer = csv.writer(f)
                for i in range(0, 61):  # append the head again
                    writer.writerow(ND_Array[i])

    # load the csv into an array
    master = genfromtxt('./subjectdata/master.csv', delimiter=',', dtype=None, encoding='utf-8')

    # do the analysis...
    analysis = Baysian(master)
    # convert to json
    json_string = json.dumps(analysis)
    return bytearray(json_string.encode("utf8"))


#Converts the master csv into readable data, runs STAN then returns the analysis
def Baysian(master):
    # print(master)

    # get columns for chart type and error
    charttype = master[:, 5]
    error = master[:, 8]
    data = np.vstack((charttype, error)).T

    barcharts = data[np.where(data[:, 0] == 'barChart'), 1][0].astype(float)
    piecharts = data[np.where(data[:, 0] == 'pieChart'), 1][0].astype(float)
    rosecharts = data[np.where(data[:, 0] == 'roseChart'), 1][0].astype(float)

    barAnal = Stan(barcharts,"barChart")
    pieAnal = Stan(piecharts,"pieChart")
    roseAnal = Stan(rosecharts,"roseChart")

    Analysis = [barAnal, pieAnal,roseAnal]
    print(Analysis)
    return Analysis

#runs Baysian inference (kinda confusing naming scheme eh?)
def Stan(data,head=""):
    y = np.mean(data) + np.zeros(len(data))

    y = np.random.normal(y, scale=1.0)
    data = {'N': len(data), 'x': data, 'y': y}

    fit = sm.sampling(data=data,iter=1000, chains=4, warmup=500, thin=1, seed=101) #run baysien inference
    alpha = fit['alpha']

    # Summary statistics
    mean = np.mean(alpha)
    #median = np.median(alpha)
    cred_min, cred_max = np.percentile(alpha, 2.5), np.percentile(alpha, 97.5)

    return {"chartType": head,"mean":mean,"min":cred_min,"max":cred_max}

def Main():
    app = Flask(__name__, static_url_path='') #create the server
    print("Server has begun Running...")

    #load the index.html
    @app.route('/index.html', methods=["GET", "POST"])
    def send_index():
        if request.method == "POST":
            data = request.data
            mailout = POST_REQ(data)
            response = app.response_class(
                response=mailout,
                status=200,
                mimetype='text/plain'
            )
            return response
        else:
            return send_from_directory('./','index.html')

    # #fetch the csv
    @app.route('/subjectdata/<path:path>', methods=["GET","POST"])
    def send_csv(path):
        df = pd.read_csv("./subjectdata/"+path)
        return df.to_csv()

    #load js
    @app.route('/scripts/<path:path>')
    def send_js(path):
        return send_from_directory('./scripts/', path)

    #load css
    @app.route('/styles/<path:path>')
    def send_css(path):
        return send_from_directory('./styles/', path)

    app.run()



if __name__== "__main__" :
 Main()
