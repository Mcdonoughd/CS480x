# Reflection: Visualize information on all 802 Pokemon

[Visualize information on all 802 Pokemon](https://gabrielvcbessa.github.io/pokemon/)

In pokemon you are only allowed to choose 6 of the possible 802 (and then some) pokemon. People have been trying to competetively determine which 6 have the most likely possibility of producing a victory. Gabriel Bessa, made several visualizations to compare several aspects of all the pokemon to we can determine that. The first plot shows the distrobution of pokemon types, via a histogram, not very interesting. The second plot however, he uses a violin plot to compare nonlegendary and legendary pokemon over several stats. In the second plot we an see that the distrobution of pokemon stats is generally skewed higher for legendary pokemon, so we can infer that they are just generally overall better, but have a large mode. 

The most interesting part I find is the last two scatter plots. Here Gabriel calculates the general deterministic expected damage taken vs damge dealt. In the second scatter plot shows the top 100 and labels them with their in-game sprites. Here we can see exactly what pokemon corresponds to what point unlike the first plot. This is extremely interesting in looking at the data from a competetive stand, where we can see pokemon who are considered awful being represented in the top 100, and others such as Pheromosa being an outlier making it seem like it's no very good, when in reality it is a very valuably asset. When you look into the data to see what and how exactly this expected data is calculated you can see that there are some key features missing noteably the Speed feature. In pokemon, each pokemon takes turns dealing damage with the faster one going first. This often means that when the one that goes first will kill the other one before they get to go. So Pheromasa, who is one of the fastest pokemon in the game will often kill their opponents before they go, likewise, Groudon who is increadably slow will take damage before it goes. In addition, this does not take abilities into account. Some abilities cause certain pokemon to be immune to other attacks and sometimes even heal themselves. Thereby this "data that seems right" is actually incorrect and needs more features to be taken into account to be truely accurate. But works great as a simple estimation. If you look closely, you generally see the "tanks" of each pokemon tier clustered from left to right, but not perfectly.


TLDR; Very misleading / wrong conclusions can be drawn from this data
