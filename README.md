## Theora-WebExtension-Start

-**this template file has been created for starting faster webExtension projects**

#### step 1

```console
    npm i  #for installation
```

#### step 2

```console
    npm run webpack  #for start webpack watch compiler
```

#### step 3 (in new console tab)

```console
    npm run hotReload  #for start hot reload compiler

```

#### all Right We are Done!!

### How to use it

#### - All Source file in /src path

#### - manifest file is in the /app/manifest.json

#### - if you wanna add new entry you should add entry file to /webpack.config.js file

```javascript
const contentScript = Object.assign({}, config, {
	name: "contentScript",
	entry: srcPath("contentScripts", "webScript"),
	output: {
		filename: "webScript.js",
		path: distPath("contentScripts"),
	},
});

// you can add new entry
// you can replace the newScript name replace with your file name
const newScript = Object.assign({}, config, {
	name: "newScript",
	entry: srcPath("newScript", "newScript"),
	output: {
		filename: "newScript.js",
		path: distPath("newScript"),
	},
});
// then you should append the new script to export array

module.exports = [popupPageScript, backgroundScript, contentScript, newScript];
```
