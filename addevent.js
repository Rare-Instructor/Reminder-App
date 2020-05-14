var database = firebase.database();
var event = database.ref('Events');
event.on("value", getData, errData);
var  alertwell;
 
document.getElementById('addEvent').addEventListener("submit", addEvent);

function addEvent(e){
    e.preventDefault();

    var eventName = getInput('event-name');
    var eventDay = getInput('event-day');
    var eventTime = getInput('event-time');
    var eventNote = getInput('event-note');
    var eventMin = getInput('event-min');

    console.log(eventName);

    saveEvent (eventName, eventDay, eventTime,eventMin, eventNote);
}

function getInput(id){
    return document.getElementById(id).value;
}


function saveEvent(name, day, time,min, note){
var newEvent = event.push();

newEvent.set({
    eventName : name,
    eventDay : day,
    eventTime : time,
    eventMin : min,
    eventNote : note
});
}

Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}
var newDate = new Date();
var datetime = newDate.timeNow();
console.log(datetime);
function setup(){
    alertwell = loadSound('that-was-quick.mp3');
} 

function getData(data){
    console.log("event ok!");

    var list = data.val();
   
    var keys = Object.keys(list);

  
for (j=0; j<10; j++){
  
    for(i = 0; i < keys.length-j; i++){
        console.log("list-"+(j+1));
        //console.log(day);
      var key = keys[i];
     // console.log("key", key)
      var eachmessage = list[key].eventName;
      document.getElementById('list-name-'+(j+1)).innerHTML = "<b>"+eachmessage+"</b>&nbsp;&nbsp;&nbsp;&nbsp;" ;

      var eachTime = list[key].eventTime;
      
      var eachMin = list[key].eventMin;
      document.getElementById('list-time-'+(j+1)).innerHTML = "&nbsp;&nbsp;"+eachTime+":"+ eachMin +"&nbsp;&nbsp;&nbsp;&nbsp;" ;


      var eachDay = list[key].eventDay;
      document.getElementById('list-day-'+(j+1)).innerHTML = "&nbsp;&nbsp;"+eachDay+"&nbsp;&nbsp;&nbsp;&nbsp;" ;
      
      var eachNote = list[key].eventNote;
      document.getElementById('list-note-'+(j+1)).innerHTML = eachNote ;

      var eachevent = database.ref('Events/'+key);

      document.getElementById('del-event-'+(j+2)).onclick = function(){
          eachevent.remove();
          alert("Event Deleted      Please refresh to see new changes");
      }

      var firstevent = database.ref('Events/'+keys[keys.length-1]);

      document.getElementById('del-event-1').onclick = function(){
          firstevent.remove();
          alert("Event Deleted      Please refresh to see new changes");
      }
 
      document.getElementById('del-all-list').onclick = function(){
          event.remove();
          alert("All events have been deleted      Please refresh to see new changes");
      }
      var hour = newDate.getHours();
      var min = newDate.getMinutes();
      var day = newDate.getDay();
      //console.log(min);
      var dayInt;
      if (eachDay == "Sunday"){
          dayInt = 0;
      } if (eachDay == "Monday"){
          dayInt = 1;
      } if (eachDay == "Tuesday"){
        dayInt = 2;
      } if (eachDay == "Wednesday"){
          dayInt = 3;
      } if (eachDay == "Thursday"){
          dayInt = 4;
      } if (eachDay == "Friday"){
          dayInt = 5;
      } if (eachDay == "Saturday"){
          dayInt = 6;
      }
     if(eachTime <= hour && eachMin < min && dayInt == day){

        alertwell.play();

        alert("Your Scheduled task  "+ eachmessage +", at "+eachTime+" hours, on "+eachDay+" : "+eachNote);
       
      
    } 
    
    }

    }
} 



