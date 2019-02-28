# Slate App

## Api

- POST https://us-central1-slate-app-37826.cloudfunctions.net/orders/ 
		- creates order and runs it through payements

- GET https://us-central1-slate-app-37826.cloudfunctions.net/orders/<orderId>/
		- returns order object from DB

- GET https://us-central1-slate-app-37826.cloudfunctions.net/orders/<orderId>/cancel/
		- cancels order



### Notes 

- tests have compilation error. Did not debug due to 8 hour time limit
		- the issue: Mocha cant compile es6 down to es5 so I'd need to update the babel transpiler.
