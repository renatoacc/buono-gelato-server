## Description

Buono Gelato is of the bests ice cream shops in Portugal. 
Buono Gelato App born from the need of the owner Renato Costa for manage waiting times of clients who want products that need more time to prepare. Is a Web application that allow admin to manage their products and the user orders and allow user to see products ao do a aorder to pick up at store after being notified.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **HomePage** As an anon/user I can Signup or login
-  **Signup:** As an anon I can sign up in the platform 
-  **Login:** As an user I can login to the platform 
-  **Logout:** As an user I can logout from the platform so no one else can modify my information
-  **Profile** As an user client I can see my information and and be notified about state of my order
-  **Shop** As an user client I can see and search products and add to my favourites and to cart
-  **Cart** As an user client I can see my shopping cart and do a order
-  **Orders** As an usr admin I can see orders from users and send notifications when order is ready
-  **Products** As an user admin I can manage products
-  **Ingredients** As an user admin I can manage ingredients

## Backlog

- **Social Signup** As an user client i can signup with Social Network acccount
- **Payments** As an user client I can pay the order
- **Google location** As an user admin I can limit radius location for orders

# Client 

## Routes

ALL USERS
- / - Home
- /signup - Signup form
- /login - Login
- - 404
- USER CLIENT
- /profile - See info and notifications
- /shop - see products and add to cart and favourites 
- /product/:id - see only that product
- /favorit - see favourites
- /cart - see products added to cart
USER ADMIN
- /vieworders - see user orders
- /products - create products
- /showproducts - see products
- /products/:id - edit and delete product
- /ingredients - create ingredients
- /showingredients - see ingredients
- /ingredients/:id - edit and delete ingredient

## Components

ALL USERS
-Home
-Signup
-login
-404
USER CLIENT
-Carousel
-Cart
-LayoutComponent
-ListFavorit
-Shop
USER ADMIN
-IngredientsList
-IngredientsManage
-IngredientsUpdating
-ProductsList
-ProductsManage
-ProductsUpdating
-ViewOrders


# Server 

## Models

User model

```javascript
{
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postcode: {
      type: Number,
      required: true,
    },
    vat: {
      type: Number,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      default: "client",
    },
    cart: [],
    favourites: [],
  },
  {
    timestamps: true,
  }
```


Ingredients Model

```javascript
name: {
    type: String,
    required: true,
  },
  typeIngredient: {
    type: String,
    enum: ["Ice-cream", "Topping", "Crunchy"],
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
```

Products Model
```javascript
name: {
    type: String,
    required: true,
  },
  typeProduct: {
    type: String,
    enum: ["Crepe", "Waffle", "Bubble Waffle"],
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  extraIngredients: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredients",
  },
  productImage: {
    type: String,
  }
```
Orders Model
```javascript
 {
    clientName: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    checkout: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
```

## API Endpoints (backend routes)

- POST /login
  - body:
   - email
   - password
- POST /signup
   - body:
    - firstName
    - lastName
    - email
    - password
    - address
    - city
    - postcode
    - vat
    - phone
- POST /logout
- GET /showproducts
- POST /products
   - body:
    - name
    - typeProduct
    - price
    - description
    - extraIngredients
    - productImage 
- GET /products/:id
- PUT //products/:id
   - body:
    - name
    - typeProduct
    - price
    - description
    - extraIngredients
    - productImage 
- POST products/delete/:id
   - params:
    - id
- GET /showingredients
- GET /ingredients/:id
- POST  /ingredients
   - body:
    - name
    - typeIngredient
    - price
    - description
- PUT /ingredients/:id
   - body:
    - name
    - typeIngredient
    - price
    - description
   - params:
    -id 
- POST /ingredients/delete/:id    
    - params:
     - id
- GET /vieworders
- PUT /vieworders/:id
    - params:
     - id
- GET /admin
- GET /logged
- GET /userInfo/:id
    - params:
     - id
- GET /datauser/:id
    - params:
     - id
- POST /addCart
    - params:
     - id
    - body:
      -oneProduct
- GET /shop
- GET /product/:id  
    - params:
     - id
- GET /cart:id
    - params:
     - id
- GET /cartDeleteElement/
    - params:
     - id
- PUT /favoritAdd
    - params:
     - id
    - body:
     - data
- PUT /favoriteRemove/:id
    - params:
     - id  
- GET /listFavorit/:id
    - params:
     - id  
POST /order
    - params:
     - id
    - body:
     - data
     
     
## Links

[Link to your trello board](https://trello.com/b/iSHkcWmM/buono-gelato-app)

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/renatoacc/buono-gelato-client)

[Server repository Link](https://github.com/renatoacc/buono-gelato-server)

[Deployed App Link](https://gregarious-cactus-7671b7.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1aAfa1QgBZ0PdWDe7DuLLTD7WNETYFzrgUpN9cw0yC7U/edit?usp=sharing)
