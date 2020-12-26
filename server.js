const Express = require('express');
const context = Express();
const SenecaWeb = require('seneca-web');
const port = 3000;

let Routes = [{
  pin: 'role:api,cmd:*',
  prefix: '/api',
  map: {
    home: {
      GET: true,
    },
    profile: {
      GET: true,
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
    .use('apis')
    .ready(() => {
        context.listen(port, () => {
          console.log('listening on port ' + port);
        });
      });