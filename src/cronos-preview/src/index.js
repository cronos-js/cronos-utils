#!/usr/bin/env node

import express from 'express';
import path from 'path';
import {exec, spawn} from 'child_process';
import os from 'os';
import printCronos from '../../tools/printCronos.js';
import fs from 'fs';
import {expressDetectTypescript} from '../../tools/expressDetectIndex.js';

const args = process.argv.slice(2);

const projectType = args[0];

printCronos('preview');

if (projectType == '--express') {
	expressDetectTypescript((expressTS) => {
		spawn('node', ['./build/index.js'], {
			stdio: 'inherit'
		});
	});
} else if (projectType == '--react') {
	const __dirname = path.resolve();

	let host = 'localhost';
	let port = 4173;

	args.forEach((arg) => {
		if (arg.includes('host')) {
			host = arg.split('=')[1];
		}
		if (arg.includes('port')) {
			port = arg.split('=')[1];
		}
	});

	let fileContent = fs.readFileSync('rspack.config.js', 'utf8');

	fileContent = fileContent.replace(/port:\s*\d+/, 'port: ' + port);
	fileContent = fileContent.replace(
		/host:\s*['"]\S+['"]/,
		'host: "' + host + '"'
	);

	fs.writeFileSync('rspack.config.js', fileContent);

	const app = express();

	app.use(express.static('./dist'));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, './dist/index.html'));
	});

	app.listen(port, host, () => {
		function getIPAddresses() {
			const interfaces = os.networkInterfaces();
			const ipAddresses = [];

			for (const name in interfaces) {
				for (let index = 0; index < interfaces[name].length; index++) {
					const {address, family, internal} = interfaces[name][index];

					if (family === 'IPv4' && !internal) {
						ipAddresses.push(address);
					}
				}
			}

			return ipAddresses;
		}

		if (host === '0.0.0.0') {
			console.log('🚀 Server running on:\n');

			getIPAddresses().forEach((element) => {
				console.log(
					'  →  \x1b[36mhttp://'.concat(element, ':').concat(port, '\x1b[37m')
				);
			});
		} else {
			console.log(
				`🚀 \x1b[37m\x1b[1mServer\x1b[0m\x1b[37m running on:\x1b[36m\x1b[1m http://${host}:${port}\x1b[0m\x1b[37m`
			);
		}
	});
}
