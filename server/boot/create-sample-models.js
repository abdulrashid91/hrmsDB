var async = require('async');
module.exports = function(app) {
  //data sources
  
  var mysqlDs = app.dataSources.hrmsDB;
  //create all models
  async.parallel({
    reviewers: async.apply(createReviewers),
    
  }, function(err, results) {
    if (err) throw err;
    createReviewers(results.reviewers,  function(err) {
      console.log('> models created sucessfully');
    });
  });

  

  //create reviewers
  function createReviewers(cb) {
    mysqlDs.automigrate('Reviewer', function(err) {
      if (err) return cb(err);
      var Reviewer = app.models.Reviewer;
      Reviewer.create([{
        email: 'foo@bar.com',
        password: 'foobar'
      }, {
        email: 'john@doe.com',
        password: 'johndoe'
      }, {
        email: 'jane@doe.com',
        password: 'janedoe'
      }], cb);
    });
  }
 
  
};