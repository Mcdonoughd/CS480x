# Give the chart file a name.
require(ggplot2)
MyData <- read.csv(file="cars-sample.csv", header=TRUE, sep=",")

# Set color by cond
ggplot(MyData, aes(x=Weight, y=MPG, size=Weight, color=Manufacturer)) + 
  geom_point(alpha=0.5) +
  labs(title = "ggplot2",
       x = "Weight",
       y = "MPG")


ggsave(file = 'ggplot2.png', height = 5, width = 5)

