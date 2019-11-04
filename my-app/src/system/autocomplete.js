 //--This component contains autocomplete functionality of customer management system-- 


//Declaring the autocomplete list
        var list;

//Main function for autocomplete
        function autocomplete() {


            localforage.keys().then(function(value) {
                console.log(value);
                
                //Excluding system values from autocomplete

                list = value.filter(e => !(e.includes("taksit") || e.includes("kasa") || e.includes("girdiler") || e.includes("çıktılar") || e.includes("kasaşifresi")));
                
                //Attaching autocomplete to inputs


                var input = document.getElementById("taksitisim");
                new Awesomplete(input, {
                    list: list,
                    minChars: 1
                });


                var input2 = document.getElementById("detayisim");
                new Awesomplete(input2, {
                    list: list,
                    minChars: 1
                });

          
                var input3 = document.getElementById("userdelete");
                new Awesomplete(input3, {
                    list: list,
                    minChars: 1
                });

            })




        }

    