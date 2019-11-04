//--This component contains installment notification functionality of customer management system-- 

//Global Variables 
        var temparray;
        var bildirimler;
        var alertsign;

//Main function for installment alerts
        function taksitAlert() {

            alertsign = true
            //Geting all values from memory 
            localforage.keys().then(

                function(value) {

                    value.forEach(

                        function(element) {
                            if (element.includes("taksit")) {
                                localforage.getItem(element).then(

                                    function(elementvalue) {
                                        //var currentArray = elementvalue;
                                        temparray = []
                                        elementvalue.forEach(function(e1) {
                                            var e2 = JSON.parse(e1);
                                            var tarih = e2["Taksit Tarihi"];
                                            var today = Date.today().toString("dd.MM.yyyy");
                                            var ödendi = e2.ödendi;
                                            if (tarih == today && ödendi == false) {
                                                if (alertsign) {
                                                    alertify.alert("Installment Notification","There are unpaid installments today")
                                                }
                                                alertsign = false;
                                                var custName = element.substr(0, element.length - 6);

                                                var bildirim = {

                                                    "açıklama": "Today is the pay day of " + custName ,
                                                    "tarih": Date.today().toString("dd.MM.yyyy")

                                                }
                                                if (e2.bildirimverildi) {
                                                    //Notification isnt shown yet
                                                    bildirimgöster(bildirim.açıklama)


                                                } else {
                                                    e2.bildirimverildi = true
                                                    bildirimgöster(bildirim.açıklama)

                                                    //Notification is already shown 

                                                }

                                                temparray.push(JSON.stringify(e2));

                                            } else {
                                                temparray.push(JSON.stringify(e2))
                                            }







                                        })
                                        //Pushing element back into memory 

                                        localforage.setItem(element, temparray);
                                    }


                                )

                            }


                        }


                    )



                }




            )

        }
 //Rendering notification visual data
        function bildirimgöster(bildirimdata) {
            var div = document.createElement("div");
            var h5 = document.createElement("h5");

            div.className = "well well-sm lead clearfix";
            h5.style.display = "inline";
            h5.innerHTML = bildirimdata
            div.appendChild(h5);


            document.getElementById("div5").appendChild(div);
        }

  