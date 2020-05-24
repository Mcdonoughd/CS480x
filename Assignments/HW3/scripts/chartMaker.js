//generate a chart to test
function generateChart(){
  var chartOption = Math.random();
  var trialsPerChartType = 20;


  document.getElementById('inputArea').focus(); //reset focus to text area
  var testnum = ''+ (chartsTestedByType.reduce(add, 0)+1); //increase experiment counter
  document.getElementById('testcounter').innerHTML='Experiment '.concat(testnum.concat('/60')); //edit the text
  console.log("Chart Type Counter: ", chartsTestedByType)


  if(chartOption < 0.33 && chartsTestedByType[0] < trialsPerChartType){
    actualPercentage = makeBarChart();
    chartType = 'barChart'
    startTime = Date.now();
    chartsTestedByType[0] += 1;
  }
  else if(chartOption < 0.67 && chartsTestedByType[1] < trialsPerChartType){
    actualPercentage = makePieChart();
    chartType = 'pieChart'
    startTime = Date.now();
    chartsTestedByType[1] += 1;
  }
  else if(chartsTestedByType[2] < trialsPerChartType){
    actualPercentage = makeRoseChart();
    chartType = 'roseChart'
    startTime = Date.now();
    chartsTestedByType[2] += 1;

  } else {
    if(chartsTestedByType.every(function (d){return d >= trialsPerChartType;})){

      endscreen(); //load the end screen

      return

    } else {
      generateChart();
    }
  }
}

//get sum of an array
function add(a, b) {
    return a + b;
}


//returns the actual answer to the question what percentage is the smalle of the larger
function getTruePercentage(data, indices){
  var smaller = Math.min(data[indices[0]], data[indices[1]])
  var larger = Math.max(data[indices[0]], data[indices[1]])
  return Math.round((smaller/larger) * 100)
}

//generate an array of 10 random numbers
function generateData(numDataPoints){
  var data = [];
  for (var i=0; i<numDataPoints; i++) {
      data.push(Math.round(Math.random() * 100))
  }
  return data
}

//generates the N number of data points in dictionary format for a piechart
function generatePieData(numDatapoints, realData){
  var dict = [];
  for (var i=0; i<numDatapoints; i++) {
    dict.push({
      name: "•",
      value: realData ? Math.round(Math.random() * 100) : 0
    });
  }
  return dict
}


//clear all DOM nodes from the svg
function clearchart(){
  var chart = document.getElementsByTagName("svg")[0];
  while (chart.firstChild) {
      chart.removeChild(chart.firstChild);
  }
}


//generate the indices to compare
function generateIndices(numDataPoints){

  var firstIndex = Math.floor(Math.random() * numDataPoints)
  //we want the second index to not be adjacent to the first
  var secondIndex = (firstIndex + Math.floor(Math.random() * (numDataPoints - 3)) + 2) % numDataPoints

  return [firstIndex, secondIndex]
}




//make a bar chart
function makeBarChart(){

  var data = generateData(10)
  var barPadding = 5;
  var margins = 40;


  var svg = d3.select('#chartcontainer').select('svg')

  var svgWidth = +svg.style("width").replace("px", "");
  var svgHeight = +svg.style("height").replace("px", "");



  var chartcontainer = document.getElementById("chartcontainer")
  chartcontainer.style.height = svgHeight;
  chartcontainer.style.width = svgWidth;


  var barWidth = (svgWidth-2*margins) / data.length;
  var scaleY = d3.scaleLinear()
                 .domain([0,100])
                 .range([svgHeight - 2*margins, 0]);

  clearchart() // remove current chart

  //create the bar chart
  var barChart = svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", function(d) {
          return svgHeight - margins
      })
      .attr("height", function(d) {
          return 0;
      })
      .attr("width", barWidth - barPadding)
      .attr("transform", function (d, i) {
           var translate = [barWidth * i + margins + barPadding, 0];
           return "translate("+ translate +")";
      })
      //animate it to rise from the bottom
      .transition().duration(500)
      .attr("height", function(d) {
          return scaleY(100 - d);
      })
      .attr("y", function(d) {
            return scaleY(d) + margins
      })
      .style("fill", "black")
      .attr("fill-opacity","0")
      .style("stroke","black")
      ;


  var indices = generateIndices(10)

  var markers = svg.selectAll("circle")
      .data(indices)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
          return d*barWidth + margins + barWidth/2 + barPadding/2;
      })
      .attr("cy", svgHeight - 3*margins / 4)
      .attr("r", 4)
      .style("fill", "black")
      .attr("fill-opacity","0")

      //transition to fade in
      .transition().duration(500)
      .attr("fill-opacity", 1);


      var scale = d3.scaleLinear()
                    .domain([0, 100])
                    .range([svgHeight- margins*2, 0]);

      var y_axis = d3.axisLeft()
                    .scale(scale)
                    .ticks(1);

      svg.append("g")
         .attr("transform", "translate("+ margins  +", "+ margins +")")
         .call(y_axis);

      return getTruePercentage(data, indices)

}





//make a pie chart
function makePieChart(){

  var zeros = generatePieData(10, 0)
  var data = generatePieData(10, 1)
  var barPadding = 0;
  var margins = 40;

  var svg = d3.select('#chartcontainer').select('svg')

  var svgWidth =+ svg.style("width").replace("px", "");
  var svgHeight =+ svg.style("height").replace("px", "");

  // Store the displayed angles in _current.
  // Then, interpolate from _current to the new angles.
  // During the transition, _current is updated in-place by d3.interpolate.
  function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return arc(i(t));
    };
  }

  clearchart();


    var radius = Math.min(svgWidth, svgHeight) / 2 - 50;

    g = svg.append("g").attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");

    var pie = d3.pie()
      .value(function(d) { return d.value; })
      .sort(null);

    var indices = generateIndices(10)

    var pieGroup = g.selectAll(".pie")
      .data(pie(data))
      .enter()
      .append("g");

    arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);

    var path = g.datum(zeros).selectAll("path")
        .data(pie)
      .enter().append("path")
        .attr("fill-opacity", 0)
        .attr("stroke", "black")
        .attr("d", arc)
        .each(function(d) { this._current = d; }); // store the initial angles

    pie.value(function(d, i) { return data[i].value; }); // change the value function
    path = path.data(pie); // compute the new angles
    path.transition().duration(500).attrTween("d", arcTween); // redraw the arcs

    var text = d3.arc()
      .outerRadius(radius + 20)
      .innerRadius(radius + 20);

      pieGroup.append("text")
        .attr("fill", "black")
        .attr("transform", function(d) { return "translate(" + text.centroid(d) + ") scale(2)"; })
        .attr("dy", "5px")
        .attr("font-size", "26px")
        .attr("text-anchor", "middle")
        .attr("fill-opacity", 0)
        .style("display",function(d,i) {
          if(i == indices[0] || i == indices[1]){
            return "visible";
          }
            return "none";
        })
        .text(function(d) { return d.data.name; })
        .transition().delay(300).duration(200).attr("fill-opacity", 1);

        return getTruePercentage(data.map(function(d){return d.value}), indices)
    }


//make a rose chart
//http://bl.ocks.org/kgryte/5926740
//https://www.tutorialspoint.com/d3js/d3js_drawing_charts.htm
function makeRoseChart(){

  var data = generateData(10)
  var indices = generateIndices(10)
  var margins = 40;


  var svg = d3.select('#chartcontainer').select('svg')

  var svgWidth = +svg.style("width").replace("px", "");
  var svgHeight = +svg.style("height").replace("px", "");

  var maxRadius = Math.min(svgWidth, svgHeight) / 2 - margins;

  var g = svg.append("g")
     .attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");

  var pie = d3.pie().value(10); //ten percent of the circle angle each

  var radiusScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([0, maxRadius]);

  var path = d3.arc()
     .innerRadius(0);

  var label = d3.arc()
     .outerRadius(maxRadius + 40).innerRadius(maxRadius);

     var arc = g.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc")
     arc.append("path")
        .each(function(d) { d.outerRadius = 0; })
        .attr("d", path)
        .attr("fill-opacity", 0)

        .transition().duration(500)
                .attrTween("d", function(d,index) {
                  var i = d3.interpolate(d.outerRadius, radiusScale(+d.data));
                  return function(t) { d.outerRadius = i(t); return path(d,index); };
                });

     arc.append("text")
     .attr("fill", "black")
     .attr("transform", function(d) { return "translate(" + label.centroid(d) + ") scale(2)"; })
     .attr("dy", "5px")
     .attr("font-size", "26px")
     .attr("opacity", 0)
     .attr("font-size", "26px")
     .text(function(d) { return '•'; })
     .transition().duration(500)
     .attr("opacity", function(d,i){ return i == indices[0] || i ==indices[1] ? 1 : 0; });

     g.append('circle')
     .attr("cx", 0)
     .attr("cy", 0)
     .attr("r", maxRadius)
     .attr("fill-opacity","0")
     .style("stroke", d3.rgb(0, 0, 0))
     .style("stroke-width", 1)
     .attr("opacity", 0.5)


     g.append('text')
     .attr("y", 5-maxRadius)
     .attr("font-size", 12)
     .attr("text-anchor", "middle")
     .text('100')
     .attr("opacity", 0.5)

     return getTruePercentage(data, indices)
}


function makeBeeSwarmChart(pointdata, boxplotdata){
  var svg = d3.select('#chartcontainer').select('svg')
    svg.attr("class","resultchart");

  var svgWidth =+ svg.style("width").replace("px", "");
  var svgHeight =+ svg.style("height").replace("px", "");


  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 0, bottom: 40, left: 100},
      width = svgWidth - margin.left - margin.right,
      height = svgHeight - margin.top - margin.bottom;


  var id = pointdata[1,0]
  // Read the data and compute summary statistics for each specie

  //read the newly saved data csv (much easier to read/parse)
  d3.csv("./subjectdata/"+pointdata[1][0]+".csv", function(data) {
    console.log(pointdata)
    console.log(boxplotdata)
    console.log(data)

    // Show the Y scale
    var y = d3.scaleBand()
      .range([ height, 0 ])
      .domain(["roseChart", "pieChart", "barChart"])
      .padding(.4);

    svg.append("g")
      .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")
      .style("font-size", "12px")
      .call(d3.axisLeft(y).tickSize(0))
      .select(".domain").remove()

    // Show the X scale
    var x = d3.scaleLinear()
      .domain([-1,6])
      .range([margin.left, width]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5))
      .select(".domain").remove()


    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width-margin.left-40)
        .attr("y", height + margin.top + 30)
        .text("Perceived Error");



//MOUSE FUNCTIONS
    // create a tooltip
    var tooltip = d3.select("#chartcontainer")
      .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("font-size", "16px")
    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", 1)
      tooltip.html("<span style='color:grey'>Percieved Error: </span>" + d.error.substring(0,4))
          .style("left", (d3.mouse(this)[0]+30) + "px")
          .style("top", (d3.mouse(this)[1]+30) + "px")
    }
    var mean_mouseover = function(d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", 1)
      tooltip.html("<span style='color:grey'>Expected Average Error: </span>" + String(d.mean).substring(0,4))
          .style("left", (d3.mouse(this)[0]+30) + "px")
          .style("top", (d3.mouse(this)[1]+30) + "px")
    }
    var mousemove = function(d) {
      tooltip.style("left", (d3.mouse(this)[0]+30) + "px")
        .style("top", (d3.mouse(this)[1]+30) + "px")
    }
    var mouseleave = function(d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", 0)
    }


  //SUBJECT DATA POINTS
  // Add individual points with jitter
  var jitterWidth = 50
  svg.selectAll("indPoints")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d){ return(x(parseFloat(d.error)))})
      .attr("cy", function(d){ return( y(d.chartType) + (y.bandwidth()/2) - jitterWidth/2 + Math.random()*jitterWidth )})
      .attr("r", 4)
      .style("opacity",0.2)
      //.style("fill", function(d){ return(myColor(+d.error)) })
      .attr("stroke", "black")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

      // Show the mean of global data

      //GLOBAL MEAN CIRCLE
      svg.selectAll("meanCircle")
        .data(boxplotdata)
        .enter()
        .append("circle")
          .attr("cy", function(d){return(y(d.chartType) + y.bandwidth()/2)})
          .attr("cx", function(d){return(x(parseFloat(d.mean)))})
          .attr("r", 5)
          .attr("stroke", "red")
          .attr("fill","red")
          .style("width", 80)
          .on("mouseover", mean_mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)

        // Show the global 95%Confidence_interval
        svg.selectAll("vertLines")
          .data(boxplotdata)
          .enter()
          .append("line")
            .attr("x1", function(d){return(x(parseFloat(d.min)))})
            .attr("x2", function(d){return(x(parseFloat(d.max)))})
            .attr("y1", function(d){return(y(d.chartType) + y.bandwidth()/2)})
            .attr("y2", function(d){return(y(d.chartType)+ y.bandwidth()/2 )})
            .attr("stroke", "red")
            .style("width", 40)


  // /*BOX PLOT based on subject data*/
  // // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
  //   var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
  //     .key(function(d) { return d.chartType;})
  //     .rollup(function(d) {
  //       q1 = d3.quantile(d.map(function(g) { return g.error;}).sort(d3.ascending),.25)
  //       median = d3.quantile(d.map(function(g) { return g.error;}).sort(d3.ascending),.5)
  //       q3 = d3.quantile(d.map(function(g) { return g.error;}).sort(d3.ascending),.75)
  //       interQuantileRange = q3 - q1
  //       min = q1 - 1.5 * interQuantileRange
  //       max = q3 + 1.5 * interQuantileRange
  //       return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
  //     })
  //     .entries(data)
  //
  //
  //     // Show the main vertical line
  // svg.selectAll("vertLines")
  //   .data(sumstat)
  //   .enter()
  //   .append("line")
  //     .attr("x1", function(d){return(x(d.value.min))})
  //     .attr("x2", function(d){return(x(d.value.max))})
  //     .attr("y1", function(d){return(y(d.key) + y.bandwidth()/2)})
  //     .attr("y2", function(d){return(y(d.key) + y.bandwidth()/2)})
  //     .attr("stroke", "black")
  //     .style("width", 40)
  //     .style("opacity", 0.2)
  //
  // // rectangle for the main box
  // svg.selectAll("boxes")
  //   .data(sumstat)
  //   .enter()
  //   .append("rect")
  //       .attr("x", function(d){return(x(d.value.q1))}) // console.log(x(d.value.q1)) ;
  //       .attr("width", function(d){ ; return(x(d.value.q3)-x(d.value.q1))}) //console.log(x(d.value.q3)-x(d.value.q1))
  //       .attr("y", function(d) { return y(d.key); })
  //       .attr("height", y.bandwidth() )
  //       .attr("stroke", "black")
  //       .style("fill", "#69b3a2")
  //       .style("opacity", 0.2)
  //
  // //subject MEAN CIRCLE
  // svg.selectAll("meanCircle2")
  //   .data(sumstat)
  //   .enter()
  //   .append("circle")
  //     .attr("cy", function(d){return(y(d.key) + y.bandwidth()/2)})
  //     .attr("cx", function(d){return(x(d.value.median))})
  //     .attr("r", 5)
  //     .attr("stroke", "blue")
  //     .attr("fill","blue")
  //     .style("width", 80)
  //     .on("mouseover", mean_mouseover)
  //     .on("mousemove", mousemove)
  //     .on("mouseleave", mouseleave)
  //
  //
  })
}




function endscreen(){
  console.log('end of survey')
  //get rid of the text field and buttons
  document.getElementById('flex-container-row').remove()

  //replace body text with thank you message and graph of standings
  d3.select('body').html('')
  d3.select('body').append('h1').text("End of Experiment")
  d3.select('body').append('div').attr('id','chartcontainer').append('svg').attr("class", "chart");
  d3.select('body').append('h2').text("Thanks for taking the survey -- here is how you did").attr('id','endNote');
  save_csv();
}


//As a baseline, compare your average Error scores to the following chart,
//which include both Cleveland and McGill’s results as well as more recent extensions of this experiment
//(lower error indicates better performance, and error bars are bootstrapped 95% confidence intervals
//(`http://en.wikipedia.org/wiki/Confidence_interval#Meaning_and_interpretation`)):



//handle search response
  function handle_res_get() {
    switch(this.readyState){
      case 1:
          console.log("Opened Query MSG");
          break;
      case 2:
          console.log("Reading Query HEADER");
          break;
      case 3:
          console.log("Loading Query Data");
          break;
      case 4:
      if (this.status == 200) {
          var myArr = this.response;
          console.log(myArr)

            makeBeeSwarmChart(subjectData,JSON.parse(myArr));
          
        }
        else if(this.status == 404){
          console.log("Error 404");
        }
        else{
          console.log('Error 503');
        }
        break;
      default:
        console.log("Something Went wrong...");
        break;
      }
    }


//send data to the server to be saved
function save_csv(){
  console.log("Saving local Data...");
  var xml = new XMLHttpRequest();
  xml.open("POST", "");
  xml.onreadystatechange = handle_res_get; //handler when response
  xml.send(JSON.stringify(subjectData));
}
