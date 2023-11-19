# API Backend du projet Alcatel Push To Talk avec Node.js et MySQL

Bienvenue dans le projet Node.js avec une base de données MySQL. Ce projet est une API simple utilisant Express pour créer un serveur web et MySQL2 comme pilote de base de données afin de communiquer avec l'application Android frontend.

## Utilisation sous Docker :

Assurez-vous d'avoir Docker et Docker Compose installés sur votre machine.

1. Construisez les images Docker :
    ```bash
    sudo docker-compose build
    ```

2. Lancez les conteneurs en arrière-plan :
    ```bash
    sudo docker-compose up -d
    ```

3. Accédez à l'API via la route "/bubbles".

4. Possibilité d'affichage sous tableau HTML pour les tests en utilisant l'extension "/bubbles?format=html".

5. Pour insérer de nouvelles données, utilisez la route POST "/bubbles" avec le body de la requête contenant les informations nécessaires. Par exemple, en utilisant cURL :

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"name":"New Bubble", "lattitude":40.7128, "longitude":-74.0060, "creator":"John Doe"}' http://localhost:3000/bubbles
    ```

## Configuration de l'environnement :

Le projet utilise des fichiers `.env` pour la configuration de l'environnement. Assurez-vous de créer ces fichiers avec les informations appropriées pour MySQL et Node.js.

### Exemple de fichier `.env-mysql` :

```plaintext
MYSQL_ROOT_PASSWORD=exemple
MYSQL_DATABASE=exemple
MYSQL_USER=exemple
MYSQL_PASSWORD=exemple
```

### Exemple de fichier `.env-nodejs` :

```plaintext
DB_HOST=exemple
DB_USER=exemple
DB_PASSWORD=exemple
DB_NAME=exemple
```

Ces fichiers `.env` ne sont pas versionnés pour des raisons de sécurité.