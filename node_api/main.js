import http from "http";

// .env variables
const SERVER_PORT = process.env.SERVER_PORT;
const SECRET_MESSAGE = process.env.SECRET_MESSAGE;
const USERNAME = process.env.SECRET_USER;
const PASSWORD = process.env.SECRET;

// Middleware section
const logMiddleware = (req, res, next) => {
    const remoteIP = req.socket.remoteAddress || req.headers["x-forwarded-for"]?.split(',').shift(); // either we get IP of local device directly (1st option) or
    // from header if server are behind proxy
    const remotePort = req.socket.remotePort || req.headers["x-forwarded-port"]?.split(',').shift(); // either we get Port of local device directly (1st option) or
    // from header if server are behind proxy
    const remoteMethod = req.method;
    res.on("finish", function() {
        console.log(`${remoteMethod} to ${server.address().address}${req.url} | From ${remoteIP} : ${remotePort} | Status: ${res.statusCode}`);
        if (req.url === "/secret" && res.statusCode === 200) {
            console.log(`(${remoteIP} : ${remotePort}) ${server.address().address}${req.url} successful authentication!`);
        };
    });
    next();
};

const plainHTMLMiddleware = (req, res, next) => {
    res.setHeader("Content-Type", "text/html")
    next();
};

// Handler section
const authenticationHandler = (req, res) => {
    res.setHeader("WWW-Authenticate", "Basic realm=\"Auth demension\"");
    res.statusCode = 401;
    const clientAuthResponse = req.headers["authorization"];
    if (clientAuthResponse) {
         const base64Credentials = clientAuthResponse.split(" ")[1];
         const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
         const authUsername = credentials.split(":")[0];
         const authPassword = credentials.split(":")[1];
    
         if (USERNAME === authUsername && PASSWORD === authPassword) {
             res.statusCode = 200;
             res.write(SECRET_MESSAGE);
             res.end();
         } else {
            res.statusCode = 401;
            responseHandler(req, res);
         }
    };
    res.end();
};

const responseHandler = (req, res) => {
    if (res.statusCode === 200) {
        res.write(`If you seeing this, that means you are sent ${req.method} to root (/) path of web-api. Good job!`);
        res.end();
    } else if (res.statusCode === 405) {
        res.write(`Error ${res.statusCode}.<br/>`);
        res.write(`If you seeing this, that means you are sent ${req.method} to root (/) path of web-api. Try to use different method.`);
        res.end();
    } else if (res.statusCode === 404) {
        res.write(`Error ${res.statusCode}.<br/>`);
        res.write(`Wrong place. There is nothing here.`);
        res.end();
    } else if (res.statusCode === 401) {
        res.write("Error 401.<br/>");
        res.write("Authentication failed. Wrong credentials.");
        res.end();
    }
};


const server = http.createServer((req, res) => {
    logMiddleware(req, res, () => {
        plainHTMLMiddleware(req, res, () => {
            if (req.url === "/" && req.method === "GET") { // unauthorized part
                 res.statusCode = 200;
                 responseHandler(req, res);
            } else if (req.url === "/" && req.method !== "GET") {
                 res.statusCode = 405;
                 responseHandler(req, res);
            } else if (req.url === "/secret" && req.method === "GET") {
                authenticationHandler(req, res);
            } else {
                res.statusCode = 404;
                responseHandler(req, res);
            }
        });
    });
});

server.listen(SERVER_PORT, () => {
    console.log(`Server Running on port ${SERVER_PORT}`);
});
