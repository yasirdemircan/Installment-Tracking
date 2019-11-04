//--This component contains online cash register syncronizer of customer management system-- 

  // Initialize Firebase
    var config = {
 //Firebase Config Info here
  };

  firebase.initializeApp(config);
    var database = firebase.database();
    
//Sending cash register data to server on interval (5 seconds default)
     setInterval( function sendToServer(){
        localforage.getItem("kasa").then(
        function(kasavalue){
 localforage.getItem("girdiler").then(
 function(girdivalue){
     localforage.getItem("çıktılar").then(
     function(çıktıvalue){
         localforage.getItem("kasalar").then(
         function(geçmişkasalar){
                database.ref('/ep').set({
    kasa: JSON.stringify(kasavalue),
    girdiler:JSON.stringify(girdivalue),
    çıktılar:JSON.stringify(çıktıvalue),
    kasalar:JSON.stringify(geçmişkasalar)
    
  });
         }
         )
 
         
         
     }
     )
     
 } 
 
 )
            
}
            
      )}
        
      ,5000);

    //Function for changing the cash register password (12345678 for default)
    function changePass(){
        var oldpass = document.getElementById("oldpass").value;
        var newpass = document.getElementById("newpass").value;
     localforage.getItem("kasaşifresi").then(value =>{
         //Checking if old password is correct
       if(value == oldpass){
           localforage.setItem("kasaşifresi",parseInt(newpass)).then(val2 =>{
               document.getElementById("oldpass").value ="";
               document.getElementById("newpass").value ="";
               alertify.success("Şifre başarıyla değiştirildi");})
           
       }else{
           //Throw error if not 
           alertify.error("Eski şifre hatalı");
       }
         
     })
        
    }
