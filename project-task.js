/*
Scenario:
You’ve been hired to help a local pet shelter digitize its animal adoption records. The program is meant to:
  
  Allow users to enter an animal type and adoption fee.
  
  Add the animal and fee to a list.
  
  Retrieve the adoption fee for a specific animal when requested.

However, the initial developer left the program in a buggy state, with missing exception-handling logic
and some errors in the implementation. Your job is to fix it!



Instructions
Start by Understanding the Errors:
Run the program and observe the exceptions that occur. Document what the exceptions are and where they happen.

Write Exception Handling Code:
Use try/catch blocks to handle the errors so the program doesn’t crash when incorrect input or unexpected situations occur.

Test and Debug:
Test the program with valid and invalid inputs to confirm that exceptions are handled gracefully
and the program continues running as intended.
*/


// Will need to import / install readline-sync if not done so already within project dir: npm install readline-sync 
const readlineSync = require('readline-sync');

// Initial Code with Bugs (modified to use readline-sync)
let animals = [];
let fees = [];
function addAnimal(name, fee) {
    try {
        if (!name || fee < 0) {
            throw new Error("Invalid animal name or adoption fee!");
        }
    } catch (err) {
        console.log(err.message, "Name MUST be a string & fee MUST be a positive number.");
    }
    animals.push(name);
    fees.push(fee);
}

//coded try and catch block WITHIN the function. Remember to close the try block BEFORE coding catch block. 

function getAdoptionFee(animalName) {
    let index = animals.indexOf(animalName);
    try {
        if (index === -1) {
            throw new Error("Animal not found in records!");
        }
    } catch (err) {
        console.log("Error detected: ", err.message);
    }
    return fees[index];
}

// Main program
console.log("Welcome to the Pet Shelter System");
while (true) {
    let action = readlineSync.question("Choose an action: 'add', 'fee', or 'exit': ").toLowerCase();
    if (action === "exit") {
        console.log("Goodbye!");
        break;
    }
    if (action === "add") {
        let animal = readlineSync.question("Enter the animal's name: ");
        let fee = Number(readlineSync.question("Enter the adoption fee: "));
        addAnimal(animal, fee);
        console.log(`${animal} added with a fee of $${fee}.`);
    } else if (action === "fee") {
        let animal = readlineSync.question("Enter the animal's name to find its adoption fee: ");
        console.log(`${animal}'s adoption fee is $${getAdoptionFee(animal)}.`);
    } else {
        console.log("Invalid action. Please choose 'add', 'fee', or 'exit'.");
    }
}



/*
Problems to Solve

Invalid Input Errors:
  What happens if the user provides a negative adoption fee or leaves the name blank?

  *Leaving name blank, program still runs. Inputting a negative number results in:

    throw new Error("Invalid animal name or adoption fee!");
        ^
    Error: Invalid animal name or adoption fee!
        at addAnimal (/Users/thunguyen/Desktop/launchcode/GitHub Repo/software-dev-course-exception-handling-1/project-task.js:37:15)
        at Object.<anonymous>

  What happens if the user tries to find the fee for an animal that hasn’t been added?

    Welcome to the Pet Shelter System
    Choose an action: 'add', 'fee', or 'exit': fee
    Enter the animal's name to find its adoption fee: luci
    /Users/thunguyen/Desktop/launchcode/GitHub Repo/software-dev-course-exception-handling-1/project-task.js:45
        throw new Error("Animal not found in records!");
        ^

    Error: Animal not found in records!
        at getAdoptionFee (/Users/thunguyen/Desktop/launchcode/GitHub Repo/software-dev-course-exception-handling-1/project-task.js:45:15)
        at Object.<anonymous>

Code Flow Problems:
  What happens if the program throws an exception? Does the rest of the code continue running?
    The program continues after the catch.
    

Structured Exception Handling:
  Add try/catch blocks to handle the above errors gracefully.
*/
