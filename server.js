const Express = require('express');
const context = Express();
const SenecaWeb = require('seneca-web');
const port = 3001;

let Routes = [{
  pin: 'role:bank,get:*',
  prefix: '/',
  map: {
    seller: {
      GET: true,
    },
    buyer: {
      GET: true,
    }
  }
},
{
  pin: 'role:bank,add:*',
  prefix: '/',
  map: {
    seller: {
      POST: true,
    },
    buyer: {
      POST: true,
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
  .use('bank')
  .use('entity')
  .use('mongo-store', {
    uri: 'mongodb://127.0.0.1:27017/local',
    options: {}
  })
  .ready(() => {
    context.listen(port, () => {
      console.log('listening on port ' + port);
    });
  });