## Theora-WebExtension-Start

-**this template file has been created for starting faster webExtension projects**

#### #step 1

-   : clone project

```console
    git clone https://github.com/theoraVilderson/theora-webextension-start.git
```

#### #step 2

-   : cd to it (you can rename this folder as your web extension name)

```console
    cd theora-webextension-start
```

#### #step 3

-   : #for installation

```console
    npm install
```

#### #step 4

-   : #for start webpack watch compiler

```console
    npm run webpack
```

#### #step 5 (in new console tab)

-   : #for start hot reload compiler

```console
    npm run hotReload

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
