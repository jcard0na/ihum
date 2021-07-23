
const app = require("./server.js");

const port = process.env.HTTP_PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
