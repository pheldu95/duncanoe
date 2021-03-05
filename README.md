# Duncanoe
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

I created Duncanoe to help beginners plan a trip to the Boundary Waters. I found that the first time I planned a trip, it was hard to keep track of all the information I needed to remember. To make matters worse, my friends and I just used a google doc to keep track of everything. The google doc became very unorganized and hard to read through. Duncanoe will help the user plan their trip in an organized fashion, as well as answer some basic questions for the user. For example, the app will estimate how far the user's group can paddle in a day, as well as what items the user will need to bring.
## Download (Don't Clone) This Repository

* Don't Fork or Clone. Instead, click the `Clone or Download` button and select `Download Zip`.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and tables

Create a new database called `prime_app`.
See the database.sql file for all the queries needed to setup the database.


## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

