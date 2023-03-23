const axios = require('axios');
const crypto = require("crypto");

const submitCard = async (req, res, next) => {

    var data = {
        'vendor': "VE017-17",
        'trans': crypto.randomUUID(),   // for now
        'cc': req.body.data.cc,
        'name': req.body.data.name,
        'exp': req.body.data.exp,
        'amount': req.body.data.amount
    };

    try {
        const response = await axios.post('http://blitz.cs.niu.edu/creditcard', data);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

module.exports = {
    submitCard
}