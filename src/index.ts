import { Router } from './router'

const router: Router = Router.getInstance()

// register routes
router.get('/', function() {
    return new Response("Home")
})
router.post('/upload/video', function() {
    return new Response(JSON.stringify({ result: 'ok' }))
})

const server = Bun.serve({
    port: 3000,
    fetch(req) {
        return router.handleRequest(req)
    },
});

console.log(`Listening on http://localhost:${server.port} ...`);
