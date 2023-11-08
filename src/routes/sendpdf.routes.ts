import { FastifyInstance } from 'fastify'
import { sendPDFController } from '../controller/sendPDFController'
import multipart from '@fastify/multipart'

export async function sendPDFRoutes(app:FastifyInstance) {
    app.register(multipart, { limits: { fileSize: 35 * 1024 * 1024 }})
    app.post("/sendpdf/:id", sendPDFController.createPdfFiles)
    app.post("/newcategory", sendPDFController.createCategory)
    app.post("/newcard", sendPDFController.createCard)
    app.get("/readerpdf/:fileId", sendPDFController.dowloadFile)
    app.get("/getcategories", sendPDFController.getCategories)
    app.get("/getcards/:categoryId", sendPDFController.getCards)
    app.get("/units", sendPDFController.getUnits)
}   
