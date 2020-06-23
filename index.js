let inquirer = require('inquirer');
let fs = require('fs');
let basics = require('./basics.js');

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
})