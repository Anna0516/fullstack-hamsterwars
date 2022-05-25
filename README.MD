# Fullstackapp HamsterWars

Av Anna Eriksson

## Om appen

Jag har använt express till servern och byggt ett api i backend. I frontend använder jag React och Typescript. I backend finns endpoints för att hämta alla hamsterobjekt eller ett slumpmässigt hamsterobjekt. GET, POST, PUT och DELETE requests fungerar.

### Start

På startsidan presenteras den sötaste hamstern just nu, det vill säga den hamster med högst värde på antal vinster minus antal förluster. Om flera hamstrar har samma rating-poäng visas en slumpmässig hamster av dem.

### Tävla

På tävlingssidan finns bilder och namn på två hamstrar som man kan rösta på. Efter att ha klickat på röstningsknappen på någon av dem visas vinnaren, och statistik för vinster/förluster visas för båda hamstrarna. En vinst/en förlust läggs till på respektive hamster, samt en match. Röstningsknapparna blir avaktiverade efter röstning. När vinnaren presenterats går det att starta en ny match med en knapptryckning.

### Galleri

I galleriet visas alla hamstrar med namn och bild, en länk för att få se mer info, samt en knapp för att radera hamstern. Det finns också ett formulär för att ladda upp nya hamstrar till galleriet. Formuläret använder validering. Vid uppladdning el radering uppdateras galleriet direkt.
