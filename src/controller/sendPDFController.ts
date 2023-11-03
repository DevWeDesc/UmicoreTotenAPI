import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import fs from 'fs'
import { PrismaClient } from "@prisma/client";
import { sendPDFServices } from "../services/sendPDFService";
const prisma = new PrismaClient();

export const sendPDFController = {

  dowloadFile: async (request: FastifyRequest<{ Params: { fileId: string }}>, reply: FastifyReply) => {
    const {fileId} = request.params 
    const filePath = path.join(__dirname, '..', '..', 'pdfs', `${fileId}.pdf`)
    try {
      // Verificar se o arquivo PDF existe
      if (!fs.existsSync(filePath)) {
        reply.code(404).send('Arquivo não encontrado');
        return;
      }
      // Definir o tipo de conteúdo como application/pdf
      reply.type('application/pdf');

      // Ler o arquivo PDF usando fs.createReadStream() 
      reply.header('Content-Disposition', `attachment; filename="${fileId}.pdf"`);
      const stream = fs.readFileSync(filePath);
      console.log(stream)
      reply.send(stream);
    } catch (error) {
        reply.send(error)
        console.log(filePath)
    }
  },

  // createPdfFiles: async (request: FastifyRequest<{ Params: { lead: string } }>, reply: FastifyReply) => {
  //   try {
  //     const { lead } = request.params;
  //     console.log(typeof lead)
  //     const pdfFiles = request.files();
  //     const pdfPaths = await sendPDFServices.streamPdfs(pdfFiles);
  
  //     if (!pdfPaths) {
  //       return;
  //     }

  //     await prisma.reportsDocuments.create({
  //       data: {
  //         documentsPath: pdfPaths,
  //         lead: lead,
  //       },
  //     });
  
  //     reply.send("PDF CADASTRADO COM SUCESSO!").status(200);
  //   } catch (error) {
  //     console.log(error);
  //     reply.send({ message: error }).status(404);
  //   }
  // },
  createPdfFiles: async (request: FastifyRequest<{ Params: { lead: string } }>, reply: FastifyReply) => {
    try {
      const { lead } = request.params;
      const pdfFiles = request.files();
      const pdfPaths = await sendPDFServices.streamPdfs(pdfFiles);
      
      if (!pdfPaths) {
        return;
      }

      const fileId = pdfPaths[0]; // Supondo que há apenas um arquivo

      // Fornecer um link para a visualização deste PDF
      reply.send(`PDF CADASTRADO COM SUCESSO! Visualize em /view/${fileId}`).status(200);
    } catch (error) {
      console.log(error);
      reply.send({ message: error }).status(404);
    }
},

}