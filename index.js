let inquirer = require('inquirer');
let fs = require('fs');
let basics = require('./basics.js')

let writer = fs.createWriteStream('test.md');

inquirer.prompt([
    {
        type: 'input',
        message: 'What is your github username?',
        name: 'username'
    },
    {
        type: 'input',
        message: 'What is your project name?',
        name: 'project'
    },
    {
        type: 'input',
        message: 'Give a description of your project.',
        name: 'description'
    },
    {
        type: 'input',
        message: 'List your npm package for install.',
        name: 'install'
    },
    {
        type: 'input',
        message: 'Provide instructions and examples for use.',
        name: 'usage'
    },
    {
        type: 'list',
        message: 'What license is used?',
        choices: ['MIT', 'GPL', 'CC'],
        name: 'license'
    }
]).then(response => {
    let install = response.install + '`';
    writer.write(`# ${response.project}\n\r`);
    writer.write(basics.badges.contributors + '\n\r');
    writer.write(`By ${response.username}\n\r`);
    writer.write('## Description\n\r');
    writer.write(`${response.description}\n\r`);
    writer.write('## Table of Contents\n\r');
    writer.write('* [Install](#install)\n\r');
    writer.write('* [Usage](#usage)\n\r');
    writer.write('* [License](#license)\n\r');
    writer.write('## Install\n\r');
    writer.write('`npm install ' + install + '\n\r');
    writer.write('## Usage\n\r');
    writer.write(`${response.usage}\n\r`);
    writer.write('## License\n\r');
    writer.write('## Contributions\n\r');
    writer.write('## Tests\n\r');
    writer.write('## Questions\n\r');
})