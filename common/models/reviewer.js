'use strict';

module.exports = function(Reviewer) {
    

   /*
  Reviewer.hello = function(msg, cb) {
        cb(null, 'Welcome :... ' + msg);
        
      }
*/
   
   
/*
     Reviewer.hello = async function(msg) {    

        return 'Greetings... '+msg ;
    }
    */

    // Correct
  
    Reviewer.hello = function(msg) {
      return new Promise((resolve, reject) => {
          resolve('Greetings... ' + msg);
      });
  }
  

  
  
      Reviewer.messagedisplay = function(cb) {
        cb(null,' Simple Message Display Function is Defined...' );
        
      }
      Reviewer.remoteMethod('hello', {
            accepts: {arg: 'msg', type: 'string'},
            returns: {arg: 'Message', type: 'string'}
      });

      Reviewer.remoteMethod('messagedisplay', {
        returns: {arg: 'Message', type: 'string'}
  });


  Reviewer.beforeRemote('create', function(context,unused,next) {
    //context.args.data.CreateDtm = Date.now();  
   context.args.data.CreateDtm = "10-12-2021";   
    next();
  });

};
