# Mini application météo

Apprenez à utiliser un service d'API en créant votre petite interface de météo.

> API = il s'agit d'une interface qui nous permet de nous connecter, nous brancher à un site pour échanger des données. Une API est donc créée et proposer par le propriétaire d'un service.

Ici, nous allons envoyer le nom de la ville à l'API et en retour nous souhaitons obtenir la météo courante de cette ville, en degrès celcius. 

## OpenWeather

https://openweathermap.org/api

Clé API : `63cba063ca9a5c3be33aac9e1436c0d8`

## Indices 
 
 - Appel AJAX vers l'API
 - Récupération des données en JSON afin de les traiter en JS
 - Pour obtenir les informations, on a besoin du nom de la ville sous la forme `Marseille` ou `Marseille,FR` sans espace (il faut donc gérer le cas où il y aurait des espaces pour les supprimer)

 ## Bonus 

 Afficher la météo pour une ville à partir de son code postal