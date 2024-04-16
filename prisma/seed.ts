import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function seed() {
    const imageProviderUrl = "https://picsum.photos/";
  
    for (let i = 0; i < 50; i++) {
      const first = Math.floor(Math.random() * 400) + 100;
      const second = Math.floor(Math.random() * 400) + 100;
  
      await prisma.employee.create({
        data: {
          name: `Employee ${i + 1}`,
          email: `employee${i + 1}@example.com`,
          location: (i * 2) % 5 === 0 ? 'Tripoli' : i % 2 === 0 ? "Beirut" : "Sydney",
          imagePath: `${imageProviderUrl}/${first}/${second}`,
          department: (i * 2) % 5 === 0 ? 'Marketing' : i % 2 === 0 ? "Development" : "Accounting",
          isActive: i % 3 === 0 ? false : true,
        },
      });
    }
  }
  

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });