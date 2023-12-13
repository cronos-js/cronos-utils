#!/usr/bin/env node

import {spawn} from 'child_process';
import printCronos from '../../tools/printCronos';
import os from 'os';
import fs from 'fs';
import {expressDetectTypescript} from '../../tools/expressDetectIndex';

const args = process.argv.slice(2);

const projectType = args[0];

const isWin = os.platform() === 'win32' || os.platform() === 'win64';

if (projectType == '--express') {
	expressDetectTypescript((expressTS) => {
		nodemonComand = expressTS
			? ['nodemon', '--exec', 'ts-node', 'src/index.ts']
			: ['nodemon', 'src/index.js'];

		spawn(isWin ? 'npx.cmd' : 'npx', nodemonComand, {
			stdio: 'inherit'
		});
	});
} else if (projectType == '--react' || projectType == '--vue') {
	let RspackIsConfigured = false;

	let host = 'localhost';
	let port = 5173;

	if (fs.existsSync('Rspack.config.js')) {
		let fileContent = fs.readFileSync('Rspack.config.js', 'utf8');

		let regex = /devServer:\s*{[\s\S]*?}/;
		let result = fileContent.match(regex);

		if (result) {
			let devServer = result[0];

			let regexHost = /host:\s*['"]\S+['"]/;
			let regexPort = /port:\s*\d+/;

			let resultHost = devServer.match(regexHost);
			let resultPort = devServer.match(regexPort);

			if (resultHost) {
				host = resultHost[0].split(':')[1].trim().replace(/['"]/g, '');
			} else {
				fileContent = fileContent.replace(
					/devServer:\s*{/,
					'devServer: {\n   host: "' + host + '",'
				);

				RspackIsConfigured = true;
				fs.writeFileSync('Rspack.config.js', fileContent);
			}
			if (resultPort) {
				port = resultPort[0].split(':')[1].trim();
			} else {
				let port = 5173;
				fileContent = fileContent.replace(
					/devServer:\s*{/,
					'devServer: {\n   port: ' + port + ','
				);

				RspackIsConfigured = true;
				fs.writeFileSync('Rspack.config.js', fileContent);
			}
		}
	}

	args.forEach((arg) => {
		if (arg.includes('host')) {
			host = arg.split('=')[1];

			let fileContent = fs.readFileSync('Rspack.config.js', 'utf8');

			fileContent = fileContent.replace(
				/host:\s*['"]\S+['"]/,
				'host: "' + host + '"'
			);

			fs.writeFileSync('Rspack.config.js', fileContent);
		}

		if (arg.includes('port')) {
			port = arg.split('=')[1];

			let fileContent = fs.readFileSync('Rspack.config.js', 'utf8');

			fileContent = fileContent.replace(/port:\s*\d+/, 'port: ' + port);

			fs.writeFileSync('Rspack.config.js', fileContent);
		}
	});

	console.clear();
	console.log('🦀  \x1b[31m\x1b[1mRspack\x1b[0m\x1b[37m is starting...\n');

	const Rspack = spawn(isWin ? 'npx.cmd' : 'npx', ['Rspack', 'serve']);

	Rspack.stderr.on('data', (data) => {
		console.error(`${data}`);
	});

	Rspack.stdout.on('data', (data) => {
		reactReload(data, host, port);
	});

	Rspack.on('error', (error) => {
		console.error(`${error.message}`);
	});
}

const reactReload = (data, host, port) => {
	printCronos('watch');
	let str = data.toString();
	let regex = /in(.*)/;
	let regexError = /error(.*)/;
	let result = str.match(regex);
	let resultError = str.match(regexError);

	if (resultError) {
		console.log(data.toString());
	} else if (result) {
		console.log(
			'🦀 \x1b[31m\x1b[1mRspack\x1b[0m\x1b[37m ready in:\x1b[33m\x1b[1m' +
				result[1] +
				'\x1b[0m\x1b[37m'
		);

		let getIPAddresses = () => {
			let interfaces = os.networkInterfaces();
			let ipAddresses = [];
			for (let name in interfaces) {
				for (let index = 0; index < interfaces[name].length; index++) {
					let _interfaces_name_index = interfaces[name][index],
						address = _interfaces_name_index.address,
						family = _interfaces_name_index.family,
						internal = _interfaces_name_index.internal;
					if (family === 'IPv4' && !internal) {
						ipAddresses.push(address);
					}
				}
			}
			return ipAddresses;
		};

		if (host === '0.0.0.0') {
			console.log('\uD83D\uDE80 Server running on:\n');
			getIPAddresses().forEach(function (element) {
				console.log(
					'  →  \x1b[36m\x1b[1mhttp://'
						.concat(element, ':')
						.concat(port, '\x1b[37m')
				);
			});
		} else {
			console.log(
				'\uD83D\uDE80 Server running on \x1b[36m\x1b[1mhttp://'
					.concat(host, ':')
					//.concat("\x1b[32m8080")
					.concat(port)
					.concat('\x1b[37m')
			);
		}
	}
};
