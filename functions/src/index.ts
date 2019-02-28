import * as functions from 'firebase-functions';

// const ordersService = require('./orders');
const { ordersApi, ordersOnCreate } = require('./orders');
const paymentsApi = require('./payments');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.orders = functions.https.onRequest(ordersApi);
exports.ordersOnCreate = ordersOnCreate;

exports.payments = functions.https.onRequest(paymentsApi);

