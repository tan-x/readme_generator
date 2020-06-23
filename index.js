let inquirer = require('inquirer');
let fs = require('fs');
let basics = require('./basics.js')

// let writer = fs.createWriteStream('test.md');

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
        name: 'installNPM'
    },
    {
        type: 'input',
        message: 'Provide instructions and examples for use.',
        name: 'usage'
    },
    {
        type: 'list',
        message: 'What license is used?',
        choices: ['MIT', 'Apache License 2.0', 'GNU GPLv3', 'ISC'],
        name: 'license'
    },
    {
        type: 'input',
        message: 'Provide test example',
        name: 'test'
    },
    {
        type: 'checkbox',
        message: 'Tech stack:',
        choices: ['HTML/CSS', 'Javascript', 'jQuery', 'node.js', 'React', 'React Native', 'AngularJS', 'Express'],
        name: 'techstack'
    },    
]).then(response => {
    fs.readFile('template.md', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        let result = data;
        // sort tech stack array into a MD list
        var stack = '';
        response.techstack.forEach((obj) => stack += `- ${obj}\n`)
        response.techstack = stack;
        for (const prop in response) {
            result = result.replace(prop, response[prop]);
        }
        
        fs.writeFile('newREADME.md', result, (err) => {
            if (err) {
                throw err;
            }
            console.log('success!')
        })
    }
    )
    // let install = response.install + '`';
    // writer.write(`# ${response.project}\n\r`);
    // writer.write(basics.badges.contributors + '\n\r');
    // writer.write(`By ${response.username}\n\r`);
    // writer.write('## Description\n\r');
    // writer.write(`${response.description}\n\r`);
    // writer.write('## Table of Contents\n\r');
    // writer.write('* [Install](#install)\n\r');
    // writer.write('* [Usage](#usage)\n\r');
    // writer.write('* [License](#license)\n\r');
    // writer.write('## Install\n\r');
    // writer.write('`npm install ' + install + '\n\r');
    // writer.write('## Usage\n\r');
    // writer.write(`${response.usage}\n\r`);
    // writer.write('## License\n\r');
    // writer.write('## Contributions\n\r');
    // writer.write('## Tests\n\r');
    // writer.write('## Questions\n\r');
})