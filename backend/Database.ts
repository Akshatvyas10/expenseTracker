import * as sql from 'mysql2';

const connection =sql.createConnection({
    host:'localhost',
    user:'root',
    password:'Anand@123',
    database:'ExpenseTracker'
});
export default connection;  