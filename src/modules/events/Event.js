class Event {

  constructor (type, creatorId, description) {
    this.type = type;
    this.creator = creatorId;
    this.description = description;
    this.datetime = new Date();
  }

}


module.exports = Event;