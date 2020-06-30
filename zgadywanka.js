var haslo = "Podróże po świecie";
haslo = haslo.toUpperCase();

var dlugosc = haslo.length;
var skucha = 0;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

var haslo1 = "";

for (i = 0; i < dlugosc; i++) {
    if (haslo.charAt(i) == " ") haslo1 = haslo1 + " ";
    else haslo1 = haslo1 + "-";
}

function wypisanie_hasla() {
    document.getElementById("plansza").innerHTML = haslo1;
}

window.onload = litery;

var litery = new Array(35); //nowa tablica na 35 znakow

litery[0] = "A";
litery[1] = "Ą";
litery[2] = "B";
litery[3] = "C";
litery[4] = "Ć";
litery[5] = "D";
litery[6] = "E";
litery[7] = "Ę";
litery[8] = "F";
litery[9] = "G";
litery[10] = "H";
litery[11] = "I";
litery[12] = "J";
litery[13] = "K";
litery[14] = "L";
litery[15] = "Ł";
litery[16] = "M";
litery[17] = "N";
litery[18] = "Ń";
litery[19] = "O";
litery[20] = "Ó";
litery[21] = "P";
litery[22] = "Q";
litery[23] = "R";
litery[24] = "S";
litery[25] = "Ś";
litery[26] = "T";
litery[27] = "U";
litery[28] = "V";
litery[29] = "W";
litery[30] = "X";
litery[31] = "Y";
litery[32] = "Z";
litery[33] = "Ż";
litery[34] = "Ź";

function litery() {
    var tresc = "";

    for (i = 0; i <= 34; i++) {
        var element = "litera" + i; //stworzenie divow z 35 liter zeby bylo to id
        tresc = tresc + '<div class="litera" onclick ="sprawdz(' + i + ')" id="' + element + '">' + litery[i] + '</div>';
        if ((i + 1) % 7 == 0) tresc = tresc + '<div style="clear:both;"></div>';
    }

    document.getElementById("alfabet").innerHTML = tresc;

    wypisanie_hasla();
}

String.prototype.ustawZnak = function(miejsce, znak) //miejsce=na ktore miejsce wstawic; znak=jaka litere tam wstawic
    {
        if (miejsce > this.length - 1) //zaznaczyc ze nie mozemy wstawic znaku na miejsce wieksze niz ilosc miejsc w hasle
            return this.toString();
        else return this.substr(0, miejsce) + znak + this.substr(miejsce + 1); //substr = substring = podłańcuch - fragment naszego łańcucha(hasła)

    }

function sprawdz(nr) {

    var trafiona = false;
    //alert(nr); funckja ktora wyswietla alert - sprawdzanie czy dana literka ma numer
    for (i = 0; i < dlugosc; i++) {
        if (haslo.charAt(i) == litery[nr]) {
            //zmiana myslnika na literke sprawdzoną
            haslo1 = haslo1.ustawZnak(i, litery[nr]);
            trafiona = true;
        }
    }

    if (trafiona == true) //kolorowanie literek
    {
        yes.play();
        var element = "litera" + nr;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#008000";
        document.getElementById(element).style.border = "3px solid #006400";
        document.getElementById(element).style.cursor = "default";
        document.getElementById("grafika").innerHTML = '<img src="tlo1.jpg" alt=""/>';
        wypisanie_hasla();
    } else {
        no.play();
        var element = "litera" + nr;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#FF4500";
        document.getElementById(element).style.border = "3px solid #8B0000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");

        //skucha
        skucha++;
        document.getElementById("grafika").innerHTML = '<img src="tlo2.jpg" alt=""/>';
    }
    //wygrana 
    if (haslo == haslo1)
        document.getElementById("alfabet").innerHTML = "Tak jest! Podano prawidłowe hasło: " + haslo + '<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>lub<a href="index.html">zobacz więcej!</a>';
    //document.getElementById("alfabet").innerHTML = "Brawo!<br/>Już wiesz, że " + haslo + " <br/>to moja pasja! " + '<br/><br/><br/><br/><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span><a href="index.html">lub zobacz więcej!</a>';
    //document.getElementById("przycisk").style.visibility = visible;
    //przegrana
    if (skucha >= 9)
        document.getElementById("alfabet").innerHTML = "Przegrana! Prawidłowe hasło: " + haslo + '<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
    //document.getElementById("alfabet").innerHTML = "Przegrana! Prawidłowe hasło:  " + haslo + " <br/>i to jest moją pasja! " + '<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
}
//dodać muzykę!!!!!!!