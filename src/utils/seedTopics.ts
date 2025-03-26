import prisma from "../config/db";

export const seedTopics = async (categoryName: string, topics: string[]) => {
  try {
    // Find or create the category
    let category = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    console.log(category)

    if (!category) {
      category = await prisma.category.create({
        data: { name: categoryName },
      });
    }

    // Insert topics under the category
    const topicData = topics.map((topic) => ({
      name: topic,
      categoryId: category.id,
    }));

    await prisma.topic.createMany({
      data: topicData,
      skipDuplicates: true, // Prevent duplicate entries
    });

    console.log(`Seeded topics under ${categoryName} successfully.`);
  } catch (error) {
    console.error("Error seeding topics:", error);
  }
};

// Example Usage
seedTopics("geography", [
    "Continents and Oceans",
    "Climate Zones and Weather Patterns",
    "World Capitals and Landmarks",
    "Natural Disasters and Geography",
    "Mountains and River Systems",
    "Maps and Cartography",
    "Human Geography",
    "Countries and Their Cultures",
    "Geopolitics and Borders",
    "Environmental Geography",
  ]);