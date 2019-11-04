//--This component contains cash register history functionality of customer management system-- 

//Global variables
    var currentkasa;
    var kasalar;

//Main function for creating cash register history object
          function kasaGeçmişi(){
    localforage.getItem("girdiler").then(gelirval => {
        var gelirgeçmişi = gelirval;
        localforage.getItem("çıktılar").then(giderval =>{
        var gidergeçmişi = giderval;
              localforage.getItem("kasa").then(kasaval=>{
                  
            localforage.getItem("kasalar").then(value=>{
                
        //Creating the cash register object
                 var kasageçmişi ={
        "kasa":kasaval,
        "gelirler":gelirgeçmişi,
        "giderler":gidergeçmişi
        
    }
        //If history doesnt exist create a new history
            if(value === null){
                kasalar =[];
                kasalar.push(kasageçmişi);
                localforage.setItem("kasalar",kasalar).then(kasaSil());
                
            }else{
                kasalar = value;
             kasalar.push(kasageçmişi);
                localforage.setItem("kasalar",kasalar).then(kasaSil());
                
            }
        })
        })
            
        })
    })
   
         
      
 
        
        
    }    
        
    //Function for resetting the daily cash register     
    function kasaSil(){
        var boşgirdi =[];
            localforage.removeItem("kasa").then(
            localforage.removeItem("çıktılar").then(
            localforage.removeItem("girdiler").then(
                function(value){
            alertify.success("Kasa sıfırlandı");
            kasaoluştur(0);
            localforage.setItem("girdiler",boşgirdi);
        localforage.setItem("çıktılar",boşgirdi);
                    
                }
  
                
                
            
            ))
            )
            
            
        }
//Function for getting/rendering cash register history at given range
        function sortMonth(){
            var kasasum = 0
            var gidersum = 0
            var gelirsum = 0
            var kasatarihi;
            var tarih1 = document.getElementById("tarih1").value;
            var tarih2 = document.getElementById("tarih2").value;
            document.getElementById("geçmişgelir").innerHTML="";
            document.getElementById("geçmişgider").innerHTML="";
            localforage.getItem("kasalar").then(value=>{
                
                value.forEach(elem =>{
                    kasatarihi = Date.parse(elem.kasa.tarih);
                    if(kasatarihi.between(Date.parse(tarih1),Date.parse(tarih2))){
                      kasasum += elem.kasa.miktar;
                       elem.gelirler.forEach(gelir =>{
                           var h5 = document.createElement("h4");
                           var br = document.createElement("br");
                           h5.innerHTML=gelir.isim+" "+gelir.değer.toLocaleString()+"$"+" "+gelir.tarih;
                           document.getElementById("geçmişgelir").appendChild(h5);
                          
                           gelirsum+=gelir.değer;})
                       elem.giderler.forEach(gider =>{
                            var h5 = document.createElement("h4");
                           var br = document.createElement("br");
                           h5.innerHTML=gider.isim+" "+gider.değer.toLocaleString()+"$"+" "+gider.tarih;
                           document.getElementById("geçmişgider").appendChild(h5);
                           
                           gidersum+=gider.değer})
                    }
                    
                    
                });
                document.getElementById("kasanet").innerHTML="Aralıklar arası net kasa: "+kasasum.toLocaleString()+"$";
                document.getElementById("gelirtoplam").innerHTML="Aralıklar arası toplam gelir: "+gelirsum.toLocaleString()+"$";
                document.getElementById("gidertoplam").innerHTML="Aralıklar arası toplam gider:"+gidersum.toLocaleString()+"$";
                
            })
            
        }
        
     
        
