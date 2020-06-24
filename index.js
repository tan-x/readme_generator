let inquirer = require('inquirer');
let fs = require('fs');
let axios = require('axios');
const { get } = require('https');

inquirer.prompt([
    {
        type: 'input',
        message: 'What is your github username?',
        name: 'USERNAME'
    },
    {
        type: 'input',
        message: 'What is your contact email address?',
        name: 'EMAIL'
    },
    {
        type: 'input',
        message: 'What is your project name?',
        name: 'PROJECT'
    },
    {
        type: 'input',
        message: 'Give a description of your project.',
        name: 'DESCRIPTION'
    },
    {
        type: 'input',
        message: 'List your npm package for install:',
        name: 'INSTALL'
    },
    {
        type: 'input',
        message: 'Provide instructions and examples for use:',
        name: 'USAGE'
    },
    {
        type: 'list',
        message: 'What license is used?',
        choices: ['MIT', 'Apache License 2.0', 'GNU GPLv3', 'ISC'],
        name: 'LICENSE'
    },
    {
        type: 'input',
        message: 'Provide test command:',
        name: 'TEST'
    },
    {
        type: 'checkbox',
        message: 'Tech stack:',
        choices: ['HTML/CSS', 'Javascript', 'jQuery', 'node.js', 'React', 'React Native', 'AngularJS', 'Express'],
        name: 'TECHSTACK'
    },    
]).then(response => {
    axios.get(`https://api.github.com/users/${response.USERNAME}`)
        .then(res => {
            userURL = res.data.html_url;
            userName = res.data.name;
            userAvatar = res.data.avatar_url;
            fs.readFile('template.md', 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                let result = data;
                // sort tech stack array into a MD list
                var stack = '';
                response.TECHSTACK.forEach((obj) => stack += `- ${obj}\n`)
                response.TECHSTACK = stack;
                for (const prop in response) {
                    result = result.replace(prop, response[prop]);
                }
                result = result.replace('USERURL', userURL);
                result = result.replace('USERNAME', userName);
                result = result.replace('AVATAR', userAvatar);
                fs.writeFile('newREADME.md', result, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log('success!')
                })
            }
            )
        })
})