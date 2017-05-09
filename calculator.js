/**
 * @description Calculator prototype.
 * @constructor Calculator
 */
function Calculator() {
  /**
     * @description Assign this to variable for scope scenarios.
     * @type {Calculator}
     */
  var self = this;

  /**
     * @description Init function builds the calculator.
     */
  this.init = function() {
    //injects this html string into dom.
    (function load() {
      var calcHTML =
        '<div class="screen" ><p id="screen"></p></div><ul class="number-div"><li class="operation">+</li><li class="operation">-</li><li class="operation">x</li><li class="operation">÷</li><li class="operation">^</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li class="clear" id="clear">Clear</li><li>0</li><li id="equals">=</li></ul>';
      document.getElementsByClassName("main-div")[0].innerHTML = calcHTML;
    })();
    /**
         * This will initiate the object.
         */
    var elements = document.getElementsByTagName("li");
    var screen = document.getElementById("screen");
    var clear = document.getElementsByClassName("clear")[0];
    //count to limit number of operations per calculation
    var count = 0;

    for (var i = 0; i < elements.length; i += 1) {
      if (elements[i].innerHTML === "=") {
        elements[i].addEventListener("click", calculate(i));
      } else {
        elements[i].addEventListener("click", addtocurrentvalue(i));
      }
      function addtocurrentvalue(i) {
        //new RegExp('[*/+-^]')

        return function() {
          if (elements[i].innerHTML === "÷" && count !== 1) {
            screen.innerHTML += "/ ";
            count += 1;
          } else if (elements[i].innerHTML === "x" && count !== 1) {
            screen.innerHTML += "*";
            count += 1;
          } else if (
            (elements[i].innerHTML === "+" ||
              elements[i].innerHTML === "-" ||
              elements[i].innerHTML === "^") &&
            count !== 1
          ) {
            screen.innerHTML += elements[i].innerHTML;
            count += 1;
          } else if (count >= 1 && isNaN(elements[i].innerHTML)) {
            document.getElementById("equals").click();
            count = 0;
          } else {
            screen.innerHTML += elements[i].innerHTML;
          }
        };
      }
      clear.onclick = function() {
        screen.innerHTML = "";
        count = 0;
      };
      function calculate(i) {
        return function() {
          if (screen.innerHTML.includes("^")) {
            var x = screen.innerHTML.split("^");
            screen.innerHTML = Math.pow(x[0], x[1]);
            count = 0;
          } else {
            screen.innerHTML = eval(screen.innerHTML);
            count = 0;
          }
        };
      }
    }
  };
}
