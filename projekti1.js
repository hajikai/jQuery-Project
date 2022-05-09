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

function tyhjennäLista3() {
  const lista = $("#lista");
  const kentät = $(".notdone");
  for (let i = 0; i < kentät.length; i++) {
    lista.hide("slow");
    kentät.remove();
  }
  myStorage.clear();
  myStorage.setItem("tehdyt", 0);
  tsekkaaMäärä2();
}

// tsekkaaMäärä()-funktio tarkistaa To Do -itemien määrän ja näyttää sen <p id='määrä'> -elementin (mittari) sisällä tekstimuodossa.
// tsekkaaMäärä()-funktio laskee To Do -itemien määrän tarkistamalla otsikkojen määrän luokan perusteella.
// Funktio käyttää myös localStoragen 'tehdyt'-arvoa verratakseen tehtyjen itemien määrää kokonaismäärään.
// ko. funktio ajetaan myöhemmin silloin kun itemien tai suoritettujen itemien määrä muuttuvat. Tunnistaa kun lista on täysin suoritettu.
function tsekkaaMäärä2() {
  var mittari = $("#määrä");
  const otsikot = $(".otsikko");
  var tehtyLuku = myStorage.getItem("tehdyt");
  var luku = otsikot.length;

  if (luku == 1) {
    mittari.text("Lista on " + tehtyLuku + " / " + luku + " suoritettu.");
    mittari.css("fontWeight", "normal");
  }
  if (luku > 1) {
    mittari.text("Lista on " + tehtyLuku + " / " + luku + " suoritettu.");
    mittari.css("fontWeight", "normal");
  }
  if (luku == tehtyLuku) {
    mittari.text(
      'Olet suorittanut kaiken. Haluatko tyhjentää listan? Paina "Tyhjennä lista" nappia.'
    );
    mittari.css("fontWeight", "bold");
  }
  if (luku == 0) {
    mittari.text("Lista on tyhjä.");
    mittari.css("fontWeight", "normal");
  }
}

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

// const nappi = document.getElementById("nappi");

// // Alla määritelty EventListener tyhjentää otsikko (titleInput) ja kommentti / comment (commentInput) -kentät klikkauksen jälkeen.

// nappi.addEventListener("click", function handleClick(event) {
//   const titleInput = document.getElementById("otsikko");
//   const commentInput = document.getElementById("comment");
//   titleInput.value = "";
//   commentInput.value = "";
// });

const nappi = $("#nappi");

nappi.click(function handleClick(event) {
  const titleInput = $("#otsikko");
  const commentInput = $("#comment");
  titleInput.val("");
  commentInput.val("");
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
  tsekkaaMäärä2();
  // Ajetaan tsekkaaMäärä()-funktio, jotta pysytään tasalla To Do -itemien määrästä. Sen takia tässä, että tallennaMuistiin() ajetaan itemeitä poistaessa ja lisätessä.
}

// lataaMuistista() -funktio lataa ja renderöi tallennaMuistiin() -funktion localStorageen tallentamat To Do -itemit otsikoineen ja kommentteineen For-loopilla.
// lataaMuistista() -funktio ajetaan sivun ladatessa eli <body onload='lataaMuistista();>'
function lataaMuistista2() {
  var lista = $("#lista");
  var amount = myStorage.getItem("määrä");
  for (let i = 1; i <= amount; i++) {
    var loadTitle = myStorage.getItem("otsikko" + i);
    var loadComment = myStorage.getItem("kommentti" + i);
    var loadCompleted = myStorage.getItem("tehty" + i);

    const otsikkokenttä = $("<h2>" + loadTitle + "</h2>");
    otsikkokenttä.attr("class", "otsikko");
    otsikkokenttä.attr("id", "otsikko" + i);

    const kommenttikenttä = $("<p>" + loadComment + "</p>");
    kommenttikenttä.attr("class", "kommentti");
    kommenttikenttä.attr("id", "kommentti" + i);

    const tärkeäKenttä = $("<button>", {
      html: "Merkitse tehdyksi",
      class: "done",
    });

    tärkeäKenttä.click(function (e) {
      var loadTitle = myStorage.getItem("otsikko" + i);
      var loadCompleted = myStorage.getItem("tehty" + i);

      if (loadTitle == loadCompleted) {
        otsikkokenttä.css("textDecoration", "");
        kommenttikenttä.show("slow");
        tärkeäKenttä.css({
          display: "inline",
          backgroundColor: "green",
          borderColor: "green",
        });
        tärkeäKenttä.text("Merkitse tehdyksi.");
        myStorage.removeItem("tehty" + i);
        var päivitettyTehdyt = myStorage.getItem("tehdyt");
        var parsedTehdyt = parseInt(päivitettyTehdyt);
        parsedTehdyt = parsedTehdyt - 1;
        myStorage.setItem("tehdyt", parsedTehdyt);
        tsekkaaMäärä2();
      }
      if (loadTitle !== loadCompleted) {
        otsikkokenttä.css("textDecoration", "line-through");
        kommenttikenttä.hide("slow");
        tärkeäKenttä.css({
          display: "inline",
          backgroundColor: "red",
          borderColor: "red",
        });
        tärkeäKenttä.text("Palauta.");
        myStorage.setItem("tehty" + i, otsikkokenttä.text()); // Tai otsikkokenttä.html() tms.
        var päivitettyTehdyt = myStorage.getItem("tehdyt");
        var parsedTehdyt = parseInt(päivitettyTehdyt);
        parsedTehdyt = parsedTehdyt + 1;
        myStorage.setItem("tehdyt", parsedTehdyt);
        tsekkaaMäärä2();
      }
    });

    const dynaaminentausta = $("<div>", {
      class: "notdone",
      width: "500px",
      height: "fit-content",
      padding: "2px",
      borderStyle: "outset",
    });

    if (loadTitle == loadCompleted) {
      otsikkokenttä.css("textDecoration", "line-through");
      kommenttikenttä.css("display", "none");
      tärkeäKenttä.css({
        backgroundColor: "red",
        borderColor: "red",
      });
      tärkeäKenttä.text("Palauta."); // Tai .innerHTML / .html
    }

    otsikkokenttä.appendTo(dynaaminentausta);
    kommenttikenttä.appendTo(dynaaminentausta);
    tärkeäKenttä.appendTo(dynaaminentausta);

    dynaaminentausta.appendTo(lista);

    tsekkaaMäärä2();
  }
}

// var lista = $("#lista");
// var items = [];
// var amount;

var counter = 0;

function createItem() {
  var otsikko = $("#otsikko").val();
  var kommentti = $("#comment").val();
  var määrä = myStorage.getItem("määrä");
  var parsettuMäärä = parseInt(määrä);

  const item = { title: otsikko, comment: kommentti };
  console.log(item);

  if (otsikko == "") {
    window.alert(
      "Otsikko on pakollinen. Lisää jotain tekstiä otsikkokenttään."
    );
    otsikkoInput = $("#otsikko");
    otsikkoInput.css("border", "2px solid red");
    otsikkoInput.click(function () {
      if (otsikkoInput.css("border", "2px solid red")) {
        otsikkoInput.css("border", "1px solid black");
      }
    });
  } else {
    if (typeof Storage !== "undefined") {
      counter = counter + 1;
      var storeTitle = "otsikko" + counter;
      var storeComment = "kommentti" + counter;

      // Ensin (yläpuolella) määrittelen localStorage avainten nimet tyylillä 'otsikko1', 'otsikko2', 'kommentti1' jne. mahdollistaen helpomman muistista lataamisen myöhemmässä funktiossa.

      var titleValue = otsikko;
      var commentValue = kommentti;
      var amountValue = counter;

      // Seuraavaksi (yläpuolella) määrittelen localStorage avainten arvot sivulta löytyvien otsikkojen ja kommenttien perusteella.

      myStorage.setItem(storeTitle, titleValue);
      myStorage.setItem(storeComment, commentValue);
      myStorage.setItem("määrä", amountValue);

      renderöi();
    }
    // Lopuksi lisään avaimet (nimet ja arvot) localStorageen.
  }
}

function renderöi() {
  var lista = $("#lista");
  var määrä = myStorage.getItem("määrä");
  for (let i = 1; i < määrä; i++) {
    var loadTitle = myStorage.getItem("otsikko" + määrä);
    var loadComment = myStorage.getItem("kommentti" + määrä);
    var loadCompleted = myStorage.getItem("tehty" + määrä);

    const otsikkokenttä = $("<h2>" + loadTitle + "</h2>");
    otsikkokenttä.attr("class", "otsikko");

    var kommenttikenttä = $("<p>" + loadComment + "</p>");
    kommenttikenttä.attr("class", "kommentti");

    const tärkeäKenttä = $("<button>Merkitse tehdyksi.</button>");
    tärkeäKenttä.attr("class", "done");

    const dynaaminentausta = $("<div>", {
      class: "notdone",
      width: "500px",
      height: "fit-content",
      padding: "2px",
      borderStyle: "outset",
    });

    otsikkokenttä.appendTo(dynaaminentausta);
    kommenttikenttä.appendTo(dynaaminentausta);
    tärkeäKenttä.appendTo(dynaaminentausta);

    dynaaminentausta.appendTo(lista);
    lista.show("slow");

    lisääKuuntelija();
  }
}

function lisääKuuntelija() {
  var lista = document.getElementById("lista");
  var amount = myStorage.getItem("määrä");
  const otsikot = $(".otsikko");
  const kommentit = $(".kommentti");
  const tärkeäKenttä = $(".done");

  for (let i = 0; i <= amount; i++) {
    var realAmount = i + 1;

    var loadTitle = myStorage.getItem("otsikko" + realAmount);
    var loadComment = myStorage.getItem("kommentti" + realAmount);
    var loadCompleted = myStorage.getItem("tehty" + realAmount);

    tärkeäKenttä[i].click(function () {
      var loadTitle = myStorage.getItem("otsikko" + realAmount);
      var loadComment = myStorage.getItem("kommentti" + realAmount);
      var loadCompleted = myStorage.getItem("tehty" + realAmount);

      var lista = document.getElementById("lista");
      var amount = myStorage.getItem("määrä");
      var otsikkoKenttä = $(".otsikko");
      var kommenttiKenttä = $(".kommentti");
      var tärkeäKenttä = $(".done");

      if (loadTitle == loadCompleted) {
        var loadTitle = myStorage.getItem("otsikko" + realAmount);
        var loadComment = myStorage.getItem("kommentti" + realAmount);
        var loadCompleted = myStorage.getItem("tehty" + realAmount);
        var lista = document.getElementById("lista");
        var otsikkoKenttä = $(".otsikko");
        var kommenttiKenttä = $(".kommentti");
        var tärkeäKenttä = $(".done");
        otsikkoKenttä[i].css("textDecoration", "");
        kommenttiKenttä[i].show("slow");
        tärkeäKenttä[i].css({
          display: "inline",
          backgroundColor: "green",
          borderColor: "green",
        });
        tärkeäKenttä[i].text("Merkitse tehdyksi.");
        myStorage.removeItem("tehty" + realAmount);
        var päivitettyTehdyt = myStorage.getItem("tehdyt");
        var parsedTehdyt = parseInt(päivitettyTehdyt);
        parsedTehdyt = parsedTehdyt - 1;
        myStorage.setItem("tehdyt", parsedTehdyt);
        tsekkaaMäärä2();
      }
      if (loadTitle !== loadCompleted) {
        var loadTitle = myStorage.getItem("otsikko" + realAmount);
        var loadComment = myStorage.getItem("kommentti" + realAmount);
        var loadCompleted = myStorage.getItem("tehty" + realAmount);
        var lista = $("#lista");
        var otsikkoKenttä = $(".otsikko");
        var kommenttiKenttä = $(".kommentti");
        var tärkeäKenttä = $(".done");
        otsikkoKenttä[i].css("textDecoration", "line-through");
        kommenttiKenttä[i].hide("slow");
        tärkeäKenttä[i].css({
          display: "inline",
          backgroundColor: "red",
          borderColor: "red",
        });
        tärkeäKenttä[i].text("Palauta.");
        myStorage.setItem("tehty" + realAmount, otsikkokenttä.text()); // Tai otsikkokenttä.html() tms.
        var päivitettyTehdyt = myStorage.getItem("tehdyt");
        var parsedTehdyt = parseInt(päivitettyTehdyt);
        parsedTehdyt = parsedTehdyt + 1;
        myStorage.setItem("tehdyt", parsedTehdyt);
        tsekkaaMäärä2();
      }
    });
  }

  if (loadTitle == loadCompleted) {
    otsikkokenttä.css("textDecoration", "line-through");
    kommenttikenttä.css("display", "none");
    tärkeäKenttä.css({
      backgroundColor: "red",
      borderColor: "red",
    });
    tärkeäKenttä.text("Palauta."); // Tai .innerHTML / .html
  }
}

function lisääListaan2() {
  var otsikko = $("#otsikko").val();
  var kommentti = $("#comment").val();
  var määrä = myStorage.getItem("määrä");

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
      var lista = $("#lista");

      const otsikkokenttä = $("<h2>" + otsikko + "</h2>");
      otsikkokenttä.attr("class", "otsikko");

      var kommenttikenttä = $("<p>" + kommentti + "</p>");
      kommenttikenttä.attr("class", "kommentti");

      // Luotiin kommentille 'p'-elementti sekä TextNode tekstikentän arvolla.
      // Määriteltiin kommentin 'p'-elementille attribuutti 'class' arvolla 'kommentti', jotta localStorageen tallennus onnistuu helpommin.
      // Lisätään olennainen TextNode 'p'-elementtiin.

      const tärkeäKenttä = $("<button>Merkitse tehdyksi.</button>");
      tärkeäKenttä.attr("class", "done");

      // const tärkeäKenttä = $("<button>", {
      //   html: "Merkitse tehdyksi.",
      //   class: "done",
      // });

      // lista on jo sivulta löytyvä isompi DIV-elementti ID:llä 'lista', jonka sisään jokainen To Do -item menee dynaaminentausta-nimisen DIV-elementissä.

      const dynaaminentausta = $("<div>", {
        class: "notdone",
        width: "500px",
        height: "fit-content",
        padding: "2px",
        borderStyle: "outset",
        display: "none",
      });

      // Luodaan 'dynaaminentausta' DIV-elementti ja määritellään sille attribuutti 'id' arvolla 'tausta + i' debugaussyistä.
      // Samalla muokataan 'dynaaminentausta' DIV-elementin tyyliä mm. width, margin ja padding.

      otsikkokenttä.appendTo(dynaaminentausta);
      kommenttikenttä.appendTo(dynaaminentausta);
      tärkeäKenttä.appendTo(dynaaminentausta);
      // dynaaminentausta.appendChild(otsikkokenttä);
      // dynaaminentausta.appendChild(kommenttikenttä);
      // dynaaminentausta.appendChild(tärkeäKenttä)
      // Lisätään otsikko, kommentti sekä poistonappi dynaamiseen taustaan.
      // dynaaminentausta.click(function () {
      //   if ($(this).hasClass( "done" )) {
      //     $(this).removeClass( "done" ).addClass( "notdone" );
      //     console.log('notdone');
      //   }
      //   if ($(this).hasClass( "notdone" )) {
      //     $(this).removeClass( "notdone" ).addClass( "done" );
      //     console.log('done');
      //   }
      // })
      dynaaminentausta.appendTo(lista);

      // lista.appendChild(dynaaminentausta);

      // Lisätään dynaaminentausta sivulta löytyvään taustaan, jotta To Do -item ilmestyy sivulle.

      tallennaMuistiin2();
      // Ajetaan tallennaMuistiin()-funktio, jotta uusi To Do -item pääsee localStorageen.

      window.location.reload();
    } else {
      window.alert("Selaimesi ei tue localStoragea.");

      // Jos selain ei tue localStorage / sessionStorage niin sivusto hälyttää käyttäjää eikä käyttö onnistu.
    }
  }
}

// lataaMuistista() -funktio lataa ja renderöi tallennaMuistiin() -funktion localStorageen tallentamat To Do -itemit otsikoineen ja kommentteineen For-loopilla.
// lataaMuistista() -funktio ajetaan sivun ladatessa eli <body onload='lataaMuistista();>'
