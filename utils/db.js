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

module.exports.uploadImageToUser = function uploadImageToUser(image, id) {
    return db.query("UPDATE users set image = ($1) WHERE id = ($2)", [
        image,
        id
    ]);
};

module.exports.updateBio = function updateBio(bio, id) {
    return db.query("UPDATE users set bio = ($1) WHERE id = ($2)", [bio, id]);
};

module.exports.getUserData = function(id) {
    return db.query(
        "select firstname, lastname, email, image, bio from users where users.id = ($1)",
        [id]
    );
};

module.exports.getUserInfo = function getUserInfo(email) {
    return db.query("SELECT password, id FROM users WHERE email = $1", [email]);
};
