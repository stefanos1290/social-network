const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const compression = require("compression");
const bodyParser = require("body-parser");
const csurf = require("csurf");
var multer = require("multer");
const db = require("./utils/db");
const { hash, compare } = require("./utils/bc");
// const secretCookieSession = require("./secrets.json")

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

app.use(express.static("./public"));

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

app.get("/user.json/:id", function(req, res) {
    db.getUserData(req.params.id)
        .then(({ rows }) => {
            rows[0].meId = req.session.userId;
            res.json(rows[0]);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/getuserdata", (req, res) => {
    const userId = req.session.userId;
    db.getUserData(userId).then(function(data) {
        res.status(200).send(data.rows[0]);
    });
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
                        req.session.userId = userId;
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
var upload = multer({ storage: storage }).single("file");

app.post("/upload", function(req, res) {
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }
        const userId = req.session.userId;
        const file = req.file.filename;
        db.uploadImageToUser(file, userId)
            .then(function() {
                return res.status(200).send(req.file);
            })
            .catch(function() {
                return res.statusCode(501);
            });
    });
});

app.post("/users", (req, res) => {
    const { value } = req.body;
    db.getMatchingActors(value).then(function(data) {
        return res.status(200).json(data.rows);
    });
});

app.post("/bio", (req, res) => {
    db.updateBio(req.body.bio, req.session.userId)
        .then(() => {
            res.json({});
        })
        .catch(err => {
            console.log(err);
            res.json({ err });
        });
});
app.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.post("/friendshipstatus/:id", (req, res) => {
    const { currentId } = req.body;
    const { otherId } = req.body;
    db.getFriendships();
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
