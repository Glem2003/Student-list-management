const apiKeyMiddleware = (req, res, next) => {

    if (!process.env.API_KEY) {
        return res.status(500).send('API key not found');
    }

    const apiKey = req.header('x-api-key');

    if (apiKey && apiKey === process.env.API_KEY) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}

module.exports = apiKeyMiddleware