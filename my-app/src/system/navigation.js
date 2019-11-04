//--This component contains tab navigation functionality of customer management system--              
        function navigateToHome() {
            //set tab active
            document.getElementById("müsterieklemenu").className = "active"
            document.getElementById("müsterimenu").className = ""
            document.getElementById("bildirimmenu").className = ""
            document.getElementById("thesapmenu").className = ""
            document.getElementById("kasamenu").className = ""
            document.getElementById("ayarlarmenu").className = ""
             document.getElementById("geçmişmenu").className = ""
            //change document body
            document.getElementById("div1").style.display = "block"
            document.getElementById("div2").style.display = "none"
            document.getElementById("div3").style.display = "none"
            document.getElementById("div4").style.display = "none"
            document.getElementById("div5").style.display = "none"
            document.getElementById("div6").style.display = "none"
            document.getElementById("div7").style.display = "none"
            
        }
        //If cash register doesn't exist create new cash register
        function navigateToKasa() {
            localforage.getItem("kasa").then(
            function(value){
                if(value === null){
                    kasaoluştur(0);
                
                    
                }
                
            }
            
            );
           
            //set tab active
            document.getElementById("müsterieklemenu").className = ""
            document.getElementById("müsterimenu").className = ""
            document.getElementById("thesapmenu").className = ""
            document.getElementById("bildirimmenu").className = ""
            document.getElementById("kasamenu").className = "active"
            document.getElementById("ayarlarmenu").className = ""
            document.getElementById("geçmişmenu").className = ""
            //change document body
            document.getElementById("div3").style.display = "none"
            document.getElementById("div2").style.display = "none"
            document.getElementById("div1").style.display = "none"
            document.getElementById("div4").style.display = "block"
            document.getElementById("div5").style.display = "none"
            document.getElementById("div6").style.display = "none"
            document.getElementById("div7").style.display = "none"
        }
        //Prompt dialog for cash register safety and redirect accordingly
        function kasagüvenlik() {
            localforage.getItem("kasaşifresi").then(function(value2){
                
                
                   alertify.prompt("Register Security","Cash Register Password", "",
                function(evt, value) {
                    if (value == value2) {
                        alertify.success("Success!");
                        kasaoluştur(0);

                    } else {
                        navigateToHome();
                        window.location.hash = "#müsteriekle"
                        alertify.error("Wrong Password");
                    }

                },
                function() {
                    navigateToHome();
                    window.location.hash = "#müsteriekle"
                });
                
                
                
            })

         
        }
        //Navigation logic for tabs other than cash register
        function hchange() {
autocomplete()
            if (window.location.hash == "#müsteri") {
                //set tab active
                document.getElementById("müsterimenu").className = "active"
                document.getElementById("müsterieklemenu").className = ""
                document.getElementById("bildirimmenu").className = ""
                document.getElementById("thesapmenu").className = ""
                document.getElementById("kasamenu").className = ""
                document.getElementById("ayarlarmenu").className = ""
                document.getElementById("geçmişmenu").className = ""

                //change document body
                document.getElementById("div1").style.display = "none"
                document.getElementById("div3").style.display = "none"
                document.getElementById("div2").style.display = "block"
                document.getElementById("div4").style.display = "none"
                document.getElementById("div5").style.display = "none"
                document.getElementById("div6").style.display = "none"
                document.getElementById("div7").style.display = "none"

            } else if (window.location.hash == "#müsteriekle") {
        
                navigateToHome();

            } else if (window.location.hash == "#thesap") {
                //set tab active
                document.getElementById("müsterieklemenu").className = ""
                document.getElementById("müsterimenu").className = ""
                document.getElementById("bildirimmenu").className = ""
                document.getElementById("thesapmenu").className = "active"
                document.getElementById("kasamenu").className = ""
                document.getElementById("ayarlarmenu").className = ""
                document.getElementById("geçmişmenu").className = ""
                //change document body
                document.getElementById("div3").style.display = "block"
                document.getElementById("div2").style.display = "none"
                document.getElementById("div1").style.display = "none"
                document.getElementById("div4").style.display = "none"
                document.getElementById("div5").style.display = "none"
                document.getElementById("div6").style.display = "none"
                document.getElementById("div7").style.display = "none"

            } else if (window.location.hash == "#kasa") {
                //open cash register safety dialog
                kasagüvenlik();
                navigateToKasa();
            
            } else if (window.location.hash == "#bildirim") {
                //set tab active
                document.getElementById("müsterieklemenu").className = ""
                document.getElementById("müsterimenu").className = ""
                document.getElementById("thesapmenu").className = ""
                document.getElementById("kasamenu").className = ""
                document.getElementById("bildirimmenu").className = "active"
                document.getElementById("ayarlarmenu").className = ""
                document.getElementById("geçmişmenu").className = ""
                //change document body
                document.getElementById("div3").style.display = "none"
                document.getElementById("div2").style.display = "none"
                document.getElementById("div1").style.display = "none"
                document.getElementById("div4").style.display = "none"
                document.getElementById("div5").style.display = "block"
                document.getElementById("div6").style.display = "none"
                document.getElementById("div7").style.display = "none"

            }else if (window.location.hash == "#ayarlar") {
                //set tab active
                document.getElementById("müsterieklemenu").className = ""
                document.getElementById("müsterimenu").className = ""
                document.getElementById("thesapmenu").className = ""
                document.getElementById("kasamenu").className = ""
                document.getElementById("bildirimmenu").className = ""
                document.getElementById("ayarlarmenu").className = "active"
                document.getElementById("geçmişmenu").className = ""
                //change document body
                document.getElementById("div3").style.display = "none"
                document.getElementById("div2").style.display = "none"
                document.getElementById("div1").style.display = "none"
                document.getElementById("div4").style.display = "none"
                document.getElementById("div5").style.display = "none"
                document.getElementById("div6").style.display = "block"
                document.getElementById("div7").style.display = "none"

            }else if (window.location.hash == "#geçmiş") {
                //set tab active
                document.getElementById("müsterieklemenu").className = ""
                document.getElementById("müsterimenu").className = ""
                document.getElementById("thesapmenu").className = ""
                document.getElementById("kasamenu").className = ""
                document.getElementById("bildirimmenu").className = ""
                document.getElementById("ayarlarmenu").className = ""
                document.getElementById("geçmişmenu").className = "active"
                //change document body
                document.getElementById("div3").style.display = "none"
                document.getElementById("div2").style.display = "none"
                document.getElementById("div1").style.display = "none"
                document.getElementById("div4").style.display = "none"
                document.getElementById("div5").style.display = "none"
                document.getElementById("div6").style.display = "none"
                document.getElementById("div7").style.display = "block"
            }


        }
        //Call hchange function on hash change
        $(window).on('hashchange', hchange);
