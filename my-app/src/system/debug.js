//--This component contains debug tools of customer management system-- 

       //Getting the native electron object
       var electron =require("electron").remote;

  //Binding key combination to developer tools   
  document.addEventListener("keydown", function (e) {
		if (e.ctrlKey &&e.shiftKey &&e.which === 74 ) {
			electron.getCurrentWindow().toggleDevTools();
		} else if (e.which === 116) {
			location.reload();
		}
	});
    
 