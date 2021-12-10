'use strict';

module.exports = function(Country) {

     // Return Country  name given an ID.
  
     Country.getName = function(id, cb) {
        Country.findById(id, function (err, instance) {
        var response = "Name of Country is " + instance.name;
        cb(null, response);
        console.log(response);
    });
  }

 /* Country.getName = function (id, name, cb) {
    Country.findOne({where: {id: id}}, function(err, modelInstance) {
        //modelInstance has properties here and can be returned to
        //the API call using the callback, for example:
        cb(null, {"name": modelInstance.name});
    }
}*/

Country.remoteMethod (
    'getName', 
    {
     http: {path: '/getname', verb: 'get'},
     
     accepts: {arg: 'id', type: 'number', http: { source: 'query' } },
    // accepts: {arg: 'id', type: 'number'},
      returns: {arg: 'name', type: 'string'}
     }
  );

  // remote method before hook
  Country.beforeRemote('getName', function(context, unused, next) {
    console.log('Calling getName Remote Method using  remote method before hook Operation successfully successfully..!');
    next();
  });

  // remote method after hook
  Country.afterRemote('create', function(context, remoteMethodOutput, next) {
    console.log('Remote Method After Hook Operation is called successfully..!');
    next();
  });

};
