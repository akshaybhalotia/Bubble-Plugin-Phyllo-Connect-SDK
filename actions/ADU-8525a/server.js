function(properties, context) {


 const { Client_Id, Client_Secret }   = context.keys;
    
 var body = [properties.clientdisplayname, properties.environment, properties.userid, properties.token, properties.workplatformid];
    
 var phylloConnect = window.PhylloConnect.initialize(body);

    phylloConnect.open();

 
}

