'use strict';
module.exports = function(Paymenttrans) {

       Paymenttrans.remoteMethod("ProcessExcellData", {
        description: "Process Excell Sheet Data.",      
        returns: {
          type: "array",
          root: true,
        },
      });

        Paymenttrans.ProcessExcellData = function (cb) {
         try 
         {
          let sql ="select * from bacheckoutdata where status = 'Processed' order by paymentId";
          Paymenttrans.dataSource.connector.query(sql, (err, tData) => {           
             if (err) {
              cb(null, err);
            } 
            else if(tData.length>0) {
              
            for(let i = 0; i < tData.length; i++){
              
               Paymenttrans.find({ where: {transactionId: tData[i]['paymentId'] } },function (error, tdata) { 

                let sql_query ="select paymentId,sum(processingCurrencyAmount)amount from bacheckoutdata where paymentId ='" + tData[i]['paymentId'] + "' and bacheckoutdata.status = 'Processed'" ;

                Paymenttrans.dataSource.connector.query(sql_query, (err, dataResult) => {
                  
                  Paymenttrans.updateAll({transactionId: dataResult[0].paymentId},{processingFee : dataResult[0].amount},function(err,_odata)
                  {
                   
                   let update_status ="update bacheckoutdata set status = 'Completed'  where  paymentId = '" + dataResult[0].paymentId + "'" ;

                   Paymenttrans.dataSource.connector.query(update_status, (err, statusResult) => {
                   
                   });

                  });


                });
              });  

            }
            cb(null, tData);
            } 
            else
            {
              cb(null, "Records Not Found for that Operation..!");
            }
          });    
        }
        catch(err)
{
    console.log("Error :"+ err);
}
       };

};
