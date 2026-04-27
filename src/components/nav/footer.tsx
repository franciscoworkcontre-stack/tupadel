import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="bg-[#0D1B2A] text-white/80 px-6 md:px-8 py-12 mt-auto">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <Logo dark className="mb-4" />
          <p className="text-sm text-white/50 max-w-xs leading-relaxed">
            La guía para jugar mejor. Reviews, precios, canchas y comunidad para el jugador amateur de Chile y LATAM.
          </p>
          <p className="text-xs text-[#A8E63A] mt-3 font-medium">La guía para jugar mejor.</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase text-white/40 mb-3 tracking-widest">Producto</div>
          <div className="space-y-2 text-sm">
            <Link href="/palas" className="block hover:text-white text-white/60 transition-colors">Palas</Link>
            <Link href="/canchas" className="block hover:text-white text-white/60 transition-colors">Canchas</Link>
            <Link href="/diagnostico" className="block hover:text-white text-white/60 transition-colors">Diagnóstico</Link>
            <Link href="/palas/recomendador" className="block hover:text-white text-white/60 transition-colors">Recomendador</Link>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase text-white/40 mb-3 tracking-widest">Aprender</div>
          <div className="space-y-2 text-sm">
            <Link href="/golpes" className="block hover:text-white text-white/60 transition-colors">Golpes</Link>
            <Link href="/categorias" className="block hover:text-white text-white/60 transition-colors">Categorías</Link>
            <Link href="/reglas" className="block hover:text-white text-white/60 transition-colors">Reglas</Link>
            <Link href="/glosario" className="block hover:text-white text-white/60 transition-colors">Glosario</Link>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase text-white/40 mb-3 tracking-widest">Comunidad</div>
          <div className="space-y-2 text-sm">
            <Link href="/comunidad/buscar-companero" className="block hover:text-white text-white/60 transition-colors">Buscar compañero</Link>
            <Link href="/torneos" className="block hover:text-white text-white/60 transition-colors">Torneos</Link>
            <Link href="/blog" className="block hover:text-white text-white/60 transition-colors">Blog</Link>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto mt-10 pt-6 border-t border-white/10 flex justify-between text-xs text-white/30">
        <span>© 2026 Pulso Pádel · Hecho en Chile</span>
        <span>v1.0.0</span>
      </div>
    </footer>
  );
}
