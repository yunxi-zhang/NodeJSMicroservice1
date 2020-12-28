module.exports = function apis(options) {

  this.add('role:api,get:sellerBalance', function(msg, reply) {
    reply({balance: 10})
  })

  this.add('role:api,get:buyerBalance', function(msg, reply) {
    reply({balance: 20})
  })
}