import express from 'express';
import homeController from '../controllers/homeController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/news', (req, res) => {
        return res.send('New Pages')
    });


    return app.use("/", router);
}

module.exports = initWebRoutes;