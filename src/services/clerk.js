import { Clerk } from "https://cdn.jsdelivr.net/npm/@clerk/clerk-js/+esm";

const clerk = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

await clerk.load();

window.clerk = clerk;

console.log("Clerk loaded");