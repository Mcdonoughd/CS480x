library(scatterD3)
MyData <- read.csv(file="cars-sample.csv", header=TRUE, sep=",")

MyData$names <- rownames(MyData)
scatterD3(data = MyData, x = Weight, y = MPG,
          col_var = Manufacturer, size_var = Weight, 
          xlab = "Weight", ylab = "Mpg", col_lab = "Manufacturer",
          size_lab = "Weight",point_opacity = 0.5,hover_opacity = 1)


