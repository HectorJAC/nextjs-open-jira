## Curso de NextJS de Fernando Herrera  

### Pokemon Static  

Utilizando la API de Pokemon, se creó una página estática con los nombres de los primeros 151 pokemones.  
Mediante el uso de `getStaticProps` y `getStaticPaths` se generaron las páginas estáticas de cada pokemon.  

**Instalar dependencias:**  
```npm install```  

**Iniciar el proyecto:**  
```npm run dev```

# Next.js OpenJira App  
Para correr localmente, se necesita la base de datos  
```
docker-compose up -d
```  
  
* El -d significa __detached__  

MongoDB URL Local:  
```
mongodb://localhost:27017/entriesdb
```  

## Variables de entorno  
Crear archivop __.env__ en la raiz del proyecto con las siguientes variables:  
```  
MONGO_URL  
```  
## Llenar la base de datos con informacion de pruebas  
Llamar a:  
```[http](http://localhost:3000/api/seed)```