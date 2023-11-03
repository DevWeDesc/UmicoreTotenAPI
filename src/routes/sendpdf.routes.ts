import { FastifyInstance } from 'fastify'
import { sendPDFController } from '../controller/sendPDFController'
import multipart from '@fastify/multipart'


export async function sendPDFRoutes(app:FastifyInstance) {
    app.register(multipart, { limits: { fileSize: 35 * 1024 * 1024 }})
    app.post("/sendpdf/:lead", sendPDFController.createPdfFiles)
}   

export async function downPDFRoutes(app:FastifyInstance) {
    app.get("/dowloadpdf/:fileId", sendPDFController.dowloadFile)
}   