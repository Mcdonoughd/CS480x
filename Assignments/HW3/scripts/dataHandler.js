//Variables associated with each subject
var id;
var age;
var gender;
var race;
var sexuality;

//variables to keep track of the answer to the question being presented on the screen
var actualPercentage;
var chartType;
var startTime;
//tracks the number of charts that have been tested
var chartsTestedByType = [0,0,0];

var subjectData =[['id', 'age', 'gender', 'race', 'sexuality', 'chartType', 'actualValue', 'perceivedValue', 'error', 'time']]

//if enter is pressed, log the data somewhere
function logData(e) {
  var inputArea = document.getElementById('inputArea')
  var dataPoint = inputArea.value;


  //ask for more input if it isn't valid
  if(isNaN(dataPoint) || dataPoint=="" ||dataPoint > 100 || dataPoint < 0 || Math.floor(dataPoint) != dataPoint){
    alert('Please only enter integer numerical data between 0 and 100 (no percent sign is needed).');
    return
  }
  inputArea.value = "";

  //Log the data
  var error = Math.log2(Math.abs(dataPoint - actualPercentage) + 1/8)
  if(error <= 0){error = 0} //error check if the error value is less than 0
  subjectData.push([id, age, gender, race, sexuality, chartType, actualPercentage, dataPoint, error, Date.now() - startTime])

  //change the chart out
  d3.select('#chartcontainer').select('svg').selectAll("*").remove();
  console.log("Guessed Value: %d, Actual Value: %d, Error: %f", +dataPoint, actualPercentage, error);
  console.log("Full Input Log", subjectData)
  inputArea.focus(); //simple quality of life update
  generateChart();
}

function logDemographicData(){


  //read data from inputs
  age = document.getElementById('age').value;


  if(isNaN(age) || age == ""){
    alert('Please enter age as an integer');
    return
  }

  gender = getRadioButtonValue(document.getElementsByName('gender'))
  if(gender === undefined){
    alert('Please enter your sex');
    return
  }

  race = getDropDownValue(document.getElementById("dropdown"))
  if(race === undefined){
    alert('Please enter your race');
    return
  }

  sexuality = getRadioButtonValue(document.getElementsByName('sexuality'))
  if(sexuality === undefined){
    alert('Please enter your sexuality');
    return
  }

  console.log('%d, %s, %s, %s', +age, gender,race,sexuality)

  //setup the first experiment
  document.getElementById('demographics').remove()

  d3.select('body').insert("h1",":first-child").attr('id','testcounter');


  d3.select('#chartcontainer').append('svg')
    .attr("class", "chart");

  d3.select('body').insert("h3",'#flex-container-row')
      .text("Two values are marked with dots.\n\
      What percentage is the smaller value of the larger value? \n\
      Put your answer in the box below.\n\
      e.g. if you think the smaller one is exactly half of the bigger one, \n\
      please input \"50\"");

  var form = d3.select('#flex-container-row');

  form.append('input').attr('type','text').attr('placeholder', 'Answer').attr('id','inputArea').attr('onkeydown','checkEnter(event)')
  form.append('input').attr('type','submit').attr('value', 'Next').attr('id','submitbutton').attr('onclick','logData()')
  //set the participants id to a unique identifier
  id = Date.now();

  generateChart();
}

//logs the data if the enter key is pressed
function checkEnter(e){
  if(e.keyCode == 13) {
      logData()
  }
}

//gets data of a given dropdown
function getDropDownValue(e){
  return e.options [e.selectedIndex].value;
}

//get the selected value of radio buttons
function getRadioButtonValue(buttons){
  for (var i = 0, length = buttons.length; i < length; i++){
     if (buttons[i].checked){
        var result = buttons[i]
        return result.value
     }
  }
}
