'use strict';

module.exports = function(Country) {

  var Promise = require('bluebird');
  

     // Return Country  name given an ID.
  /*
     Country.getName = function(id, cb) {
        Country.findById(id, function (err, instance) {
        var response = "Name of Country is " + instance.name;
        cb(null, response);
        console.log(response);
    });
  }
*/
  

Country.getName = async (callback) => {
  try {
    const data = await Country.find({where: {id: 101}});
    return Promise.resolve(data);
  } catch (e) {
    console.error('Error DEscription :-',e);
    return Promise.reject(e);
  }
};
  
Country.getAllName = function(cb) {
 
  Country.find({where: {id: 101}},)
  .then(function(result){
   // ... // Called if the operation succeeds.
    cb(null, result);
  })
  .catch(function(err){
    console.log('Error DEscription :-',e);
  })
}
Country.remoteMethod (
  'getAllName', 
  {
   http: {path: '/getAllName', verb: 'get'},
    returns: {arg: 'name', type: 'string'}
   }
);



Country.remoteMethod (
    'getName', 
    {
     http: {path: '/getname', verb: 'get'},
     
    // accepts: {arg: 'id', type: 'number', http: { source: 'query' } },
     accepts: {arg: 'id', type: 'number'},
      returns: {arg: 'name', type: 'string'}
     }
  );

  // remote method before hook
  Country.beforeRemote('getName', function(context, unused, next) {
    console.log('Calling getName Remote Method,using  remote method before hook Operation successfully successfully..!');
    next();
  });

  // remote method after hook
  Country.afterRemote('create', function(context, remoteMethodOutput, next) {
    console.log('Remote Method After Hook Operation is called successfully..!');
    next();
  });

};
