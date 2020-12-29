module.exports = function bank(options) {
  /**
   * Get a list of all suppliers
   */
  this.add('role:supplier,cmd:list', function (msg, reply) {
    console.log('1')
    console.log("id:", msg.args.query.id)
    this.make('supplier').list$({}, function(err, supplier) {
      if (err) {
        reply(err);
      } else {
        reply(null, supplier)
      }
    })
  })
  /**
   * Load a supplier by its Id
   */
  this.add('role:supplier,cmd:load', function (msg, reply) {
    this.make('supplier').load$(msg.args.params.id, function(err, supplier) {
      if (err) {
        reply(err);
      } else {
        reply(null, supplier)
      }
    })
  })
  /**
   * Add a new supplier
   * accept a JSON body containing a key called balance along with a value
   * {
   *  "balance": "10"
   * }
   */
  this.add('role:supplier,cmd:create', function (msg, reply) {
    var supplier = this.make('supplier')
    supplier.balance = JSON.parse(msg.args.body).balance
    supplier.save$(function (err, saved_supplier) {
      if (err) {
        reply(err);
      } else {
        reply(null, saved_supplier)
      }
    })
  })
  /**
   * Get a list of all buyers
   */
  this.add('role:buyer,cmd:list', function (msg, reply) {
    this.make('buyer').list$({}, function(err, supplier) {
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
    this.make('buyer').load$(msg.args.params.id, function(err, supplier) {
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