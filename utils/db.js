const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

module.exports.registerUser = function registerUser({
    firstName,
    lastName,
    email,
    password
}) {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
        [firstName, lastName, email, password]
    );
};
module.exports.getUserInfo = function getUserInfo(email) {
    return db.query("SELECT password, id FROM users WHERE email = $1", [email]);
};
