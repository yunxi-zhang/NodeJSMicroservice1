module.exports = function bank(options) {

  this.add('role:bank,get:sellerBalance', function (msg, reply) {
    reply({ balance: 10 })
  })

  /**
   * accept a JSON body containing a key called balance along with a value
   * {
   *  "balance": "10"
   * }
   */
  this.add('role:bank,add:sellerBalance', function (msg, reply) {
    var bank = this.make('bank')
    bank.buyerBalance = JSON.parse(msg.args.body).balance
    bank.save$(function (err, saved_bank) {
      if (err) {
        reply(err);
      } else {
        reply(null, saved_bank)
      }
    })
  })

  this.add('role:bank,get:buyerBalance', function (msg, reply) {
    reply({ balance: 20 })
  })
}