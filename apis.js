module.exports = function apis(options) {

  this.add('role:api,cmd:sellerBalance', function(msg, reply) {
    reply({balance: 0})
  })

  this.add('role:api,cmd:buyerBalance', function(msg, reply) {
    reply({balance: 0})
  })
}