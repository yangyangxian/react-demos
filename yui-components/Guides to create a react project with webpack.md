### Init the node project

1. Install node to your computer: [nodejs](https://nodejs.org/zh-cn/).
2. Create a folder. Go into the folder.

```
cd C:\Users\Young\Desktop\react-demos\yui-components
```

3. Using the command to create a nodejs project:

```
npm init
```

You can keep clicking `Enter` to skip the initial project settings. Then you will create a `package.json` file under the folder.

```javascript
{
  "name": "yui-components",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

This file stores the basic project information. We will come back to this file later.

### Use webpack

1. Install webpack:

```
$ npm install --save-dev webpack
```

Wait a second for installation done.

A new folder was created under the project folder called `node_modules` which store all the dependencies your project depends on.

Now the `package.json` was like this:

```json
{
  "name": "yui-components",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.11.0"
  }
}
```

This step added the `devDependecies`:

```json
"devDependencies": {
    "webpack": "^3.11.0"
 }
```

`^` means this allows node to upgrade the webpack version to `3.11.x` in the future.

### Create a js file and bundle it

1. Create folder `src` and a js file named `app.js` under it. Now the project folder was like this:

   ```
   ├── dist
   ├── node_modules
   ├── package.json
   └── src
       └── app.js
   ```

2. Add the very simple code

   ```
   console.log("Hello,world")
   ```

3. Create the folder `dist` to store the bundle file.

4. Using command to bundle `app.js`:

   ```
   webpack ./src/app.js ./dist/app.bundle.js
   ```

   Now the `app.bundle.js` has been created by webpack!

   ```
   ├── dist
       └── app.bundle.js
   ├── node_modules
   ├── package.json
   └── src
       └── app.jsUsing webpack.config.js
   ```

   ​

### Use webpack.config.js to make bundle easier

Use the config file to simplify our command like `webpack ./src/app.js ./dist/app.bundle.js`.

1. Create webpack.config.js and add the config below:

   ```json
   module.exports = {
       entry: './src/app.js',
       output: {
         filename: './dist/app.bundle.js'
       }
   };
   ```

This means that webpack read `./src/app.js` as source file and output `./dist/app.bundle.js`.

2. Now we can use `webpack` instead of `webpack ./src/app.js ./dist/app.bundle.js` to bundle the package.

3. You still feel it's a little annoying to use `webpack`. You can add some settings to `package.json` to put your daily used command.

   ```json
   "scripts": {
   	"dev": "webpack -d",
   	"prod": "webpack -p"
   },
   ```

4. Now you can use

   ```
   npm run dev
   ```

   to bundle your file.

### Create html file

1. Create index.html under `./dist`.

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>Project</title>
   </head>
   <body>
       <script src="app.bundle.js"></script>
   </body>
   </html>
   ```

2. Use `html-webpack-plugin`  to create the `html` file dynamically. 

   Install the plugin dependency:

   ```
   npm install html-webpack-plugin --save-dev
   ```

3. Delete `./dist/index.html` and add `plugins: [new HtmlWebpackPlugin()]` to `webpack.config.js`:

   ```json
   var HtmlWebpackPlugin = require('html-webpack-plugin');

   module.exports = {
     entry: './src/app.js',
     output: {
       path: __dirname + '/dist',
       filename: 'app.bundle.js'
     },
     plugins: [new HtmlWebpackPlugin()]
   };
   ```

4. Run 

   ```
   npm run dev
   ```

5. Change the plugin config to apply html template

   ```json
   var HtmlWebpackPlugin = require('html-webpack-plugin');

   module.exports = {
     entry: './src/app.js',
     output: {
       path: __dirname + '/dist',
       filename: 'app.bundle.js'
     },
     plugins: [new HtmlWebpackPlugin({
       template: './src/index.html',
       filename: 'index.html'
     })]
   };
   ```

6. Create the template `.src/index.html`:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>Hello World</title>
   </head>
   <body>
   </body>
   </html>
   ```

   ​