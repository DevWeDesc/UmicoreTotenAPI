import Fastify from "fastify";
import { docRoutes } from "./routes/docRoutes";

const app = Fastify();

app.register(docRoutes);

app
  .listen({ port: 3333 })
  .then(() => console.log("Server is Running port:3333 🚀"));
