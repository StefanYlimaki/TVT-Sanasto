# työaikakirjanpito

| päivä | aika | mitä tein  |
| :----:|:-----| :-----|
| 02.12.2022 | 4 | Projektin toteutustavan ideointi, koodin rakenteen luominen, demo-version luonti
| 05.12.2022 | 8 | Projektin ulkoasun ideointi, muutokset koodiin, tyylien lisäämistä ja router:eiden käyttöönottoa, automaattinen deploy verceliin (tvt-sanasto.vercel.app). Projektin ulkoasun muutokset, muutokset sovelluksen toimintaperiaatteeseen, uusien ulkoasu-komponenttien käyttöönottoa
| 07.12.2022 | 6 | Verkkosovelluksen laajentaminen "pelit" sivulla, pelin ideointi ja prototypointi
| 08.12.2022 | 3 | Peliin liittyvien ongelmien ratkominen ja uusien asioiden toteuttaminen, bugi-fixejä, tyylien lisäämistä
| 09.12.2022 | 5 | Pelin koodin refaktorointia (koodin jakaminen pienempiin osiin), bugien fixausta. Pelin pituuden asettamisominaisuus, tyylien lisäämistä pelin asetukset näytölle sekä scoreboardille
| 10.12.2022 | 4 | Tein sovelluksesta paremman mobiililaitteille
| 12.12.2022 | 5 | Deployment pipelinen käyttöönottoa ja testausta, master branchin asettaminen protected branchiksi, tyylien lisäämistä, bugien korjausta. Eslint lisätty, eslint konfigurointi, pipelinen laajentamista ja testaamista
| 13.12.2022 | 7 | Backend lisätty, backend yhteydessä postgres tietokantaan, jossa käyttäjien tiedot. Lisäksi backend hakee sanastot verkosta ns. web-scraper:lla. Tämä siksi, kun GitLab:sta (jossa sanastot ovat) ei voi fetchata dataa API-kutsuilla. Lisäsin myös testausmielessä (vielä) frontendin hakemaan nämä tiedot, vaikka se ei niitä vielä käytäkään. Tänään vastaan tuli monta ongelmaa (kuten GitLab:in cors policy --> ratkaisu: käytä web-scraperia), lisäksi tietokannan käyttöönottoon liittyviä asioita tuli kerrattua uudelleen.
| 14.12.2022 | 5 | Muutoksia backendiin. Kysytty data haetaan verkosta, vain jos sitä ei ole palvelimella. Jos kyselyn mukana tulee pyyntö eritoten hakea data verkosta, se haetaan. Sen jälkeen tarkistetaan, oliko haettu data samaa mikä palvelimella on, jos ei niin tallennetaan juuri haettu data palvelimelle. Backendin koodin refaktorointia, helper-functions ja middlewarea. Frontend hakee datan backendistä oikein, mutta ei vielä käytä sitä.
| 15.12.2022 | 4 | Muutin sovelluksen tallettamaan sanasto-json tiedostot laitteelle backendistä jokaisen sivun päivityksen yhteydessä. (Huom. ei vielä mahdollisuutta varmistaa, että backend varmistaa sanaston ajankohtaisuuden, kun refresh-attribuuttia ei lähetetä backendille). Refaktoroin pelin koodia, ja mahdollistin pelin scoreboardin päivityksen tulevaisuudessa.
| 16.12.2022 | 6 | Ei committeja tänään. Tutkin mahdollisuuksia koko sovelluksen deploymentille verkkoon. Tutustuin Dockeriin ja Kubernetes:iin
| 19.12.2022 | 5 | Ei committeja tänään. Tutkin mahdollisuuksia koko sovelluksen hostaamiselle verkossa. Tutuistuin PERN-stackin hostaamiseen, verceliin, ja postgres tietokannan hostaamiseen. Postgres tietokannan osaan nyt hostata verkossa.
| 20.12.2022 | 6 | Loin verkkoon API:n, josta sanastot saa fetchattua. Laitoin frontendin käyttämään sitä. Tutustuin API:n luomiseen Vercelissä.
| 21.12.2022 | 3 | Pipeline käyttöönottoa varten muutoksia ja testausta, ja readmen kirjottelua
| 22.12.2022 | 6 | Aloitin uuden pelin lisäämisen, tein sovelluksesta paremman mobiililaitteille
| 28.12.2022 | 3 | Jatkoin uuden pelin kehittämistä, peli toimii nyt hyvin tietokoneella
| 30.12.2022 | 4 | Uuden pelin myötä tulleiden uusien bugien fixausta. Yhdistä sana ja käännös -pelissä peliraporttitaulukko ei sopinut mobiililaitteille, joten asian tutkimisen ja opiskelemisen myötä tein mobiililaitteille kokonaan oman näkymän. Lisäksi pieniä fixejä.
| 02.01.2023 | 7 | Kysytyn sanan kielen valitsemisen ominaisuus lisäys peliin "yhdistä sana ja käännös". Korjasin bugin, jossa sovellus kaatui, mikäli API-kutsu ei ollut palauttanut sanasto-dataa, kun sanakirja sivu tai peli-sivu avattiin. Nyt sovellus näyttää loading-ruutua, niin kauan kuin on tarpeellista. Opiskelin testaamista ja lisäsin testejä kolmelle komponentille.
| 04.01.2023 | 6 | Konfiguroin projektin CI/CD:ta. Aloitin e2e testien teon cypressillä.
| 05.01.2023 | 6 | Lisäsin e2e-testejä. Muutin pipelinen ajamaan myös e2e-testit. Optimoin e2e-testejä, koska ne veivät liian kauan aikaa. Optimoinnilla testin ajoaika 50 sekuntia --> 25 sekuntia. Lisäksi kommentoin e2e-testit ja selkeytin pipelineä.
| 12.01.2023 | 6 | Lisäsin latausnäkymän, kun sanastoja ladataan. Refaktoroin pelien koodia eriyttämällä osia pienempiin komponentteihin ja elementteihin. Parantelin tyylien selkeyttä, ja korjasin rikki menneet e2e testit.
| 13.01.2023 | 5 | Muutin tiedostorakennetta paremman selkeyden vuoksi, ja koska VSCode ei käsittänyt saman nimisiä tiedostoja erillisinä. Refaktoroin scoreboardien koodia, ja kommentoin scoreboardien MWAD -pelin koodia. Aloitin API:n optimoinnin, mutta kävi "works on my machine" ongelma, kun olin deployannut verceliin, jonka jälkeen e2e testit eivät menneet läpi, kun ne riippuvat API:sta. Palautin aiemman API:n aktiiviseksi, ja aloitin ongelman korjaustyön, johon minulla on jo ratkaisu, mutta jää valitettavasti tuonnemmalle. Verkossa kuitenkin toimiva versio.
| 14.01.2023 | 3 | Jatkoin backendin fixaustöitä 
| 16.01.2023 | 3 | Jatkoin backendin fixaustöitä. Lopputulos: käytä tietokantaa tiedon tallettamiseen.
| 17.01.2023 |  | Aloitin työskennellä MongoDB:n kanssa

111/175 tuntia käytetty

TODO:
Testien lisääminen sekä komponentti että e2e
Refaktorointia
Tyylien lisäämistä
Käyttäjätestausta
API:n fixauksen korjaus


