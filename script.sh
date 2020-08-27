# git
git init;
touch .gitignore && ./.gitignore < .idea /node_modules/ dist

#npm
npm init;
npm install --save-dev webpack webpack-cli webpack-dev-server # webpack
npm install --save-dev html-webpack-plugin # dynamic html + assets fix
npm install --save-dev style-loader css-loader mini-css-extract-plugin #css
npm install --save-dev file-loader #images/icons
npm install --save-dev node-sass sass-loader resolve-url-loader # sass

# webpack config
touch webpack.config.js;