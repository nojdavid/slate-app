#Slate App

##Api

- POST https://us-central1-slate-app-37826.cloudfunctions.net/orders/ 
		- creates order and runs it through payements

- GET https://us-central1-slate-app-37826.cloudfunctions.net/orders/<orderId>/
		- returns order object from DB

- GET https://us-central1-slate-app-37826.cloudfunctions.net/orders/<orderId>/cancel/
		- cancels order