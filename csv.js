
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function() {
   $("button").click(function() {
     calculate();
   });
 });
 
 window.onload = function() {

  if (window.localStorage && localStorage.str_input) {
    document.getElementById("textbox_input").value = localStorage.str_input;
  }
};

function calculate() {
  var result;
  var str_input = document.getElementById("textbox_input");
  var temp = str_input.value;
  var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;
  var lines = temp.split(/\n+\s*/);
  var commonLength = NaN;
  var r = [];
  
  // Template using underscore
  var row = "<% _.each(items, function(name) { %>" +
            " <td><%= name %></td>" +
            " <% }); %>";

  if (window.localStorage) 
	localStorage.original = temp;
  
  for(var t in lines) {
    var temp = lines[t];
    var m = temp.match(regexp);
    var result = [];
    var error = false;
    
    if (m) {
      if (commonLength && (commonLength != m.length)) {
        //alert('ERROR! row <'+temp+'> has '+m.length+' items!');
        error = true;
      }
      else {
        commonLength = m.length;
        error = false;
      }
      
      for(var i in m) {
        m[i] = m[i].replace(/,\s*$/,'');
        m[i]= m[i].replace(/^\s*"/,'');
        m[i] = m[i].replace(/"\s*$/,'');
        m[i] = m[i].replace(/\\"/,'"');
        
        result.push(m[i]);
      }
      
      var tr = error? '<tr class="error">' : '<tr>';
      r.push(tr+_.template(row, {items : result})+"</tr>");
    }
    else {
      alert('ERROR! row ' + temp + ' does not look as legal CSV');
      error = true;
    }
  }
  
  r.unshift('<p>\n<table class="center" id="result">');
  r.push('</table>');
  table_output.innerHTML = r.join('\n');
  
}



