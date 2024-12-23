interface Route {
    uri: string,
    callback: (req: Request) => Promise<Response>,
    method: string
}

export class Router {
    private routes: Array<Route> = []
    private static instance: Router

    public static getInstance(): Router {
        if (!Router.instance) {
            Router.instance = new Router()
        }

        return Router.instance
    }

    public async handleRequest(req: Request): Promise<Response> {
        const url = new URL(req.url)
        const method = req.method
        const path = url.pathname
        const route: Route | undefined = this.routes.find((route) => {
            return route.uri === path && route.method === method
        })

        if (!route) {
            return new Response("Not found", { status: 404 })
        }

        let response = await route.callback(req)
        if (response instanceof Response) {
            return response
        }

        return new Response(response)
    }

    private createRoute(uri: string, callback: (req: Request) => Promise<Response>, method: string): Route {
        return { uri, callback, method }
    }

    public get(uri: string, callback: (req: Request) => Promise<Response>) {
        this.routes.push(this.createRoute(uri, callback, 'GET'))
    }

    public post(uri: string, callback: (req: Request) => Promise<Response>) {
        this.routes.push(this.createRoute(uri, callback, 'POST'))
    }

    public put(uri: string, callback: (req: Request) => Promise<Response>) {
        this.routes.push(this.createRoute(uri, callback, 'PUT'))
    }

    public delete(uri: string, callback: (req: Request) => Promise<Response>) {
        this.routes.push(this.createRoute(uri, callback, 'DELETE'))
    }
}
