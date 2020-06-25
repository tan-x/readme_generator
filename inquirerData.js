module.exports = [
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
        type: 'input',
        message: 'Provide information about test:',
        name:'TESTINFO'
    },
    {
        type: 'checkbox',
        message: 'Tech stack:',
        choices: ['HTML/CSS', 'Javascript', 'jQuery', 'node.js', 'React', 'React Native', 'AngularJS', 'Express'],
        name: 'TECHSTACK'
    },    
]