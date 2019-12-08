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
        "select firstname, lastname, email, image, bio, id from users where users.id = ($1)",
        [id]
    );
};

module.exports.getMatchingActors = function(val) {
    return db.query(
        `SELECT firstname, id, lastname, image, bio FROM users WHERE firstname ILIKE $1;`,
        [val + "%"]
    );
};

module.exports.getFriendships = function(receiverId, senderId) {
    return db.query(
        `SELECT * FROM friendships 
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)`,
        [receiverId, senderId]
    );
};

module.exports.sendFriendshipRequest = function sendFriendshipRequest(
    receiverId,
    senderId
) {
    return db.query(
        `INSERT INTO friendships (receiver_id, sender_id)
    VALUES ($1, $2);`,
        [receiverId, senderId]
    );
};

module.exports.endFriendshipRequest = function endFriendshipRequest(
    receiver_id,
    sender_id
) {
    return db.query(
        `DELETE FROM friendships
    WHERE (receiver_id = $1 AND sender_id = $2)
    OR (receiver_id = $2 AND sender_id = $1)
   `,
        [receiver_id, sender_id]
    );
};

module.exports.acceptFriendshipRequest = function acceptFriendshipRequest(
    receiver_id,
    sender_id
) {
    return db.query(
        `UPDATE friendships SET accepted = true WHERE sender_id=$1 AND receiver_id=$2 RETURNING *
        `,
        [sender_id, receiver_id]
    );
};

module.exports.friendWannabes = function friendWannabes(id) {
    return db.query(
        `
    SELECT users.id, firstname, lastname, image, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND sender_id = $1 AND receiver_id = users.id)
    OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
    OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
  `,
        [id]
    );
};

module.exports.getUserInfo = function getUserInfo(email) {
    return db.query("SELECT password, id FROM users WHERE email = $1", [email]);
};
