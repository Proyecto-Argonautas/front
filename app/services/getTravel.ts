import type { Travel } from "~/types/travel";

export async function getTravels(
  userId: string | undefined,
): Promise<Travel[]> {
  const BACK_BASE_URL =
    import.meta.env.VITE_BACK_BASE_URL || "http://localhost:3000";

  if (!userId) {
    return [];
  }

  const urlRequest = `${BACK_BASE_URL}/travel/all/${userId}`;
  // const urlRequest = `${BACK_BASE_URL}/travel/all/filtered/${userId}`;


  try {
    const response = await fetch(urlRequest, {
      // `fetch` usa 'GET' por defecto, pero lo hacemos explícito para mayor claridad.
      method: "GET",
    });
    const data: Travel[] = await response.json();
    console.log(data);

    // // Ordenar los viajes por fecha de inicio ascendente (los más próximos primero)
    // data.sort(
    //   (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    // );
    return data;
  } catch (error) {
    console.error("Error fetching travels:", error);
    return [];
  }
}
