/********************
  TABLE OF CONTENTS
____________________

  1. INIT DATA
  2. LINES
  3. SHAPES


Inspirations: https://www.youtube.com/watch?v=O4kYmdBV7ec&spfreload=10
              https://wallpapersin4k.net/wp-content/uploads/2016/12/Playstation-Logo-Wallpapers-11.jpg
Code References:
  https://d3indepth.com/shapes/
  https://www.dashingd3js.com/svg-paths-and-d3js
  https://www.dashingd3js.com/svg-basic-shapes-and-d3js
  https://stackoverflow.com/questions/2861904/how-to-find-coordinates-of-a-2d-equilateral-triangle-in-c
  https://www.gradient-animator.com/
  https://bost.ocks.org/mike/path/

*********************/

/********************
    INIT DATA
********************/
console.log(d3); // test if d3 is loaded
audio = new Audio( "theme.mp3" );

 window.setTimeout( function ( ) {
   audio.volume = 0.2;
   audio.play();
 }, 0 );
var width = window.innerWidth;
var height = window.innerHeight;

//The SVG Container
var svgContainer = d3.select("body").append("svg")
                                    .attr("width", width)
                                    .attr("height", height);


//Detect Screen Resize
window.onresize = resize;
function resize(){
   console.log("resize event detected!");
   width = window.innerWidth;
   height = window.innerHeight;
   d3.select("svg").remove();

   svgContainer = d3.select("body").append("svg")
                                       .attr("width", width)
                                       .attr("height", height);


   //// TODO: update the size of the lines and shapes
   genLines();
   genCross();
   genCircles();
   genSquare();
   genTriangle();

}

//TODO add animation and generators


/*************************
          LINES
**************************/

//low varience, opaque, thick, slow
var line1 = function(d){
  var n = 10,
      random = d3.randomNormal(0.7, 0.8),
      data = d3.range(n).map(random);

  var x = d3.scaleLinear()
      .domain([0, n - 1])
      .range([0, width]);

  var y = d3.scaleLinear()
      .domain([-1, 1])
      .range([height, height*0.80]);

  var svg = d3.select("svg"),
      g = svg.append("g");

      var line = d3.line()
          .curve(d3.curveCardinal)
          .x(function(d, i) { return x(i); })
          .y(function(d, i) { return y(d); });


      g.append("g")
        .append("path")
          .datum(data)
          .attr("class", "line1")
          .attr("stroke", "white")
          .attr("stroke-width", 4)
          .attr("fill", "none")
          .attr("opacity",(.3))
        .transition()
          .duration(10000)
          .ease(d3.easeLinear)
          .on("start", tick);

     function tick() {
        // Push a new data point onto the back.
        data.push(random());;

        // Redraw the line.
        d3.select(this)
            .attr("d", line)
            .attr("transform", null);

        // Slide it to the left.
        d3.active(this)
            .attr("transform", "translate(" + x(-1) + ",0)")
          .transition()
            .on("start", tick);

        // Pop the old data point off the front.
        data.shift();
      }
}

//low varience varience, opaque, thin, fast
var line2 = function(d){
  var n = 10,
      random = d3.randomNormal(0.9, 1),
      data = d3.range(n).map(random);

  var x = d3.scaleLinear()
      .domain([0, n - 1])
      .range([0, width]);

  var y = d3.scaleLinear()
      .domain([-1, 1])
      .range([height, height*0.85]);

  var svg = d3.select("svg"),
      g = svg.append("g");

      var line = d3.line()
          .curve(d3.curveCardinal)
          .x(function(d, i) { return x(i); })
          .y(function(d, i) { return y(d); });


      g.append("g")
        .append("path")
          .datum(data)
          .attr("class", "line2")
          .attr("stroke", "white")
          .attr("stroke-width", 2)
          .attr("fill", "none")
          .attr("opacity",(.3))
        .transition()
          .duration(5000)
          .ease(d3.easeLinear)
          .on("start", tick);

     function tick() {
        // Push a new data point onto the back.
        data.push(random());;

        // Redraw the line.
        d3.select(this)
            .attr("d", line)
            .attr("transform", null);

        // Slide it to the left.
        d3.active(this)
            .attr("transform", "translate(" + x(-1) + ",0)")
          .transition()
            .on("start", tick);

        // Pop the old data point off the front.
        data.shift();
      }
}

//low varience, opaque, thick, slow (on top)
var line3 = function(d){
  var n = 10,
      random = d3.randomNormal(0.85, 1),
      data = d3.range(n).map(random);

  var x = d3.scaleLinear()
      .domain([0, n - 1])
      .range([0, width]);

  var y = d3.scaleLinear()
      .domain([-1, 1])
      .range([height, height*0.9]);

  var svg = d3.select("svg"),
      g = svg.append("g");

      var line = d3.line()
          .curve(d3.curveCardinal)
          .x(function(d, i) { return x(i); })
          .y(function(d, i) { return y(d); });


      g.append("g")
        .append("path")
          .datum(data)
          .attr("class", "line3")
          .attr("stroke", "white")
          .attr("stroke-width", 5)
          .attr("fill", "none")
          .attr("opacity",(.2))
        .transition()
          .duration(7000)
          .ease(d3.easeLinear)
          .on("start", tick);

     function tick() {
        // Push a new data point onto the back.
        data.push(random());;

        // Redraw the line.
        d3.select(this)
            .attr("d", line)
            .attr("transform", null);

        // Slide it to the left.
        d3.active(this)
            .attr("transform", "translate(" + x(-1) + ",0)")
          .transition()
            .on("start", tick);

        // Pop the old data point off the front.
        data.shift();
      }
}

//low varience, not opaque, thin, slow
var line4 = function(d){
  var n = 10,
      random = d3.randomNormal(0.95, 1),
      data = d3.range(n).map(random);

  var x = d3.scaleLinear()
      .domain([0, n - 1])
      .range([0, width]);

  var y = d3.scaleLinear()
      .domain([-1, 1])
      .range([height, height*0.85]);

  var svg = d3.select("svg"),
      g = svg.append("g");

      var line = d3.line()
          .curve(d3.curveCardinal)
          .x(function(d, i) { return x(i); })
          .y(function(d, i) { return y(d); });


      g.append("g")
        .append("path")
          .datum(data)
          .attr("class", "line4")
          .attr("stroke", "white")
          .attr("stroke-width", 1)
          .attr("fill", "none")
          .attr("opacity",(.8))
        .transition()
          .duration(8500)
          .ease(d3.easeLinear)
          .on("start", tick);

     function tick() {
        // Push a new data point onto the back.
        data.push(random());;

        // Redraw the line.
        d3.select(this)
            .attr("d", line)
            .attr("transform", null);

        // Slide it to the left.
        d3.active(this)
            .attr("transform", "translate(" + x(-1) + ",0)")
          .transition()
            .on("start", tick);

        // Pop the old data point off the front.
        data.shift();
      }
}

//low varience, semi-opaque, thick, slow
var line5 = function(d){
  var n = 10,
      random = d3.randomNormal(0.8, 1),
      data = d3.range(n).map(random);

  var x = d3.scaleLinear()
      .domain([0, n - 1])
      .range([0, width]);

  var y = d3.scaleLinear()
      .domain([-1, 1])
      .range([height, height*0.9]);

  var svg = d3.select("svg"),
      g = svg.append("g");

      var line = d3.line()
          .curve(d3.curveCardinal)
          .x(function(d, i) { return x(i); })
          .y(function(d, i) { return y(d); });


      g.append("g")
        .append("path")
          .datum(data)
          .attr("class", "line5")
          .attr("stroke", "white")
          .attr("stroke-width", 4)
          .attr("fill", "none")
          .attr("opacity",(.5))
        .transition()
          .duration(12000)
          .ease(d3.easeLinear)
          .on("start", tick);

     function tick() {
        // Push a new data point onto the back.
        data.push(random());

        // Redraw the line.
        d3.select(this)
            .attr("d", line)
            .attr("transform", null);

        // Slide it to the left.
        d3.active(this)
            .attr("transform", "translate(" + x(-1) + ",0)")
          .transition()
            .on("start", tick);

        // Pop the old data point off the front.
        data.shift();
      }
}


var genLines =  function(d){
  line1();
  line2();
  line3();
  line4();
  line5();
}


//laod Lines
genLines();


/*********
  SHAPES
********/


/*****
CIRCLES (Shape)
******/


var genCircles = function(d){
  var jsonCircles = [
    { "x_axis": width, "y_axis": height*.82, "radius": width/75,"opacity":0.5, "stroke":"5px", "id": "circle1" },
    { "x_axis": width*1.3, "y_axis": height*.92, "radius": width/75,"opacity":0.6, "stroke":"8px","id": "circle2"},
    { "x_axis": width*1.1, "y_axis": height, "radius": width/25, "opacity":0.4, "stroke":"10px","id": "circle3"},
    { "x_axis": width*2.05, "y_axis": height*.78, "radius": width/40, "opacity":0.55, "stroke":"12px","id": "circle4"},
    { "x_axis": width*1.55, "y_axis": height*.85, "radius": width/40, "opacity":0.4, "stroke":"2px","id": "circle5"},
    { "x_axis": width*1.75, "y_axis": height*.65, "radius": width/40, "opacity":0.4, "stroke":"5px","id": "circle5"},
    { "x_axis": width*1.85, "y_axis": height*1.5, "radius": width/30, "opacity":0.5, "stroke":"2px","id": "circle5"},

    { "x_axis": width*1.75, "y_axis": height*.55, "radius": width/40, "opacity":0.4, "stroke":"5px","id": "circle1"},
    { "x_axis": width*1.65, "y_axis": height*.95, "radius": width/40, "opacity":0.3, "stroke":"1px","id": "circle4"},
    { "x_axis": width*1.95, "y_axis": height*.25, "radius": width/60, "opacity":0.3, "stroke":"6px","id": "circle4"},
  ];


  var circles = svgContainer.selectAll("circle")
                            .data(jsonCircles)
                            .enter()
                            .append("circle");

  var circleAttributes = circles
                         .attr("cx", function (d) { return d.x_axis; })
                         .attr("cy", function (d) { return d.y_axis; })
                         .attr("r", function (d) { return d.radius; })
                         .attr("opacity", function(d){return d.opacity})
                         .attr("class", function(d){return d.id})
                         .style("stroke", "#e84f13")
                         .style("stroke-width", function(d){return d.stroke})
                         .style("fill", "transparent");

}

genCircles();

/*****
SQUARE (Shape)
******/


var genSquare = function(d){

  var jsonSquare = [
    { "x_axis": width*1.1, "y_axis":  height*.85, "radius": 40, "opacity":0.35,"stroke":"5px","id": "square1" },
      { "x_axis": width*1.05, "y_axis":  height*.6, "radius": 40, "opacity":0.3,"stroke":"5px","id": "square4" },
        { "x_axis": width*1.09, "y_axis":  height*.8, "radius": 40, "opacity":0.5,"stroke":"5px","id": "square5" },
          { "x_axis": width*1.5, "y_axis":  height*.78, "radius": 40, "opacity":0.55,"stroke":"5px","id": "square2" },
   { "x_axis": width*1.8, "y_axis":  height*.7, "radius": 20,"opacity":0.3,"stroke":"5px","id": "square2"},
   { "x_axis": width*2, "y_axis":  height*.8, "radius": 55,"opacity":0.5,"stroke":"10px","id": "square3"},
    { "x_axis": width*1.25, "y_axis":  height*.7, "radius": 37,"opacity":0.45,"stroke":"15px","id": "square3"},
    { "x_axis": width*2.12, "y_axis":  height*.75, "radius": 48,"opacity":0.4,"stroke":"12px","id": "square5"},
    { "x_axis": width*1.9, "y_axis":  height*.9, "radius": 25,"opacity":0.55,"stroke":"10px","id": "square4"}
 ];


  var rectangle = svgContainer.selectAll("rect")
                            .data(jsonSquare)
                            .enter()
                            .append("rect");

  var squareAttributes = rectangle
                            .attr("x", function (d) { return d.x_axis; })
                            .attr("y", function (d) { return d.y_axis; })
                            .attr("width", function (d) { return d.radius * 2; })
                            .attr("height", function (d) { return d.radius * 2; })
                            .attr("opacity", function(d){return d.opacity})
                            .attr("class", function(d){return d.id})
                            .style("stroke", "#d591bd")
                            .style("stroke-width", function(d){return d.stroke})
                            .style("fill", "transparent");
}

genSquare();

/*****
TRIANGLE (Polygon)
******/

var genTriangle = function(d){

  var jsonTri = [
    { "x_axis": width*1.5, "y_axis": height*1.2, "radius": 50,"opacity":0.85,"stroke":"5px","id": "triangle1" },
   { "x_axis": width*2, "y_axis": height*0.8, "radius": 180,"opacity":0.45,"stroke":"8px","id": "triangle2"},
   { "x_axis": width*1.25, "y_axis": height*0.72, "radius": 40,"opacity":0.6,"stroke":"4px","id": "triangle3"},

   { "x_axis": width, "y_axis": height*0.72, "radius": 90,"opacity":0.5,"stroke":"7px","id": "triangle3"},
   { "x_axis": width*1.8, "y_axis": height*0.72, "radius": 80,"opacity":0.3,"stroke":"4px","id": "triangle4"},
   { "x_axis": width*0.8, "y_axis": height*1.2, "radius": 46,"opacity":0.8,"stroke":"4px","id": "triangle3"},
   { "x_axis": width*1.05, "y_axis": height*0.95, "radius": 37,"opacity":0.4,"stroke":"2px","id": "triangle1"},
   { "x_axis": width*1.9, "y_axis": height*0.8, "radius": 60,"opacity":0.21,"stroke":"4px","id": "triangle2"},
   { "x_axis": width*1.5, "y_axis": height*0.72, "radius": 20,"opacity":0.32,"stroke":"4px","id": "triangle5"}


 ];


  //calculate triangle given and x,y and length
   var trianglePoints = function(x,y,r){
     //50 15, 100 100, 0 100
     var x1 = (x + r);
     var y1 = (y + r);

     var x2 = (x1 + r);
     var y2 = (y1 + r);

     var s60 = Math.sin(60 * 3.14 / 180.0);
     var c60 = Math.cos(60 * 3.14 / 180.0);

     var x3 = c60 * (x1 - x2) - s60 * (y1 - y2) + x2;
     var y3 =  s60 * (x1 - x2) + c60 * (y1 - y2) + y2;


     var point1 = x1 + "," + y1 + " ";
     var point2 = x2 + "," + y2 + " ";
     var point3 = x3 + "," + y3 + " ";

     return point1 + point2 + point3 + point1;
   }

   var triangle = svgContainer.selectAll("polygon")
                             .data(jsonTri)
                             .enter()
                             .append("polygon");

   var trianlgeAttributes = triangle
                               .attr('points', function(d){ return trianglePoints(d.x_axis,d.y_axis,d.radius); })
                               .attr("class", function(d){ return d.id;})
                               .style("stroke", "#20b292")
                               .style("stroke-width",function(d){ return d.stroke;})
                               .style("opacity",function(d){return d.opacity;})
                               .style("fill", "transparent");
}

genTriangle();

/**********
  CROSS (Symbol)
**********/
var genCross = function(d){
  var jsonCross= [
    { "x_axis": width, "y_axis":height*0.8, "radius": 300,"opacity":0.3,"stroke":"1px","id": "cross1" },
   { "x_axis": width*1.6, "y_axis":  height*1.35, "radius": 590,"opacity":0.32,"stroke":"1px","id": "cross2"},
   { "x_axis": width*1.5, "y_axis":  height*0.65, "radius": 150,"opacity":0.12,"stroke":"1px","id": "cross3"},
   { "x_axis": width*1.7, "y_axis":  height*1.25, "radius": 420,"opacity":0.32,"stroke":"1px","id": "cross2"},
   { "x_axis": width*1.4, "y_axis":  height*1.25, "radius": 350,"opacity":0.20,"stroke":"2px","id": "cross1"},
   { "x_axis": width*1.2, "y_axis":  height*1.5, "radius": 380,"opacity":0.25,"stroke":"1px","id": "cross3"},
   { "x_axis": width*1.1, "y_axis":  height*1.5, "radius": 300,"opacity":0.22,"stroke":"1px","id": "cross4"},
   { "x_axis": width*1.3, "y_axis":  height*1.2, "radius": 450,"opacity":0.12,"stroke":"3px","id": "cross4"},
   { "x_axis": width*2, "y_axis":  height*1.4, "radius": 100,"opacity":0.42,"stroke":"2px","id": "cross5"},
   { "x_axis": width*2.1, "y_axis":  height*1, "radius": 800,"opacity":0.22,"stroke":"1px","id": "cross5"},
   { "x_axis": width*1.8, "y_axis":  height*1.5, "radius": 300,"opacity":0.52,"stroke":"2px","id": "cross4"}

 ];

  var cross = svgContainer.selectAll('.symbol')
     .data(jsonCross)
     .enter()
     .append('path');

  var symbol = d3.symbol()
   .type(d3.symbolCross);

  var crossAttributes = cross
                          	.attr('transform',function(d){return "translate("+ d.x_axis +","+ d.y_axis +") rotate(-45)"; })
                           .attr("d", symbol.size(function(d) { return d.radius * 5 }))
                           .attr("class", function(d) { return d.id })
                           .style("stroke-width", function(d) { return d.stroke})
                           .style("opacity",function(d){return d.opacity;})
                           .style("fill", "#668db7")
                           .style("stroke", "#000000");

}


genCross();
