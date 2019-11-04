//--This component contains main functionality of the customer management system--

//Defining global variables
var inputname;
var tablearray;
var jsondata;
var tjson;
var tfiyat;
var tstart;
var tsayı;
var ttarih;
var tname;
var ödendi;
var tarray;
var taksitobje;
var ödemearray;
var girdiler;
var çıktılar;

// Function to format date value to local standards 
function dateformatter(dt) {
        var formatteddate;
        var datearray = dt.split("-");
        formatteddate = datearray[2] + "-" + datearray[1] + "-" + datearray[0];
        return formatteddate
    }

//Function for adding customer
function addCust() {
    var customerName = document.getElementById("adsoyad").value;
    var customerAdress = document.getElementById("adres").value;
    var customerTel = document.getElementById("telno").value;
    var customerPrice = document.getElementById("fiyat").value;
    var customerParts = document.getElementById("taksit").value;
    var opstart = document.getElementById("taksitstart").value;
    var peşinat = document.getElementById("peşinat").value;
    
    //Defining the customer object
    var customerInfo = {
        "ad soyad": customerName,
        "adres": customerAdress,
        "Telefon Numarası": customerTel,
        "ürün fiyatı": parseInt(customerPrice),
        "taksit sayısı": parseInt(customerParts),
        "taksit başlangıcı": dateformatter(opstart),
        "peşinat": parseInt(peşinat),
        "peşinatödendi": false,
        "peşinattarihi": Date.today().toString("dd.MM.yyyy"),
        "ödenentaksit": 0
    };
    var jsonString = JSON.stringify(customerInfo);

    localforage.getItem(customerName).then(

        function (value) {            
//Checking if the customer already exists
            if (value == null) {
                localforage.setItem(customerName, jsonString).then(
                    function () {
                        alertify.success("Customer Saved");
                        document.getElementById("adsoyad").value = "";
                        document.getElementById("adres").value = "";
                        document.getElementById("telno").value = "";
                        document.getElementById("fiyat").value = "";
                        document.getElementById("taksit").value = "";
                        document.getElementById("taksitstart").value = "";
                        document.getElementById("peşinat").value = "";
                        taksitOluştur(customerName);
                    }

                )

            } else {
                //Warn user if the customer already exists

                alertify.error("Customer already exists");

            }
        }

    )


}


function taksitOluştur(name){
      localforage.getItem(name).then(
                            function (value) {
                                tjson = JSON.parse(value)
                                var fiyat = tjson["ürün fiyatı"];
                                var peşinat = tjson.peşinat;
                                tsayı = tjson["taksit sayısı"];
                                tstart = tjson["taksit başlangıcı"];
                                tfiyat = (fiyat - peşinat) / tsayı
                                tarray = []
                                //Preparing the installments according to desired number
                                for (var i = 0; i < tsayı; i++) {
                                    

                                    ttarih = Date.parse(tstart)
                                    var ttarih2 = ttarih.add(i).months().toString("dd.MM.yyyy");
                                    //Defining the installment object
                                    var taksitler = {
                                        "Taksit Tarihi": ttarih2,
                                        "Taksit Fiyatı": tfiyat,
                                        "Ödeme Tarihi": " ",
                                        "ödendi": false,
                                        "bildirimverildi": false

                                    }
                                    //Pushing installments to the array (serialized)

                                    tarray.push(JSON.stringify(taksitler));



                                }
                                //Creating link between customer name and installments array
                                localforage.setItem(name + "taksit", tarray).then(

                                )

                            }
                        )
    
}



//Main function that creates the details tab
function taksit() {
    inputname = document.getElementById("taksitisim").value;
    document.getElementById("taksitdiv").innerHTML = ""
    //Getting customer info for details

    localforage.getItem(inputname).then(
        function (value) {
            value = JSON.parse(value);
            var toplam = value["ürün fiyatı"];
            var taksitsayı = value["taksit sayısı"];
            var ödenentaksit = value.ödenentaksit;
            var taksitmiktar = (toplam - value.peşinat) / taksitsayı;
            var ödenenmiktar = ödenentaksit * taksitmiktar;



//Detailed financial info for the payment
            document.getElementById("toplamdisplay").innerHTML = "Toplam Miktar: " + toplam.toLocaleString();
            document.getElementById("ödenendisplay").innerHTML = "Ödenen Taksit / Miktar: " + ödenentaksit + "/" + (((toplam - value.peşinat) / taksitsayı) * ödenentaksit).toLocaleString();
            document.getElementById("kalandisplay").innerHTML = "Kalan Taksit / Miktar: " + (taksitsayı - ödenentaksit) + "/" + ((toplam - value.peşinat) - ödenenmiktar).toLocaleString();


        }

    );

//Creating/Stylizing the advance payment block
    localforage.getItem(inputname).then(
        function (value) {
            var name = inputname;
            var customer = JSON.parse(value);
            var peşinat = customer.peşinat;
            var ödendi = customer.peşinatödendi;
            var tarih = customer.peşinattarihi;
            if (peşinat > 0) {
                console.log("peşinat > 0")
                var div = document.createElement("div");
                var h5 = document.createElement("h5");
                var button = document.createElement("button");

                div.className = "well well-sm lead clearfix";
                div.style.color = "green"
                h5.style.display = "inline";
                button.id = "peşinat";
                button.className = "btn pull-right btn-xs active btn-success";
                button.style = "display:inline-block,position:relative,z-index:2";
                if (ödendi) {
                    h5.innerHTML = "Peşinat ödeme Tarihi: " + tarih;
                    div.appendChild(h5)
                } else {
                    h5.innerHTML = "Peşinat Tarihi: " + tarih + "   " + "Peşinat Fiyatı: " + peşinat;
                    button.innerHTML = "Ödendi"
                    button.setAttribute("onclick", "peşinatgirdisi(" + "'" + name + "'" + "," + peşinat + ")");
                    h5.appendChild(button);
                    div.appendChild(h5);



                }
                document.getElementById("taksitdiv").appendChild(div);

            } else {
                //Console warn for if advance payment doesn't exists 
                console.log("peşinat yok");
            }

        }

    )

//Creating/Stylizing installment blocks
    localforage.getItem(inputname + "taksit").then(
        function (value) {



            for (var i = 0; i < value.length; i++) {

                taksitobje = JSON.parse(value[i]);

                var div = document.createElement("div");
                var h5 = document.createElement("h5");
                var button = document.createElement("button");

                div.className = "well well-sm lead clearfix";
                h5.style.display = "inline";
                button.id = i;
                button.className = "btn pull-right btn-xs active btn-success";
                button.style = "display:inline-block,position:relative,z-index:2";
                if (taksitobje.ödendi) {
                    //If installment is paid
                    h5.innerHTML = "Ödeme Tarihi: " + taksitobje["Ödeme Tarihi"];
                    div.appendChild(h5)
                } else {
                    h5.innerHTML = "Taksit Tarihi: " + taksitobje["Taksit Tarihi"] + "   " + "Taksit Fiyatı: " + taksitobje["Taksit Fiyatı"].toFixed(2);
                    button.innerHTML = "Mark as Paid"
                    button.setAttribute("onclick", "ödeme(event)");
                    h5.appendChild(button);
                    div.appendChild(h5)

                }



                document.getElementById("taksitdiv").appendChild(div);


            }

        }

    )




}

//Main function for paying the installment
function ödeme(event) {
//Confirm dialog for payment 
    alertify.confirm("Alert", "Are you sure saving the payment?",
        function () {
            öde(event)
        },
        function () {
            alertify.error('Canceled');
        });



    function öde(event) {

        var today = Date.today().toString("dd.MM.yyyy");
        var index = event.target.id;
        var müşteri;
        localforage.getItem(inputname).then(

            function (value) {
                müşteri = JSON.parse(value);
                müşteri.ödenentaksit = müşteri.ödenentaksit + 1;

                localforage.setItem(inputname, JSON.stringify(müşteri)).then(
                    function (value) {} //Paid installments have increased
                )
            }

        )
//Getting the installment info for cash register
        localforage.getItem(inputname + "taksit").then(
            function (value) {
                ödemearray = value;
                var currentpart = JSON.parse(ödemearray[index]);
                currentpart.ödendi = true;
                currentpart["Ödeme Tarihi"] = today;
                ödemearray[index] = JSON.stringify(currentpart);
                var girdideğeri = currentpart["Taksit Fiyatı"];

                kasagirdisi(inputname, girdideğeri);//Adding value to cash register


                localforage.setItem(inputname + "taksit", ödemearray).then(
                    function (value) {
                        //Alert for saved payment
                        alertify.success("Payment Saved");
                        taksit();



                    }

                )


            }




        )



    }




}
//Function for creating cash register

function kasaoluştur(miktar) {
    var boşgirdi = [] // Placeholder empty entry for possible null errors
//Cash register total object 
    var kasa = {

        "miktar": miktar,
        "tarih": Date.today().toString("dd.MM.yyyy")

    }
    localforage.getItem("kasa").then(
        function (value) {
//Check if cash register exists
            if (value == null) {
                alertify.message("Creating cash register");
                localforage.setItem("kasa", kasa).then(
                    function () {
                        alertify.success("Cash register created");
                        kasaoluştur(0);
                        //Creating memory entries of positive/negative cash register entries
                        localforage.setItem("girdiler", boşgirdi);
                        localforage.setItem("çıktılar", boşgirdi);
                    }


                );
            } else {
                document.getElementById("kasatarihi").innerHTML = "Kasa Tarihi: " + value.tarih;
                document.getElementById("kasatoplamı").innerHTML = "Kasa Toplamı: " + value.miktar.toLocaleString() + "$"
//Viewing positive cash register entries 
                localforage.getItem("girdiler").then(

                    function (value) {
                        document.getElementById("girdidiv").innerHTML = ""
                        if (value != null) {
                            value.forEach(function (element) {

                                var h4 = document.createElement("h4");
                                h4.innerHTML = element.isim + " " + element.değer.toLocaleString() + "$  " + element.tarih

                                document.getElementById("girdidiv").appendChild(h4);
                                console.log(element);
                            });

                        }

                    }
                );

//Viewing negative cash register entries
                localforage.getItem("çıktılar").then(

                    function (value) {
                        document.getElementById("çıktıdiv").innerHTML = ""
                        if (value != null) {
                            value.forEach(function (element) {

                                var h4 = document.createElement("h4");
                                h4.innerHTML = element.isim + " " + element.değer.toLocaleString() + "$ " + element.tarih

                                document.getElementById("çıktıdiv").appendChild(h4);
                                console.log(element);
                            });

                        }

                    }
                )
            }
        }

    );




}
//Function to create a positive cash register entry
function kasagirdisi(girdiisim, girdideğer) {
//Creating positive entry object
    var girdi = {

        "isim": girdiisim,
        "değer": girdideğer,
        "tarih": Date.today().toString("dd.MM.yyyy")


    }


    localforage.getItem("girdiler").then(

        function (value) {
            if (value == null) { // Assigning an empty array to positive entries if null occurs
                girdiler = [];

                localforage.getItem("kasa").then(function (value) {
                    value.miktar = value.miktar + girdi.değer;
                    console.log(value)
                    console.log(girdi.değer)

                    localforage.setItem("kasa", value).then();

                })
//Pushing the positive entry to positive entries array 
                girdiler.push(girdi);

            } else

            {

                girdiler = value;
//Adding entry value to cash register total and updating the cash register value
                localforage.getItem("kasa").then(function (value) {

                    value.miktar = value.miktar + girdi.değer;
                    console.log(value)
                    console.log(girdi.değer)

                    localforage.setItem("kasa", value).then();
                })

                girdiler.push(girdi);

            }

            localforage.setItem("girdiler", girdiler).then(


                function (value) {
//Log about newly added positive entry (refreshing the cash register view)
                    console.log("kasa girdisi kaydedildi");
                    kasaoluştur(0);
                }
            )




        });


}
//Function for adding  advance payments to cash register 
function peşinatgirdisi(isim, fiyat) {

    localforage.getItem(inputname).then(
// Adding advance payment and updating the cash register
        function (value) {
            var kişi = JSON.parse(value);
            kişi.peşinatödendi = true //Flag for paid advance payment 
            localforage.setItem(inputname, JSON.stringify(kişi)).then(
                function (value) {
                    kasagirdisi(isim + " Peşinat Girdisi", fiyat); // Using the positive entry for advance payments
                    taksit(); // refreshing installment view 
                }
            );
        }
    );


}
//Function for negative cash register entries 
function kasaçıktısı() {
    //Getting values from page 
    var çıktıisim = document.getElementById("çıktıisim").value;
    var çıktıdeğer = parseInt(document.getElementById("çıktıdeğer").value);
    //Creating the negative entry object 
    var çıktı = {

        "isim": çıktıisim,
        "değer": çıktıdeğer,
        "tarih": Date.today().toString("dd.MM.yyyy")


    }


    localforage.getItem("çıktılar").then(

        function (value) {
            if (value == null) { // If negative entries doesn't exist in memory (null)
                çıktılar = [];// Assign empty array to avoid null 
//Adding the negative entry to cash register and updating the cash register
                localforage.getItem("kasa").then(function (value) {
                    
                    value.miktar = value.miktar - çıktı.değer;
                    console.log(value)
                    console.log(çıktı.değer)

                    localforage.setItem("kasa", value).then();
                })

                çıktılar.push(çıktı);
            } else

            {

                çıktılar = value;

                localforage.getItem("kasa").then(function (value) {
                    value.miktar = value.miktar - çıktı.değer;
                    console.log(value)
                    console.log(çıktı.değer)

                    localforage.setItem("kasa", value).then();
                })

                çıktılar.push(çıktı);

            }

            localforage.setItem("çıktılar", çıktılar).then(
//Log for added negative entry 

                function (value) {

                    console.log("kasa çıktısı kaydedildi");
                    kasaoluştur(0); //Refreshing the cash register view
                    document.getElementById("çıktıisim").value = "";
                    document.getElementById("çıktıdeğer").value = "";
                }
            )




        });


}
//Function for adding cash sale entries
function peşinsatış() {
    var peşinisim = document.getElementById("peşinisim").value
    var peşindeğer = parseInt(document.getElementById("peşindeğer").value);
    //Getting cash value from page

    kasagirdisi(peşinisim, peşindeğer); //Using positive entry function to modify cash register
    //Clearing input spaces for the next input
    document.getElementById("peşinisim").value = ""
    document.getElementById("peşindeğer").value = ""

}

function yapılandır(){
    var yapıisim = document.getElementById("taksitisim").value;
    var yapıtaksit = document.getElementById("yapıtaksit").value;
    var yapımiktar = document.getElementById("yapımiktar").value;
var yapıtarih =dateformatter(document.getElementById("yapıtarih").value);
    
    localforage.getItem(yapıisim+"taksit").then(value =>(console.log(value)));
    
  
    
    
    
function rebuild() {
    var tfiyat2 = yapımiktar / yapıtaksit
    tarray = []
    //Preparing the installments according to desired number
    for (var i = 0; i < yapıtaksit; i++) {


        var yapıttarih = Date.parse(yapıtarih);
        var ttarih2 = yapıttarih.add(i).months().toString("dd.MM.yyyy");
        //Defining the installment object
        var taksitler = {
            "Taksit Tarihi": ttarih2,
            "Taksit Fiyatı": tfiyat2,
            "Ödeme Tarihi": " ",
            "ödendi": false,
            "bildirimverildi": false

        }
        //Pushing installments to the array (serialized)

        tarray.push(JSON.stringify(taksitler));



    }
    //Creating link between customer name and installments array
    localforage.setItem(yapıisim + "taksit", tarray).then(

    )
}
    //Calling function 
    rebuild();
    
   function updateProfile(){
        localforage.getItem(yapıisim).then(
        function(value){
        var yapıprofil = JSON.parse(value);
        yapıprofil["ürün fiyatı"] = parseInt(yapımiktar);
        yapıprofil["taksit sayısı"] = parseInt(yapıtaksit);
        yapıprofil["taksit başlangıcı"]= yapıtarih;
        yapıprofil["ödenentaksit"]= 0;
       localforage.setItem(yapıisim,JSON.stringify(yapıprofil)).then(
       function(value){
           console.log(value);
           alertify.success("Installments Reformed")
       }
       );
        }
        );
        
    }
    updateProfile();
    
}