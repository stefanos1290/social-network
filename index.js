const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const compression = require("compression");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const db = require("./utils/db");
const { hash, compare } = require("./utils/bc");
// const secretCookieSession = require("./secrets.json");

app.use(bodyParser());
app.use(compression());
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(csurf());
app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV !== "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await hash(`${req.body.password}`);
        req.body.password = hashedPassword;
        const userInput = req.body;
        const { rows } = await db.registerUser(userInput);
        req.session.userId = rows[0].id;
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});
app.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    db.getUserInfo(email)
        .then(results => {
            let hashedPassword = results.rows[0].password;
            let userId = results.rows[0].id;
            compare(password, hashedPassword)
                .then(match => {
                    if (match) {
                        console.log(match);
                        req.session.user = userId;
                        res.json({ success: true });
                    }
                })
                .catch(error => console.log("catch 1", error));
        })
        .catch(error => {
            console.log("catch 2", error);
            res.json({
                error: "incorrect password and/or email"
            });
        });
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
