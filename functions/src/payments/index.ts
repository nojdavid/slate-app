import * as express from 'express';
import Orders from '../orders/models';

const paymentsApi = express().disable('x-powered-by');

// Payments API
// Psuedo process the orders request
// Return: random state of confirmed or cancelled
paymentsApi.post('/:id', async (req, res, next) => {

	if (!req.body) {
		res.status(400).json({message: 'Bad Request'});
	}

	const { order, client_secret } = req.body;

	if (client_secret !== order.user) {
		res.status(400).json({message: 'Not authenticated request'});
	}

	const random = Math.floor(Math.random() * Math.floor(2));
	const status = random === 0 ? Orders.states.cancelled : Orders.states.confirmed;

	return res.status(200).json({state: status});
});

module.exports = paymentsApi;