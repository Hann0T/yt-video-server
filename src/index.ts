import { Router } from './router'
import { registerRoutes } from './routes'

const router: Router = Router.getInstance()

registerRoutes(router)

const server = Bun.serve({
    port: 3000,
    async fetch(req) {
        return await router.handleRequest(req)
    },
})

console.log(`Listening on http://localhost:${server.port} ...`)
