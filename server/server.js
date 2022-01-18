// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    //const baseUrl = app.get('url').replace(/\/$/, '');
	const baseUrl = "http://localhost:3000";  //prod
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
  app.middleware('auth', loopback.token({
    currentUserLiteral: 'me'
}));
// const emitter = new EventEmitter();
// emitter.setMaxListeners(0);
// // or 0 to turn off the limit
// emitter.setMaxListeners(0);
      app.start();

      ///// Email Send Functionality Code //////////

// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//  host: 'smtp.gmail.com',
//    port: 587,
//     secure: false,
//     requireTLS: true,
//     
//   auth: {
//     user: 'kalawant.abdulrashid@gmail.com',
//     pass: 'uokgdmjqztyupxzm'
//   }
// });



// var mailOptions = {
//   from: 'kalawant.abdulrashid@gmail.com',
//   to: 'ar.rashid06@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };



// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

///////////// End of Cpde ////////////////////



});
