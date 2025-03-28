import { Categories } from "@/shared/types/categories"; // Asegúrate de importar el enum

const URL = process.env.NEXT_PUBLIC_API_URL;
const token = process.env.API_SECRET_KEY;

export const getAll = async <T>(category: Categories): Promise<{ status: number; data: T[] | null }> => {
  try {
    const response = await fetch(`${URL}/api/${category}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: [category] },
    });

    const data = await response.json();
    if (!response.ok) {
      return { status: response.status, data: null };
    }

    return {
      status: response.status,
      data,
    };
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);

    return {
      status: 500,
      data: null,
    };
  }
};

export const getOne = async <T>(category: Categories, name: string): Promise<{ status: number; data: T | null }> => {
  try {
    const response = await fetch(`${URL}/api/${category}/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: [name] },
    });

    if (!response.ok) {
      return { status: response.status, data: null };
    }

    const data = await response.json();
    return {
      status: response.status,
      data,
    };
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);

    return {
      status: 500,
      data: null,
    };
  }
};
