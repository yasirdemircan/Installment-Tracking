 //--This component contains receipt related info renderer of customer management system-- 

        //Global variables
        var custInfo;
        var partInfo;

        //Main function for getting customer information from memory and rendering 
        function getCustomer() {
            document.getElementById("logocontainer").style.display = "none";
            document.getElementById("legals").style.display = "none";
            var isim = document.getElementById("detayisim").value
            var br = document.createElement("br");
            //Main function for rendering info
            function show() {
                document.getElementById("custDetail").innerHTML = ""
                var cstisim = document.createElement("h3");
                var cstsayı = document.createElement("h4");
                var csttel = document.createElement("h4");
                var cstadres = document.createElement("h4");
                var csttoplam = document.createElement("h4");
                var cstödenen = document.createElement("h4");
                var cstpeşin = document.createElement("h4");
                var cstkalan = document.createElement("h4");
                var custjson = JSON.parse(custInfo);
                var nettoplam = custjson["ürün fiyatı"] - custjson["peşinat"];
                var taksitfiyatı = nettoplam / custjson["taksit sayısı"];
                var kalanmiktar = nettoplam - (taksitfiyatı * custjson["ödenentaksit"]);
                //Function for formatting the phone number
                function format(mask, number) {
                    var s = '' + number,
                        r = '';
                    for (var im = 0, is = 0; im < mask.length && is < s.length; im++) {
                        r += mask.charAt(im) == 'X' ? s.charAt(is++) : mask.charAt(im);
                    }
                    return r;
                }

                cstisim.innerHTML = "Ad-Soyad: " + custjson["ad soyad"];
                cstsayı.innerHTML = " Taksit Sayısı: " + custjson["taksit sayısı"];
                csttel.innerHTML = " Telefon Numarası: " + format("XXX XXX XX XX", custjson["Telefon Numarası"]);
                cstadres.innerHTML = " Adres: " + custjson["adres"];
                csttoplam.innerHTML = " Toplam Borç: " + custjson["ürün fiyatı"].toLocaleString();
                cstödenen.innerHTML = " Ödenen Taksit Sayısı: " + custjson["ödenentaksit"];
                cstpeşin.innerHTML = " Ödenen Peşinat: " + custjson["peşinat"].toLocaleString();
                cstkalan.innerHTML = "Kalan Borç Miktarı: " + Math.round(kalanmiktar).toLocaleString();


                document.getElementById("custDetail").appendChild(cstisim);
                document.getElementById("custDetail").appendChild(csttel);
                document.getElementById("custDetail").appendChild(cstadres);
                document.getElementById("custDetail").appendChild(cstsayı);
                document.getElementById("custDetail").appendChild(csttoplam);
                document.getElementById("custDetail").appendChild(cstpeşin);
                document.getElementById("custDetail").appendChild(cstödenen);
                document.getElementById("custDetail").appendChild(cstkalan);
                document.getElementById("custDetail").appendChild(br);
                document.getElementById("printdate").innerHTML = "Tarih: " + Date.today().toString("dd.MM.yyyy")


                partInfo.forEach(
                    function(value) {
                        var parsedValue = JSON.parse(value);
                        var ödemedurumu = " ";
                        var h5 = document.createElement("h4");


                        h5.innerHTML = "Taksit Tarihi: " + parsedValue["Taksit Tarihi"] + " Taksit Fiyatı: " + parsedValue["Taksit Fiyatı"].toFixed(2);
                        console.log(ödemedurumu)
                        if (parsedValue.ödendi) {
                            h5.style.color = "green";
                            ödemedurumu = " Ödendi";
                            h5.innerHTML += ödemedurumu
                        } else {
                            h5.style.color = "red";
                            ödemedurumu = " Ödenmedi";
                            h5.innerHTML += ödemedurumu
                        }
                        document.getElementById("custDetail").appendChild(h5)

                    }
                );

            }



            localforage.getItem(isim).then(
                function(value) {
                    custInfo = value
                    localforage.getItem(isim + "taksit").then(function(val2) {

                        partInfo = val2
                        console.log(partInfo);
                        console.log(custInfo);
                        show()

                    })
                }

            )



        }
//Print function for the rendered information

        function printDoc() {
            getCustomer();
            setTimeout(function() {

                document.getElementById("logocontainer").style.display = "block";
                document.getElementById("legals").style.display = "block";
                printJS({
                    printable: "print",
                    type: 'html',
                    css: ["fontface.css", "print.css"],
                    scanStyles: false
                })
                getCustomer();


            }, 50);

        }

//Function for deleting the customer record
        function sil(){
            var dltname = document.getElementById("userdelete").value
            localforage.removeItem(dltname).then(
            function(value){
              localforage.removeItem(dltname +"taksit").then(
              function(value2){
                  document.getElementById("userdelete").value="";
                  alertify.success("Customer Removed");
            
              }
              
              );  
                
            }
            );
             
            
        }
        

    