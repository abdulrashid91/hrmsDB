module.exports = function(MyModel) {
    // send an email
    MyModel.sendEmail = function(cb) {
      MyModel.app.models.Email.send({
        to: 'ar.rashid06@gmail.com',
        from: 'kalawant.abdulrashid@gmail.com',
        subject: 'my subject',
        text: 'my text',
        html: 'my <em>html</em>'
      }, function(err, mail) {
        console.log('email sent ...!');
        cb(err);
      });
    }
  };