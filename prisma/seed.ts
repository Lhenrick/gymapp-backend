import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Basic muscles
  const muscles = [
    { slug: "chest", name: "Chest" },
    { slug: "back", name: "Back" },
    { slug: "biceps", name: "Biceps" },
    { slug: "triceps", name: "Triceps" },
    { slug: "shoulders", name: "Shoulders" },
    { slug: "quads", name: "Quadriceps" },
    { slug: "hamstrings", name: "Hamstrings" },
    { slug: "glutes", name: "Glutes" },
    { slug: "calves", name: "Calves" },
    { slug: "abs", name: "Abs" }
  ];

  for (const m of muscles) {
    await prisma.muscle.upsert({
      where: { slug: m.slug },
      update: {},
      create: m,
    });
  }

  // Some exercises
  const chest = await prisma.muscle.findUnique({ where: { slug: "chest" } });
  const back = await prisma.muscle.findUnique({ where: { slug: "back" } });
  const biceps = await prisma.muscle.findUnique({ where: { slug: "biceps" } });

  if (chest && back && biceps) {
    await prisma.exercise.createMany({
      data: [
        { name: "Barbell Bench Press", muscleId: chest.id, equipment: "Barbell" },
        { name: "Dumbbell Flyes", muscleId: chest.id, equipment: "Dumbbells" },
        { name: "Pull-ups", muscleId: back.id, equipment: "Bodyweight" },
        { name: "Barbell Row", muscleId: back.id, equipment: "Barbell" },
        { name: "EZ-Bar Curl", muscleId: biceps.id, equipment: "EZ Bar" },
      ],
      skipDuplicates: true,
    });
  }

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
