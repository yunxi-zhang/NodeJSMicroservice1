module.exports = function buyer(options) {
  /**
   * Get a list of all buyers
   */
  this.add('role:buyer,cmd:list', (msg, reply) => {
    this.make('buyer').list$({}, (err, buyer) => {
      if (err) {
        reply(err);
      } else {
        reply(null, buyer);
      }
    })
  })
  /**
   * Get a list of filtered buyers by type
   */
  this.add('role:buyer,cmd:list,criteria:byType', (msg, reply) => {
    this.make('buyer').list$({ type: msg.args.params.type }, (err, buyer) => {
      if (err) {
        reply(err);
      } else {
        reply(null, buyer);
      }
    })
  })
  /**
   * Load a buyer by its Id
   */
  this.add('role:buyer,cmd:load', (msg, reply) => {
    this.make('buyer').load$(msg.args.params.id, (err, buyer) => {
      if (err) {
        reply(err);
      } else {
        reply(null, buyer);
      }
    })
  })
  /**
   * Add a new buyer
   */
  this.add('role:buyer,cmd:create', (msg, reply) => {
    const BUYER_TYPE = ["a","b"];
    var buyer = this.make('buyer');
    buyer.balance = JSON.parse(msg.args.body).balance;
    buyer.type = BUYER_TYPE[Math.floor(Math.random() * BUYER_TYPE.length)];
    buyer.save$(function (err, saved_buyer) {
      if (err) {
        reply(err);
      } else {
        reply(null, saved_buyer);
      }
    })
  })
}