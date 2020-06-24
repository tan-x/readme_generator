const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');
const badges = require('./badges');
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
    // get user data from githubAPI from username input
    axios.get(`https://api.github.com/users/${response.USERNAME}`)
        .then(res => {
            userData = {
                USERURL: res.data.html_url,
                USER_NAME: res.data.name,
                AVATAR: res.data.avatar_url
            }
            // read template file and replace matching items
            fs.readFile('templates/template.md', 'utf8', (err, data) => {
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
                // render license badge based on user selection
                switch (response.LICENSE) {
                    case 'MIT':
                        result = result.replace("licenseURL", badges.license.MIT);
                        break;
                    case 'Apache License 2.0':
                        result = result.replace("licenseURL", badges.license.Apache);
                        break;
                    case 'GNU GPLv3':
                        result = result.replace("licenseURL", badges.license.GPL);
                        break;
                    case 'ISC':
                        result = result.replace("licenseURL", badges.license.ISC);
                        break;
                    default:
                        result = result.replace("licenseURL", badges.license.MIT);
                }
                // replace matching items from githubAPI user call, including duplicate matches
                for (const prop in userData) {
                    result = result.replace(new RegExp(`${prop}`, 'g'), userData[prop])
                }
                // write altered template with user input changes
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