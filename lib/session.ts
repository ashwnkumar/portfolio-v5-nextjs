import { cookies } from "next/headers";

export async function getSessionSeed(): Promise<number> {
  const cookieStore = await cookies();
  const seed = cookieStore.get("session-seed")?.value;
  return seed ? parseInt(seed, 10) : Math.floor(Math.random() * 1_000_000);
}
