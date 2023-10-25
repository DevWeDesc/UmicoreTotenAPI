import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function docRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    return "kcbwjkcbewikc";
  });
}
