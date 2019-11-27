const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const compression = require("compression");
const bodyParser = require("body-parser");
const csurf = require("csurf");

app.use(bodyParser());
app.use(compression());
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(csurf());

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

app.post("/register", (req, res) => {
    // TODO: Exo to allu . -Register-
    const { firstName, lastName, email, password } = req.body;
    console.log("post register");
    throw new Error("");
});
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("post login");
    throw new Error("");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
