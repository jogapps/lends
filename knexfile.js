require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        },
        migrations: {
            directory: __dirname + '/src/api/migrations',
        },
        seeds: {
            directory: __dirname + '/src/api/production',
        },
    },
    test: {
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL_TEST,
            ssl: { rejectUnauthorized: false },
        },
        migrations: {
            directory: __dirname + '/src/api/migrations',
        },
        seeds: {
            directory: __dirname + '/src/api/production',
        },
    },
    production: {
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        },
        migrations: {
            directory: __dirname + '/src/api/migrations',
        },
        seeds: {
            directory: __dirname + '/src/api/seeds',
        },
    },
};
