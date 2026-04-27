import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-white/80 px-6 md:px-8 py-12 mt-auto">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="display text-2xl font-semibold text-white mb-3">tupadel</div>
          <p className="text-sm opacity-60 max-w-sm">
            El copiloto del jugador amateur de pádel en LATAM. Reviews, precios, canchas y
            comunidad.
          </p>
        </div>
        <div>
          <div className="mono text-xs uppercase opacity-50 mb-3 tracking-wider">Producto</div>
          <div className="space-y-2 text-sm">
            <Link href="/palas" className="block hover:opacity-100 opacity-70">Palas</Link>
            <Link href="/canchas" className="block hover:opacity-100 opacity-70">Canchas</Link>
            <Link href="/diagnostico" className="block hover:opacity-100 opacity-70">Diagnóstico</Link>
            <Link href="/palas/comparar" className="block hover:opacity-100 opacity-70">Comparador</Link>
          </div>
        </div>
        <div>
          <div className="mono text-xs uppercase opacity-50 mb-3 tracking-wider">Aprender</div>
          <div className="space-y-2 text-sm">
            <Link href="/golpes" className="block hover:opacity-100 opacity-70">Golpes</Link>
            <Link href="/tacticas" className="block hover:opacity-100 opacity-70">Tácticas</Link>
            <Link href="/drills" className="block hover:opacity-100 opacity-70">Drills</Link>
            <Link href="/categorias" className="block hover:opacity-100 opacity-70">Categorías</Link>
          </div>
        </div>
        <div>
          <div className="mono text-xs uppercase opacity-50 mb-3 tracking-wider">Comunidad</div>
          <div className="space-y-2 text-sm">
            <Link href="/comunidad/buscar-companero" className="block hover:opacity-100 opacity-70">Buscar compañero</Link>
            <Link href="/comunidad/coaches" className="block hover:opacity-100 opacity-70">Coaches</Link>
            <Link href="/torneos" className="block hover:opacity-100 opacity-70">Torneos</Link>
            <Link href="/blog" className="block hover:opacity-100 opacity-70">Blog</Link>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto mt-12 pt-6 border-t border-white/10 flex justify-between text-xs opacity-50">
        <span>© 2026 tupadel.com · Hecho en Chile</span>
        <span className="mono">v1.0.0</span>
      </div>
    </footer>
  );
}
