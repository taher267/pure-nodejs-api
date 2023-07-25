const { createServer } = require("http");
const PORT = 4001;
const urls = ["/", "/:id", "/new", "/:id/:something", "/post/:id/:author"];

const routes = {
    "/": {
        GET: (req, res) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(
                JSON.stringify({
                    message: "Bismillah!",
                })
            );
            req.statusCode = 200;
            res.end();
        },
    },
    "/:id": {
        GET: (req, res) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(
                JSON.stringify({
                    message: ":id!",
                })
            );
            req.statusCode = 200;
            res.end();
        },
    },
    "/:id/:something": {
        GET: (req, res) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(
                JSON.stringify({
                    message: "/:id/:something!",
                })
            );
            req.statusCode = 200;
            res.end();
        },
    },

    "/post/:id/:author": {
        GET: (req, res) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(
                JSON.stringify({
                    message: "/post/:id/:author",
                })
            );
            req.statusCode = 200;
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
// console.log('/new')

const urlAndParams = (data) =>
    data.split("/").reduce(
        (a, c) => {
            if (c.includes(":")) {
                a.params.push(c);
            } else {
                a.url += a.url.endsWith("/") ? c : `/${c}`;
            }
            return a;
        },
        { url: "", params: [] }
    );

function urlMatching(allUrls, url) {
    // singleUrl = urlAndParams(singleUrl[0]);
    // console.log(singleUrl)
    let matchedUrl = null;
    const index = urls.indexOf(url);
    // console.log(index, "index", url);
    if (index !== -1) {
        matchedUrl = urls[index];
    } else {
        for (const UL of allUrls) {
            if (UL.includes(":")) {
                const separate = urlAndParams(UL);
                const params = url.replace(separate.url, "").split("/");
                if (
                    url.startsWith(separate.url) &&
                    separate.params.length === params.filter((item) => item).length
                ) {
                    matchedUrl = UL;
                    break;
                }
            }
        }
    }
    return matchedUrl;
}
const server = createServer((req, res) => {
    let { url, method } = req;
    url = url.split("?");
    const [_, ...query] = url;
    url = url[0];
    console.log(url, method, query.join("?"));
    const existRoute = routes[url];
    const existMehord = existRoute?.[method];
    if (existRoute && existMehord) {
        existMehord(req, res);
    } else {
        const matchRoute = urlMatching(urls, url);
        console.log(matchRoute, "matchRoute");
        if (matchRoute) {
            const existMehord2 = routes[matchRoute][method];
            if (existMehord2) existMehord2(req, res);
            else routes.default(req, res);
        } else routes.default(req, res);
    }

    // existRoute ? existRoute?.(req, res) : routes.default(req, res);
});
server.listen(PORT, (_) =>
    console.log(`ServeR ListeninG on: http://localhost:${PORT}`)
);

// fetch("http://localhost:4001/new", {
//     method: "POST",
//     body: JSON.stringify({ name: "Abu Taher" }),
// })
//     .then((d) => d.json())
//     .then(console.log)
//     .catch(console.error);

// let URL = `post/single/:id/:user`;
// const urlAndParams = URL.split("/").reduce(
//   (a, c) => {
//     if (c.includes(":")) {
//       a.params += `/${c}`;
//     } else {
//       a.url += `/${c}`;
//     }
//     return a;
//   },
//   { url: "", params: "" }
// );
// if(){

// }
