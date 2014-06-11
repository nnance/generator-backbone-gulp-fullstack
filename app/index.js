'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var BackboneFullstackGenerator = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('app_name', { type: String, required: false });
    this.appname = this.app_name || this.appname;
    this.appname = this._.classify(this.appname);

    this.env.options.appPath = this.options.appPath || 'app';
    this.config.set('appPath', this.env.options.appPath);

    this.config.defaults({
      appName: this.appname,
      ui: this.options.ui,
      coffee: this.options.coffee,
      compassBootstrap: this.compassBootstrap,
      includeRequireJS: this.includeRequireJS
    });

    this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  },

  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous backbone-fullstack generator!'));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/templates');

    this.copy('_package.json', 'package.json');
    this.copy('gulpfile.js', 'gulpfile.js');
    this.copy('index.html', 'index.html');

    this.copy('main.scss', 'styles/main.scss');

    this.copy('app/404.html', this.env.options.appPath + '/404.html');
    this.copy('app/favicon.ico', this.env.options.appPath + '/favicon.ico');
    this.copy('app/robots.txt', this.env.options.appPath + '/robots.txt');
    this.copy('app/htaccess', this.env.options.appPath + '/.htaccess');

    this.copy('app/scripts/index.js', this.env.options.appPath + '/scripts/index.js');
    this.copy('app/scripts/app-view.js', this.env.options.appPath + '/scripts/app-view.js');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = BackboneFullstackGenerator;
