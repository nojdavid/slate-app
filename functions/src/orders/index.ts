import * as functions from 'firebase-functions';
import * as express from 'express';
import DatabaseClient from '../common/database';
import APIClient from '../common/api';
import Orders from './models';
import axios from 'axios';

const db = DatabaseClient(Orders);
const api = APIClient(db, Orders);

const paymentsUrl = 'https://us-central1-slate-app-37826.cloudfunctions.net/payments/';

const ordersApi = express().disable('x-powered-by');

/**
 * CRUD routes
 */
ordersApi.post('/', api.create());
ordersApi.get('/:id/', api.read());
ordersApi.get('/:id/cancel/', api.cancel());

// OnCreate Order Trigger 
const onCreate = functions.database.ref(Orders.id + '/{id}')
  .onCreate((snapshot: any, context) => {
    const order = snapshot.val();
    const key = snapshot.key;

    // Call to payments api
    return axios({
	    method: 'post',
	    url: paymentsUrl + key,
	    data: {
	      client_secret: '123', 
	      order
	    }
   	})
    .then((res: any) => {
    	const { state } = res.data;
    	api.update(key, state);

    	if (state === Orders.states.confirmed) {
            // sets order to delivered in 3 seconds if state is sent back confirmed
    		setTimeout(function() { api.update(key, Orders.states.delivered) }, 3000);
    	}

    })
    .catch((err: any) => {
    	console.log('Payments error:' + err);
    })
  });

module.exports = { 
	ordersApi,
	ordersOnCreate: onCreate
};