library(ggvis)
library(dplyr)
MyData <- read.csv(file="cars-sample.csv", header=TRUE, sep=",")

na.omit(MyData) %>% 
  ggvis(~Weight, ~MPG) %>% 
  layer_points(size := ~factor(Weight/20),fill = ~factor(Manufacturer),opacity:=1/2)

ggsave(file = 'ggvis.png', height = 5, width = 5)
