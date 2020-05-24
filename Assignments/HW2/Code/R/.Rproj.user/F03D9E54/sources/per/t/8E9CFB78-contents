library(scatterD3)
MyData <- read.csv(file="DataVis.csv", header=TRUE, sep=",")

MyData$names <- rownames(MyData)
scatterD3(data = MyData, x = Time, y = Happiness,
          col_var = Library, symbol_var = Language, 
          xlab = "Time", ylab = "Happiness", col_lab = "Library",
          symbol_lab = "Language",point_opacity = 0.2,hover_opacity = 1,
          menu = FALSE)


