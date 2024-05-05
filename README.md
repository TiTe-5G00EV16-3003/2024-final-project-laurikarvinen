[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/qCtVf2Dd)
# Final Project
Web Programming - Final Project


## Backend

### Asennus

1. Avaa backend-kansio terminaalissa.
2. Suorita `npm init` ja seuraa ohjeita luodaksesi `package.json` -tiedoston.
3. Suorita seuraavat komennot asentaaksesi tarvittavat riippuvuudet:

```bash
npm install bcryptjs uuid jsonwebtoken joi nodemon --save
npm install express mysql2 dotenv cors --save
npm install supertest --save-dev
```

### Konfigurointi

1. Luo `.env` tiedosto backend-kansioon ja lisää siihen seuraavat ympäristömuuttujat:

```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=items_password
MYSQL_DATABASE=items_db
JWT_KEY=my_secret_key
VITE_API_URL=http://172.16.5.126:5000
```

### Käynnistys

1. Käynnistä backend-sovellus komennolla:

```bash
npm start
```

### Konttien käynnistys

1. Avaa backend-kansio terminaalissa.
2. Käynnistä backend-kontti Dockerissa seuraavalla komennolla:

```bash
docker-compose up -d --build
```

## Frontend

### Asennus

1. Avaa frontend-kansio terminaalissa.
2. Asenna tarvittavat riippuvuudet suorittamalla seuraavat komennot:

```bash
npm install dist
npm install nginx
npm install react-query@^3.39.3 react-router-dom@5.3.4 react-transition-group@^4.4.5 --save
```

### Konfigurointi

1. Luo `.env` tiedosto frontend-kansioon ja lisää siihen seuraava ympäristömuuttuja:

```
VITE_API_URL=http://localhost:5000
```

### Käynnistys

1. Käynnistä frontend-sovellus komennolla:

```bash
npm start
```

### Konttien käynnistys

1. Avaa frontend-kansio terminaalissa.
2. Käynnistä frontend-kontti Dockerissa seuraavalla komennolla:

```bash
docker-compose up -d --build
```

