var express = require('express');
var router = express.Router();

const Mongo = require("./common/mongoClient");

const dbClient = new Mongo("mongodb://localhost:27017", "test");

router.post('/db', (req, res) => {
    dbClient.setDB(req.body.db);
    res.sendStatus(200);
})

router.post('/read', async (req, res) => {
    try {
        const filter = !req.body.filter ? {} : JSON.parse(req.body.filter);
        const result = await dbClient.findDocument(req.body.collection, filter);
        res.send(result);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/write', async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        const result = await dbClient.insertDocument(req.body.collection, data);
        res.send(result);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/update', async (req, res) => {
    try {
        if (!req.body.filter) throw ("Filter cant be empty!");
        const update = !req.body.update ? {} : JSON.parse(req.body.update);
        const filter = JSON.parse(req.body.filter);
        const result = await dbClient.updateDocument(req.body.collection, filter, update);
        res.send(result);
    } catch (err) {
        if(err) res.status(500).send(err);
        else res.sendStatus(500);
    }
});

router.post('/delete', async (req, res) => {
    try {
        if (!req.body.filter) throw ("Filter cant be empty!");
        const filter = JSON.parse(req.body.filter);
        const result = await dbClient.deleteDocument(req.body.collection, filter);
        res.send(result);
    } catch (err) {
        if(err) res.status(500).send(err);
        else res.sendStatus(500);
    }
});

module.exports = router;