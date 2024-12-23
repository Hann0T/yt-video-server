import { Router } from './router'

export const registerRoutes = (router: Router) => {
    router.get('/', async function(req: Request) {
        return new Response("Home")
    })

    router.post('/upload/video', async function(req: Request) {
        return new Response(JSON.stringify({ result: 'ok' }), {
            status: 201,
            headers: new Headers({
                "Content-Type": "application/json",
            })
        })
    })
}
