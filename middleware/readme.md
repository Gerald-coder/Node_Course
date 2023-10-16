# An express application is a series of middle ware calls

Middlewares are functions that have access to the req and res object, and the next middleware of the application's req and res lifecycle

# middlewares can

1. execute any code
2. make changes to the req and res object
3. end the req and res lifecycle
4. call the next middleware function in the stac

N/B if the current middleware does not end the req and res lifecycle, it passes the control to the next middleware function, else the request will be left hanging

# there are different types of middlewares in express applications

1. Application level middleware
2. routing level middleware
3. error handling middleware
4. third-party middleware
5. built-in middlewares
