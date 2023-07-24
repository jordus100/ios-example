// javascript

const wdio = require("webdriverio");

const sharedCapabilities = {
	'appium:deviceName': 'blabla',
	'appium:automationName': 'XCUITest',
	'platformName': 'iOS',
	'appium:usePrebuiltWDA': true,
	//startIWDP: true,
}
const devicesCapabilities = [{
	'appium:udid': '25c925bfbb0ed425fa7c4e30d62b6be82fe15298',
	'appium:webDriverAgentUrl': 'http://localhost:7777'
}, {
	'appium:udid': 'c81fadec2a2affb46093bb3036cf1f49db2dc187',
	'appium:webDriverAgentUrl': 'http://localhost:7778'
}]
const opts = {
    path: '/',
	port: 4723,
	//maxInstances: 1,
};

async function main() {
	clients = []
	for(i=0; i<devicesCapabilities.length; i++){
		opts.capabilities = {...sharedCapabilities, ...devicesCapabilities[i]}
		clients[i] = await wdio.remote(opts)
	}
	for (const client of clients) {
		await client.activateApp("jog.Kalculator")
		await client.deleteSession()
	}
}

main();
