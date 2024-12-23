interface Route {
    uri: string,
    callback: () => Response,
    method: string
}

export class Router {
    private routes: Array<Route> = [];
    private static instance: Router;

    public static getInstance(): Router {
        if (!Router.instance) {
            Router.instance = new Router();
        }

        return Router.instance;
    }

    public handleRequest(req: Request): Response {
        const url = new URL(req.url);
        const method = req.method;
        const path = url.pathname;
        const route: Route = this.routes.filter((route) => {
            return route.uri === path && route.method === method;
        })[0]

        if (!route) {
            return new Response("404!");
        }

        let response = route.callback();
        if(response instanceof Response) {
            return response;
        }

        return new Response(response);
    }

    private createRoute(uri: string, callback: () => Response, method: string): Route {
        return {
            uri: uri,
            callback: callback,
            method: method
        }
    }

    public get(uri: string, callback: () => Response) {
        this.routes.push(this.createRoute(uri, callback, 'GET'))
    }

    public post(uri: string, callback: () => Response) {
        this.routes.push(this.createRoute(uri, callback, 'POST'))
    }

    public put(uri: string, callback: () => Response) {
        this.routes.push(this.createRoute(uri, callback, 'PUT'))
    }

    public delete(uri: string, callback: () => Response) {
        this.routes.push(this.createRoute(uri, callback, 'DELETE'))
    }
}
