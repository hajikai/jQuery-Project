# Projekti 3
 jQuery / Bootstrap -versio Web-sovellusten kehittäminen Javascriptillä TO00BL10-3014 -kurssin ensimmäisestä projektista, joka toimii To Do -listana DOM-metodeilla.

To Do -lista toimii niin, että saat lisätä sinne haluamasi määrän 'itemeitä' eli otsikoita (tai otsikko + kommentti kombinaatioita), joita voit merkitä tehdyksksi 'Merkitse tehdyksi' -nappia painamalla. Tämä yliviivaa item:n otsikon, piilottaa kommentin (jos sitä on) ja muuttaa 'Merkitse tehdyksi' -napin 'Palauta'-napiksi, jolla saat 'item':n takaisin edelliseen tilaan. 

To Do -lista pitää myös lukua siitä kuinka monta itemiä listassa on ja kuinka moni niistä on suoritettu - tämä informaatio näkyy reaaliajassa ennen lomaketta olevassa <p>-elementissä.
 
To Do -lista käyttää localStorage:a muistaakseen listaan laittamasi item:t sekä niiden tilat.
 
Tämä jQuery-versio toimii hieman eri tavalla verrattuna alkuperäiseen To Do -applikaatioon. Olen tehnyt uusia funktioita, yksinkertaistanut toiminnallisuutta, lisännyt Bootstrap-elementtejä sekä jQuery-efektejä.
 
 createItem() -funktio tarkistaa lomakkeeseen syötetyt arvot sekä lisää nämä arvot kuten otsikko, kommentti ja itemien määrä localStorageen.
 renderöi() -funktio lukee arvot localStoragesta ja tulostaa To Do -itemin niiden perusteella sekä lisää EventListener:n 'Merkitse tehdyksi' -nappiin.
       - EventListener merkitsee item:n tehdyksi nappia painaessa, lisää tehdyn otsikon localStorageen, laskee montako item:iä on tehtynä ja lataa sen localStorageen    muuttaa elementin classia ja ulkonäköä.
 tsekkaaMäärä2()-funktio tarkistaa item:ien sekä tehtyjen item:ien määrän ja tulostaa sen perusteella lauseen, joka kertoo kuinka monta itemeistä on tehtynä.
 tyhjennäLista3()-funktio poistaa jokaisen item:n sekä resettaa localStoragen 'määrä' (item:ien määrä) ja 'tehdyt' (tehtyjen itemien määrä) arvot nollaan.
 lataaMuistista2()-funktio tekee käytännössä saman kuin renderöi, mutta tulostaa kaiken localStoragessa olevan - tapahtuu kun sivun lataa uudestaan eli näin sivu säilyttää To do -itemisi sulkemisesta huolimatta.
 
 
