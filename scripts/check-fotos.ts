import { db } from '../src/db';
import { palas } from '../src/db/schema';
import { isNull } from 'drizzle-orm';

async function main() {
  const sinFoto = await db.select({ id: palas.id, slug: palas.slug, marca: palas.marca, modelo: palas.modelo, anio: palas.anio })
    .from(palas).where(isNull(palas.imagenPrincipal));
  console.log('Sin foto:', sinFoto.length);
  sinFoto.forEach(p => console.log(`${p.marca}|${p.modelo}|${p.anio}|${p.slug}`));
}
main();
