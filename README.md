## About Lends Project

## Stacks
 - Language/Framework: Javascript(Nodejs)
 - Database: postgres
 - ORM: Knex
 - Host: Heroku
 - Test: Mocha and chai
 
# How to run this application

- Clone Project and run
    ```
    yarn install
    ```
Then depending on the environment you want to run on use following commands

 - Development 
    ```
    yarn dev
    ```
 - Production 
    ```
    yarn start
    ```
 - Test 
    ```
    yarn test
    ```

# Base Url
```
Base url: https://lendsqr-gp.herokuapp.com/api/v1
```

# Routes

 - Register
    ```
    /user/register
    {email: "name@email.com", password: "password"}
    ```
 - Login
    ```
    /user/login
    {email: "name@email.com", password: "password"}
    ```
 - Register
    ```
    /user/register
    {email: "name@email.com", password: "password"}
    ```
 - Fund Wallet (Token Restricted)
    ```
    /wallet/fund
    {amount: 100, id: "user_id"} (User Id is optional, however in that case the id is gotten from the token)
    ```
 - Wallet Funds Withdrawal (Token Restricted)
    ```
    /wallet/withdraw
    {amount: 100, id: "user_id"} (User Id is optional, however in that case the id is gotten from the token)
    ```
 - Fund another users Wallet (Token Restricted)
    ```
    /wallet/fund/user
    {amount: 100, id: "user_id", receiver_email: "receiver_email@email.com"} (User Id is optional, however in that case the id is gotten from the token)
    ```

