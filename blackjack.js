let karty = ["2c", "2d", "2h", "2s", "3c", "3d", "3h", "3s", "4c", "4d", "4h", "4s", "5c", "5d", "5h", "5s", "6c", "6d", "6h", "6s", "7c", "7d", "7h", "7s", "8c", "8d", "8h", "8s", "9c", "9d", "9h", "9s", "10c", "10d", "10h", "10s", "krol_c", "krol_d", "krol_h", "krol_s", "krolowa_c", "krolowa_d", "krolowa_h", "krolowa_s", "walet_c", "walet_d", "walet_h", "walet_s", "as_c", "as_d", "as_h", "as_s"];
let wartosc = [2,3,4,5,6,7,8,9,10,10,10,10,"as"]
let miejsca = [["gracz1","gracz2","gracz3","gracz4","gracz5","gracz6","gracz7","gracz8"],
["krupier1","krupier2","krupier3","krupier4","krupier5","krupier6","krupier7","krupier8"]]
let suma, uzyte, zakryta, hittuj, licznik, tura; //true = gracz, false = krupier;

function randomNumber(number) { //losuje liczbę od 0 do -number-
    let i = Math.floor(Math.random() * number);
    if(uzyte.includes(i)) return randomNumber(number);
    else{
        uzyte.push(i);
        return i;
    }
}

function podmien_karte(miejsce){
    licz_sume(miejsce);
    tura = !tura;
}

function start(){
    tura = true;
    licznik = [0,0];
    uzyte = [];
    suma = [0,0,0,0]; //indeksy 0,2 = gracz, 1,3 = krupier 
    podmien_karte("gracz1");
    setTimeout(podmien_karte,1000,["krupier1"]);
    setTimeout(podmien_karte,2000,["gracz2"]);
    setTimeout(podmien_karte,3000,["krupier2"]);
    setTimeout(blackjack,5000);
}

function interwal(){
    licz_sume(miejsca[1][licznik[1]])
    setTimeout(wygrana,4000);
}
function hit(){
    if(tura) licz_sume(miejsca[0][licznik[0]]);
    else hittuj = setInterval(interwal,5000); //nie dziala
    console.log(suma);
    setTimeout(wygrana,4000);
}

function stand(){
    tura = !tura;
    odwroc_karte();
    hit();
}

function licz_sume(miejsce){
    let i = randomNumber(52);
    if(miejsce == "krupier2"){
        zakryta = "karty/"+karty[i]+".png";;
        document.getElementById("krupier2").src = "karty/odwrocona.png";
        document.getElementById("karta_krupier2").className += "odwrocona_przesun";
    }
    else{
        document.getElementById(miejsce).src = "karty/odwrocona.png";
        document.getElementById("karta_"+miejsce).className += "rozstaw_karte";
        setTimeout(function siema(miejsce){document.getElementById(miejsce).src = "karty/"+karty[i]+".png";},1750,[miejsce]); // czy mozna to jakos zmienic
    }

    if(tura) {
        if(wartosc[Math.floor(i/4)] == "as") {
            suma[0] += 1;
            suma[2] += 11;
        }
        else{
            suma[0] += wartosc[Math.floor(i/4)];
            suma[2] += wartosc[Math.floor(i/4)];
        }
        licznik[0]++
    }
    else {
        if(wartosc[Math.floor(i/4)] == "as") {
            suma[1] += 1;
            suma[3] += 11;
        }
        else{
            suma[1] += wartosc[Math.floor(i/4)];
            suma[3] += wartosc[Math.floor(i/4)];
        }
        licznik[1]++
    }
}

function wygrana(){
    console.log("win");
    if(!tura){
        if(suma[1]>21) {
            alert("Wygrywa Gracz");
            clearInterval(hittuj);
        }
        else if(suma[3]>=17 && suma[3]<=21) {
            if(suma[2] <= 21){
                if(suma[2]-suma[3] == 0) {
                    alert("Remis");
                    clearInterval(hittuj);
                }
                if(suma[2]-suma[3] > 0) {
                    alert("Wygrywa Gracz");
                    clearInterval(hittuj);
                }
                if(suma[2]-suma[3] < 0) {
                    alert("Wygrywa Krupier");
                    clearInterval(hittuj);
                }
            }
            else{ 
                if(suma[0]-suma[3] == 0) {
                    alert("Remis");
                    clearInterval(hittuj);
                }
                if(suma[0]-suma[3] > 0) {
                    alert("Wygrywa Gracz");
                    clearInterval(hittuj);
                }
                if(suma[0]-suma[3] < 0) {
                    alert("Wygrywa Krupier");
                    clearInterval(hittuj);
                }
            }
        }
        else if(suma[1]>=17){
            if(suma[2] <= 21){
                if(suma[2]-suma[1] == 0) {
                    alert("Remis");
                    clearInterval(hittuj);
                }
                if(suma[2]-suma[1] > 0) {
                    alert("Wygrywa Gracz");
                    clearInterval(hittuj);
                }
                if(suma[2]-suma[1] < 0) {
                    alert("Wygrywa Krupier");
                    clearInterval(hittuj);
                }
            }
            else{
                if(suma[0]-suma[1] == 0) {
                    alert("Remis");
                    clearInterval(hittuj);
                }
                if(suma[0]-suma[1] > 0) {
                    alert("Wygrywa Gracz");
                    clearInterval(hittuj);
                }
                if(suma[0]-suma[1] < 0) {
                    alert("Wygrywa Krupier");
                    clearInterval(hittuj);
                }
            }
        }
    }
    if(tura){
        if(suma[0] > 21) alert("Wygrywa Krupier");
        else if(suma[0] == 21 || suma[2] == 21) {
            tura = !tura;
            odwroc_karte();
            return wygrana();
        }
    }
}

function blackjack(){
    if(suma[2] == 21 && suma[3] == 21){
        tura = !tura;
        odwroc_karte();
        setTimeout(alert,1100,["Remis"]);
    }
    else if (suma[2] == 21) {
        tura = !tura;
        odwroc_karte();
        setTimeout(alert,1100,["Blackjack Gracz"]);
    }
    else if (suma[3] == 21) {
        tura = !tura;
        odwroc_karte();
        setTimeout(alert,1100,["Blackjack Krupier"]);
    }
}

function odwroc_karte(){
    document.getElementById("karta_krupier2").className = "odwrocona_odwroc";
    setTimeout('document.getElementById("krupier2").src = zakryta',750)
}

let credits = 1000;
document.getElementById("credity").innerHTML = credits + "$";