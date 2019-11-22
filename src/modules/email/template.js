const uuid = require('uuid/v4');

class Template {

  constructor (type, text) {
    this.uid = uuid();
    this.type = type;
    this.text = text;
    this.isInUse = false;
    this.created = new Date();
  }

}


module.exports = Template;