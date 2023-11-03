import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { downPDFRoutes, sendPDFRoutes } from './routes/sendpdf.routes'
import cors from '@fastify/cors'

const app = Fastify();

const allowedOrigins = [
  'http://localhost:3000'
]

app.register(cors, { origin: allowedOrigins })

app.register(sendPDFRoutes);
app.register(downPDFRoutes);

app.get('/', async (_req: FastifyRequest, reply: FastifyReply) => reply.send({ api: 'ok' }))

app.listen({ port: 3333, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Servidor iniciado porta: ${address}`)
})