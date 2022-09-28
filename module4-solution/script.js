(function () {
    // console.log("Hello ")

    // *******************************
    // START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
    // *******************************
    //
    // Module 4 Assignment Instructions.
    //
    // The idea of this assignment is to take an existing array of names
    // and then output either Hello 'Name' or Good Bye 'Name' to the console.
    // The program should say "Hello" to any name except names that start with a "J"
    // or "j", otherwise, the program should say "Good Bye". So, the final output
    // on the console should look like this:
    /*
    Hello Yaakov
    Good Bye John
    Good Bye Jen
    Good Bye Jason
    Hello Paul
    Hello Frank
    Hello Larry
    Hello Paula
    Hello Laura
    Good Bye Jim
    WARNING!!! WARNING!!!
    The code does NOT currently work! It is YOUR job to make it work
    as described in the requirements and the steps in order to complete this
    assignment.
    WARNING!!! WARNING!!!
    */

    // STEP 1:
    // Wrap the entire contents of script.js inside of an IIFE
    // See Lecture 52, part 2
    // (Note, Step 2 will be done in the SpeakHello.js file.)

    var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
    // STEP 10:
    // Loop over the names array and say either 'Hello' or "Good Bye"
    // using either the helloSpeaker's or byeSpeaker's 'speak' method.
    // See Lecture 50, part 1
    for (var name in names) {
    // STEP 11:
    // Retrieve the first letter of the current name in the loop.
    // Use the string object's 'charAt' function. Since we are looking for
    // names that start with either upper case or lower case 'J'/'j', call
    // string object's 'toLowerCase' method on the result so we can compare
    // to lower case character 'j' afterwards.
    // Look up these methods on Mozilla Developer Network web site if needed.
    // var firstLetter =
        var firstLetter = names[name].charAt(0).toLowerCase();
        // console.log(firstLetter);

    // STEP 12:
    // Compare the 'firstLetter' retrieved in STEP 11 to lower case
    // 'j'. If the same, call byeSpeaker's 'speak' method with the current name
    // in the loop. Otherwise, call helloSpeaker's 'speak' method with the current
    // name in the loop.
    if (firstLetter == "j") {
        byeSpeaker.speak(names[name]);
    } else {
        helloSpeaker.speak(names[name]);
    }
    }

    // console.log(byeSpeaker.speakSimple("byeSpeaker.speakSimple"));
    // console.log(helloSpeaker.speakSimple("helloSpeaker.speakSimple"));
    console.log("part2: Using Array.prototype.map function");
    const map1 = names.map(x => {
            // console.log(x.charAt(0).toLowerCase() == "j")

            if (x.charAt(0).toLowerCase() == "j") {
                return byeSpeaker.speakSimple(x);
            } else {
                return helloSpeaker.speakSimple(x);
            }
        }
    );

    // const map1 = names.map(x =>
    //     x.charAt(0).toLowerCase == "j" ?
    //     byeSpeaker.speakSimple(x):
    //     helloSpeaker.speakSimple(x)
    // );
    // var names2 = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
    // const map1 = names2.map(x =>
    //     x.charAt(0).toLowerCase == "j" ?
    //     byeSpeaker.speakSimple(x):
    //     helloSpeaker.speakSimple(x)
    // );

    for (var index in map1) {
        console.log(map1[index]);
    }

    console.log("part3: Using Array.prototype.reduce function");
    // const hello = [];
    // const bye = [];
    const total = [];

    // let reduce1 = names.reduce(byeSpeaker.speakSimple(reduce1));

    const reduce1 = names.reduce((total, currentValue) => {
        return total + currentValue;
      }, 0);

      var {hello, bye} = names.reduce((total,currentValue) => {
        total.hello.push(byeSpeaker.speakSimple(currentValue));
        return total;
      },{hello: [], bye: []});


    // const reduce2 = names.reduce(
    //     (byeSpeaker.speakSimple, currentValue) => [byeSpeaker.speakSimple(currentValue)], hello);
      
      console.log(hello);
      console.log(bye);

})();
