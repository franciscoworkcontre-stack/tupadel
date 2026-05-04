import * as schema from "../src/db/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  const email = "profe1@gmail.com";
  const password = "profe1";
  const profeSlug = "rodrigo-silva-santiago";

  // 1. Create user
  const passwordHash = await bcrypt.hash(password, 12);
  const userId = crypto.randomUUID();

  const [user] = await db
    .insert(schema.users)
    .values({ id: userId, email, nombre: "Rodrigo Silva", rol: "profe", passwordHash })
    .onConflictDoUpdate({ target: schema.users.email, set: { passwordHash, rol: "profe" } })
    .returning();

  console.log(`✓ User: ${user.email} (${user.id})`);

  // 2. Link to profe record
  await db
    .update(schema.profes)
    .set({ userId: user.id })
    .where(eq(schema.profes.slug, profeSlug));

  console.log(`✓ Profe ${profeSlug} linked to user`);
  console.log(`\nCredenciales:`);
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${password}`);
}

main().catch(console.error);
