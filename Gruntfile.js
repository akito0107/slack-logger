'use strict';

module.exports = function (grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    nodemon: {
      dev: {
        script: './src/index.js',
        options: {
          watch: ['./src'],
          ignore: ['./src/public'],
          ext: 'js'
        }
      }
    },
    eslint: {
      options: {
        force: true,
        config: 'eslint.json'
      },
      target: ['./src/**/*.js']
    },
    webpack: {
      dev: {
        entry: './src/public/js/app/index.js',
        output: {
          path: './src/public/js/dist',
          filename: 'dist.js'
        },
        resolve: {
          extensions: ['', '.js']
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader'
            }
          ]
        }
      }
    },
    watch: {
      files: ['./src/public/js/app/**/*.js'],
      tasks: ['webpack:dev']
    }
  });
}
