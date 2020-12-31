const Express = require('express');
const context = Express();
const SenecaWeb = require('seneca-web');
const port = 3002;

let Routes = [{
  pin: 'role:product,cmd:*',
  prefix: '/product',
  map: {
    list: {
      GET: true,
    },
    load: {
      GET: true,
      suffix: '/:id'
    },
    create: {
      POST: true
    }
  }
},
{
  pin: 'role:product,cmd:list,criteria:byType',
  prefix: '/product',
  map: {
    list: {
      GET: true,
      suffix: '/:type'
    }
  }
}];

let senecaWebConfig = {
  routes: Routes,
  adapter: require('seneca-web-adapter-express'),
  context: context
};

const seneca = require('seneca')({ log: 'silent' })
  .use(SenecaWeb, senecaWebConfig)
  .use('product')
  .use('entity')
  .use('mongo-store', {
    uri: 'mongodb://127.0.0.1:27017/local',
    options: {}
  })
  .ready(() => {
    var server = seneca.export('web/context')()
    server.listen(port, () => {
      console.log('listening on port ' + port);
    });
  });