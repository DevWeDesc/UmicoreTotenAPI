import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categoryDataArray = [
  {
    name: 'Política de QEHS e Manual de Qualidade',
  },
  {
    name: 'Mapa de Processo e SWOT',
  },
  {
    name: 'Processos e Procedimentos',
  },
  {
    name: 'Indicadores de Qualidade',
  },
  {
    name: 'Indicadores de Segurança',
  },
  {
    name: 'Auditorias de QEHS',
  },
  {
    name: '5S',
  },
  {
    name: 'Código de Segurança',
  },
  {
    name: 'ARPOS/ AAIA',
  },
  {
    name: 'FISPQ',
  },
  {
    name: 'Dicas de QEHS',
  },

];

async function seed() {
  try {
    const categories = await prisma.category.createMany({
      data: categoryDataArray,
    });

    console.log('Categorias criadas.', categories);
    
  } catch (error) {

    console.error('Error ao adicionar seed:', error);

  } finally {
    await prisma.$disconnect();
  }
   
}

seed()
  .then(() => {
    console.log('Seeding completo');
  })
  .catch((error) => {
    console.error('Seeding falhou', error);
  });