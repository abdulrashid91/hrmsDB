'use strict';

module.exports = function(Bacheckoutdata) {
 
    Bacheckoutdata.remoteMethod("ImportExcellData", {
        description: "Import Data from  Excell Sheet .", 
        http: {path:'/ImportExcellData', verb: 'get'} ,    
        returns: {
          type: "array",
          root: true,
        },
       
      });

      Bacheckoutdata.ImportExcellData =  function (cb) {      
        const reader = require('xlsx') ;           
      //const file = reader.readFile('./financial-actions_ent_zjcxwvqwxpyuhc64y2p6j6332e_20211221_20211222_1 - Copy.csv');
      const file = reader.readFile('./financial-actions_ent_zjcxwvqwxpyuhc64y2p6j6332e_20211221_20211222_1.csv');
    
        const data = [];        
        const sheets = file.SheetNames;        
        //for(let i = 0; i < sheets.length; i++)
       // {
          let i = 0;
           const temp = reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
                const totalRowsCount = temp.length;
                let rowCount = 0;
           temp.forEach((res) => {  
         //   rowCount = rowCount+1;
try 
         { 
           
           Bacheckoutdata.create([
             {clientEntityId: res['Client Entity ID'], clientEntityName: res['Client Entity Name'], subEntityId: res['Sub Entity ID'] , subEntityName: res['Sub Entity Name'] ,processingChannelId: res['Processing Channel ID'],merchantCategoryCode: res['Merchant Category Code'],currencyAccountId: res['Currency Account ID'], currencyAccountName: res['Currency Account Name'],currencyAccountCustomId: res['Currency Account Custom ID'], actionType: res['Action Type'],actionId: res['Action ID'], paymentId: res['Payment ID'], requestedOn: res['Requested On'], processedOn: res['Processed On'],
             processingCurrency: res['Processing Currency'],fxRateApplied:res['FX Rate Applied'], holdingCurrency: res['Holding Currency'], fxTradeId: res['FX Trade ID'], payoutId: res['Payout ID'], reference: res['reference'], paymentMethod:res['Payment Method'],cardType: res['Card Type'], cardCategory: res['Card Category'], issuerCountry: res['Issuer Country'], entityCountry: res['Entity Country'], region: res['Region'], mid: res['MID'], responseCode: res['Response Code'], responseDescription: res['Response Description'], breakdownType: res['Breakdown Type'], processingCurrencyAmount: res['Processing Currency Amount'], entityCountryTaxCurrency: res['Entity Country Tax Currency'], taxFxRate: res['Tax Fx Rate'], taxCurrencyAmount:res['Tax Currency Amount'],status :'Processed'
            }            
          ], function(err, tData) {
             if (err) throw err;
            data.push(tData);
        });
      }
      catch(err)
      {
          console.log(err);
      }
      // if(totalRowsCount===rowCount)
      // {
      //   cb(null, data);    
      //  }
    }) 
    cb(null, data);
   
      // }   //// End of For Loop           
    };

};