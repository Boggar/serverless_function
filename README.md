Veranstaltung: Cloud Computing 
Thema: Serverless Functions in Azure

Gruppe:
- Manuel Thamm, 35605

Die Function kann über das Terminal mit "func host start" gestartet werden.
Es gibt folgende Links:
1. localhost:{PORT}/api/start
2. localhost:{PORT}/api/start/rezepte
3. localhost:{PORT}/api/start/rezepte/filtered

start/rezepte/filtered erlaubt es Parameter zuübergeben, folgende Parameter kann man abfragen:
- ingredients
- diet
- preptime

Dazu gibt man in der URL "/start/rezepte/filtered?ingredients={parameter1}?diet={parameter2}?preptime={parameter3}" ein 
Es müssen nicht alle 3 Parameter übergeben werden, hier ein paar Beispiele:

- http:/localhost/api/start/rezepte/filtered?ingredients=tomaten?diet=vegan?preptime=50
- http:/localhost/api/start/rezepte/filtered?ingredients=tomaten?diet=vegan
- http:/localhost/api/start/rezepte/filtered?ingredients=tomaten?preptime=30
- http:/localhost/api/start/rezepte/filtered?preptime=25
- etc. 
