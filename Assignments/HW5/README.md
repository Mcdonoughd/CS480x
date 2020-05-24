# Water Filler
## [Project Website](https://svadivazhagu.github.io/final)  
![Logo](docs/img/waterfiller.png)
### [Surya Vadivazhagu](https://github.com/svadivazhagu), [Alexander Wurts](https://github.com/ajwurts), [Daniel McDonough](https://github.com/McDonoughd), and [Nathan Dennler](https://github.com/ndennler)

## Description and Use
Each circle represents a region of the USA. When the program first starts the user sees a huge dot for the USA, and they click to move inside. The US is divided into 5 regions, Northeast, South, West, Midwest, and Islands. The circle size throughout is based on the regions population compared to the other dots in the region. Each region has a pie chart on top which shows the regions water usage. The pie chart is there to understand the relative use of each area compared to another. **The absolute value is irrelevant for the purposes of the visualization.** The visualization can be expanded down to the state level with a view of all its counties. There is a legend to the right to describe what the colors on the pie charts mean. To move back up the chart click outside the selected circle. 

---

## Searching
There is a search bar to look for a certain region or state. Enter the 2 letter abbreviation for the state or the full length region name and it will zoom to that area. If you search for USA it will jump back to the top level.

---

## The Data Set


As described in the Process Book, the dataset used for this came from a survey conducted by the United States Geological Survey in 2015. [It](https://www.sciencebase.gov/catalog/item/get/5af3311be4b0da30c1b245d8) contains all 3100+ counties in America with 131 attributes per county with regards to water consumption. Various sectors of water consumption were measured, and a significant amount of data cleaning was done on our part to shape the data to a structure feasible for visualization with d3.js. For example, we had to design a hierarchical structure to represent counties in (Country root level expanding down to individual county level) the circle packing structure. Furthermore, we had to synthesize various columns together to get a holistic evaluation of the county's consumption of water for that particular sector. This proved particularly challenging when coming to the differentiation of public supply and domestic water and how the two were classed in the dataset. We worked around this roadblock by only cataloging water withdrawals as domestic (i.e. self sourced) if they were sourced from a well. This highlights the work that went into the transformation of this dataset into a shape best fit for the circle packing graph.
