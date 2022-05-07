// Aluksi määritellään, että myStorage = window.localStorage

myStorage = window.localStorage;

// myStorage käyttää selaimen localStorage-muistia

// Alla määrittelen muuttujan 'done', joka pitää lukua siitä kuinka moni To Do -listan itemi on suoritetussa tilassa. Saan arvon 'null', jos sitä ei ole olemassa, joten siinä tapauksessa
// annan sille arvon 0 - muuten annan muistista saadun arvon. Arvo menee muistiin nimellä 'tehdyt'.

var done = myStorage.getItem("tehdyt");
if (done == "null") {
  myStorage.setItem("tehdyt", 0);
}
if (done != "null") {
  myStorage.setItem("tehdyt", done);
}

// tyhjennäLista()-funktio tekee mitä nimi sanoo: tyhjentää listan kokonaisuudessaan käyttämällä while (child) -ehtoa, joka poistaa jokaisen 'lista'-elementin lapsen yksi kerrallaan.
// Lopuksi tyhjennän localStoragen ja määrittelen 'tehdyt' arvoksi nollan.
function tyhjennäLista() {
  const otsikot = document.getElementsByClassName("otsikko");
  var lista = document.getElementById("lista");
  var child = lista.lastElementChild;
  while (child) {
    lista.removeChild(child);
    child = lista.lastElementChild;
  }
  myStorage.clear();
  myStorage.setItem("tehdyt", 0);
  tsekkaaMäärä();
}

// tsekkaaMäärä()-funktio tarkistaa To Do -itemien määrän ja näyttää sen <p id='määrä'> -elementin (mittari) sisällä tekstimuodossa.
// tsekkaaMäärä()-funktio laskee To Do -itemien määrän tarkistamalla otsikkojen määrän luokan perusteella.
// Funktio käyttää myös localStoragen 'tehdyt'-arvoa verratakseen tehtyjen itemien määrää kokonaismäärään.
// ko. funktio ajetaan myöhemmin silloin kun itemien tai suoritettujen itemien määrä muuttuvat. Tunnistaa kun lista on täysin suoritettu.

function tsekkaaMäärä() {
  var mittari = document.getElementById("määrä");
  const otsikot = document.getElementsByClassName("otsikko");
  var tehtyLuku = myStorage.getItem("tehdyt");
  var luku = otsikot.length;

  if (luku == 1) {
    mittari.innerHTML = "Lista on " + tehtyLuku + " / " + luku + " suoritettu.";
    mittari.style.fontWeight = "normal";
  }
  if (luku > 1) {
    mittari.innerHTML = "Lista on " + tehtyLuku + " / " + luku + " suoritettu.";
    mittari.style.fontWeight = "normal";
  }
  if (luku == tehtyLuku) {
    mittari.innerHTML =
      'Olet suorittanut kaiken. Haluatko tyhjentää listan? Paina "Tyhjennä lista" nappia.';
    mittari.style.fontWeight = "bold";
  }
  if (luku == 0) {
    mittari.innerHTML = "Lista on tyhjä.";
    mittari.style.fontWeight = "normal";
  }
}

// const nappi on lomakkeen 'Lähetä'-nappi. Se on määritelty EventListener varten.

const nappi = document.getElementById("nappi");

// Alla määritelty EventListener tyhjentää otsikko (titleInput) ja kommentti / comment (commentInput) -kentät klikkauksen jälkeen.

nappi.addEventListener("click", function handleClick(event) {
  const titleInput = document.getElementById("otsikko");
  const commentInput = document.getElementById("comment");
  titleInput.value = "";
  commentInput.value = "";
});

// Alla oleva tallennaMuistiin() -funktio tallentaa To Do -itemien otsikot ja kommentit
// sekä niiden määrän localStorage-muistiin For-loopilla.
// Funktio ajetaan kun To Do -lista päivittyy eli kun sinne lisätään jotain tai poistetaan jotain.
// En jostain syystä saanut tätä funktiota tallentamaan tehtyjä arvoja ylös.

function tallennaMuistiin() {
  const otsikot = document.getElementsByClassName("otsikko");
  const kommentit = document.getElementsByClassName("kommentti");

  // Funktio luo ensin Array:t sivulta löytyvistä otsikoista ja kommenteista HTML-classien perusteella.
  // For-looppi pyörii otsikot.lenght asti eli kunnes kaikki otsikot (ja mahdolliset kommentit) sekä niiden määrä on tallennettu.

  for (let i = 0; i < otsikot.length; i++) {
    var storeNumber = i + 1;
    var storeTitle = "otsikko" + storeNumber;
    var storeComment = "kommentti" + storeNumber;
    var storeAmount = "määrä";

    // Ensin (yläpuolella) määrittelen localStorage avainten nimet tyylillä 'otsikko1', 'otsikko2', 'kommentti1' jne. mahdollistaen helpomman muistista lataamisen myöhemmässä funktiossa.

    var titleValue = otsikot[i].innerHTML;
    var commentValue = kommentit[i].innerHTML;
    var amountValue = i + 1;

    // Seuraavaksi (yläpuolella) määrittelen localStorage avainten arvot sivulta löytyvien otsikkojen ja kommenttien perusteella.

    myStorage.setItem(storeTitle, titleValue);
    myStorage.setItem(storeComment, commentValue);
    myStorage.setItem(storeAmount, amountValue);

    // Lopuksi lisään avaimet (nimet ja arvot) localStorageen.
  }
  tsekkaaMäärä();
  // Ajetaan tsekkaaMäärä()-funktio, jotta pysytään tasalla To Do -itemien määrästä. Sen takia tässä, että tallennaMuistiin() ajetaan itemeitä poistaessa ja lisätessä.
}

// lataaMuistista() -funktio lataa ja renderöi tallennaMuistiin() -funktion localStorageen tallentamat To Do -itemit otsikoineen ja kommentteineen For-loopilla.
// lataaMuistista() -funktio ajetaan sivun ladatessa eli <body onload='lataaMuistista();>'

function lataaMuistista() {
  var amount = myStorage.getItem("määrä");

  // var amount on tallennaMuistiin()-funktion tallentama To Do -itemien määrä.
  // Alla oleva For-looppi tekee käytännössä saman kuin lisääListaan()-funktio, mutta ottaa otsikkojen ja kommenttien arvot localStorage-muistista.
  // Samalla For-looppi pitää huolen, että uudet otsikot ja kommentit saavat oikeat attribuutit kuten Class='otsikko' ja Class='kommentti'.

  for (let i = 1; i <= amount; i++) {
    var loadTitle = myStorage.getItem("otsikko" + i);
    var loadComment = myStorage.getItem("kommentti" + i);
    var loadCompleted = myStorage.getItem("tehty" + i);

    // loadTitle on localStorage-muistin otsikko1, otsikko2, otsikko3 jne. arvo.
    // loadComment on localStorage-muistin kommentti1, kommentti2, kommentti3 jne. arvo.

    const otsikkokenttä = document.createElement("h2");
    const otsikkoteksti = document.createTextNode(loadTitle);

    // Luodaan otsikkoa varten 'h2'-elementti ja luodaan sille TextNode arvolla loadTitle, joka ladataan localStoragesta.

    var a = document.createAttribute("class");
    a.value = "otsikko";
    otsikkokenttä.setAttributeNode(a);

    // Annetaan otsikon 'h2'-elementille attribuutti 'class' arvolla 'otsikko', jotta tallennaMuistiin()-funktio toimii.

    var x = document.createAttribute("id");
    x.value = "otsikko" + i;
    otsikkokenttä.setAttributeNode(x);

    // Annetaan otsikon 'h2'-elementille attribuutti id arvolla 'otsikko + i', jotta pysyn niistä tasalla. Ei tosin ole enää tarvetta tälle toiminnallisuudelle.

    otsikkokenttä.appendChild(otsikkoteksti);

    // Lisätään aiemmin määritelty TextNode 'h2'-elementtiin.

    const kommenttikenttä = document.createElement("p");
    const kommenttiteksti = document.createTextNode(loadComment);

    // Luodaan kommenttia varten 'p'-elementti ja TextNode arvolla loadComment, joka ladataan localStoragesta.

    var b = document.createAttribute("class");
    b.value = "kommentti";
    kommenttikenttä.setAttributeNode(b);

    // Annetaan kommentin 'p'-elementille attribuutti 'class' arvolla 'kommentti', jotta tallennaMuistiin()-funktio toimii.

    var y = document.createAttribute("id");
    y.value = "kommentti" + i;
    kommenttikenttä.setAttributeNode(y);

    // Annetaan kommentin 'p'-elementille attribuutti 'id' arvolla 'kommentti + i', jotta pysyn niistä ajan tasalla. Ei tosin enää ole tarpeellinen. Poistanko?

    kommenttikenttä.appendChild(kommenttiteksti);
    kommenttikenttä.style.fontWeight = "bold";
    kommenttikenttä.style.fontSize = "13px";

    // Lisätään aiemmin määritelty TextNode 'p'-elementtiin.

    const tärkeäKenttä = document.createElement("button");
    const tärkeäTeksti = document.createTextNode("Merkitse tehdyksi.");
    const tunnus2 = document.createAttribute("class");
    tunnus2.value = "done";
    tärkeäKenttä.setAttributeNode(tunnus2);
    tärkeäKenttä.appendChild(tärkeäTeksti);

    // Luotiin nappi nimeltään 'tärkeäKenttä', jota painaessa saat merkittyä listan itemin suoritetuksi / ei suoritetuksi riippuen sen nykyisestä tilasta.
    // Alla on EventListener, joka hoitaa tämän toiminnallisuuden. Se vertaa tiedostosta löytyvän otsikon ja muistissa olevan suoritetun otsikon arvoja yksi kerrallaan
    // Eli jos item ei ole suoritettu, nappia painalla saat sen suoritetuksi, lisäät sen localStorageen 'tehty + i' -nimellä, muutat item:n elementtien (ja napin) ulkonäköä,
    // lisäät localStoragen 'tehdyt'-arvoon +1 ja ajat tsekkaaMäärä(), funktion.
    // Jos item on suoritettu, niin sama päinvastoin.

    tärkeäKenttä.addEventListener("click", function (e) {
      var loadTitle = myStorage.getItem("otsikko" + i);
      var loadCompleted = myStorage.getItem("tehty" + i);

      if (loadTitle == loadCompleted) {
        otsikkokenttä.style.textDecoration = "";
        myStorage.removeItem("tehty" + i);
        kommenttikenttä.style.display = "block";
        tärkeäKenttä.style.display = "inline";
        tärkeäKenttä.style.backgroundColor = "green";
        tärkeäKenttä.style.borderColor = "green";
        tärkeäKenttä.innerHTML = "Merkitse tehdyksi.";
        var päivitettyTehdyt = myStorage.getItem("tehdyt");
        var parsedTehdyt = parseInt(päivitettyTehdyt);
        parsedTehdyt = parsedTehdyt - 1;
        myStorage.setItem("tehdyt", parsedTehdyt);

        tsekkaaMäärä();
      }
      if (loadTitle !== loadCompleted) {
        otsikkokenttä.style.textDecoration = "line-through";
        kommenttikenttä.style.display = "none";
        tärkeäKenttä.style.backgroundColor = "red";
        tärkeäKenttä.style.borderColor = "red";
        tärkeäKenttä.innerHTML = "Palauta.";
        myStorage.setItem("tehty" + i, dynaaminentausta.firstChild.innerHTML);
        var päivitettyTehdyt = myStorage.getItem("tehdyt");
        var parsedTehdyt = parseInt(päivitettyTehdyt);
        parsedTehdyt = parsedTehdyt + 1;
        myStorage.setItem("tehdyt", parsedTehdyt);
        tsekkaaMäärä();
      }
    });

    const lista = document.getElementById("lista");

    // lista on jo sivulta löytyvä isompi DIV-elementti, jonka sisään jokainen To Do -item menee dynaaminentausta-nimisen DIV-elementissä.

    const dynaaminentausta = document.createElement("div");
    const tunnus = document.createAttribute("class");
    tunnus.value = "tausta";
    dynaaminentausta.setAttributeNode(tunnus);
    dynaaminentausta.style.width = "500px";
    dynaaminentausta.style.height = "fit-content";
    dynaaminentausta.style.padding = "2px";
    dynaaminentausta.style.borderStyle = "outset";

    // Luodaan 'dynaaminentausta' DIV-elementti ja määritellään sille attribuutti 'class' arvolla 'tausta' debugaussyistä.
    // Samalla muokataan 'dynaaminentausta' DIV-elementin tyyliä mm. width, height ym.

    // Sitten tsekataan muistista, että kuinka moni itemi on suoritettu vertaamalla HTML:n ja localStorage:n otsikkojen arvoja ja tehdään oikeanlaiset muutokset CSS:ään ja tekstiin.

    if (loadTitle == loadCompleted) {
      otsikkokenttä.style.textDecoration = "line-through";
      kommenttikenttä.style.display = "none";
      tärkeäKenttä.style.backgroundColor = "red";
      tärkeäKenttä.style.borderColor = "red";
      tärkeäKenttä.innerHTML = "Palauta.";
    }

    // Liitetään otsikkokenttä, kommenttikenttä ja 'tärkeäKenttä' dynaamiseen taustaan (DIV:iin).

    dynaaminentausta.appendChild(otsikkokenttä);
    dynaaminentausta.appendChild(kommenttikenttä);
    dynaaminentausta.appendChild(tärkeäKenttä);

    lista.appendChild(dynaaminentausta);

    // Ja lopuksi lisätään dynaaminentausta sivulta valmiiksi löytyvään taustaan eli se vihdoin ilmestyy sivulle.

    tsekkaaMäärä();

    // Ajetaan tsekkaaMäärä()-funktio, jotta määrän näkee silloinkin kun sivun lataa uusiksi.
  }
}

// lisääListaan()-funktio lisää To Do -itemeitä ja ajetaan 'Lähetä'-nappia painamalla.

function lisääListaan() {
  var otsikko = document.getElementById("otsikko").value;
  var kommentti = document.getElementById("comment").value;

  // Luodaan muuttujat kenttien otsikosta ja kommentista, jos kentät eivät ole tyhjiä. Otsikkokenttä on pakollinen, joten heitetään window.alert ja korostetaan kenttää punaisella reunalla
  // jos se on tyhjä.

  if (otsikko == "") {
    window.alert(
      "Otsikko on pakollinen. Lisää jotain tekstiä otsikkokenttään."
    );
    const otsikkoInput = document.getElementById("otsikko");
    otsikkoInput.style.border = "2px solid red";
    otsikkoInput.addEventListener("click", function (e) {
      otsikkoInput.style.border = "";
    });
  } else {
    // Tarkistetaan tukeeko selain localStorage / sessionStorage -toimintoja - jos tukee niin sitten luodaan otsikko ja kommentti -muuttujista HTML-elementit.

    if (typeof Storage !== "undefined") {
      const otsikkokenttä = document.createElement("h2");
      const otsikkoteksti = document.createTextNode(otsikko);
      var a = document.createAttribute("class");
      a.value = "otsikko";
      otsikkokenttä.setAttributeNode(a);
      otsikkokenttä.appendChild(otsikkoteksti);

      // Luotiin otsikolle 'h2'-elementti sekä TextNode tekstikentän arvolla.
      // Määriteltiin otsikon 'h2'-elementille attribuutti 'class' arvolla 'otsikko', jotta localStorageen tallennus onnistuu helpommin.
      // Lisätään olennainen TextNode 'h2'-elementtiin.

      const kommenttikenttä = document.createElement("p");
      const kommenttiteksti = document.createTextNode(kommentti);
      var b = document.createAttribute("class");
      b.value = "kommentti";
      kommenttikenttä.setAttributeNode(b);
      kommenttikenttä.appendChild(kommenttiteksti);
      kommenttikenttä.style.fontWeight = "bold";
      kommenttikenttä.style.fontSize = "13px";

      // Luotiin kommentille 'p'-elementti sekä TextNode tekstikentän arvolla.
      // Määriteltiin kommentin 'p'-elementille attribuutti 'class' arvolla 'kommentti', jotta localStorageen tallennus onnistuu helpommin.
      // Lisätään olennainen TextNode 'p'-elementtiin.

      const tärkeäKenttä = document.createElement("button");
      const tärkeäTeksti = document.createTextNode("Merkitse tehdyksi.");
      const tunnus2 = document.createAttribute("class");
      tunnus2.value = "done";
      tärkeäKenttä.setAttributeNode(tunnus2);
      tärkeäKenttä.appendChild(tärkeäTeksti);

      var lista = document.getElementById("lista");

      // lista on jo sivulta löytyvä isompi DIV-elementti ID:llä 'lista', jonka sisään jokainen To Do -item menee dynaaminentausta-nimisen DIV-elementissä.

      const dynaaminentausta = document.createElement("div");
      const tunnus = document.createAttribute("class");
      tunnus.value = "tausta";
      dynaaminentausta.setAttributeNode(tunnus);
      dynaaminentausta.style.width = "500px";
      dynaaminentausta.style.height = "fit-content";
      dynaaminentausta.style.padding = "2px";
      dynaaminentausta.style.borderStyle = "outset";

      // Luodaan 'dynaaminentausta' DIV-elementti ja määritellään sille attribuutti 'id' arvolla 'tausta + i' debugaussyistä.
      // Samalla muokataan 'dynaaminentausta' DIV-elementin tyyliä mm. width, margin ja padding.

      dynaaminentausta.appendChild(otsikkokenttä);
      dynaaminentausta.appendChild(kommenttikenttä);
      dynaaminentausta.appendChild(tärkeäKenttä);

      // Lisätään otsikko, kommentti sekä poistonappi dynaamiseen taustaan.

      lista.appendChild(dynaaminentausta);

      // Lisätään dynaaminentausta sivulta löytyvään taustaan, jotta To Do -item ilmestyy sivulle.

      tallennaMuistiin();
      // Ajetaan tallennaMuistiin()-funktio, jotta uusi To Do -item pääsee localStorageen.

      window.location.reload();
    } else {
      window.alert("Selaimesi ei tue localStoragea.");

      // Jos selain ei tue localStorage / sessionStorage niin sivusto hälyttää käyttäjää eikä käyttö onnistu.
    }
  }
}

function lisääListaan2() {
  var otsikko = $("#otsikko").val();
  var kommentti = $("#comment").val();

  // Luodaan muuttujat kenttien otsikosta ja kommentista, jos kentät eivät ole tyhjiä. Otsikkokenttä on pakollinen, joten heitetään window.alert ja korostetaan kenttää punaisella reunalla
  // jos se on tyhjä.

  if (otsikko == "") {
    window.alert(
      "Otsikko on pakollinen. Lisää jotain tekstiä otsikkokenttään."
    );
    otsikkoInput = $("#otsikko");
    $("#otsikko").css("border", "2px solid red");
    otsikkoInput.click(function () {
      otsikkoInput.css("border", "1px solid black");
    });
    // otsikkoInput.addEventListener('click', function (e) {
    // otsikkoInput.style.border = '';
    // })
  } else {
    // Tarkistetaan tukeeko selain localStorage / sessionStorage -toimintoja - jos tukee niin sitten luodaan otsikko ja kommentti -muuttujista HTML-elementit.

    if (typeof Storage !== "undefined") {
      const otsikkokenttä = $("<h2>" + otsikko + "</h2>");
      otsikkokenttä.attr("class", "kommentti");
      // const otsikkokenttä = document.createElement('h2');
      // const otsikkoteksti = document.createTextNode(otsikko);
      // var a = document.createAttribute("class");
      // a.value = 'otsikko';
      // otsikkokenttä.setAttributeNode(a);
      // otsikkokenttä.appendChild(otsikkoteksti);
      // Luotiin otsikolle 'h2'-elementti sekä TextNode tekstikentän arvolla.
      // Määriteltiin otsikon 'h2'-elementille attribuutti 'class' arvolla 'otsikko', jotta localStorageen tallennus onnistuu helpommin.
      // Lisätään olennainen TextNode 'h2'-elementtiin.
      var kommenttikenttä = $("<p>" + kommentti + "</p>");
      kommenttikenttä.attr("class", "kommentti");
      kommenttikenttä.css("fontWeight", "bold");
      kommenttikenttä.css("fontSize", "13px");

      // const kommenttikenttä = $('<p>', {
      //   html: kommentti,
      //   "class": "kommentti",
      //   fontWeight: "bold",
      //   fontSize: "13px"
      // });
      // const kommenttikenttä = document.createElement('p');
      // const kommenttiteksti = document.createTextNode(kommentti);
      // var b = document.createAttribute("class");
      // b.value = 'kommentti';
      // kommenttikenttä.setAttributeNode(b);
      // kommenttikenttä.appendChild(kommenttiteksti);

      // kommenttikenttä.style.fontWeight = 'bold';
      // kommenttikenttä.style.fontSize = '13px';

      // Luotiin kommentille 'p'-elementti sekä TextNode tekstikentän arvolla.
      // Määriteltiin kommentin 'p'-elementille attribuutti 'class' arvolla 'kommentti', jotta localStorageen tallennus onnistuu helpommin.
      // Lisätään olennainen TextNode 'p'-elementtiin.

      const tärkeäKenttä = $("<button>", {
        html: "Merkitse tehdyksi",
        class: "done",
      });
      tärkeäKenttä.click(function () {
        if ($(".done").text("Merkitse tehdyksi")) {
          otsikkokenttä.css("text-decoration", "underline");
          kommenttikenttä.fadeOut();
          tärkeäKenttä.text("Palauta");
        }
        $('.done').click(function () {
          if ($(".done").text("Palauta")) {
            otsikkokenttä.css("text-decoration", 'none');
            kommenttikenttä.fadeIn();
            tärkeäKenttä.text('Merkitse tehdyksi');
          }
        })
      });
      // const tärkeäKenttä = document.createElement('button');
      // const tärkeäTeksti = document.createTextNode('Merkitse tehdyksi.');
      // const tunnus2 = document.createAttribute('class');
      // tunnus2.value = 'done';
      // tärkeäKenttä.setAttributeNode(tunnus2);
      // tärkeäKenttä.appendChild(tärkeäTeksti);

      // var lista = document.getElementById("lista");
      var lista = $("#lista");

      // lista on jo sivulta löytyvä isompi DIV-elementti ID:llä 'lista', jonka sisään jokainen To Do -item menee dynaaminentausta-nimisen DIV-elementissä.

      const dynaaminentausta = $("<div>", {
        class: "tausta",
        width: "500px",
        height: "fit-content",
        padding: "2px",
        borderStyle: "outset",
      });

      // const dynaaminentausta = document.createElement('div');
      // const tunnus = document.createAttribute('class');
      // tunnus.value = 'tausta';
      // dynaaminentausta.setAttributeNode(tunnus);
      // dynaaminentausta.style.width = '500px';
      // dynaaminentausta.style.height = 'fit-content';
      // dynaaminentausta.style.padding = '2px';
      // dynaaminentausta.style.borderStyle = 'outset';

      // Luodaan 'dynaaminentausta' DIV-elementti ja määritellään sille attribuutti 'id' arvolla 'tausta + i' debugaussyistä.
      // Samalla muokataan 'dynaaminentausta' DIV-elementin tyyliä mm. width, margin ja padding.

      otsikkokenttä.appendTo(dynaaminentausta);
      kommenttikenttä.appendTo(dynaaminentausta);
      tärkeäKenttä.appendTo(dynaaminentausta);
      // dynaaminentausta.appendChild(otsikkokenttä);
      // dynaaminentausta.appendChild(kommenttikenttä);
      // dynaaminentausta.appendChild(tärkeäKenttä)
      // Lisätään otsikko, kommentti sekä poistonappi dynaamiseen taustaan.

      dynaaminentausta.appendTo(lista);
      // lista.appendChild(dynaaminentausta);

      // Lisätään dynaaminentausta sivulta löytyvään taustaan, jotta To Do -item ilmestyy sivulle.

      tallennaMuistiin();
      // Ajetaan tallennaMuistiin()-funktio, jotta uusi To Do -item pääsee localStorageen.

      // window.location.reload();
    } else {
      window.alert("Selaimesi ei tue localStoragea.");

      // Jos selain ei tue localStorage / sessionStorage niin sivusto hälyttää käyttäjää eikä käyttö onnistu.
    }
  }
}
function tallennaMuistiin2() {
  // const otsikot = document.getElementsByClassName('otsikko');
  // const kommentit = document.getElementsByClassName('kommentti');
  const otsikot = $(".otsikko");

  const kommentit = $(".kommentti");

  // Funktio luo ensin Array:t sivulta löytyvistä otsikoista ja kommenteista HTML-classien perusteella.
  // For-looppi pyörii otsikot.lenght asti eli kunnes kaikki otsikot (ja mahdolliset kommentit) sekä niiden määrä on tallennettu.

  for (let i = 0; i < otsikot.length; i++) {
    var storeNumber = i + 1;
    var storeTitle = "otsikko" + storeNumber;
    var storeComment = "kommentti" + storeNumber;
    var storeAmount = "määrä";

    // Ensin (yläpuolella) määrittelen localStorage avainten nimet tyylillä 'otsikko1', 'otsikko2', 'kommentti1' jne. mahdollistaen helpomman muistista lataamisen myöhemmässä funktiossa.

    var titleValue = otsikot[i].innerHTML;
    var commentValue = kommentit[i].innerHTML;
    var amountValue = i + 1;

    // Seuraavaksi (yläpuolella) määrittelen localStorage avainten arvot sivulta löytyvien otsikkojen ja kommenttien perusteella.

    myStorage.setItem(storeTitle, titleValue);
    myStorage.setItem(storeComment, commentValue);
    myStorage.setItem(storeAmount, amountValue);

    // Lopuksi lisään avaimet (nimet ja arvot) localStorageen.
  }
  tsekkaaMäärä();
  // Ajetaan tsekkaaMäärä()-funktio, jotta pysytään tasalla To Do -itemien määrästä. Sen takia tässä, että tallennaMuistiin() ajetaan itemeitä poistaessa ja lisätessä.
}

// lataaMuistista() -funktio lataa ja renderöi tallennaMuistiin() -funktion localStorageen tallentamat To Do -itemit otsikoineen ja kommentteineen For-loopilla.
// lataaMuistista() -funktio ajetaan sivun ladatessa eli <body onload='lataaMuistista();>'
