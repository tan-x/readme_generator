var inquirer = require('inquirer');
var fs = require('fs');

inquirer.prompt([
    {
        type: 'input',
        message: 'What is your github username?',
        name: 'username'
    }
]).then(response => {
    fs.appendFile('README.md', response.username, 'utf8', (err) => {
        if (err) {
            return console.log(err);
        }

        console.log('Success!')
    });
})