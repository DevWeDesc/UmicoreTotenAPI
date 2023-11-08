import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const unitsDataArray = [
  {
    name: "Americana",
    acronym: 'amr'
  },
  {
    name: "Guarulhos",
    acronym: 'gru',
  },
  {
    name: "Joinville",
    acronym: 'jvl',
  },
  {
    name: "Manaus",
    acronym: 'mns',
  },
];

const categoryDataArray = [
  {
    name: "Política de QEHS e Manual de Qualidade",
    unit: "Americana",
  },
  {
    name: "Mapa de Processo e SWOT",
    unit: "Guarulhos",
  },
  {
    name: "Processos e Procedimentos",
    unit: "Joinville",
  },
  {
    name: "Indicadores de Qualidade",
    unit: "Manaus",
  },
  {
    name: "Indicadores de Segurança",
    unit: "Americana",
  },
  {
    name: "Auditorias de QEHS",
    unit: "Manaus",
  },
  {
    name: "5S",
    unit: "Americana",
  },
  {
    name: "Código de Segurança",
    unit: "Americana",
  },
  {
    name: "ARPOS/ AAIA",
    unit: "Guarulhos",
  },
  {
    name: "FISPQ",
    unit: "Americana",
  },
  {
    name: "Dicas de QEHS",
    unit: "Joinville",
  },
];

const cardsDataArray = [
  {
    name: "Política de QEHS",
    categoryId: 1,
    requester: "Fulano"
  },
  {
    name: "Manual do Sistema Gestão da Qualidade",
    categoryId: 1,
    requester: "Fulano",
  },
  {
    name: "Mapa de Processo - MAP - PMC - 007",
    categoryId: 2,
    requester: "Fulano",
  },
  {
    name: "Mapa de Processo - MAP - CORP - 002",
    categoryId: 2,
    requester: "Fulano",
  },
  {
    name: "Mapa de Processo - MAP - PMC - 004",
    categoryId: 2,
    requester: "Fulano",
  },
  {
    name: "Planilha de Abordagem de Riscos e Oportunidades",
    categoryId: 2,
    requester: "Fulano",
  },
  {
    name: "SWOT Produção rev 5",
    categoryId: 2,
    requester: "Fulano",
  },
  {
    name: "SWOT Gestão da Qualidade rev04",
    categoryId: 2,
    requester: "Fulano",
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

    const units = await prisma.units.createMany({
      data: unitsDataArray,
    });


    console.log("Categorias e cards criados.", categories, cards, units);
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
