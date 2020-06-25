const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');

const badges = require('./badges');
const inqData = require('./inquirerData');
const template = require('./template');

inquirer.prompt(inqData).then((response) => {
	// get user data from githubAPI from username input
	axios.get(`https://api.github.com/users/${response.USERNAME}`).then((res) => {
		userData = {
			USERURL: res.data.html_url,
			USER_NAME: res.data.name,
			AVATAR: res.data.avatar_url,
        };
        // make copy of template string
		let readme = template;
		// sort tech stack array into a MD list
		var stack = '';
		response.TECHSTACK.forEach((obj) => (stack += `- ${obj}\n`));
        response.TECHSTACK = stack;
        // replace each matching prop name in readme template
		for (const prop in response) {
			readme = readme.replace(prop, response[prop]);
		}
		// render license badge based on user selection
		switch (response.LICENSE) {
			case 'MIT':
				readme = readme.replace('licenseURL', badges.license.MIT);
				break;
			case 'Apache License 2.0':
				readme = readme.replace('licenseURL', badges.license.Apache);
				break;
			case 'GNU GPLv3':
				readme = readme.replace('licenseURL', badges.license.GPL);
				break;
			case 'ISC':
				readme = readme.replace('licenseURL', badges.license.ISC);
				break;
			default:
				readme = readme.replace('licenseURL', badges.license.MIT);
		}
		// replace matching items from githubAPI user call, including duplicate matches
		for (const prop in userData) {
			readme = readme.replace(new RegExp(`${prop}`, 'g'), userData[prop]);
		}
		// write altered template with user input changes
		fs.writeFile('generated/README.md', readme, (err) => {
			if (err) {
				throw err;
			}
			console.log('Success! New README.md in /generated folder.');
		});
	});
});
