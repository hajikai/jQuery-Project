// Aluksi määritellään, että myStorage = window.localStorage

myStorage = window.localStorage;

// myStorage käyttää selaimen localStorage-muistia

// Alla määrittelen muuttujan 'done', joka pitää lukua siitä kuinka moni To Do -listan itemi on suoritetussa tilassa. Saan arvon 'null', jos sitä ei ole olemassa, joten siinä tapauksessa
// annan sille arvon 0 - muuten annan muistista saadun arvon. Arvo menee muistiin nimellä 'tehdyt'.
// Sama juttu muuttujan 'määrä' kanssa.
myStorage.setItem('tehdyt');
var done = myStorage.getItem("tehdyt");

if (done == "null") {
  myStorage.setItem("tehdyt", 0);
}
if (done != "null") {
  myStorage.setItem("tehdyt", done);
}

myStorage.setItem('määrä');
var määrä = myStorage.getItem("määrä");

if (määrä == "null") {
  myStorage.setItem("määrä", 0);
}
if (done != "null") {
  myStorage.setItem("tehdyt", done);
}

// const nappi on lomakkeen 'Lähetä'-nappi. Se on määritelty EventListener varten.
// // Alla määritelty EventListener tyhjentää otsikko (titleInput) ja kommentti / comment (commentInput) -kentät klikkauksen jälkeen.

const nappi = $("#nappi");

nappi.click(function handleClick(event) {
  const titleInput = $("#otsikko");
  const commentInput = $("#comment");
  titleInput.val("");
  commentInput.val("");
});

// createItem() -funktio korvaa lisääListaan() ja tallennaMuistiin() -funktiot. Tämä funktio tarkistaa lomakkeessa olevat arvot ja tallentaa niiden sisällön localStorageen, josta se sitten
// myöhemmin tulostaa ne renderöi() -funktiossa.

function createItem() {
  var otsikko = $("#otsikko").val();
  var kommentti = $("#comment").val();
  var määrä = myStorage.getItem("määrä");
  var parsedMäärä = parseInt(määrä);

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
        otsikkoInput.css("border", "1px solid #ced4da");
      }
    });
  } else {
    if (typeof Storage !== "undefined") {
      parsedMäärä = parsedMäärä + 1;
      var storeTitle = "otsikko" + parsedMäärä;
      var storeComment = "kommentti" + parsedMäärä;

      // Ensin (yläpuolella) määrittelen localStorage avainten nimet tyylillä 'otsikko1', 'otsikko2', 'kommentti1' jne. mahdollistaen helpomman muistista lataamisen myöhemmässä funktiossa.

      var titleValue = otsikko;
      var commentValue = kommentti;
      var amountValue = parsedMäärä;

      // Seuraavaksi (yläpuolella) määrittelen localStorage avainten arvot sivulta löytyvien otsikkojen ja kommenttien perusteella.

      myStorage.setItem(storeTitle, titleValue);
      myStorage.setItem(storeComment, commentValue);
      myStorage.setItem("määrä", amountValue);

      // Lopuksi lisään avaimet (nimet ja arvot) localStorageen.

      // Sitten renderöimään.

    
    }
  }
}

// Renderöi() -funktio tulostaa To Do -itemin localStoragen muistin perusteella ja lisää tarpeelliset classit, id:t ja EventListenerit.
// Olen lisännyt hieman jQuery-efektejä muun jQuery syntaksin lisäksi.

function renderöi() {
  var lista = $("#lista");
  var määrä = myStorage.getItem("määrä");
  var realMäärä = parseInt(määrä);

  var loadTitle = myStorage.getItem("otsikko" + määrä);
  var loadComment = myStorage.getItem("kommentti" + määrä);
  var loadCompleted = myStorage.getItem("tehty" + määrä);

  const otsikkokenttä = $("<h2>" + loadTitle + "</h2>");
  otsikkokenttä.attr("class", "otsikko");

  const kommenttikenttä = $("<p>" + loadComment + "</p>");
  kommenttikenttä.attr("class", "kommentti");

  const tärkeäKenttä = $("<button>Merkitse tehdyksi</button>");
  tärkeäKenttä.attr("class", "notdone");
  tärkeäKenttä.attr("button", "complete");
  tärkeäKenttä.attr("id", määrä);

  const dynaaminentausta = $("<div>", {
    id: määrä,
    class: "tausta"
  });
  // dynaaminentausta.css('border', '1px solid gray');
  // dynaaminentausta.css('margin', '5px');
  // dynaaminentausta.css('padding', '5px');
  // dynaaminentausta.css('borderRadius', '5px');

  otsikkokenttä.appendTo(dynaaminentausta);
  kommenttikenttä.appendTo(dynaaminentausta);
  tärkeäKenttä.appendTo(dynaaminentausta);

  tärkeäKenttä.click(function () {
    var loadTitle = myStorage.getItem("otsikko" + määrä);
    var loadCompleted = myStorage.getItem("tehty" + määrä);

    if (loadTitle == loadCompleted) {
      tärkeäKenttä.removeClass("done").addClass("notdone");
      otsikkokenttä.css("textDecoration", "");
      kommenttikenttä.show("slow");
      tärkeäKenttä.text("Merkitse tehdyksi");
      myStorage.removeItem("tehty" + määrä);
      var päivitettyTehdyt = myStorage.getItem("tehdyt");
      var parsedTehdyt = parseInt(päivitettyTehdyt);
      parsedTehdyt = parsedTehdyt - 1;
      myStorage.setItem("tehdyt", parsedTehdyt);
      tsekkaaMäärä2();
    }
    if (loadTitle !== loadCompleted) {
      tärkeäKenttä.removeClass("notdone").addClass("done");
      otsikkokenttä.css("textDecoration", "line-through");
      kommenttikenttä.hide("slow");
      tärkeäKenttä.text("Palauta");
      myStorage.setItem("tehty" + määrä, loadTitle); // Tai otsikkokenttä.html() tms.
      var päivitettyTehdyt = myStorage.getItem("tehdyt");
      var parsedTehdyt = parseInt(päivitettyTehdyt);
      parsedTehdyt = parsedTehdyt + 1;
      myStorage.setItem("tehdyt", parsedTehdyt);
      tsekkaaMäärä2();
    }
  });

  dynaaminentausta.appendTo(lista);
  

  // debugausta varten:
  const thisdone = tärkeäKenttä[0];
  const nro =  thisdone.id;
    console.log(nro);


  tsekkaaMäärä2();
}

// tsekkaaMäärä()-funktio tarkistaa To Do -itemien määrän ja näyttää sen <p id='määrä'> -elementin (mittari) sisällä tekstimuodossa.
// tsekkaaMäärä()-funktio laskee To Do -itemien määrän tarkistamalla otsikkojen määrän luokan perusteella.
// Funktio käyttää myös localStoragen 'tehdyt'-arvoa verratakseen tehtyjen itemien määrää kokonaismäärään.
// ko. funktio ajetaan myöhemmin silloin kun itemien tai suoritettujen itemien määrä muuttuvat. Tunnistaa kun lista on täysin suoritettu.

function tsekkaaMäärä2() {
  var mittari = $("#määrä");
  var luku = myStorage.getItem("määrä");
  var tehtyLuku = myStorage.getItem("tehdyt");

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

// lataaMuistista() -funktio ajetaan sivun ladatessa eli <body onload='lataaMuistista();>'
// Toimii kuten ennen, mutta olen tehnyt siitä hieman suoraviivaisemman jQuery:llä. Lisäksi sisältää jQuery-efektejä.

function lataaMuistista3() {
  var lista = $("#lista");
  var määrä = myStorage.getItem("määrä");

  for (let i = 1; i <= määrä; i++) {
    var lista = $("#lista");
    var loadTitle = myStorage.getItem("otsikko" + i);
    var loadComment = myStorage.getItem("kommentti" + i);
    var loadCompleted = myStorage.getItem("tehty" + i);

    const otsikkokenttä = $("<h2>" + loadTitle + "</h2>");
    otsikkokenttä.attr("class", "otsikko");

    const kommenttikenttä = $("<p>" + loadComment + "</p>");
    kommenttikenttä.attr("class", "kommentti");
    const tärkeäKenttä = $("<button>");

    if (loadTitle == loadCompleted) {
      tärkeäKenttä.text("Palauta");
      otsikkokenttä.css("textDecoration", "line-through");
      tärkeäKenttä.attr("class", "done");
      tärkeäKenttä.attr("button", "complete");
      tärkeäKenttä.attr("id", i);
      kommenttikenttä.css("display", "none");
    } else if (loadTitle !== loadCompleted) {
      tärkeäKenttä.text("Merkitse tehdyksi");
      otsikkokenttä.css("textDecoration", "");
      tärkeäKenttä.attr("class", "notdone");
      tärkeäKenttä.attr("button", "complete");
      tärkeäKenttä.attr("id", i);
      kommenttikenttä.css("display", "block");
    }

    tärkeäKenttä.click(function (e) {
      var loadTitle = myStorage.getItem("otsikko" + i);
      var loadCompleted = myStorage.getItem("tehty" + i);

      if (loadTitle == loadCompleted) {
        tärkeäKenttä.removeClass("done").addClass("notdone");
        otsikkokenttä.css("textDecoration", "");
        kommenttikenttä.show("slow");
        tärkeäKenttä.text("Merkitse tehdyksi");
        myStorage.removeItem("tehty" + i);
        var päivitettyTehdyt = myStorage.getItem("tehdyt");
        var parsedTehdyt = parseInt(päivitettyTehdyt);
        parsedTehdyt = parsedTehdyt - 1;
        myStorage.setItem("tehdyt", parsedTehdyt);
        tsekkaaMäärä2();
      }
      if (loadTitle !== loadCompleted) {
        tärkeäKenttä.removeClass("notdone").addClass("done");
        otsikkokenttä.css("textDecoration", "line-through");
        kommenttikenttä.hide("slow");
        tärkeäKenttä.text("Palauta");
        myStorage.setItem("tehty" + i, loadTitle); // Tai otsikkokenttä.html() tms.
        var päivitettyTehdyt = myStorage.getItem("tehdyt");
        var parsedTehdyt = parseInt(päivitettyTehdyt);
        parsedTehdyt = parsedTehdyt + 1;
        myStorage.setItem("tehdyt", parsedTehdyt);
        tsekkaaMäärä2();
      }
    });

    const dynaaminentausta = $("<div>", {
      id: määrä,
      class: "tausta",
      width: "500px",
      height: "fit-content",
      padding: "2px",
      borderStyle: "outset",
    });

    otsikkokenttä.appendTo(dynaaminentausta);
    kommenttikenttä.appendTo(dynaaminentausta);
    tärkeäKenttä.appendTo(dynaaminentausta);

    dynaaminentausta.hide();

    dynaaminentausta.appendTo(lista);
    dynaaminentausta.show();
  }
  tsekkaaMäärä2();
}

// tyhjennäLista()-funktio tekee mitä nimi sanoo: tyhjentää listan kokonaisuudessaan käyttämällä for-looppia, joka piilottaa ja poistaa jokaisen 'kentät'-elementin yksi kerrallaan.
// Lopuksi tyhjennän localStoragen ja määrittelen 'tehdyt' arvoksi nollan.


function tyhjennäLista3() {
  const lista = $("#lista");
  const kentät = $(".tausta");
  for (let i = 0; i < kentät.length; i++) {
    kentät.hide("slow").delay(10).queue(function(){$(this).remove();});
  }
  myStorage.clear();
  myStorage.setItem("tehdyt", 0);
  myStorage.setItem("määrä", 0);
  tsekkaaMäärä2();
}
