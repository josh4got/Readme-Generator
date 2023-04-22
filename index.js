const fs = require("fs");
const inquirer = require("inquirer");

// array of questions for user
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  {
    type: "input",
    name: "description",
    message: "Please provide a description of your project.",
  },
  {
    type: "input",
    name: "instalation",
    message: "Please provide installation instructions.",
  },
  {
    type: "input",
    name: "usage",
    message: "Please provide usage information.",
  },
  { type: "input", name: "credits", message: "Please provide credits." },
  {
    type: "input", name: "contributing", message: "Please provide contribution guidelines.",
  },
  {
    type: "input",
    name: "tests",
    message: "Please provide test instructions.",
  },
  {
    type: "input",
    name: "github",
    message: "Please provide your GitHub username.",
  },
  {
    type: "input",
    name: "email",
    message: "Please provide your email address.",
  }
  {
    type: "list",
    name: "license",
    message: "Please select a license.",
    choices: ["MIT", "Apache", "GPL", "BSD", "None"],
  },
];
// function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Success!");
  });
}

// template literal to generate markdown for README
inquirer.prompt(questions).then((answers) => {
  const content = `
# ${answers.title}

## Description

${answers.description}

## Table of Contents


## Installation

${answers.instalation}

## Usage

${answers.usage}

## Credits

${answers.credits}

## License

${answers.license}

## Badges

## Contributing

## Tests


## Questions

[GitHub](https://github.com/${answers.github})
If you have any questions, please contact me at ${answers.email}.
        `;
  // call the function to write the README file
  writeToFile("README.md", content);
});
