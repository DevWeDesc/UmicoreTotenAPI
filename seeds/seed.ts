import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categoryDataArray = [
  {
    name: "Política de QEHS e Manual de Qualidade",
  },
  {
    name: "Mapa de Processo e SWOT",
  },
  {
    name: "Processos e Procedimentos",
  },
  {
    name: "Indicadores de Qualidade",
  },
  {
    name: "Indicadores de Segurança",
  },
  {
    name: "Auditorias de QEHS",
  },
  {
    name: "5S",
  },
  {
    name: "Código de Segurança",
  },
  {
    name: "ARPOS/ AAIA",
  },
  {
    name: "FISPQ",
  },
  {
    name: "Dicas de QEHS",
  },
];

const cardsDataArray = [
  {
    name: "Política de QEHS",
    categoryId: 1,
    units: ["gru", "rec"],
  },
  {
    name: "Manual do Sistema Gestão da Qualidade",
    categoryId: 1,
    units: ["gru", "rec"],
  },
  {
    name: "Mapa de Processo - MAP - PMC - 007",
    categoryId: 2,
    units: ["gru", "rec"],
  },
  {
    name: "Mapa de Processo - MAP - CORP - 002",
    categoryId: 2,
    units: ["gru", "rec"],
  },
  {
    name: "Mapa de Processo - MAP - PMC - 004",
    categoryId: 2,
    units: ["gru", "rec"],
  },
  {
    name: "Planilha de Abordagem de Riscos e Oportunidades",
    categoryId: 2,
    units: ["gru", "rec"],
  },

  {
    name: "SWOT Produção rev 5",
    categoryId: 2,
    units: ["gru", "rec"],
  },
  {
    name: "SWOT Gestão da Qualidade rev04",
    categoryId: 2,
    units: ["gru", "rec"],
  },
];
async function seed() {
  try {
    const categories = await prisma.category.createMany({
      data: categoryDataArray,
    });

    const cards = await prisma.cards.createMany({
      data: cardsDataArray,
    });

    console.log("Categorias e cards criados.", categories, cards);
  } catch (error) {
    console.error("Error ao adicionar seed e cards:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .then(() => {
    console.log("Seeding completo");
  })
  .catch((error) => {
    console.error("Seeding falhou", error);
  });
