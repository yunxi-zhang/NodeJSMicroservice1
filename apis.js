module.exports = function apis(options) {

  this.add('role:api,cmd:home', function(msg, reply) {
    reply({place: 'home'})
  })

  this.add('role:api,cmd:profile', function(msg, reply) {
    reply({place: 'profile'})
  })
}