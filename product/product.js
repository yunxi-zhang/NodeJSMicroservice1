module.exports = function product(options) {
  /**
   * Get a list of all products
   */
  this.add('role:product,cmd:list', (msg, reply) => {
    this.make('product').list$({}, (err, product) => {
      if (err) {
        reply(err);
      } else {
        reply(null, product);
      }
    })
  })
  /**
   * Get a list of filtered products by type
   */
  this.add('role:product,cmd:list,criteria:byType', (msg, reply) => {
    this.make('product').list$({ type: msg.args.params.type }, (err, product) => {
      if (err) {
        reply(err);
      } else {
        reply(null, product);
      }
    })
  })
  /**
   * Load a product by its Id
   */
  this.add('role:product,cmd:load', (msg, reply) => {
    this.make('product').load$(msg.args.params.id, (err, product) => {
      if (err) {
        reply(err);
      } else {
        reply(null, product);
      }
    })
  })
  /**
   * Add a new product
   */
  this.add('role:product,cmd:create', (msg, reply) => {
    const PRODUCT_TYPE = ["apple","banana", "strawberry", "orange"];
    var product = this.make('product');
    product.amount = Math.floor(Math.random() * 100);
    product.type = PRODUCT_TYPE[Math.floor(Math.random() * PRODUCT_TYPE.length)];
    product.save$(function (err, saved_product) {
      if (err) {
        reply(err);
      } else {
        reply(null, saved_product);
      }
    })
  })
}