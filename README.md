[![Build Status](https://travis-ci.org/fabiosv/DeX-Burguers-backend.svg?branch=master&service=github)](https://travis-ci.org/fabiosv/DeX-Burguers-backend)
[![Coverage Status](https://coveralls.io/repos/github/fabiosv/DeX-Burguers-backend/badge.svg?branch=master&service=github)](https://coveralls.io/github/fabiosv/DeX-Burguers-backend?branch=master&service=github)
[![Website](https://img.shields.io/website/https/dex-burgers-backend.herokuapp.com)](https://dex-burgers-backend.herokuapp.com)
<br />


# DeX-Burguers-backend
Burgers E-COMERce

### `npm start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test` or `yarn test`

Launches the test runner in the interactive watch mode.<br>
And show coverage report<br>

### `npm coverage` or `yarn coverage`

Send coverage report to Coveralls plataform. You need to run tests before send.<br>

## Project Structure
```bash
├── .coveralls.yml # Configuration Tests Coverage
├── .travis.yml # Configuration Automated Tests for CI
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── README.md - This file.
├── server.js # initial file, load all contents and start server
├── api # Route layer
│   ├── v1.0     # '/v1.0' route
│   │   ├── burgers.js     # GET/POST/PUT/DELETE of burgers menu + image upload
│   │   ├── calculate.js   # POST/ - Given a burger, calculate and return its burger
│   │   ├── index.js       # append all contents in this folder to the '/v1.0' route
│   │   └── ingredients.js # GET/POST/PUT/DELETE of ingredients list
│   └── index.js # consist the root "/" of application. Here are imported children routes as '/v1.0'
├── controllers # Logic layer
│   └── v1.0 # Logic related to v1.0 APIs
│       ├── burgers_controller.js     # Error Handling + basic CRUD checking ingredients dependence
│       ├── calculate_controller.js   # Error Handling + original price and promotional price calculation
│       ├── ingredients_controller.js # Error Handling + basic CRUD for ingredients
│       └── upload_controller.js      # Upload images to "public/images"
├── data # Model layer
│   └── preData.js # Basic information, contains all ingredients, promotions and burgers
├── helpers
│   ├── validation_methods.js # shortcut methods for API test
│   └── welcome_api.js # Public Welcome page, routed in "/"
├── public
│   └── images # Uploaded images will be saved here
│       ├── x-bacon.png
│       ├── x-burger.png
│       ├── x-egg-bacon.png
│       └── x-egg.png
├── server # server layer
│   ├── config.js # configuration to start server
│   └── secured.js # API authorization config
└── tests
    ├── api_burgers.js # tests for API v1.0 burgers
    ├── api_calculate.js # tests for API v1.0 calculate
    ├── api_ingredients.js # tests for API v1.0 ingredients
    └── authorization.js # tests for API authorization "public/private"
```


[![](https://sourcerer.io/fame/fabiosv/fabiosv/DeX-Burguers-backend/images/0)](https://sourcerer.io/fame/fabiosv/fabiosv/DeX-Burguers-backend/links/0)[![](https://sourcerer.io/fame/fabiosv/fabiosv/DeX-Burguers-backend/images/1)](https://sourcerer.io/fame/fabiosv/fabiosv/DeX-Burguers-backend/links/1)[![](https://sourcerer.io/fame/fabiosv/fabiosv/DeX-Burguers-backend/images/2)](https://sourcerer.io/fame/fabiosv/fabiosv/DeX-Burguers-backend/links/2)[![](https://sourcerer.io/fame/fabiosv/fabiosv/DeX-Burguers-backend/images/3)](https://sourcerer.io/fame/fabiosv/fabiosv/DeX-Burguers-backend/links/3)[![](https://sourcerer.io/fame/fabiosv/fabiosv/DeX-Burguers-backend/images/4)](https://sourcerer.io/fame/fabiosv/fabiosv/DeX-Burguers-backend/links/4)[![](https://sourcerer.io/fame/fabiosv/fabiosv/DeX-Burguers-backend/images/5)](https://sourcerer.io/fame/fabiosv/fabiosv/DeX-Burguers-backend/links/5)[![](https://sourcerer.io/fame/fabiosv/fabiosv/DeX-Burguers-backend/images/6)](https://sourcerer.io/fame/fabiosv/fabiosv/DeX-Burguers-backend/links/6)[![](https://sourcerer.io/fame/fabiosv/fabiosv/DeX-Burguers-backend/images/7)](https://sourcerer.io/fame/fabiosv/fabiosv/DeX-Burguers-backend/links/7)
