//--This component contains onload/cash register security functionality of the customer management system--
       window.onload=function(){
         //Check if cash register password exists
         localforage.getItem("kasaşifresi").then((value)=>{
             if(value === null){
                 //If cash register password doesn't exist set a default value
                 localforage.setItem("kasaşifresi",12345678);
             }
             
         });
           //Function to check todays installment alerts
           taksitAlert();
           //If cash register timeout is over and notify user
           localforage.getItem("kasa").then(value =>{
               
               if(Date.parse(value.tarih).isBefore(Date.today())){
                   alertify.error("Cash register is expired and needs to be reset");
               }
           })

          //Get color settings from localstorage  
          var bodyRenk = localStorage.getItem("bodyRenk");
          var navRenk = localStorage.getItem("navRenk");
           if(bodyRenk == undefined|| navRenk == undefined){
             //Use default colors  
               
           }else{
               //Set UI colors from localstorage
               document.getElementById("body").style.backgroundColor=bodyRenk;
                document.getElementById("navbr").style.backgroundColor=navRenk;
               
           }
       }


