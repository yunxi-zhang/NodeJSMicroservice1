module.exports = function buyer(options) {
  /**
   * Get a list of all buyers
   */
  this.add('role:buyer,cmd:list', function (msg, reply) {
    this.make('buyer').list$({}, function (err, supplier) {
      if (err) {
        reply(err);
      } else {
        reply(null, supplier)
      }
    })
  })
  /**
   * Get a list of filtered buyers by type
   */
  this.add('role:buyer,cmd:list,criteria:byType', function (msg, reply) {
    this.make('buyer').list$({ type: msg.args.params.type }, function (err, supplier) {
      if (err) {
        reply(err);
      } else {
        reply(null, supplier)
      }
    })
  })
  /**
   * Load a buyer by its Id
   */
  this.add('role:buyer,cmd:load', function (msg, reply) {
    this.make('buyer').load$(msg.args.params.id, function (err, supplier) {
      if (err) {
        reply(err);
      } else {
        reply(null, supplier)
      }
    })
  })
  /**
   * Add a new buyer
   */
  this.add('role:buyer,cmd:create', function (msg, reply) {
    var buyer = this.make('buyer')
    buyer.balance = JSON.parse(msg.args.body).balance
    buyer.save$(function (err, saved_buyer) {
      if (err) {
        reply(err);
      } else {
        reply(null, saved_buyer)
      }
    })
  })
}