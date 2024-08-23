module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './database/students.db3' 
        },
        useNullAsDefault: true
    }
};