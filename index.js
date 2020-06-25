const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');
const badges = require('./badges');
const inqData = require('./inquirerData');

inquirer.prompt(inqData).then(response => {
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
                fs.writeFile('generated/README.md', result, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log('success!')
                })
            }
            )
        })
})