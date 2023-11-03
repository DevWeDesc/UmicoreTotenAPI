import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import { sendPDFServices } from "../services/sendPDFService";
const prisma = new PrismaClient();

export const sendPDFController = {
  createCategory: async (
    request: FastifyRequest<{ Body: { name: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { name } = request.body;
      const { id } = await prisma.category.create({
        data: {
          name,
        },
      });
      reply.send(id).status(201);
    } catch (error) {
      console.log(error);
      reply.send({ message: error }).status(404);
    }
  },

  createCard: async (
    request: FastifyRequest<{
      Body: { name: string; categoryId: number; units: string[] };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { name, categoryId, units } = request.body;
      const { id } = await prisma.cards.create({
        data: {
          name,
          categoryId,
          units,
        },
      });
      reply.send(id).status(201);
    } catch (error) {
      console.log(error);
      reply.send({ message: error }).status(404);
    }
  },

  createPdfFiles: async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) => {
    try {
      const { id } = request.params;
      const pdfFiles = request.files();
      const pdfPaths = await sendPDFServices.streamPdfs(pdfFiles);

      if (!pdfPaths) {
        return;
      }

      await prisma.cardDocuments.create({
        data: {
          documentsPath: pdfPaths,
          cardId: Number(id),
        },
      });
      reply.send(pdfPaths).status(201);
      // reply.send("PDF CADASTRADO COM SUCESSO!", ).status(200);
    } catch (error) {
      console.log(error);
      reply.send({ message: error }).status(404);
    }
  },

  dowloadFile: async (
    request: FastifyRequest<{ Params: { fileId: string } }>,
    reply: FastifyReply
  ) => {
    const { fileId } = request.params;
    const filePath = path.join(__dirname, "..", "..", "pdfs", `${fileId}.pdf`);
    try {
      // Verificar se o arquivo PDF existe
      if (!fs.existsSync(filePath)) {
        reply.code(404).send("Arquivo não encontrado");
        return;
      }
      // Definir o tipo de conteúdo como application/pdf
      reply.type("application/pdf");

      // Ler o arquivo PDF usando fs.createReadStream()
      reply.header(
        "Content-Disposition",
        `attachment; filename="${fileId}.pdf"`
      );
      const stream = fs.readFileSync(filePath);
      reply.send(stream);
    } catch (error) {
      reply.send(error);
      console.log(filePath);
    }
  },

  getCategories: async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const categories = await prisma.category.findMany();
      reply.send(categories).status(200);
    } catch (error) {
      reply.send({ message: error }).status(404);
    }
  },

  getCards: async (
    request: FastifyRequest<{ Params: { categoryId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { categoryId } = request.params;
      const categories = await prisma.cards.findMany({
        where: {
          categoryId: Number(categoryId),
        },
        include: {
          cardDocument: true,
        },
      });

      const data = categories.map((category) => {

        let documentsPath: string[] = [];

        category.cardDocument.forEach((doc) => {
          documentsPath = documentsPath.concat(doc.documentsPath);
        })

        const dto = {
          id: category.id,
          name: category.name,
          units: category.units,
          documentsPath: documentsPath,
        };
        return dto;
      });

      reply.send(data).status(200);
    } catch (error) {
      reply.send({ message: error }).status(404);
    }
  },
};