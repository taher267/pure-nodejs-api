const { createServer } = require("http");
const PORT = 4001;

const routes = {
    "/": {
        GET: (req, res) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(
                JSON.stringify({
                    message: "Bismillah!",
                })
            );
            res.end();
        },
    },
    "/new": {
        POST: (req, res) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            let body = "";
            req.on("data", (chank) => {
                console.log(chank.toString());
                body = JSON.parse(chank?.toString?.());
            });

            req.on("end", () => {
                res.write(
                    JSON.stringify({
                        message: "Bismillah!, new",
                        body,
                    })
                );
                res.end();
            });
        },
    },
    default: (req, res) => {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(
            JSON.stringify({
                message: "Not Found",
            })
        );
        req.statusCode = 404;
        res.end();
    },
};
const server = createServer((req, res) => {
    const { url, method } = req;
    routes[url]?.[method]?.(req, res) || routes.default(req, res);
    // return routes[url][method](req, res);
    // if (url === "/") {

    // } else if (url === "/new") {
    // res.writeHead(200, { "Content-Type": "application/json" });
    // let body = "";
    // req.on("data", (chank) => {
    //     console.log(chank.toString());
    //     body = JSON.parse(chank?.toString?.());
    // });

    // req.on("end", () => {
    //     res.write(
    //         JSON.stringify({
    //             message: "Bismillah!, new",
    //             method,
    //             body,
    //         })
    //     );
    //     res.end();
    // });
    // } else {
    // res.writeHead(404, { "Content-Type": "application/json" });
    // res.write(
    //     JSON.stringify({
    //         message: "Bismillah!, new",
    //         method,
    //     })
    // );
    // req.statusCode = 404;
    // res.end();
    // }
});
server.listen(PORT, (_) => console.log(`ServeR ListeninG on PorT: ${PORT}`));

// fetch("http://localhost:4001/new", {
//     method: "POST",
//     body: JSON.stringify({ name: "Abu Taher" }),
// })
//     .then((d) => d.json())
//     .then(console.log)
//     .catch(console.error);
