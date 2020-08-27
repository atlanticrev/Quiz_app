# git
git init;
touch .gitignore && ./.gitignore < ".idea\n/node_modules/\ndist"

#npm
npm init;
npm install --save-dev webpack webpack-cli webpack-dev-server # webpack
npm install --save-dev html-webpack-plugin # generrate dynamic html with assets in it
npm install --save-dev clean-webpack-plugin # clean dist folder every rebuild
npm install --save-dev style-loader css-loader mini-css-extract-plugin # css, only style-loader work with HMR
npm install --save-dev file-loader # images/icons
npm install --save-dev node-sass sass-loader resolve-url-loader # sass, resolve-url-loader dosen't work?

# webpack config
touch webpack.config.js;