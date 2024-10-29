import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "eg5hg71k",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});