module.exports = function supplier(options) {
    /**
     * Get a list of all suppliers
     */
    this.add('role:supplier,cmd:list', (msg, reply) => {
        this.make('supplier').list$({}, (err, supplier) => {
            if (err) {
                reply(err);
            } else {
                reply(null, supplier)
            }
        })
    })
    /**
   * Get a list of filtered suppliers by type
   */
    this.add('role:supplier,cmd:list,criteria:byType', (msg, reply) => {
        this.make('supplier').list$({ type: msg.args.params.type }, (err, supplier) => {
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
    this.add('role:supplier,cmd:load', (msg, reply) => {
        this.make('supplier').load$(msg.args.params.id, (err, supplier) => {
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
    this.add('role:supplier,cmd:create', (msg, reply) => {
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
}