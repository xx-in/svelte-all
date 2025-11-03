// src/routes/parent/+page.ts
import { redirect } from "@sveltejs/kit";

export const load = () => {
  throw redirect(302, "/compList/button");
};
