//--This component contains color settings  of customer management system-- 

//Function for setting the body color
    function bodyRenk() {
         document.getElementById("body").style.backgroundColor =document.getElementById("bodyRenk").value
        localStorage.setItem("bodyRenk",document.getElementById("bodyRenk").value)
    }
//Function for setting the navigation bar color
         function navRenk() {
         document.getElementById("navbr").style.backgroundColor =document.getElementById("navRenk").value
        localStorage.setItem("navRenk",document.getElementById("navRenk").value)
    }
    
