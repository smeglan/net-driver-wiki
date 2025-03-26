const URL = process.env.NEXT_PUBLIC_API_URL;
const token = process.env.API_SECRET_KEY;

export const getAllDigimons = async () => {
  try {
    const response = await fetch(`${URL}/api/digimon`, {
      headers:{
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["digimons"] },
    });
    const data = await response.json();
    if (!response.ok) {
      return { status: response.status, digimon: null };
    }
    return {
      status: response.status,
      digimons: data,
    };
  } catch (error) {
    console.error("Error fetching Digimons:", error);

    return {
      status: 500,
      data: null,
    };
  }
};

export const getDigimon = async (name: string) => {
  try {
    const response = await fetch(`${URL}/api/digimon/${name}`, {
      headers:{
        Authorization: `Bearer ${token}`,
      },
      next: { tags: [name] },
    });
    if (!response.ok) {
      return { status: response.status, digimon: null };
    }
    const data = await response.json();
    return {
      status: response.status,
      digimon: data,
    };
  } catch (error) {
    console.error("Error fetching Digimons:", error);

    return {
      status: 500,
      data: null,
    };
  }
};
