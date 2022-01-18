'use strict';

const request = require('request');

const localurl = "http://localhost:3000/api/countries";
const thirdpartyurl = "https://www.anapioficeandfire.com/api/books";

module.exports = function(City) {

    // listCities
    City.listCities = function(cb) {
        City.find({
      fields: {
        description: false,
        isactive: false
      }
    }, cb);
  };
  City.remoteMethod('listCities', {
    returns: {arg: 'city', type: 'array'},
    http: {path:'/list-city', verb: 'get'}
  });
  
 
  

  City.remoteMethod(
        'localapi',
        {
          accepts: [{arg: 'data', type: 'object'}],
          returns: {
            type: "array",
            root: true,
          },
          http: {path: '/localapi', verb: "get"}
        }
  );


  City.localapi = function(data, cb){      
    request.get({url: localurl}, function(error, response, body){
     
      cb(error,body);   

    });
 
};

const thirdpartyurl = "https://www.anapioficeandfire.com/api/books";

City.remoteMethod(
  'globalapi',
  {
    accepts: [{arg: 'data', type: 'object'}],
    returns: {
      type: "array",
      root: true,
    },
    http: {path: '/globalapi', verb: "get"}
  }
);
  City.globalapi = function(data, cb){       
    request.get({url: thirdpartyurl}, function(error, response, body){
      cb(error, body); 

    });
 
};





  City.remoteMethod("listAll", {
    description: "List All Data.",      
    returns: {
      type: "array",
      root: true,
    },
  });

  City.remoteMethod("ReadExcellData", {
    description: "Read Excell Sheet Data.",      
    returns: {
      type: "array",
      root: true,
    },
  });


  City.ReadExcellData = function (cb) {
    
    const reader = require('xlsx') ; 
    // Reading our test file
   // const file = reader.readFile('./Book1.xlsx');    
   const file = reader.readFile('./financial-actions_ent_zjcxwvqwxpyuhc64y2p6j6332e_20211221_20211222_1.csv');

    let data = [];
    
    const sheets = file.SheetNames;
    console.log(sheets); 
    var  updatedRecordID = '';
    for(let i = 0; i < sheets.length; i++)
    {
       const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
       temp.forEach((res) => {  
/*
        City.find({ where: {id: res['id']}}, function (error, tdata) {  
          
          if(tdata.length>0)
          {
          updatedRecordID = updatedRecordID   +  res['id']+ ',';
         // console.log(tdata);
         //console.log("Updated Records ID : "+updatedRecordID);
    
            const odata = {
            amount:  res['amount'],        
          };
          const whereData = { id: res['id'] };  
    City.updateAll(whereData,odata, function (err, _odata) {
   // console.log('City Data is Updated :');
    }); // End of City Update Function
    
     }         
          
        });*/ /// end of City Find  Function     
        
        data.push(res);
          
       })
    }      
    // Printing data   
    cb(null, data);
 
   };


const getCityInfo = async (cb) => {
    let sql ="SELECT ct.id,ct.name'city',ct.id_state,st.description'state',ct.description from city ct inner join state st on ct.id_state = st.id ";
    City.dataSource.connector.query(sql, (error, dataResults) => {
      cb(error, dataResults);
    });
  };

  City.listAll = function (cb) {
   //City.listAll = async function (cb) {
    let sql ="SELECT ct.id,ct.name'city',ct.id_state,st.description'state',ct.description from city ct inner join state st on ct.id_state = st.id ";

    City.dataSource.connector.query(sql, (err, locationData) => {
	//getCityInfo(async function (error, locationData) {
      if (err) {
        cb(null, err);
       return err;
      } else {
        cb(null, locationData);
        //return locationData;
      }
    });
  };

};
