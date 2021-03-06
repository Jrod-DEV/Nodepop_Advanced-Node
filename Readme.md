<h1 align="center">Welcome to NodepopJS 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-2.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> API REST to upload purchase and sale items to a database and consume it from any platform using JSON format.
# Release Notes
In this version we implemented authentication with JWT, internationalization and the creation of a microservice 
with cote.js and jimp to create thumbnails of the images uploaded to the app.

### 🏠 [Homepage](http://localhost:3000)

### ✨ [Demo](http://localhost:3000/api/adverts?name=iphone&sort=price&price=-1200&onsale=true&tag=mobile&limit=2&skip=0)

## Install

```sh
npm install
```

## Configuration of environment variables (.env)

Copy .env.example file and apply the necessary configuration parameters following the example.

```
cp .env.example .env
```

## How to start a local mongoDB instance for development

```sh
./bin/mongod --dbpath ./data/db --directoryperdb 
```

## Load inital database

To load the initial database, run the following command in your Terminal

```sh
npm run initDB
```

**Warning!** Tris script will delete database contents before the load.
**Use it in production only in the first deployment.**

## Usage

```sh
npm run start
```

## Usage with thumbnail´s microservice
- We will have to open two terminals, in the first one we execute the following script:
```
npm run start -m
```
This command starts the app and the client of the thumbnail creation microservice. 

- In the second terminal we launch the microservice responder with the command:
```
npm run service
```

* Once these two scripts are applied, the app will show us in the adverts views the reduced images in each advert.

## Cluster

You can start ther service in cluster mode:

```sh
npm run cluster
```

## Development Start

```sh
npm run dev
```

**You can create a tunnel with ngrok (HTTPS)**

```sh
ngrok http -region=eu 3000
```

## Authentication
In this version of the API, the routes are protected by JWT.
- To be able to access the routes, first we must make a POST with the email and password  to the following address:
```
  http://localhost:3000/api/authenticate
```
- The next step is to add the token that returns the "POST" to "/api/authenticate" in the HEADER of each request we want to have access to the different API routes.
```
     key          value
Authorization:   <token>
``` 

- In addition, in each request we will be able to see the ID of the user who is logged in.

## API Methods
### List of all adverts

GET --> /api/adverts

**An example of an expected response in JSON format.**

```
[
  {
    "tags": [
        "mobile",
        "work"
      ],
    "_id": "5ffd9a82d2a7011c761b3d35",
    "name": "IphoneX",
    "onsale": true,
    "price": 850,
    "photo": "iphoneX.jpg",
    "__v": 0
    },
    {
    "tags": [
        "lifestyle"
      ],
    "_id": "5ffd9a82d2a7011c761b3d36",
    "name": "Snow Table",
    "onsale": false,
    "price": 200,
    "photo": "table.jpg",
    "__v": 0
  },
]
```

## Get an advert

GET --> /api/adverts/\_id

- Example: http://localhost:3000/api/adverts/5ffeb60f3ab3af260d351b45

```
{
  "result": {
    "tags": [
      "mobile",
      "work"
      ],
    "_id": "5ffeb60f3ab3af260d351b45",
    "name": "IphoneX",
    "onsale": true,
    "price": 850,
    photo": "iphoneX.jpg",
   "__v": 0
   }
}
```

### Paginated Results

- Example: http://localhost:3000/api/adverts?limit=4&skip=0

```
- After a request for all ads, we will get a paginated result of 10 in 10 ads.

-  We can modify the page limit by changing the limit value in the request, in this example the limit is 4.

```

### Apply search filters

We can apply four different search filters.:

- name: http://localhost:3000/api/adverts?name=Super+Bike

```
[
  {
    "tags": [
      "motor",
      "lifestyle"
    ],
    "_id": "6000a39df385c8396f484de5",
    "name": "Super Bike",
    "onsale": true,
    "price": 5000,
    "photo": "moto.jpg",
   "__v": 0
  }
]
```

- tag: http://localhost:3000/api/adverts?tag=motor

```
[
  {
    "tags": [
      "motor",
      "lifestyle"
    ],
    "_id": "6000a39df385c8396f484de5",
    "name": "Super Bike",
    "onsale": true,
    "price": 5000,
    "photo": "moto.jpg",
    "__v": 0
  },
  {
    "tags": [
      "motor",
      "lifestyle"
    ],
    "_id": "6000a39df385c8396f484de6",
    "name": "Mustang GT",
    "onsale": true,
    "price": 32000,
    "photo": "mustang.jpg",
    "__v": 0
  }
]
```

- onsale: http://localhost:3000/api/adverts?onsale=false

```
[
  {
    "tags": [
      "lifestyle"
    ],
    "_id": "6000a39df385c8396f484de4",
    "name": "Snow Table",
    "onsale": false,
    "price": 200,
    "photo": "table.jpg",
    "__v": 0
  }
]
```

- price and price range:

  - 1000 will looks for ads with an equal price as the assigned:
    http://localhost:3000/api/adverts?price=1000

  - -1000 will look for ads that have a price less than 1000:
    http://localhost:3000/api/adverts?price=-1000
  - 10000- will look for ads that have a price higher than 1000:
    http://localhost:3000/api/adverts?price=1000-

  - 100-1000 will look for ads that have a price between 100 and 1000:
    http://localhost:3000/api/adverts?price=100-5000

  - This is a GET request with all search parameters, result limits and order:
    http://localhost:3000/api/adverts?name=iphone&sort=price&price=-1200&onsale=true&tag=mobile&limit=2&skip=0

### Sort Adverts by name, price, tags

- We can apply parameters in the query to sort the results by name, price, onsale or tag.
- This example will show the results in alphabetical order:

```
http://localhost:3000/api/adverts?sort=name
```

## Create an advert

POST --> /api/adverts

- Example: http://localhost:3000/api/adverts/

* body: { name: 'Jeep', price: 4500, onsale: true, ... }

```
{
    "result": {
        "tags": [],
        "_id": "5ffec6f6bb78932c9e6243af",
        "name": "Jeep",
        "onsale": true,
        "price": 4500,
        "photo": "jeep.jpg",
        "__v": 0
    }
}
```

## Update an advert

PUT -> /api/adverts/<\_id>

- Example: http://localhost:3000/api/adverts/5ffec6f6bb78932c9e6243af

* body: { price: 5000 }

```
{
    "result": {
        "tags": [],
        "_id": "5ffec6f6bb78932c9e6243af",
        "name": "Jeep",
        "onsale": true,
        "price": 5000,
        "photo": "jeep.jpg",
        "__v": 0
    }
}
```

## Delete an advert

DELETE -> /api/adverts/<\_id>

- Example: http://localhost:3000/api/adverts/5ffec6f6bb78932c9e6243af

```
Returns: 'HTTP Code 2000'
Message on console: 'Advert deleted succesfully!'
```

## Website Routes

If we visit the following URL: http://localhost:3000/adverts , we will get all ads. In adittion we can apply the same search criteria as in the API.

```
http://localhost:3000/adverts?skip=1&limit=2&sort=name&tag=lifestyle
```

## Upload images

POST -> /api/adverts/uploads

- body: { key: image, value: (Select Files) }

We can upload images to our API, which will be stored in the images folder through the following url:

```
http://localhost:3000/api/adverts/upload
```
- Every time we upload an image, through a microservice (imageConverter.js) made with cote.js and the jimp library, a thumbnail of the original image will be automatically created.

### View stored images

We will be able to access the stored images from the browser.

- Example: http://localhost:3000/images/superbike.jpg

```
http://localhost:3000/images/<sourceName>

```

## Author

👤 **Jonathan Rodríguez**

- Website: https://github.com/Jrod-DEV
- Github: [@Jrod-DEV](https://github.com/Jrod-DEV)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
