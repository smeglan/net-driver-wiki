const URL =  process.env.NEXT_PUBLIC_API_URL;

export const fetchDigimons = async () => {
  try {
    const response = await fetch(`${URL}/api/digimon`, {
        next: { tags: ["digimons"] },
    });
    if (!response.ok) throw new Error("Error al obtener los Digimon");
    return await response.json();
  } catch (error) {
    console.error("Error fetching Digimons:", error);
    return [];
  }
};
