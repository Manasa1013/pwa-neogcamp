const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const webpush = require("web-push");
const { initWebPush}= require("../config/webpush") 



// import express from 'express';
// import path from 'path';
// import bodyParser from 'body-parser';
// import webpush from "web-push";
// import initWebPush  from "../config/webpush"

export interface ISubscription extends Document {
  endpoint: string;
  expirationTime?: number;
  keys: {
    auth: string;
    p256dh: string;
  }
}

const app = express();
const port = 8080; // default port to listen

const STORAGE = {
  SUBSCRIPTION : [] as ISubscription[],
}

// Serve all files in client
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());

app.use("/subscribe", async (req : any, res : any, next : any) => {
  try {
    const subscription = req.body;
    console.log(subscription);
    STORAGE.SUBSCRIPTION.push(subscription);
    res.status(201).json({
      ok : "true"
    })
    
  } catch (err) {
    console.error(err, "Err at app.js");
    next(err);
  }
})


app.use('/broadcast', async (req : any , res : any , next : any)  => {
  try {
    const notification = { title: 'Hey, there is a exiciting offer for you', body: '🌇😃🍈😆🍜🍻😋⛅⛳😚' };

    const subscriptions = STORAGE.SUBSCRIPTION;

    const notifications: any[] = [];
    subscriptions.forEach((subscription) => {
      notifications.push(
        webpush.sendNotification(subscription, JSON.stringify(notification))
      );
    });
    await Promise.all(notifications);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

initWebPush();


// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
