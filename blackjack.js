let karty = ["2c", "2d", "2h", "2s", "3c", "3d", "3h", "3s", "4c", "4d", "4h", "4s", "5c", "5d", "5h", "5s", "6c", "6d", "6h", "6s", "7c", "7d", "7h", "7s", "8c", "8d", "8h", "8s", "9c", "9d", "9h", "9s", "10c", "10d", "10h", "10s", "krol_c", "krol_d", "krol_h", "krol_s", "krolowa_c", "krolowa_d", "krolowa_h", "krolowa_s", "walet_c", "walet_d", "walet_h", "walet_s", "as_c", "as_d", "as_h", "as_s"];
let wartosc = [2,3,4,5,6,7,8,9,10,10,10,10,"as"]
let miejsca = [["gracz1","gracz2","gracz3","gracz4","gracz5","gracz6","gracz7","gracz8"],
["krupier1","krupier2","krupier3","krupier4","krupier5","krupier6","krupier7","krupier8"]]

let suma, //licznik punktow
stawka, //stawka obstawiona
uzyte, //uzyte karty z talii
zakryta, //zmienna z odwrocona karta
hittuj, //interwal 
licznik, //licznik miejsca karty
tura, //true = gracz, false = krupier;
double_timeout; //timeout do przycisku double

function randomNumber(number) { //losuje liczbę od 0 do -number-
    let i = Math.floor(Math.random() * number);
    if(uzyte.includes(i)) return randomNumber(number);
    else{
        uzyte.push(i);
        return i;
    }
}

function resetuj_karty(){
    for(x of miejsca[0]){
        document.getElementById(x).src = " ";
        document.getElementById("karta_" + x).className = "";
    }   
    for(x of miejsca[1]){
        document.getElementById(x).src = " ";
        document.getElementById("karta_" + x).className = "";
    }
}


function start(){
    blokada_przyciski("start",true);
    stawka = document.getElementById("bet").value;
    if(stawka <= 0) return alert_window("Za niska stawka");
    if(stawka > credits) return alert_window("Zbyt wysoka stawka");
    else document.getElementById("stawka_window").hidden = true;
    tura = true;
    licznik = [0,0];
    uzyte = [];
    suma = [0,0,0,0]; //indeksy 0,2 = gracz, 1,3 = krupier 
    credits -= stawka;
    document.getElementById("credity").innerHTML = credits + "$";

    function losuj_karte(miejsce){ licz_sume(miejsce); tura = !tura; }

    losuj_karte("gracz1");
    setTimeout(losuj_karte,1000,["krupier1"]);
    setTimeout(losuj_karte,2000,["gracz2"]);
    setTimeout(losuj_karte,3000,["krupier2"]);
    setTimeout(blokada_przyciski,3050,["all",false]);
    setTimeout(blackjack,6000);
}

function interwal(){
    licz_sume(miejsca[1][licznik[1]])
    setTimeout(wygrana,4000);
}
function hit(){
    if(tura) {
        licz_sume(miejsca[0][licznik[0]]);
        setTimeout(blokada_przyciski,1000,["all",true]);
    }
    else hittuj = setInterval(interwal,5000); //nie dziala //juz dziala es
    setTimeout(wygrana,2000);
}

function stand(){
    blokada_przyciski("hit",true);
    blokada_przyciski("stand",true);
    blokada_przyciski("double",true);
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
        if(licznik[0] > 1){
            blokada_przyciski("hit",false);
            blokada_przyciski("stand",false);
        }
        if(wartosc[Math.floor(i/4)] == "as") {
            suma[0] += 1;
            suma[2] += 11;
        }
        else{
            suma[0] += wartosc[Math.floor(i/4)];
            suma[2] += wartosc[Math.floor(i/4)];
        }
        licznik[0]++;
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
        licznik[1]++;
    }
}

function wygrana(){
    if(!tura){
        if(suma[1]>21) {
            winner("gracz");
        }
        else if(suma[3]>=17 && suma[3]<=21) {
            if(suma[2] <= 21){
                if(suma[2]-suma[3] == 0) winner("remis");
                if(suma[2]-suma[3] > 0) winner("gracz");
                if(suma[2]-suma[3] < 0) winner("krupier");
            }
            else{ 
                if(suma[0]-suma[3] == 0) winner("remis");
                if(suma[0]-suma[3] > 0) winner("gracz");
                if(suma[0]-suma[3] < 0) winner("krupier");
            }
        }
        else if(suma[1]>=17){
            if(suma[2] <= 21){
                if(suma[2]-suma[1] == 0) winner("remis");
                if(suma[2]-suma[1] > 0) winner("gracz");
                if(suma[2]-suma[1] < 0) winner("krupier");
            }
            else{
                if(suma[0]-suma[1] == 0) winner("remis");
                if(suma[0]-suma[1] > 0) winner("gracz");
                if(suma[0]-suma[1] < 0) winner("krupier");
            }
        }
    }
    if(tura){
        if(suma[0] > 21) winner("krupier");
        else if(suma[0] == 21 || suma[2] == 21) {
            odwroc_karte();
            return stand();
        }
    }
}

function blackjack(){
    if(suma[2] == 21 && suma[3] == 21){
        tura = !tura;
        odwroc_karte();
        winner("remis");
    }
    else if (suma[2] == 21) {
        tura = !tura;
        odwroc_karte();
        winner("blackjack_gracz");
    }
    else if (suma[3] == 21) {
        tura = !tura;
        odwroc_karte();
        winner("blackjack_krupier");
    }
    else {
        blokada_przyciski("hit",false);
        blokada_przyciski("stand",false);
        blokada_przyciski("double",false);
    }
}

function odwroc_karte(){
    document.getElementById("karta_krupier2").className = "odwrocona_odwroc";
    setTimeout('document.getElementById("krupier2").src = zakryta',750)
}

function winner(strona){
    if(strona == "remis"){
        credits += stawka;
        alert_window("Remis");
    }
    else if(strona == "gracz"){
        credits += stawka*2;
        alert_window("Wygrał gracz");
    }
    else if(strona == "krupier"){
        alert_window("Wygrał krupier");
    }
    else if(strona == "blackjack_gracz"){
        credits += stawka*3;
        alert_window("Blackjack gracz");
    }
    else if(strona == "blackjack_krupier"){
        alert_window("Blackjack krupier");
    }
    clearTimeout()
    clearInterval(hittuj);
    document.getElementById("credity").innerHTML = credits + "$";
    blokada_przyciski("all",true);
}

let credits = 1000;
document.getElementById("credity").innerHTML = credits + "$";

function alert_window(napis){
    document.getElementById("stawka_window").hidden = true;
    document.getElementById("napis").innerText = napis;
    document.getElementById("alert_window").hidden = false;

}

function potwierdz(){
    resetuj_karty();
    document.getElementById("alert_window").hidden = true;
    document.getElementById("stawka_window").hidden = false;
    blokada_przyciski("start",false);
    blokada_przyciski("hit",true);
}
function blokada_przyciski(przycisk,stan){
    if(przycisk == "start" || przycisk == "all") document.getElementById("start").disabled = stan;
    if(przycisk == "hit" || przycisk == "all") document.getElementById("hit").disabled = stan;
    if(przycisk == "stand" || przycisk == "all") document.getElementById("stand").disabled = stan;
    if(przycisk == "double" || przycisk == "all") document.getElementById("double").disabled = stan;
}
function double(){
    credits -= stawka;
    document.getElementById("credity").innerHTML = credits + "$";
    stawka = stawka*2;
    hit();
    wygrana();
    double_timeout = setTimeout(stand,3000)
}