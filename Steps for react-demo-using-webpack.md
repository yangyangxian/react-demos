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
     	<p>hello world</p>
   </body>
   </html>
   ```


### Create a css file

1. Create a css file `.src/app.css` and add:

```css
body {
  background: purple;
}
```

​	Modify the `src/app.js`:

```javascript
import css from './app.css';

console.log("hello world")
```

2. Now if you run `webpack`, error occurs cause nodejs is a javascript runtime environment which can not read css file.

   So we need to install a css loader:

```
npm install --save-dev css-loader style-loader
```

​	The loader will pre-process the file 

3. Then use `webpack` or `npm run dev` to compile.
4. Now the css file content will be pushed into the `app.bundle.js`. Open the `index.html` to check out the style change.

### Use scss file

1. Create a scss file `.src/app.scss` and add:

  ```scss
  body {
    p {
      color: red;
    }
  }
  ```

2. Modify the `src/app.js`:

  ```javascript
  import css from './app.css';
  import css from './app.scss';

  console.log("Hello,world")
  ```


3. Install scss file loader:

  ```
  npm install sass-loader node-sass --save-dev
  ```

4. Modify the config:

   ```javascript
   module: {
     rules: [
       {
         test: /\.css$/,
         use: [ 'style-loader', 'css-loader' ]
       },
       {
         test: /\.scss$/,
         use: [ 'style-loader', 'css-loader', 'sass-loader' ]
       }
     ]
   }
   ```

   Compile and check out the result.


### Extract css from js file

Now the css code is in the `app.bundle.js` file. But convetionally we want css to be a seperate file.

1. Install the plugin:

   ```
   npm install --save-dev extract-text-webpack-plugin
   ```

2. Modify the `webpack.config.js`

   ```javascript
   var HtmlWebpackPlugin = require('html-webpack-plugin');
   const ExtractTextPlugin = require('extract-text-webpack-plugin');

   module.exports = {
       entry: './src/app.js',
       output: {
           path: __dirname + '/dist',
           filename: 'app.bundle.js'
       },
       plugins: [new HtmlWebpackPlugin({
           template: './src/index.html',
           filename: 'index.html'
           }),
           new ExtractTextPlugin('style.css')
       ],
       module: {
           rules: [
               {
                   test: /\.css$/,
                   use: [ 'style-loader', 'css-loader' ]
               },
               {
                   test: /\.scss$/,
                   use: ExtractTextPlugin.extract({
                     fallback: 'style-loader',
                     //resolve-url-loader may be chained before sass-loader if necessary
                     use: ['css-loader', 'sass-loader']
                   })
               }
           ]
       }
   };
   ```

3. Compile the project. The `dist/style.css` has been generated.

### Use webpack-dev-server

We use the server to compile our file and open browser automatically.

1. Install the `webpack-dev-server`:

   ```
   npm install -g webpack-dev-server
   npm install --save-dev webpack-dev-server
   ```

2. Modify the `webpack.config.js`:

   ```javascript
   module.exports = {
     entry: './src/app.js',
     ...
     devServer: {
       port: 3000,
     	open: true
     },
     ...
   };
   ```

   `open: true` means that after compilation, the server will open the browser automatically.

3. Run the command:

   ```
   webpack-dev-server
   ```

   Or add this command to `package.json`:

   ```json
   ...
   "scripts": {
     "start": "webpack-dev-server",
     "dev": "webpack -d",
     "prod": "webpack -p"
   },
   ...
   ```



### Use React

1. Install React:

   ```
   npm install --save react react-dom
   ```

2. Install babel which will transform some ES6 code to ES5:

   ```
   npm install --save-dev babel-core babel-preset-react babel-preset-env
   ```

   Create file named `.babelrc` under root path.Add the content to the file:

   ```json
   {
     "presets": ["env", "react"]
   }
   ```

3. Install babel loader:

   ```
   npm install --save-dev babel-loader
   ```

   Modify `webpack.config.js`:

   ```javascript
   ...
   { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
   { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
   ...
   ```

4. Write react code:

   `src/index.html`:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>Hello World</title>
   </head>
       <div id="root"></div>
   <body>
   </body>
   </html>
   ```

   `src/app.js`:

   ```javascript
   import css from './app.scss';

   import React from 'react';
   import ReactDOM from 'react-dom';
   import Root from './Root';

   ReactDOM.render(
     <Root></Root>,
     document.getElementById('root')
   );
   ```

   Add `src/Root.js`:

   ```javascript
   import React from 'react';

   export default class Root extends React.Component {
     render() {
       return (
         <div style={{textAlign: 'center'}}>
           <h1>Hello World</h1>
         </div>);
     }
   }
   ```

   `src/app.scss`:

   ```scss
   body {
       background: purple;
       p {
         color: red;
       }
   }
   ```

   ### The End