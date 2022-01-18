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
    mysqlDs.autoupdate('Reviewer', function(err) {
      if (err) return cb(err);
      var Reviewer = app.models.Reviewer;
      Reviewer.create([{
        email: 'foo@bar.com',
        password: 'foobar'
      }, {
        email: 'john@doe.com',
        password: 'johndoe'
      },
      {
      email: 'test@doe.com',
      password: 'test'
    },
    {
      email: 'test1@doe.com',
      password: 'test1'
    }, {
        email: 'jane@doe.com',
        password: 'janedoe'
      }], cb);
    });
  }
 

  //var server = require('./server');
  
var ds = app.dataSources.db;
//var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
var lbTables = ['User','AccessToken'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
  ds.disconnect();
});


var User = app.models.User;
var Role = app.models.Role;
var RoleMapping = app.models.RoleMapping;
var Team = app.models.Team;
var City = app.models.City;
var country = app.models.Country;
var Bacheckoutdata = app.models.Bacheckoutdata;
var Country = app.models.Country;



User.create([
  {username: 'John', email: 'john@doe.com', password: 'opensesame'},
  {username: 'Jane', email: 'jane@doe.com', password: 'opensesame'},
  {username: 'Bob', email: 'bob@projects.com', password: 'opensesame'}
], function(err, users) {
  if (err) throw err;
  //console.log('Created users:', users);
  
  
  let sql ="SELECT ct.id,ct.name'city',ct.id_state,st.description'state',ct.description from city ct inner join state st on ct.id_state = st.id ";
City.dataSource.connector.query(sql, (err, cityData) => {
  
  // console.log('City Table All Data : - ',cityData);
});

  City.find({ where: { id: 1 } }, function (error, cityData) {
	  
	 //console.log('City Single Record Data : - ',cityData);
	 
});

City.find({ where: {and : [{id_country: 1}, {id_state: 1}]}, order :'name desc' }, function (error, cityData) {
	  
  //console.log('City  Record Data  Logical Conditions : - ',cityData);
  
});

City.find({ where: {id_state :{between: [1,2]}}, order :'name asc' }, function (error, cityData) {
	  
 // console.log('City  Record Data  Between Clause Conditions : - ',cityData);
  
});

City.find({ where: {name :{like: 'S%'}}, order :'name asc' }, function (error, cityData) {
	  
 // console.log('City  Record Data  Like  Clause Conditions : - ',cityData);
  
});



Country.find(function (error, cityData) {
	  
	 // console.log('Country Table  Data : - ',cityData);
	  
});

/*
Country.find({ where: {name: 'my',isactive:'true'}, limit: 4,order: 'id desc'}, function (error, cityData) {
	  
  console.log('Country  Table Data : - ',cityData);
 

  
});
*/

/*
  const odata = {
            id_country: 1,
            id_state: 2,
          };
          const whereData = { id: 4 };
		  
City.updateAll(whereData,odata, function (err, _odata) {
	// console.log('City Data is Updated : - ',_odata);
});
*/

/*

let cdata = {
  name: 'IND',
  description: 'IND',
};
let wherecData = { id: 1 };

//country.updateAll(wherecData, cdata,function (err, _ocdata) {
country.updateAll({id:2},{name : 'U.S.A.',description:'U.S.A.'},function(err,_ocdata)
{
	console.log('Country Data is Updated : - ',_ocdata);
});
*/

/*


Country.create([
  {name: 'S.A.', description: 'Southi Arabia', isactive: 'true'}
 
], function(err, countrydata) {
  if (err) throw err;
  console.log('New Created Record:', countrydata);

});


Country.beforeRemote('create', function(context,unused,next) {
  //context.args.data.CreateDtm = Date.now();  
 context.args.data.created = Date.now();   
  next();
});

*/

/*
country.find({ where: { id:4189 } }, function (error, _ocityData) {
	  

  if(_ocityData.length>0 && _ocityData[0].id>0)
  {
    
  let sqlquery ="delete from country where id ="+_ocityData[0].id;
  country.dataSource.connector.query(sqlquery, (err, dData) => {
    
    console.log('Record is deleted successfully..');
  });
 
  } 

});

*/

let countrydata = {
			                name: 'my',
			                description:  'my'
			              };
						 // Country.create(countrydata, function (err, _res) {console.log('Country Created Record:', _res);});
						  
						  // let assembled = [{name: 'mytest10'},{name: 'mytest11'}];
						  // Country.create(assembled, function (err, _res) {console.log('Created Record:', _res);});
						  
			              
/*
Country.create([
  {name: 'SA', description: 'Southi Arabia', isactive: 'true'}
 
], function(err, countrydata) {
  if (err) throw err;
  console.log('Created Record:', countrydata);

});
*/
  //create the admin role
  Role.create({
    name: 'admin'
  }, function(err, role) {
    if (err) throw err;

   // console.log('Created role:', role);

    //make bob an admin
    role.principals.create({
      principalType: RoleMapping.USER,
      principalId: users[2].id
    }, function(err, principal) {
      if (err) throw err;

    //  console.log('Created principal:', principal);
    });
  });

});







 //create user
 /*
 function createUser(cb) {
  ds.autoupdate('Reviewer', function(err) {
    if (err) return cb(err);
    var Reviewer = app.models.User;
    Reviewer.create([{
      email: 'foo@bar.com',
      password: 'foobar'
    }, {
      email: 'john@doe.com',
      password: 'johndoe'
    },
    {
      email: 'test@doe.com',
      password: 'test'
    }, {
      email: 'jane@doe.com',
      password: 'janedoe'
    }], cb);
  });
}
*/




//const User = app.models.User;

  User.greet = function(msg, cb) {
    cb(null, 'Greetings... ' - msg);
  };

  User.remoteMethod(
    'greet', {
      accepts: {
        arg: 'msg',
        type: 'string'
      },
      returns: {
        arg: 'greeting',
        type: 'string'
      }
    }
  );

  // remote method before hook
  User.beforeRemote('greet', function(context, unused, next) {
    console.log('Hi...!');
    next();
  });

  // remote method after hook
  User.afterRemote('greet', function(context, remoteMethodOutput, next) {
    console.log('End..!');
    next();
  });

  

////// Reading Excell Sheet File Data


  
  const reader = require('xlsx');  
// Reading our test file
//const file = reader.readFile('./Book1.xlsx');
 //const file = reader.readFile('./financial-actions_ent_zjcxwvqwxpyuhc64y2p6j6332e_20211221_20211222_1 - Copy.csv');

  const file = reader.readFile('./financial-actions_ent_zjcxwvqwxpyuhc64y2p6j6332e_20211221_20211222_1.csv');
  
// let data = [];
// const sheets = file.SheetNames;
 
// var  updatedRecordID = '';
// var CityN = app.models.City;

// for(let i = 0; i < sheets.length; i++)
// {
//    const temp = reader.utils.sheet_to_json(
//         file.Sheets[file.SheetNames[i]])
//         console.log("count : "+temp.length);
//    temp.forEach((res) => {     
     
// let Sub_Entity_Id = '';
// let Sub_Entity_Name = '' ;
// let Currency_Account_Custom_ID = '';
// let Fx_Trade_Id = '';
// let Payout_Id = '';
// let Reference ='';
// let Midd = '';
// let Entity_Country_Tax_Currency = '';
// let Tax_Fx_Rate ='';
// let Tax_Currency_Amount = '';


// if(res['Sub Entity ID']==null || res['Sub Entity ID']==undefined)
// {
//     Sub_Entity_Id = '';

// }
// else
// {
//   Sub_Entity_Id = res['Sub Entity ID'];
// }

// if(res['Sub Entity Name']==null || res['Sub Entity Name']==undefined)
// {
//     Sub_Entity_Name = '';

// }
// else
// {
//   Sub_Entity_Name = res['Sub Entity Name'];
// }

// if(res['Currency Account Custom ID']==null || res['Currency Account Custom ID']==undefined)
// {
//   Currency_Account_Custom_ID = '';

// }
// else
//  {
//   Currency_Account_Custom_ID = res['Currency Account Custom ID'];
//  }

// if(res['FX Trade ID']==null || res['FX Trade ID']==undefined)
// {
//   Fx_Trade_Id = '';

// }
// else
//  {
//   Fx_Trade_Id = res['FX Trade ID'];
//  }

//  if(res['Payout ID']==null || res['Payout ID']==undefined)
// {
//   Payout_Id = '';

// }
// else
//  {
//   Payout_Id = res['Payout ID'];
//  }

//  if(res['Reference']==null || res['Reference']==undefined)
//  {
//   Reference = '';

//  }
// else
//   {
//     Reference = res['Reference'];
//   }

//   if(res['MID']==null || res['MID']==undefined)
//   {
//     Midd = '';

//   }
//  else
//    {
//     Midd = res['MID'];
//    }
  
//    if(res['Entity Country Tax Currency']==null || res['Entity Country Tax Currency']==undefined)
//    {
//      Entity_Country_Tax_Currency = '';

//    }
//   else
//     {
//       Entity_Country_Tax_Currency = res['Entity Country Tax Currency'];
//     }
//     if(res['Tax Fx Rate']==null || res['Tax Fx Rate']==undefined)
//    {
//      Tax_Fx_Rate = '';

//    }
//   else
//     {
//       Tax_Fx_Rate = res['Tax Fx Rate'];
//     }

//     if(res['Tax Currency Amount']==null || res['Tax Currency Amount']==undefined)
//    {
//      Tax_Currency_Amount = '';

//    }
//   else
//     {
//       Tax_Currency_Amount = res['Tax Currency Amount'];
//     }
//     try 
//          {
// let sql ="insert into bacheckoutdata (Client_Entity_Id,Client_Entity_Name,Sub_Entity_Id,Sub_Entity_Name,Processing_Channel_Id,Merchant_Category_Code,Currency_Account_Id,Currency_Account_Name,Currency_Account_Custom_Id,Action_Type,Action_Id,Payment_Id,Requested_On,Processed_On,Processing_Currency,Fx_Rate_Applied,Holding_Currency,Fx_Trade_Id,Payout_Id,Reference,Payment_Method,Card_Type,Card_Category,Issuer_Country,Entity_Country,Region,MID,Response_Code,Response_Description,Breakdown_Type,Processing_Currency_Amount,Entity_Country_Tax_Currency,Tax_Fx_Rate,Tax_Currency_Amount,Record_Status) values('"+res['Client Entity ID']+"','"+res['Client Entity Name']+"','"+ Sub_Entity_Id+"' ,'"+ Sub_Entity_Name +"','"+res['Processing Channel ID']+"','"+res['Merchant Category Code']+"','"+res['Currency Account ID']+"','"+res['Currency Account Name']+"','"+ Currency_Account_Custom_ID +"','"+res['Action Type']+"','"+res['Action ID']+"','"+res['Payment ID']+"','"+res['Requested On']+"','"+res['Processed On']+"','"+res['Processing Currency']+"','"+res['FX Rate Applied']+"','"+res['Holding Currency']+"','"+ Fx_Trade_Id+"','"+ Payout_Id +"','"+ Reference+"','"+res['Payment Method']+"','"+res['Card Type']+"','"+res['Card Category']+"','"+res['Issuer Country']+"','"+res['Entity Country']+"','"+res['Region']+"','"+ Midd +"',"+res['Response Code']+",'"+res['Response Description']+"','"+res['Breakdown Type']+"','"+res['Processing Currency Amount']+"','"+Entity_Country_Tax_Currency+"','"+ Tax_Fx_Rate+"','"+ Tax_Currency_Amount +"','Processed')";
// Bacheckoutdata.dataSource.connector.query(sql, (err, tData) => {   
// //console.log(tData);

// });
// }
// catch(err)
// {
//     console.log("Error :"+ err);
// }
// })


// }

//// End of Read Code /////////// 

//console.log(sql);

    //// CityN.find({ where: {id: res['id'] } }, async function (error, tdata) {   
    ////  // if(tdata.length>0 &&( tdata[0].amount==null || tdata[0].amount==''))
   ////  if(tdata.length>0 &&(tdata[0].id>0))
    ////  {     
    ////   console.log("Search ID / Table Amount : "+ tdata[0].id +' / '+ tdata[0].amount);
    ////   let tamount = 0;
    ////   let excell_amount = 0; 
    ////   let total_amount = 0;
    ////   if(tdata[0].amount===null || tdata[0].amount==='' || tdata[0].amount===0)
    ////   {
   // //     tamount = 0;
    ////   }
    ////   else{
   // //     tamount = parseFloat(tdata[0].amount);
   // //   }
   // //   excell_amount = res['amount'];
    ////   total_amount = parseFloat(tamount + excell_amount);
    ////   console.log('ID : '+tdata[0].id + ' Table Amount :'+ tamount+ ' Excell :'+ res['amount']+ 'Total :'+ total_amount);    
    ////    let odata = {     
    ////    amount: total_amount        
    ////   };
    ////   let whereData = { id: res['id'] }; 
   // //   CityN.updateAll(whereData,odata, async function (err, _odata) {  
   // //     //console.log("Id : "+res['id']+ " UpAmount"+total_amount);
    ////      let sql ="SELECT * from city where id = "+ res['id'];
    ////      CityN.dataSource.connector.query(sql, (err, cityData) => {          
    ////       console.log('City Table All Data : - ',cityData);
    ////     });
             
    ////    });
    ////  }
      
    ////     }); 
    
 

 //console.log(data);
 
 
////// Reading CSV Sheet File Data



// var Paymenttrans = app.model.Paymenttrans;
// const reader = require('xlsx');  
// // Reading our test file
// const file = reader.readFile('./financial-actions_ent_zjcxwvqwxpyuhc64y2p6j6332e_20211221_20211222_1 - Copy.csv');

// let data = [];

// const sheets = file.SheetNames;

// var  updatedRecordID = '';

// for(let i = 0; i < sheets.length; i++)
// {
//    const temp = reader.utils.sheet_to_json(
//         file.Sheets[file.SheetNames[i]])
//    temp.forEach((res) => {  
   
// //     Paymenttrans.find({ where: {transactionId: res['Payment ID']}}, function (error, tdata) {  
      
// //       if(tdata.length>0 && tdata.processingFee==null)
// //       {     
// //         const odata = {
// //         processingFee:  res['Processing Currency Amount'],        
// //       };
// //       const whereData = { transactionId: res['Payment ID'] };  
// //       Paymenttrans.updateAll(whereData,odata, function (err, _odata) {

// // }); // End of City Update Function

// //  }         
      
// //     }); /// end of City Find  Function     
    
//     data.push(res);
      
//    })
// }  

// console.log(data);
// console.log(" Total Records : "+data.length);


};