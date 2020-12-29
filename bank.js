module.exports = function bank(options) {
  this.add('role:bank,get:sellers', function (msg, reply) {
    this.make('seller').list$({}, function(err, seller) {
      if (err) {
        reply(err);
      } else {
        reply(null, seller)
      }
    })
  })
    /**
   * accept a JSON body containing a key called balance along with a value
   * {
   *  "balance": "10"
   * }
   */
  this.add('role:bank,add:seller', function (msg, reply) {
    var seller = this.make('seller')
    seller.balance = JSON.parse(msg.args.body).balance
    seller.save$(function (err, saved_seller) {
      if (err) {
        reply(err);
      } else {
        reply(null, saved_seller)
      }
    })
  })

  this.add('role:bank,get:seller', function (msg, reply) {
    this.make('seller').load$(msg.args.query.id, function(err, seller) {
      if (err) {
        reply(err);
      } else {
        reply(null, seller)
      }
    })
  })

  this.add('role:bank,get:buyers', function (msg, reply) {
    this.make('buyer').list$({}, function(err, seller) {
      if (err) {
        reply(err);
      } else {
        reply(null, seller)
      }
    })
  })
  this.add('role:bank,add:buyer', function (msg, reply) {
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

  this.add('role:bank,get:buyer', function (msg, reply) {
    this.make('buyer').load$(msg.args.query.id, function(err, buyer) {
      if (err) {
        reply(err);
      } else {
        reply(null, buyer)
      }
    })
  })
}