import { Request, Response, NextFunction } from 'express';

// ORDERS API
const APIClient = (db: any, model: any) => { 
	return {

		// Create API
		// creates order with created state
		create() {
			return async (req: Request, res: Response, next: NextFunction) => {

				const value = {
					user: '123',
					state: model.states.created
				};

				return db
					.create(value)
					.then((detail: string) => {
	          return res.status(200).json(detail);
	        })
	        .catch(next);
			}
		},

		// Read API
		// Returns value of database ref
		read() {
			return async (req: Request, res: Response, next: NextFunction) => {

				const { id } = req.params;

				return db
					.read(id)
					.then((detail: any) => {
	          return res.status(200).json(detail);
	        })
	        .catch(next);
			}
		},

		// Cancel API
		// updates order value to cancelled
		cancel() {
			return async (req: Request, res: Response, next: NextFunction) => {

				const { id } = req.params;
				const state = model.states.cancelled;

				return db
					.update(id, state)
					.then((detail: string) => {
	          return res.status(200).json(detail);
	        })
	        .catch(next);
			}
		},

		// not an endpoint because the update for this project is never hit directly
		// only effected by response from payments
		update(id: string, state: string) {
			return db
				.update(id, state)
				.then((detail: string) => {
          return detail;
        })
		},
	}
};

export default APIClient;