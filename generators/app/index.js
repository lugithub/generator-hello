var Generator = require('yeoman-generator');
var beautify = require('gulp-beautify');
var gulpif = require('gulp-if');

var condition = function (file) {
    console.log(file.extname);
    if (file.extname === '.html') {
        return false;
    } else {
        return true;
    }
  }

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        this.argument('myarg', {
            type: Array,
            required: true
        });

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag

        this.registerTransformStream(gulpif(condition, beautify({indent_size: 2 })));
    }

    method1() {
        this.log('method 1 just ran');
    }

    method2() {
        this.log('method 2 just ran');
        this.log(this.options['myarg'])
    }

    initializing() {
        this.composeWith(require.resolve('../turbo'), {
            yourarg: 123
        });
        this.composeWith(require.resolve('../electric'));
    }

    prompting() {
        return this.prompt([{
            type    : 'input',
            name    : 'name',
            message : 'Your project name',
            default : this.appname // Default to current folder name
        }, {
            type    : 'confirm',
            name    : 'cool',
            message : 'Would you like to enable the Cool feature?'
        }]).then((answers) => {
            this.log('app name', answers.name);
            this.log('cool feature', answers.cool);
        });
    }

    writing() {
        this.fs.copyTpl(
          this.templatePath('index.html'),
          this.destinationPath('public/index.html'),
          { title: this.options['myarg'][1] }
        );
    }
  };
