const connect = require('connect');
const url = require('url');

const app = connect();

app.use('/lab2', (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const { method, x, y } = queryObject;

    const numX = parseFloat(x);
    const numY = parseFloat(y);

    let result;
    let operation;

    if (!method || isNaN(numX) || isNaN(numY)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid or missing parameters' }));
        return;
    }

    if (method === 'add') {
        result = numX + numY;
        operation = 'add';
    } else if (method === 'subtract') {
        result = numX - numY;
        operation = 'subtract';
    } else if (method === 'multiply') {
        result = numX * numY;
        operation = 'multiply';
    } else if (method === 'divide') {
        if (numY === 0) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Division by zero is not allowed' }));
            return;
        }
        result = numX / numY;
        operation = 'divide';
    } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid method parameter' }));
        return;
    }

    const response = {
        x: x,
        y: y,
        operation: operation,
        result: result.toString()
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/lab2`);
});
