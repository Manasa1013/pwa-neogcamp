"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const webpush = require("web-push");
const { initWebPush } = require("../config/webpush");
const app = express();
const port = 8080; // default port to listen
const STORAGE = {
    SUBSCRIPTION: [],
};
// Serve all files in client
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use("/subscribe", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscription = req.body;
        console.log(subscription);
        STORAGE.SUBSCRIPTION.push(subscription);
        res.status(201).json({
            ok: "true"
        });
    }
    catch (err) {
        console.error(err, "Err at app.js");
        next(err);
    }
}));
app.use('/broadcast', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = { title: 'Hey, there is a exiciting offer for you', body: '🌇😃🍈😆🍜🍻😋⛅⛳😚' };
        const subscriptions = STORAGE.SUBSCRIPTION;
        const notifications = [];
        subscriptions.forEach((subscription) => {
            notifications.push(webpush.sendNotification(subscription, JSON.stringify(notification)));
        });
        yield Promise.all(notifications);
        res.sendStatus(200);
    }
    catch (e) {
        next(e);
    }
}));
initWebPush();
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map