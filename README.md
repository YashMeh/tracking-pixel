### tracking-pixel
This project creates a tracking pixel that you can use to track the open rates and open occurrences , it contains 2 endpoints.

| Method   |      Endpoint      |  Description |
|----------|:-------------:|---------------------------------------------:|
| POST     |  /url         | Generates a new tracking pixel |
| GET      |  /api/track/:campaign/:id   |   Returns the tracking pixel |

#### How to setup
1. Populate the entries for .env.sample file in your .env file.
2. Run the SQL commands given in commands.sql for your postgres database.

#### FYI
The 2 tables containing the data -
1. click_through => Contains details how many times the pixel was opened.
2. click_time => Contains details when the pixel was opened.

#### How to run
For installing dependencies :
```
npm install
```
For development :
```
npm run dev
```
For running :
```
npm run start
```
