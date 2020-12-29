const Express = require('express');
const context = Express();
const SenecaWeb = require('seneca-web');
const port = 3001;

let Routes = [{
  pin: 'role:supplier,cmd:*',
  prefix: '/supplier',
  map: {
    list: {
      GET: true
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
  pin: 'role:supplier,cmd:list,criteria:byType',
  prefix: '/supplier',
  map: {
    list: {
      GET: true,
      suffix: '/:type'
    }
  }
},
{
  pin: 'role:buyer,cmd:*',
  prefix: '/buyer',
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
  pin: 'role:buyer,cmd:list,criteria:byType',
  prefix: '/buyer',
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
  .use('bank')
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