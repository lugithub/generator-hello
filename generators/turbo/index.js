var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    prompting() {
      this.log('prompting - turbo');
    }
  
    writing() {
      this.log(this.options['yourarg']);
      this.log('writing - turbo');
    }
};