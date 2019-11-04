 //--This component contains backup/restore functionality of customer management system-- 
var processedNames;

//--Native requirements from node.js--

//Getting the filesystem object
const fs = require("fs");
//Getting the electron dialog object 
const {dialog} =require("electron").remote; 
        
//Main function for backup local memory 
        function filesave(){
            //Show native windows dialog
            dialog.showOpenDialog({
    properties: ['openDirectory']
  },function (foldername) {

  if (foldername === undefined) return;

 console.log(foldername);
                
    localforage.keys().then((value)=>{
        
  
        

        value.forEach(
        function(element){
            localforage.getItem(element).then(
            (val2)=>{
                
                 fs.writeFile(foldername+"/"+element, JSON.stringify(val2), (err) => {
        if(err){
            alert("An error ocurred creating the file "+ err.message)
        }
                    
        alertify.success("The file has been succesfully saved");
    });
 
                
            }
            
            )
            
        }
        )
        
        
        
    
    });


 }); 
                   
   
  

        }
        
    
//Main functionality for restoring local memory
            function restore () {

 dialog.showOpenDialog({
    properties: ['multiSelections']
  },function (fileNames) {

  if (fileNames === undefined) return;

console.log(fileNames);
    var absDirectIndex =fileNames[0].lastIndexOf("\\"); 
     var absDirect =fileNames[0].slice(0,absDirectIndex);
     console.log(absDirect);
   processedNames =[]

fileNames.forEach(function(direct){
    var temp=direct.split('\\');
    processedNames.push(temp[temp.length-1])
    
})
   
console.log(processedNames);
     processedNames.forEach(
     function (bakname){
         
         fs.readFile(absDirect+"\\"+bakname, 'utf-8', function (err, data) {
localforage.setItem(bakname,JSON.parse(data)).then(alertify.success('Record Restored'))
   

  });
     }
     
     )


 }); 


}
        
            
    
    
  