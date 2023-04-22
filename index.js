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
  {
    type: "number",
    name: "creditsCount",
    message: "How many credits would you like to include?",
    default: 1,
  },
  {
    type: "confirm",
    name: "additionalCredit",
    message: "Would you like to add another credit?",
    default: true,
    when: (answers) => answers.creditsCount > 1,
  },
  {
    type: "input",
    name: "contributing",
    message: "Please provide contribution guidelines.",
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
  },
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
// function to generate license badge
function generatedLicenseBadge(license) {
  return license === "None"
    ? ""
    : `![${license} License](https://img.shields.io/badge/license-${license}-green.svg)`;
}
// template literal to generate markdown for README
inquirer.prompt(questions).then(async (answers) => {
  const licenseBadge = generatedLicenseBadge(answers.license);
  const credits = [];

  for (let i = 0; i < answers.creditsCount; i++) {
    const creditQuestions = [
      {
        type: "input",
        name: "creditName",
        message: `Credit ${i + 1} name:`,
      },
      {
        type: "input",
        name: "creditLink",
        message: `Credit ${i + 1} link:`,
      },
    ];
    const creditAnswers = await inquirer.prompt(creditQuestions);
    credits.push(`[${creditAnswers.creditName}](${creditAnswers.creditLink})`);
  }
  const content = `
${licenseBadge}

# ${answers.title}

## Description

${answers.description}

## Table of Contents

* [Installation](#installation)
* [Usage](#Usage)
* [Credits](#Credits)
* [License](#License)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)

## Installation

${answers.instalation}

## Usage

${answers.usage}

## Credits

${credits.join("  \n")}

## License

This application is licensed under the [${
    answers.license
  }](https://opensource.org/licenses/${answers.license}).

## Contributing

${answers.contributing}

## Tests

${answers.tests}

## Questions

[GitHub](https://github.com/${answers.github})
If you have any questions, please contact me at ${answers.email}.
        `;
  // call the function to write the README file
  writeToFile("README.md", content);
});
