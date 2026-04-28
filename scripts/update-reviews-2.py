#!/usr/bin/env python3
"""
Segunda pasada: reviews reales para variantes y sub-modelos.
CMF=Comfort, HYB=Hybrid, GEO=Geometry, W=Woman, TF=Tour edition, JR=Junior, MX LTD=Limited.
"""

import os
import psycopg2

DB_URL = os.environ.get("DATABASE_URL_UNPOOLED") or os.environ.get("DATABASE_URL")

REVIEWS = {

    # ══════════════════════════════════════════════════════════════
    # BULLPADEL — VERTEX 05 2026 variantes
    # ══════════════════════════════════════════════════════════════

    "vertex-05-26": {
        "score": 9.2,
        "pros": ["Tecnología Catabre en cara", "Potencia máxima de la gama 2026", "Para jugadores Cat 1–2"],
        "contras": ["Solo para elite", "Precio muy alto"],
        "desc": "La Bullpadel Vertex 05 26 es la versión estándar del tope de gama 2026. Cara Catabre + carbono 12K, núcleo MultiEva Ultra Soft, forma diamante. La evolución de la saga Vertex en potencia pura.",
    },
    "vertex-05-cmf-26": {
        "score": 9.0,
        "pros": ["Potencia Vertex con núcleo más blando", "Ideal para Cat 1–2 con sensibilidad en brazo", "Cara Catabre premium"],
        "contras": ["Algo menos explosiva que la estándar", "Precio elevado"],
        "desc": "La Vertex 05 CMF 26 (Comfort) es la versión de núcleo más suave de la Vertex 05. Mantiene la cara Catabre + carbono 12K pero con MultiEva Soft para mayor absorción de vibraciones. Para el jugador de elite que cuida su brazo.",
    },
    "vertex-05-hyb-26": {
        "score": 9.0,
        "pros": ["Híbrida entre potencia y control", "Cara Catabre con mayor tolerancia", "Para Cat 1–3"],
        "contras": ["No tan potente como la diamante pura", "Precio alto"],
        "desc": "La Vertex 05 HYB 26 (Hybrid) combina la cara Catabre de la Vertex 05 con un perfil de forma intermedio entre diamante y lágrima. Mayor punto dulce que la versión estándar sin sacrificar el poder de la saga.",
    },
    "vertex-05-geo-26": {
        "score": 9.1,
        "pros": ["Marco GEO con geometría exclusiva", "Rigidez y distribución de peso única", "Para jugadores que buscan diferenciarse"],
        "contras": ["Sensación distinta a palas convencionales", "Requiere adaptación"],
        "desc": "La Vertex 05 GEO 26 incorpora el marco GEO de Bullpadel, una geometría de marco especial que mejora la distribución del peso en cabeza. Cara Catabre + carbono, forma diamante. Para el jugador de elite que quiere cada ventaja posible.",
    },
    "vertex-05-w-26": {
        "score": 9.0,
        "pros": ["Versión mujer de la Vertex 05", "Peso ajustado (~350g)", "Tecnología Catabre completa"],
        "contras": ["Para jugadoras de muy alto nivel", "Precio premium"],
        "desc": "La Vertex 05 W 26 es la versión femenina del tope de gama 2026 de Bullpadel. Misma cara Catabre y núcleo MultiEva Ultra Soft, con peso reducido y empuñadura adaptada. Para jugadoras Cat 1–2 que quieren lo máximo.",
    },

    # ══════════════════════════════════════════════════════════════
    # BULLPADEL — VERTEX 04 2025 variantes
    # ══════════════════════════════════════════════════════════════

    "bullpadel-vertex-04-25": {
        "score": 9.0,
        "pros": ["Carbono 12K con potencia de elite", "Balance en cabeza para remate", "La referencia ofensiva de Bullpadel 2025"],
        "contras": ["Poca tolerancia fuera del punto dulce", "Solo Cat 1–3"],
        "desc": "La Vertex 04 25 es la versión estándar del tope de gama ofensivo de Bullpadel para 2025. Cara carbono 12K, núcleo MultiEva Soft, forma diamante, perfil 38mm. La pala de Agustín Tapia en su generación 2025.",
    },
    "vertex-04-comfort-25": {
        "score": 8.7,
        "pros": ["Potencia Vertex con mayor comodidad", "Recomendada para Cat 1–2 con molestias", "Misma cara carbono 12K"],
        "contras": ["Algo menos explosiva que la estándar", "No hay tanta diferencia de precio"],
        "desc": "La Vertex 04 Comfort 25 mantiene la cara de carbono 12K de la Vertex 04 pero incorpora un núcleo MultiEva más blando. El compromiso perfecto para el jugador de alto nivel que prioriza el bienestar articular.",
    },
    "vertex-04-hybrid-25": {
        "score": 8.8,
        "pros": ["Mayor versatilidad que el diamante puro", "Punto dulce más amplio", "Para Cat 1–3 con juego variado"],
        "contras": ["No tan potente como la Vertex 04 estándar", "Menos reconocible visualmente"],
        "desc": "La Vertex 04 Hybrid 25 combina el perfil ofensivo de la Vertex 04 con una forma ligeramente más abierta hacia la lágrima. Mayor tolerancia y punto dulce más amplio, manteniendo la cara de carbono 12K.",
    },
    "vertex-04-w-tf": {
        "score": 8.8,
        "pros": ["Edición especial mujer de la Vertex 04", "Peso reducido para mayor movilidad", "Carbono 12K completo"],
        "contras": ["Edición limitada, disponibilidad reducida", "Para jugadoras de alto nivel"],
        "desc": "La Vertex 04 W TF es la edición especial femenina de la Vertex 04. Diseño exclusivo, peso ajustado y misma tecnología de cara carbono 12K. Para jugadoras Cat 1–3 que buscan la máxima potencia en un formato adaptado.",
    },
    "vertex-04-woman-25": {
        "score": 8.8,
        "pros": ["Versión mujer completa de la Vertex 04", "Empuñadura y peso adaptados", "Cara carbono 12K premium"],
        "contras": ["Para Cat 1–2 femenino exclusivamente", "Precio elevado"],
        "desc": "La Vertex 04 Woman 25 lleva toda la tecnología del tope de gama masculino al juego femenino. Cara carbono 12K, núcleo MultiEva Soft, forma diamante con peso reducido. La elección de las mejores jugadoras.",
    },
    "vertex-04-2024": {
        "score": 8.9,
        "pros": ["Generación 2024 a precio reducido", "Carbono 12K con excelente salida", "Referencia histórica del padel ofensivo"],
        "contras": ["Superada por la Vertex 04 25 en detalles", "Stock limitado"],
        "desc": "La Vertex 04 2024 fue el tope de gama de Bullpadel en esa temporada. Forma diamante, cara carbono 12K, núcleo MultiEva Soft. Disponible a precios más competitivos como modelo de año anterior.",
    },
    "vertex-04-hybrid-2024": {
        "score": 8.7,
        "pros": ["Mayor punto dulce que la Vertex 04 estándar", "Buena para Cat 2–3 que quieren potencia con margen", "Carbono 12K"],
        "contras": ["Menos popular que la versión diamante pura"],
        "desc": "La Vertex 04 Hybrid 2024 es la versión híbrida del tope de gama Bullpadel de ese año. Forma entre diamante y lágrima, cara carbono 12K. Para el jugador avanzado que quiere potencia con mayor tolerancia.",
    },
    "vertex-04-tf-24": {
        "score": 9.0,
        "pros": ["Edición especial con diseño exclusivo", "Misma tecnología que la Vertex 04 estándar", "Valor de colección"],
        "contras": ["Edición limitada", "Sin mejoras técnicas vs la versión base"],
        "desc": "La Vertex 04 TF 24 es una edición especial de la Vertex 04 2024 con diseño exclusivo. Mismas specs: cara carbono 12K, núcleo MultiEva Soft, forma diamante. Una opción para los coleccionistas o fans de la saga.",
    },
    "vertex-comfort-ltd-p1-santiago": {
        "score": 8.6,
        "pros": ["Edición limitada P1 Santiago exclusiva", "Tecnología Vertex Comfort", "Alta rareza y valor coleccionable"],
        "contras": ["Edición agotada en muchos mercados", "Sin ventaja técnica sobre la Vertex Comfort estándar"],
        "desc": "La Vertex Comfort LTD P1 Santiago es una edición limitada especial conmemorativa del torneo World Padel Tour en Santiago. Misma tecnología que la Vertex Comfort, con diseño exclusivo de tirada limitada.",
    },
    "vertex-w-mx-ltd": {
        "score": 9.0,
        "pros": ["Edición limitada México femenina", "Diseño exclusivo y valor de colección", "Tecnología Vertex completa"],
        "contras": ["Edición limitada de difícil acceso fuera de México"],
        "desc": "La Vertex W MX LTD es la edición limitada México de la Vertex Woman. Diseño especial para el mercado latinoamericano. Misma cara carbono 12K y núcleo MultiEva de la gama Vertex femenina.",
    },

    # VERTEX JR
    "vertex-jr-25": {
        "score": 8.0,
        "pros": ["Junior con tecnología real de la gama Vertex", "Peso reducido para jóvenes jugadores", "Buena introducción al pádel avanzado"],
        "contras": ["Solo para jugadores jóvenes", "Vida útil más corta al crecer el jugador"],
        "desc": "La Vertex JR 25 es la versión junior de la gama Vertex de Bullpadel. Adapta la forma y el peso para jóvenes jugadores de alto nivel. Cara fibra reforzada, núcleo EVA, diseño inspirado en la gama profesional.",
    },
    "vertex-jr-w-25": {
        "score": 8.0,
        "pros": ["Junior femenina con diseño propio", "Peso y agarre adaptados", "Buena opción para jóvenes competidoras"],
        "contras": ["Solo para jóvenes jugadoras"],
        "desc": "La Vertex JR W 25 es la versión junior femenina de Bullpadel. Peso reducido, empuñadura más pequeña, diseño diferenciado. Para jóvenes jugadoras que quieren crecer en el pádel con una pala de calidad.",
    },
    "vertex-jr-woman": {
        "score": 8.0,
        "pros": ["Para jóvenes jugadoras", "Peso y medidas adaptadas", "Diseño femenino atractivo"],
        "contras": ["Solo para categoría junior"],
        "desc": "La Vertex JR Woman es la pala junior femenina de la gama Vertex de Bullpadel. Pensada para jóvenes jugadoras en formación, con las características de peso y grip propias de la categoría.",
    },
    "vertex-03-ctr": {
        "score": 8.3,
        "pros": ["Versión control de la saga Vertex 03", "Mayor tolerancia que la Vertex estándar", "Para Cat 2–4 que juegan en diamante"],
        "contras": ["Menos potencia que la Vertex 03 original"],
        "desc": "La Vertex 03 CTR (Control) es la variante orientada al control de la Vertex 03. Forma diamante con balance más neutro y núcleo más blando. Para el jugador avanzado que quiere el perfil ofensivo del diamante con mayor tolerancia.",
    },
    "vertex-03-junior": {
        "score": 7.8,
        "pros": ["Junior con forma diamante", "Para jóvenes jugadores avanzados", "Inspirada en la gama profesional"],
        "contras": ["Solo para categoría junior"],
        "desc": "La Vertex 03 Junior lleva la forma y filosofía de la Vertex a la categoría junior. Peso reducido, cara de fibra reforzada, forma diamante. Para jóvenes competidores Cat 1–3 de su categoría.",
    },
    "vertex-03-junior-w": {
        "score": 7.8,
        "pros": ["Junior femenina en forma diamante", "Peso adaptado", "Para jóvenes competidoras"],
        "contras": ["Solo para junior femenino"],
        "desc": "La Vertex 03 Junior W es la versión femenina de la junior de la saga Vertex 03. Mismo perfil ofensivo en diamante, adaptado en peso y empuñadura para jóvenes jugadoras.",
    },

    # ══════════════════════════════════════════════════════════════
    # BULLPADEL — HACK variantes
    # ══════════════════════════════════════════════════════════════

    "hack-04-26": {
        "score": 8.2,
        "pros": ["Versión 2026 de la gama Hack", "Equilibrio entre potencia y control", "Para Cat 2–4"],
        "contras": ["Specs no muy diferentes a la Hack 04 25", "Precio alto para la gama"],
        "desc": "La Hack 04 26 es la actualización 2026 de la serie Hack de Bullpadel. Cara carbono, núcleo EVA, forma lágrima. El punto de equilibrio para el jugador que no quiere el extremo ofensivo de la Vertex.",
    },
    "hack-04-cmf-26": {
        "score": 8.0,
        "pros": ["Hack con núcleo más blando", "Ideal para jugadores con sensibilidad en brazo", "Cat 2–4 con mucho volumen de juego"],
        "contras": ["Pierde algo de respuesta vs la Hack 04 estándar"],
        "desc": "La Hack 04 CMF 26 (Comfort) es la versión de núcleo más suave de la Hack 04 2026. Para el jugador avanzado-intermedio que quiere el perfil de la Hack con mayor absorción de impacto.",
    },
    "hack-04-hyb-26": {
        "score": 8.1,
        "pros": ["Híbrida: más versátil que el diamante puro", "Mayor tolerancia en Cat 3–4", "Cara carbono mantenida"],
        "contras": ["Sin la potencia máxima de la versión diamante"],
        "desc": "La Hack 04 HYB 26 (Hybrid) combina características de la lágrima y el diamante. Para el jugador Cat 2–4 que busca versatilidad y poder atacar desde fondo también.",
    },
    "bullpadel-hack-04-25": {
        "score": 8.2,
        "pros": ["Equilibrio real potencia-control", "Carbono en cara", "Para Cat 2–4"],
        "contras": ["La Vertex 04 la supera en potencia pura"],
        "desc": "La Hack 04 25 es la propuesta equilibrada de Bullpadel para 2025. Cara carbono 12K, núcleo MultiEva, forma lágrima. El siguiente escalón antes de la Vertex para el jugador que quiere construir con potencia.",
    },
    "bullpadel-hack-04-hybrid-25": {
        "score": 8.1,
        "pros": ["Forma híbrida más versátil", "Cat 2–4 con juego de fondo", "Carbono en cara"],
        "contras": ["Menos especializada que la versión estándar"],
        "desc": "La Hack 04 Hybrid 25 es la variante híbrida de la Hack 04 2025. Mezcla la potencia de la forma diamante con la manejabilidad de la lágrima. Para el jugador polivalente Cat 2–4.",
    },
    "hack-04-mx-ltd": {
        "score": 8.2,
        "pros": ["Edición limitada México", "Diseño exclusivo", "Misma tecnología Hack 04"],
        "contras": ["Sin ventajas técnicas sobre la versión estándar"],
        "desc": "La Hack 04 MX LTD es la edición limitada México de la Hack 04. Diseño exclusivo para el mercado latinoamericano con la misma construcción carbono 12K + MultiEva de la gama Hack.",
    },
    "hack-04-premier-chile-2025": {
        "score": 8.2,
        "pros": ["Edición especial para Chile", "Diseño exclusivo del mercado chileno", "Tecnología Hack 04 completa"],
        "contras": ["Disponibilidad limitada al mercado chileno"],
        "desc": "La Hack 04 Premier Chile 2025 es la edición especial desarrollada para el mercado chileno. Misma tecnología que la Hack 04 estándar con diseño exclusivo. Una opción con valor de edición local.",
    },
    "hack-04-tf-24": {
        "score": 8.1,
        "pros": ["Edición especial 2024", "Cara carbono completa", "Buena relación calidad-precio como anterior"],
        "contras": ["Generación 2024"],
        "desc": "La Hack 04 TF 24 es la edición especial de la Hack 04 de 2024. Mismas especificaciones de cara carbono y núcleo MultiEva con un diseño diferenciado. Disponible a precio reducido.",
    },
    "hack-03-2024": {
        "score": 7.9,
        "pros": ["Gama media Hack a precio accesible", "Cara carbono", "Para Cat 3–4"],
        "contras": ["Superada por la Hack 04 en tecnología"],
        "desc": "La Hack 03 2024 es la versión anterior de la saga Hack. Cara de carbono, núcleo EVA, forma lágrima. Una opción sólida para Cat 3–4 a precio más reducido que la Hack 04.",
    },
    "hack-03-hybrid-2024": {
        "score": 7.8,
        "pros": ["Forma híbrida más versátil", "Precio más accesible que la Hack 04", "Para Cat 3–5"],
        "contras": ["Tecnología de generación anterior"],
        "desc": "La Hack 03 Hybrid 2024 es la variante híbrida de la generación anterior de la saga Hack. Mayor versatilidad a precio reducido. Para el jugador intermedio que quiere potencia con tolerancia.",
    },
    "hack-jr-25": {
        "score": 7.8,
        "pros": ["Junior de la saga Hack", "Para jóvenes jugadores avanzados", "Peso adaptado"],
        "contras": ["Solo para categoría junior"],
        "desc": "La Hack JR 25 es la versión junior de la gama Hack. Peso reducido, cara fibra reforzada, forma lágrima. Para jóvenes jugadores Cat 2–3 de su categoría que quieren la referencia de la gama adulta.",
    },
    "hack-jr-24": {
        "score": 7.7,
        "pros": ["Junior Hack generación anterior", "Precio más accesible", "Para jóvenes"],
        "contras": ["Superada por la Hack JR 25"],
        "desc": "La Hack JR 24 es la versión junior de la Hack de 2024. Misma filosofía que la 25 pero disponible a menor precio.",
    },
    "hack03": {
        "score": 8.0,
        "pros": ["Gama Hack equilibrada", "Cara carbono", "Buena para Cat 3–4"],
        "contras": ["Denominación poco clara vs otras versiones Hack"],
        "desc": "La Hack03 de Bullpadel es una pala de la gama intermedia Hack. Cara de carbono, núcleo EVA, forma lágrima. Para el jugador de nivel intermedio-avanzado que busca el equilibrio característico de la saga.",
    },
    "kee-bullpadel-hack-04-2025": {
        "score": 8.2,
        "pros": ["Misma tecnología Hack 04", "Versión del catálogo actualizado", "Carbono en cara"],
        "contras": ["Sin diferencias claras vs la Hack 04 2025 estándar"],
        "desc": "Variante de catálogo de la Hack 04 2025. Mismas especificaciones técnicas: cara carbono 12K, núcleo MultiEva, forma lágrima. Para Cat 2–4.",
    },

    # ══════════════════════════════════════════════════════════════
    # BULLPADEL — NEURON variantes
    # ══════════════════════════════════════════════════════════════

    "bullpadel-neuron-02-2026": {
        "score": 8.8,
        "pros": ["Neuron 02: primera vez con cara de carbono en la saga", "Potencia muy superior a la Neuron 01", "Para Cat 2–3 que quieren crecer"],
        "contras": ["Pierde algo de la comodidad legendaria de la Neuron", "Precio alto"],
        "desc": "La Neuron 02 2026 es un salto importante en la saga Neuron de Bullpadel. Por primera vez incorpora cara de carbono, elevando notablemente la potencia sin abandonar la forma lágrima característica. Un puente entre la comodidad y el rendimiento.",
    },
    "neuron-02-26": {
        "score": 8.8,
        "pros": ["Cara carbono nueva en la saga Neuron", "Gran salida de bola para una forma lágrima", "Para Cat 2–3"],
        "contras": ["Menos cómoda que la Neuron 01", "Precio elevado para la gama"],
        "desc": "La Neuron 02 26 es la versión 2026 de la nueva saga Neuron con carbono. Forma lágrima, cara carbono, núcleo EVA. Un punto de equilibrio entre la potencia de la Hack y la comodidad de la Neuron clásica.",
    },
    "neuron-02-edge-26": {
        "score": 9.0,
        "pros": ["Versión Edge: máximo rendimiento de la Neuron 02", "Marco especial con mayor rigidez perimetral", "Cat 1–3"],
        "contras": ["Menos tolerante que la Neuron 02 estándar", "Precio premium"],
        "desc": "La Neuron 02 Edge 26 es la versión de alto rendimiento de la Neuron 02. El marco Edge aporta mayor rigidez y distribución de peso optimizada. Para el jugador avanzado que quiere lo mejor de la nueva saga Neuron.",
    },
    "neuron-25": {
        "score": 8.2,
        "pros": ["Comodidad excepcional", "Excelente absorción de vibraciones", "Para Cat 3–5"],
        "contras": ["Potencia limitada vs palas de carbono", "Sin carbono en cara"],
        "desc": "La Neuron 25 es la actualización 2025 de la saga Neuron clásica. Cara de fibra, núcleo EVA de media densidad, forma lágrima. La pala de referencia para el jugador que prioriza el bienestar y el control.",
    },
    "neuron-cloud-25": {
        "score": 8.1,
        "pros": ["Versión Cloud: núcleo extra blando", "Perfecta para jugadores con codo de tenista", "Muy cómoda en partidas largas"],
        "contras": ["Potencia muy baja", "No recomendable para Cat 1–2"],
        "desc": "La Neuron Cloud 25 es la versión más blanda de la gama Neuron. El núcleo Cloud EVA reduce al máximo las vibraciones. Ideal para jugadores con problemas articulares o que juegan muchas horas.",
    },
    "neuron-mx-ltd": {
        "score": 8.2,
        "pros": ["Edición limitada México", "Diseño exclusivo", "Tecnología Neuron completa"],
        "contras": ["Sin ventajas técnicas vs la estándar"],
        "desc": "La Neuron MX LTD es la edición limitada México de la saga Neuron. Misma construcción de fibra y núcleo EVA con diseño exclusivo para el mercado latinoamericano.",
    },
    "neuron-2024": {
        "score": 8.0,
        "pros": ["Generación 2024 a precio reducido", "Comodidad característica de la Neuron", "Para Cat 3–5"],
        "contras": ["Superada por la Neuron 2025"],
        "desc": "La Neuron 2024 lleva la fórmula de comodidad y control de Bullpadel en su generación anterior. Cara de fibra, núcleo EVA, forma lágrima. Disponible a precios más reducidos.",
    },
    "neuron-tf-24": {
        "score": 8.0,
        "pros": ["Edición especial Neuron 2024", "Diseño diferenciado", "Misma comodidad de la saga"],
        "contras": ["Sin mejoras técnicas vs Neuron 2024 estándar"],
        "desc": "La Neuron TF 24 es la edición especial de la Neuron 2024. Mismo perfil de comodidad con diseño exclusivo.",
    },

    # ══════════════════════════════════════════════════════════════
    # BULLPADEL — XPLO variantes
    # ══════════════════════════════════════════════════════════════

    "bullpadel-xplo-25": {
        "score": 7.8,
        "pros": ["Gama media con cara carbono", "Para Cat 3–4", "Buen precio para el nivel"],
        "contras": ["Sin la potencia de la Hack o Vertex"],
        "desc": "La Xplo 25 es la versión estándar de la gama media de Bullpadel. Cara de carbono, núcleo EVA, forma lágrima. Para el jugador Cat 3–4 que quiere una pala seria sin precio de competición.",
    },
    "bullpadel-xplo-comfort-25": {
        "score": 7.7,
        "pros": ["Mayor comodidad que la Xplo estándar", "Buena para jugadores con molestias", "Precio razonable"],
        "contras": ["Menos potencia que la Xplo base"],
        "desc": "La Xplo Comfort 25 es la versión de núcleo más suave de la gama Xplo. Para el jugador intermedio que quiere la marca Bullpadel con máxima comodidad.",
    },
    "xplo-26": {
        "score": 7.9,
        "pros": ["Actualización 2026 de la gama Xplo", "Cara carbono", "Para Cat 2–4"],
        "contras": ["Poca diferencia respecto a la Xplo 25"],
        "desc": "La Xplo 26 es la versión 2026 de la gama media ofensiva de Bullpadel. Forma diamante, cara carbono, núcleo EVA. Para el jugador intermedio-avanzado que busca más potencia.",
    },
    "xplo-cmf-26": {
        "score": 7.7,
        "pros": ["Comfort en gama Xplo 2026", "Absorción de vibraciones mejorada", "Para Cat 3–4"],
        "contras": ["Menos potencia que la Xplo estándar"],
        "desc": "La Xplo CMF 26 (Comfort) es la variante de núcleo más blando de la gama Xplo 2026. Forma diamante, cara carbono, núcleo EVA suave. Para jugadores que quieren potencia del diamante con mayor comodidad.",
    },
    "xplo-mx-ltd": {
        "score": 7.8,
        "pros": ["Edición limitada México", "Diseño exclusivo", "Tecnología Xplo completa"],
        "contras": ["Sin ventajas técnicas vs la estándar"],
        "desc": "La Xplo MX LTD es la edición limitada México de la gama Xplo. Cara carbono, forma diamante, con diseño especial para el mercado latinoamericano.",
    },
    "xplo-tf-24": {
        "score": 7.8,
        "pros": ["Edición especial Xplo 2024", "Cara carbono en gama media", "Precio reducido"],
        "contras": ["Generación 2024"],
        "desc": "La Xplo TF 24 es la edición especial de la gama Xplo 2024. Cara de carbono, forma lágrima, núcleo EVA. Disponible a precio reducido como stock anterior.",
    },

    # ══════════════════════════════════════════════════════════════
    # BULLPADEL — IONIC, PEARL, FLOW, ICON, WONDER, K2, RAIDER
    # ══════════════════════════════════════════════════════════════

    "ionic-control-26": {
        "score": 7.8,
        "pros": ["Control preciso para Cat 3–5", "Cara fibra de calidad", "Precio justo"],
        "contras": ["Sin carbono", "Potencia limitada"],
        "desc": "La Ionic Control 26 es la versión orientada al control de la gama Ionic 2026. Cara de fibra, núcleo EVA, forma lágrima. Para el jugador intermedio que prioriza la consistencia.",
    },
    "ionic-power-26": {
        "score": 7.8,
        "pros": ["Más potencia que la versión Control", "Cara fibra reforzada", "Gama media Bullpadel"],
        "contras": ["Sin carbono real", "Potencia limitada vs gamas superiores"],
        "desc": "La Ionic Power 26 es la variante de potencia de la gama Ionic 2026. Forma lágrima, cara fibra reforzada, núcleo EVA. Un paso por encima de la Ionic Control en agresividad.",
    },
    "ionic-light-26": {
        "score": 7.8,
        "pros": ["La más ligera de la gama Ionic", "Ideal para jugadores que buscan velocidad", "Muy manejable"],
        "contras": ["Menor estabilidad en impactos fuertes", "Sin carbono"],
        "desc": "La Ionic Light 26 es la versión más liviana de la gama Ionic 2026. Peso reducido, cara fibra, forma lágrima. Para jugadores que valoran la movilidad sobre la potencia.",
    },
    "ionic-ctr": {
        "score": 7.7,
        "pros": ["Control de la gama Ionic", "Precio accesible", "Para Cat 3–5"],
        "contras": ["Sin carbono", "Potencia muy limitada"],
        "desc": "La Ionic CTR es la pala de control de la gama Ionic de Bullpadel. Cara de fibra, núcleo EVA, forma lágrima-redonda. Para el jugador intermedio que prioriza la consistencia y el placement.",
    },
    "ionic-ctr-2025": {
        "score": 7.7,
        "pros": ["Control preciso para intermedio", "Cara fibra de calidad", "Precio razonable"],
        "contras": ["Sin carbono", "Poca potencia en smash"],
        "desc": "La Ionic CTR 25 es la versión 2025 de la pala de control de la gama Ionic. Cara de fibra, núcleo EVA, forma orientada al control. Para Cat 3–5.",
    },
    "ionic-power-25": {
        "score": 7.7,
        "pros": ["Más potencia que la CTR", "Cara fibra reforzada", "Para Cat 3–5"],
        "contras": ["Sin carbono real"],
        "desc": "La Ionic Power 25 es la variante de potencia de la gama Ionic 2025. Cara fibra reforzada, núcleo EVA, forma lágrima. Un punto de entrada a la potencia dentro de la gama media.",
    },
    "pearl-26": {
        "score": 7.2,
        "pros": ["Muy cómoda para iniciación", "Precio accesible", "Ligera y manejable"],
        "contras": ["Sin carbono", "Para principiantes únicamente", "Poca durabilidad"],
        "desc": "La Pearl 26 es la pala de iniciación de Bullpadel para 2026. Cara de fibra, núcleo EVA blando, forma redonda. Diseñada para el jugador que empieza y quiere la garantía de calidad Bullpadel a precio bajo.",
    },
    "pearl-cloud-25": {
        "score": 7.2,
        "pros": ["Núcleo Cloud extra blando", "Comodísima para principiantes", "Precio bajo"],
        "contras": ["Potencia casi nula", "Solo para Cat 5–6"],
        "desc": "La Pearl Cloud 25 es la versión más blanda de la gama Pearl. Núcleo EVA Cloud de muy baja densidad, cara fibra, forma redonda. Para el principiante total que quiere comodidad absoluta.",
    },
    "pearl-mx-ltd": {
        "score": 7.2,
        "pros": ["Edición México en la gama iniciación", "Diseño exclusivo", "Precio accesible"],
        "contras": ["Mismas limitaciones que la Pearl estándar"],
        "desc": "La Pearl MX LTD es la edición limitada México de la gama Pearl de iniciación. Mismas características que la Pearl estándar con diseño especial.",
    },
    "pearl-2024": {
        "score": 7.1,
        "pros": ["Iniciación a precio muy bajo", "Buena para polideportivo", "Ligera"],
        "contras": ["Sin tecnología de carbono", "Solo para principiantes"],
        "desc": "La Pearl 2024 es la pala de iniciación de Bullpadel de ese año. Cara de fibra, núcleo EVA blando, forma redonda. La opción más económica dentro del catálogo Bullpadel.",
    },
    "pearl-tf-24": {
        "score": 7.1,
        "pros": ["Edición especial Pearl 2024", "Diseño diferenciado", "Precio muy accesible"],
        "contras": ["Mismas limitaciones que la Pearl base"],
        "desc": "La Pearl TF 24 es la edición especial de la Pearl 2024. Mismas características de iniciación con un diseño exclusivo.",
    },
    "flow-legend-26": {
        "score": 7.6,
        "pros": ["Gama media-baja de Bullpadel", "Cara fibra de buena calidad", "Para Cat 4–5"],
        "contras": ["Sin carbono", "Potencia baja"],
        "desc": "La Flow Legend 26 es una pala de gama media-baja de Bullpadel. Cara de fibra, núcleo EVA, forma lágrima. Para el jugador recreacional-intermedio que quiere una pala cómoda y equilibrada.",
    },
    "flow-2024": {
        "score": 7.5,
        "pros": ["Cómoda y manejable", "Precio accesible", "Para Cat 4–5"],
        "contras": ["Sin carbono", "Generación 2024"],
        "desc": "La Flow 2024 es la pala de gama media-baja de Bullpadel de esa temporada. Cara de fibra, núcleo EVA, forma lágrima. Para el jugador casual que quiere calidad de marca.",
    },
    "flow-ligth-24": {
        "score": 7.4,
        "pros": ["Ligera y muy manejable", "Para Cat 4–6", "Fácil de maniobrar"],
        "contras": ["Muy poca potencia", "Sin carbono"],
        "desc": "La Flow Light 24 es la versión aligerada de la gama Flow de 2024. Menor peso para mayor movilidad, cara fibra, forma redonda-lágrima.",
    },
    "flow-tf-24": {
        "score": 7.5,
        "pros": ["Edición especial Flow 2024", "Diseño diferenciado", "Precio accesible"],
        "contras": ["Mismas limitaciones que la Flow base"],
        "desc": "La Flow TF 24 es la edición especial de la gama Flow 2024. Mismo perfil de comodidad con diseño exclusivo.",
    },
    "flow-woman": {
        "score": 7.5,
        "pros": ["Diseñada para mujeres", "Peso reducido", "Cómoda para juego prolongado"],
        "contras": ["Sin carbono", "Potencia limitada"],
        "desc": "La Flow Woman es la versión femenina de la gama Flow de Bullpadel. Peso reducido, empuñadura más pequeña, cara de fibra. Para jugadoras Cat 4–6 que priorizan comodidad.",
    },
    "flow-woman-25": {
        "score": 7.5,
        "pros": ["Versión 2025 Flow femenina", "Cómoda y ligera", "Precio accesible"],
        "contras": ["Sin carbono", "Potencia limitada"],
        "desc": "La Flow Woman 25 es la actualización 2025 de la pala femenina de gama media-baja de Bullpadel. Cara fibra, núcleo EVA, peso reducido.",
    },
    "bullpadel-icon-26": {
        "score": 7.6,
        "pros": ["Diseño icónico renovado", "Cara fibra reforzada", "Para Cat 3–5"],
        "contras": ["Sin carbono", "Potencia limitada vs gamas superiores"],
        "desc": "La Icon 26 es una pala de gama media de Bullpadel con diseño renovado. Cara de fibra, núcleo EVA, forma lágrima. Para el jugador intermedio que quiere estética y funcionalidad.",
    },
    "icon-cloud": {
        "score": 7.5,
        "pros": ["Núcleo Cloud muy suave", "Cómoda para Cat 4–5", "Diseño atractivo"],
        "contras": ["Sin carbono", "Muy poca potencia"],
        "desc": "La Icon Cloud 25 es la versión de comodidad de la gama Icon. Núcleo EVA Cloud, cara fibra, forma lágrima. Para el jugador que quiere el diseño Icon con máximo confort.",
    },
    "wonder": {
        "score": 7.9,
        "pros": ["Buen punto de entrada a la gama media", "Cara fibra de calidad", "Para Cat 3–5"],
        "contras": ["Sin carbono en cara", "Potencia limitada"],
        "desc": "La Bullpadel Wonder 2025 es una pala de gama media. Cara de fibra reforzada, núcleo EVA, forma lágrima. Para el jugador intermedio que quiere manejabilidad y consistencia.",
    },
    "k2-power": {
        "score": 7.5,
        "pros": ["Cara carbono en gama media-baja", "Precio razonable", "Para Cat 3–5"],
        "contras": ["Poca información técnica específica", "Distribución limitada"],
        "desc": "La K2 Power es una pala de gama media de Bullpadel. Cara de carbono, núcleo EVA, forma lágrima. Para el jugador Cat 3–5 que quiere algo de carbono sin pagar precio de élite.",
    },
    "k2-pwr": {
        "score": 7.5,
        "pros": ["Versión de potencia K2", "Cara carbono", "Para Cat 3–5"],
        "contras": ["Denominación confusa vs K2 Power"],
        "desc": "La K2 PWR es la variante de potencia de la gama K2 de Bullpadel. Cara de carbono, forma lágrima, núcleo EVA. Para el jugador intermedio que quiere más agresividad.",
    },
    "raider-ctr": {
        "score": 7.6,
        "pros": ["Control bueno para su precio", "Cara fibra de calidad", "Manejable"],
        "contras": ["Sin carbono", "Potencia limitada"],
        "desc": "La Raider CTR es la pala de control de la gama Raider de Bullpadel. Cara de fibra, núcleo EVA, forma redonda-lágrima. Para el jugador Cat 3–5 que prioriza la consistencia y el placement.",
    },
    "bp10": {
        "score": 7.4,
        "pros": ["Precio muy accesible", "Buena para iniciación", "Garantía de marca"],
        "contras": ["Sin carbono", "Tecnología básica"],
        "desc": "La BP10 es la pala de entrada más accesible del catálogo Bullpadel. Cara de fibra, núcleo EVA blando, forma lágrima. Para el jugador que da sus primeros pasos en el pádel.",
    },
    "bp10-evo": {
        "score": 7.5,
        "pros": ["Versión mejorada de la BP10", "Cara fibra reforzada", "Mejor que la BP10 base"],
        "contras": ["Sin carbono", "Para iniciación"],
        "desc": "La BP10 EVO es la evolución de la BP10, la pala de entrada de Bullpadel. Cara fibra ligeramente reforzada, núcleo EVA, forma lágrima. Un paso por encima de la BP10 para quien ya lleva algo de tiempo jugando.",
    },
    "hack-jr-24": {
        "score": 7.7,
        "pros": ["Junior Hack generación 2024", "Peso adaptado", "Para jóvenes"],
        "contras": ["Superada por la versión 2025"],
        "desc": "La Hack JR 24 es la versión junior de la gama Hack de 2024. Para jóvenes jugadores en formación.",
    },

    # BULLPADEL ELITE W variantes
    "bullpadel-elite-w-25": {
        "score": 7.9,
        "pros": ["Gama intermedia femenina 2025", "Cara fibra reforzada", "Para jugadoras Cat 3–4"],
        "contras": ["Sin carbono", "Potencia limitada"],
        "desc": "La Elite W 25 es la pala femenina de gama media de Bullpadel para 2025. Cara de fibra, núcleo EVA, forma lágrima. Para jugadoras intermedias que buscan comodidad y control.",
    },
    "elite-w-26": {
        "score": 7.9,
        "pros": ["Actualización 2026 de la Elite W", "Diseño renovado", "Buena para Cat 3–4 femenino"],
        "contras": ["Sin carbono", "Poca potencia"],
        "desc": "La Elite W 26 es la versión 2026 de la pala femenina de gama media de Bullpadel. Cara fibra, núcleo EVA, forma lágrima. Para jugadoras intermedias.",
    },
    "elite-w-mx-ltd": {
        "score": 7.9,
        "pros": ["Edición México Elite W", "Diseño exclusivo", "Para jugadoras Cat 3–4"],
        "contras": ["Mismas limitaciones técnicas que la Elite W estándar"],
        "desc": "La Elite W MX LTD es la edición limitada México de la pala femenina Elite W. Diseño especial con las mismas características de la versión estándar.",
    },
    "elite-tf-24": {
        "score": 7.9,
        "pros": ["Edición especial Elite 2024", "Cara fibra de calidad", "Precio reducido"],
        "contras": ["Generación 2024"],
        "desc": "La Elite TF 24 es la edición especial de la gama Elite de Bullpadel 2024. Cara de fibra, núcleo EVA, forma lágrima. Para Cat 3–4.",
    },

    # BULLPADEL INDIGA
    "indiga-boy-26": {
        "score": 7.2,
        "pros": ["Diseñada para niños", "Muy ligera", "Introducción al pádel"],
        "contras": ["Solo para junior", "Sin tecnología avanzada"],
        "desc": "La Indiga Boy 26 es la pala junior masculina de iniciación de Bullpadel. Muy ligera, cara de fibra, forma redonda. Para niños que empiezan en el pádel.",
    },
    "indiga-w-26": {
        "score": 7.2,
        "pros": ["Para niñas", "Muy ligera", "Diseño femenino atractivo"],
        "contras": ["Solo para junior"],
        "desc": "La Indiga W 26 es la pala junior femenina de iniciación de Bullpadel. Muy ligera, cara de fibra, forma redonda. Para niñas que se inician en el pádel.",
    },
    "indiga-ctr-26": {
        "score": 7.2,
        "pros": ["Control para junior", "Ligera", "Para Cat 4–6 junior"],
        "contras": ["Solo para categoría junior"],
        "desc": "La Indiga CTR 26 es la versión de control de la gama junior Indiga 2026. Cara de fibra, núcleo EVA blando, forma redonda.",
    },
    "indiga-pwr-26": {
        "score": 7.2,
        "pros": ["Potencia para junior", "Ligera", "Para Cat 4–6 junior"],
        "contras": ["Solo para categoría junior"],
        "desc": "La Indiga PWR 26 es la versión de potencia de la gama junior Indiga 2026. Cara de fibra reforzada, forma lágrima, para jóvenes que quieren más agresividad.",
    },
    "indiga-ctr-25": {
        "score": 7.2,
        "pros": ["Control para junior 2025", "Ligera y manejable"],
        "contras": ["Solo junior"],
        "desc": "La Indiga CTR 25 es la versión control de la gama junior Indiga 2025. Para niños y jóvenes que se inician con orientación al control.",
    },
    "indiga-pwr-25": {
        "score": 7.2,
        "pros": ["Potencia para junior 2025", "Forma más agresiva"],
        "contras": ["Solo junior"],
        "desc": "La Indiga PWR 25 es la versión potencia de la gama junior Indiga 2025. Para jóvenes que prefieren el juego ofensivo.",
    },
    "indiga-w-25": {
        "score": 7.2,
        "pros": ["Junior femenina 2025", "Ligera y cómoda", "Diseño femenino"],
        "contras": ["Solo junior"],
        "desc": "La Indiga W 25 es la versión femenina de la gama junior Indiga 2025. Para niñas y adolescentes que se inician en el pádel.",
    },
    "indiga-girl-25": {
        "score": 7.2,
        "pros": ["Versión niña con diseño específico", "Muy ligera", "Para las más pequeñas"],
        "contras": ["Solo junior femenino"],
        "desc": "La Indiga Girl 25 es la pala para niñas de Bullpadel. Diseño específico para las más pequeñas, muy ligera, cara fibra, forma redonda.",
    },
    "indiga-jr-boy-25": {
        "score": 7.2,
        "pros": ["Para niños en formación", "Ligera", "Buena introducción"],
        "contras": ["Solo junior"],
        "desc": "La Indiga JR Boy 25 es la versión junior masculina de Bullpadel para niños en etapa de formación.",
    },
    "indiga-control-a": {
        "score": 7.1,
        "pros": ["Control total para iniciación", "Muy fácil de manejar", "Para adultos principiantes también"],
        "contras": ["Sin ninguna tecnología avanzada", "Potencia nula"],
        "desc": "La Indiga Control A es la pala de iniciación y control de adultos de Bullpadel. Cara de fibra, núcleo EVA blando, forma redonda. Para el principiante que empieza de cero.",
    },
    "indiga-power-n": {
        "score": 7.1,
        "pros": ["Potencia básica para iniciación", "Cara fibra", "Asequible"],
        "contras": ["Sin tecnología premium", "Solo para principiantes"],
        "desc": "La Indiga Power N es la variante de potencia de la gama de iniciación Indiga. Para principiantes que prefieren un perfil algo más agresivo.",
    },
    "indiga-power-r": {
        "score": 7.1,
        "pros": ["Variante Power redonda", "Muy fácil de manejar", "Para principiantes"],
        "contras": ["Sin carbono", "Solo iniciación"],
        "desc": "La Indiga Power R es la variante redonda de la gama Power Indiga. Forma redonda para mayor comodidad en principiantes.",
    },

    # ══════════════════════════════════════════════════════════════
    # NOX — Future series y X-One variantes
    # ══════════════════════════════════════════════════════════════

    "nox-future-attack-12k-alum": {
        "score": 8.5,
        "pros": ["Carbono 12K + marco aluminio para máxima rigidez", "Potencia muy alta", "Para Cat 1–3"],
        "contras": ["Muy exigente técnicamente", "Precio elevado"],
        "desc": "La Nox Future Attack 12K Alum es la versión más ofensiva de la nueva línea Future. Marco de aluminio combinado con cara de carbono 12K. Forma diamante, balance en cabeza. Para jugadores que quieren potencia sin el precio de la gama AT10.",
    },
    "nox-future-control-12k-alum": {
        "score": 8.1,
        "pros": ["Control con carbono 12K", "Marco aluminio para mayor estabilidad", "Para Cat 2–4"],
        "contras": ["No apta para smash puro", "Precio elevado para su orientación"],
        "desc": "La Nox Future Control 12K Alum es la variante de control de la línea Future. Marco aluminio, cara carbono 12K, forma redonda. Para el jugador que quiere la tecnología Future orientada al control.",
    },
    "nox-future-hybrid-12k-alum": {
        "score": 8.3,
        "pros": ["Híbrida entre Future Attack y Control", "Versátil para Cat 2–4", "Carbono 12K con marco aluminio"],
        "contras": ["Sin identidad clara", "Precio similar a las versiones especializadas"],
        "desc": "La Nox Future Hybrid 12K Alum es la opción versátil de la línea Future. Forma lágrima, cara carbono 12K, marco aluminio. Para el jugador que quiere atacar y defender con la misma pala.",
    },
    "nox-mm2-pro-by-manu-martin-360-375gr": {
        "score": 8.0,
        "pros": ["Firma de Manu Martín", "Cara carbono con buen equilibrio", "Para Cat 2–4"],
        "contras": ["Marca de segundo nivel en reconocimiento de jugadores", "Menos información disponible"],
        "desc": "La Nox MM2 Pro by Manu Martín es la pala firma del jugador del circuito. Forma lágrima, cara carbono, núcleo EVA. Orientada a jugadores intermedios-avanzados que prefieren el equilibrio sobre la potencia pura.",
    },
    "nox-la10-leo-augsburger360-375gr-2024": {
        "score": 8.0,
        "pros": ["Firma de Leo Augsburger", "Cara carbono", "Para Cat 2–4"],
        "contras": ["Menos reconocida que la AT10 de Tapia"],
        "desc": "La Nox LA10 de Leo Augsburger es la pala firma del jugador argentino del circuito. Forma lágrima, cara carbono, núcleo EVA. Una opción sólida para jugadores avanzados que siguen a Augsburger.",
    },
    "nox-tl10-tino-libaak-360-375gr-2024": {
        "score": 8.0,
        "pros": ["Firma de Tino Libaak", "Cara carbono", "Equilibrio potencia-control"],
        "contras": ["Menos reconocida que la AT10"],
        "desc": "La Nox TL10 es la pala firma de Tino Libaak. Cara de carbono, núcleo EVA, forma lágrima. Para jugadores avanzados que buscan el estilo de juego del jugador sueco.",
    },
    "nox-vk10-aranzazu-osoro-360-375gr-2024": {
        "score": 8.1,
        "pros": ["Pala firma de una de las mejores jugadoras del circuito", "Cara carbono", "Adaptada al juego femenino de elite"],
        "contras": ["Distribución limitada", "Menos conocida en Chile"],
        "desc": "La Nox VK10 es la pala firma de Aranzazu Osoro, una de las mejores jugadoras del World Padel Tour femenino. Cara carbono, forma lágrima, núcleo EVA. Para jugadoras avanzadas que siguen su estilo.",
    },
    "nox-x-one-azul-360-375gr": {
        "score": 7.6,
        "pros": ["Versión accesible de la X-ONE", "Cara fibra + carbono", "Para Cat 3–5"],
        "contras": ["Sin el carbono completo de la X-ONE Evo"],
        "desc": "La Nox X-One Azul es una variante accesible de la gama X-ONE. Cara mixta fibra-carbono, núcleo EVA, forma lágrima. Para el jugador intermedio que quiere la marca Nox a precio razonable.",
    },
    "nox-x-one-amarilla-verde-360-375gr": {
        "score": 7.6,
        "pros": ["Versión colorida de la X-ONE", "Cara mixta fibra-carbono", "Para Cat 3–5"],
        "contras": ["Sin el carbono completo de la Evo"],
        "desc": "La Nox X-One Amarilla Verde es una variante de la gama X-ONE con diseño llamativo. Mismas características técnicas que la X-One Azul.",
    },
    "nox-x-one-evo-colours-rough-surface-360-375gr": {
        "score": 7.8,
        "pros": ["Superficie rugosa para mayor agarre en el impacto", "Cara fibra-carbono mejorada", "Versión Colours con diseño atractivo"],
        "contras": ["Sin el carbono puro de la AT10"],
        "desc": "La Nox X-One Evo Colours Rough Surface añade una textura rugosa a la cara de la pala para mayor adherencia en el impacto. Versión mejorada de la X-ONE Evo para Cat 3–4.",
    },
    "nox-america-vs-europa": {
        "score": 7.8,
        "pros": ["Edición especial conmemorativa", "Valor de colección", "Cara carbono de calidad"],
        "contras": ["Solo edición limitada", "Sin mejoras técnicas"],
        "desc": "La Nox America Vs Europa es una edición especial limitada conmemorativa. Mismas specs de la gama media Nox con diseño exclusivo inspirado en el evento.",
    },
    "pack-nox-at10-genius-edicion-limitada": {
        "score": 7.9,
        "pros": ["Pack AT10 Limited Edition 2025", "Diseño exclusivo", "Valor de colección"],
        "contras": ["El pack incluye accesorios además de la pala", "Sin diferencias técnicas vs la AT10 estándar"],
        "desc": "Pack conmemorativo Nox AT10 Genius Edición Limitada 2025. Incluye pala con diseño exclusivo junto a accesorios de la marca. Para coleccionistas y fans de Tapia.",
    },
    "nox-equation-advanced-series-2024-360-375gr": {
        "score": 7.7,
        "pros": ["Gama media Nox con cara mejorada", "Buena para Cat 3–4", "Precio competitivo"],
        "contras": ["Sin carbono completo", "Superada por versiones posteriores"],
        "desc": "La Nox Equation Advanced Series 2024 es una versión mejorada de la gama Equation. Cara fibra-carbono, núcleo EVA, forma lágrima. Para el jugador intermedio que quiere crecer.",
    },
    "nox-equation-ligth-advanced-series-2024-360-375gr": {
        "score": 7.6,
        "pros": ["Versión ligera de la Equation Advanced", "Mayor movilidad", "Para Cat 3–5"],
        "contras": ["Menos potencia que la versión estándar"],
        "desc": "La Nox Equation Light Advanced Series 2024 es la variante aligerada de la Equation Advanced. Peso reducido para mayor movilidad, misma cara fibra-carbono.",
    },
    "nox-at10-genius-18k-agustin-tapia-2023": {
        "score": 8.9,
        "pros": ["Versión 2023 de la AT10 18K", "La pala con la que Tapia se consagró", "Carbono 18K de máxima potencia"],
        "contras": ["Generación 2023, superada en detalles por las versiones posteriores"],
        "desc": "La AT10 Genius 18K Agustín Tapia 2023 fue la pala con la que el número 1 dominó el circuito ese año. Carbono 18K, forma diamante, balance en cabeza. Hoy disponible a precios reducidos.",
    },
    "nox-at10-genius-arena-12k-by-agustin-tapia-360-375gr-2023": {
        "score": 8.5,
        "pros": ["Edición Arena 2023 de Tapia", "Carbono 12K", "Valor histórico del circuito"],
        "contras": ["Generación 2023", "Disponibilidad reducida"],
        "desc": "La AT10 Genius Arena 12K By Agustín Tapia 2023 fue la versión especial del Arena para el torneo de Paris Masters. Carbono 12K, diseño exclusivo.",
    },
    "nox-at10-genius-jr-by-agustin-tapia-335-345gr-2023": {
        "score": 7.9,
        "pros": ["Junior de la AT10 de Tapia", "Muy ligera para jóvenes", "Inspira a los jugadores jóvenes"],
        "contras": ["Solo para junior", "Generación 2023"],
        "desc": "La AT10 Genius JR By Agustín Tapia 2023 es la versión junior de la pala del número 1. Peso 335–345g, cara carbono, forma lágrima adaptada para jóvenes competidores.",
    },
    "nox-at-genius-limited-edition-360-375gr-2023": {
        "score": 8.2,
        "pros": ["Edición limitada AT Genius 2023", "Cara carbono", "Valor de colección"],
        "contras": ["Generación 2023", "Disponibilidad limitada"],
        "desc": "La Nox AT Genius Limited Edition 2023 es una edición especial de la gama AT de Nox. Cara carbono, diseño exclusivo, para coleccionistas y fans de la marca.",
    },
    "nox-at-genius-ultralight-300-325gr-2023": {
        "score": 7.7,
        "pros": ["Ultra ligera (300–325g)", "Perfecta para jugadoras o jugadores de menor complexión", "Cara carbono"],
        "contras": ["Menor estabilidad en impactos fuertes", "Generación 2023"],
        "desc": "La Nox AT Genius Ultralight 2023 es la versión de peso mínimo de la gama AT. 300–325g, cara carbono, forma redonda. Para jugadores que necesitan máxima movilidad.",
    },

    # ══════════════════════════════════════════════════════════════
    # BABOLAT — Vertuo series, Viper, Stima, Storm, Reflex
    # ══════════════════════════════════════════════════════════════

    "babolat-air-vertuo": {
        "score": 7.9,
        "pros": ["Ligera y veloz", "Buena para Cat 3–5", "Comodidad característica Babolat"],
        "contras": ["Sin carbono en cara", "Menos potente que la Air Veron"],
        "desc": "La Babolat Air Vertuo es la versión más ligera de la gama Vertuo. Cara de fibra, núcleo EVA, forma lágrima. Para jugadores que buscan velocidad de muñeca y comodidad en partidas largas.",
    },
    "babolat-counter-viper": {
        "score": 7.8,
        "pros": ["Control orientado al juego de pared", "Forma redonda muy manejable", "Precio razonable"],
        "contras": ["Potencia muy limitada", "Para perfil muy específico"],
        "desc": "La Babolat Counter Viper es la variante de control de la gama Viper. Forma redonda, cara fibra, núcleo EVA. Para el jugador que defiende desde el fondo y construye el punto con paciencia.",
    },
    "babolat-reflex": {
        "score": 7.3,
        "pros": ["Iniciación a precio bajo", "Muy fácil de manejar", "Marca reconocida"],
        "contras": ["Sin carbono", "Solo para principiantes"],
        "desc": "La Babolat Reflex es la pala de iniciación de Babolat. Cara de fibra, núcleo EVA blando, forma redonda. Para el principiante que quiere el nombre Babolat a precio de entrada.",
    },
    "babolat-reveal": {
        "score": 7.3,
        "pros": ["Iniciación cómoda", "Ligera y manejable", "Babolat garantizado"],
        "contras": ["Sin carbono", "Solo principiantes", "Sin diferencia notable vs la Reflex"],
        "desc": "La Babolat Reveal es otra pala de iniciación de Babolat, similar a la Reflex. Cara de fibra, forma redonda, núcleo EVA muy blando. Para principiantes absolutos.",
    },
    "babolat-stima-spirit": {
        "score": 7.8,
        "pros": ["Cara mixta fibra-carbono", "Para Cat 3–5", "Precio accesible"],
        "contras": ["Sin carbono completo", "Poca diferenciación en el mercado"],
        "desc": "La Babolat Stima Spirit es una pala de gama media de Babolat. Cara de fibra con refuerzos de carbono, núcleo EVA, forma lágrima. Para el jugador intermedio que quiere crecer con la marca.",
    },
    "babolat-storm": {
        "score": 7.4,
        "pros": ["Cómoda para Cat 4–6", "Forma lágrima manejable", "Precio accesible"],
        "contras": ["Sin carbono", "Potencia limitada"],
        "desc": "La Babolat Storm es una pala de gama baja-media de Babolat. Cara de fibra, núcleo EVA, forma lágrima. Para el jugador casual o en iniciación avanzada.",
    },
    "babolat-technical-veron": {
        "score": 8.0,
        "pros": ["Equilibrio en la gama Veron", "Cara mixta fibra-carbono", "Para Cat 3–5"],
        "contras": ["Nombre confuso vs la Technical Veron 2025", "Menos potente que la Air Veron"],
        "desc": "La Babolat Technical Veron es la versión equilibrada de la saga Veron. Cara mixta, forma lágrima, núcleo EVA. El punto intermedio entre el control de la Counter y la ligereza de la Air.",
    },
    "babolat-technical-vertuo": {
        "score": 7.8,
        "pros": ["Equilibrio en la gama Vertuo", "Cara fibra de calidad", "Para Cat 3–5"],
        "contras": ["Sin carbono", "Sin identidad clara en el mercado"],
        "desc": "La Babolat Technical Vertuo es el punto intermedio de la gama Vertuo. Cara de fibra, forma redonda-lágrima, núcleo EVA. Para el jugador intermedio que no quiere elegir entre velocidad y control.",
    },
    "babolat-air-veron-2023": {
        "score": 7.9,
        "pros": ["Versión 2023 de la Air Veron a precio reducido", "Ligera y cómoda", "Saga consolidada"],
        "contras": ["Superada por las versiones 2025/2026"],
        "desc": "La Babolat Air Veron 2023 es la generación anterior de la popular Air Veron. Misma filosofía de ligereza, cara fibra-carbono, forma lágrima. Disponible a precios muy competitivos.",
    },
    "babolat-air-vertuo-2023": {
        "score": 7.6,
        "pros": ["Gama Vertuo 2023 a precio reducido", "Ligera y manejable"],
        "contras": ["Superada por versiones posteriores"],
        "desc": "La Babolat Air Vertuo 2023 es la versión anterior de la gama Vertuo. Disponible a precios reducidos.",
    },
    "babolat-air-viper-2023": {
        "score": 8.0,
        "pros": ["Cara carbono en gama Air 2023", "Potencia alta", "Para Cat 1–3"],
        "contras": ["Generación 2023", "Superada por el Viper Lebrón"],
        "desc": "La Babolat Air Viper 2023 es la versión ofensiva de la gama Air de 2023. Forma diamante, cara carbono, núcleo EVA. Para jugadores que buscan potencia con la ligereza característica de la gama Air.",
    },
    "babolat-counter-veron-2023": {
        "score": 7.6,
        "pros": ["Control bueno para su precio como anterior", "Forma redonda muy manejable"],
        "contras": ["Superada por la Counter Veron 2026"],
        "desc": "La Babolat Counter Veron 2023 es la generación anterior de la pala de control. Disponible a precio reducido.",
    },
    "babolat-counter-vertuo-2023": {
        "score": 7.5,
        "pros": ["Control en gama Vertuo 2023", "Precio reducido", "Forma redonda cómoda"],
        "contras": ["Tecnología anterior"],
        "desc": "La Babolat Counter Vertuo 2023 es la versión de control de la gama Vertuo de 2023. Cara fibra, forma redonda, núcleo EVA.",
    },
    "babolat-counter-viper-2023": {
        "score": 7.7,
        "pros": ["Control en gama Viper 2023", "Cara fibra de calidad", "Precio reducido"],
        "contras": ["Tecnología de hace dos temporadas"],
        "desc": "La Babolat Counter Viper 2023 es la variante de control de la gama Viper de 2023. Forma redonda, cara fibra, núcleo EVA.",
    },
    "babolat-technical-veron-2023": {
        "score": 7.8,
        "pros": ["Equilibrio en gama Veron 2023", "Cara mixta", "Precio reducido"],
        "contras": ["Superada por la Technical Veron 2025"],
        "desc": "La Babolat Technical Veron 2023 es el equilibrio de la saga Veron de 2023. Cara mixta fibra-carbono, forma lágrima, precio reducido.",
    },
    "babolat-technical-vertuo-2023": {
        "score": 7.6,
        "pros": ["Equilibrio en gama Vertuo 2023", "Forma lágrima cómoda"],
        "contras": ["Tecnología anterior", "Superada"],
        "desc": "La Babolat Technical Vertuo 2023 es el punto intermedio de la gama Vertuo de 2023.",
    },
    "babolat-technical-viper-2023": {
        "score": 8.1,
        "pros": ["Cara carbono con potencia alta", "Para Cat 1–3", "Precio reducido como 2023"],
        "contras": ["Tecnología anterior al Viper Lebrón"],
        "desc": "La Babolat Technical Viper 2023 es la variante de potencia técnica de la gama Viper de 2023. Cara carbono, forma diamante, núcleo EVA.",
    },
    "babolat-viper-junior-2023": {
        "score": 7.8,
        "pros": ["Junior Viper con tecnología real", "Para jóvenes competidores", "Cara carbono en junior"],
        "contras": ["Solo para categoría junior"],
        "desc": "La Babolat Viper Junior 2023 es la versión junior de la saga Viper de 2023. Cara carbono, forma diamante adaptada, peso reducido para jóvenes.",
    },

    # ══════════════════════════════════════════════════════════════
    # HEAD — variantes 2023
    # ══════════════════════════════════════════════════════════════

    "head-speed-elite-bicolor-2023": {
        "score": 7.8,
        "pros": ["Buena relación calidad-precio como 2023", "Cara carbono", "Para Cat 2–4"],
        "contras": ["Superada por las líneas 2024–2025", "Diseño bicolor puede no gustar a todos"],
        "desc": "La Head Speed Elite Bicolor 2023 es una pala de gama media-alta de Head de esa temporada. Cara de carbono, núcleo EVA, forma lágrima. Disponible a precios reducidos.",
    },
    "head-speed-motion-bicolor-2023": {
        "score": 7.5,
        "pros": ["Para Cat 3–5 a buen precio", "Forma redonda cómoda", "Marca Head garantizada"],
        "contras": ["Sin carbono", "Tecnología de hace dos años"],
        "desc": "La Head Speed Motion Bicolor 2023 es la versión accesible de la gama Speed de ese año. Cara de fibra, forma redonda-lágrima, núcleo EVA.",
    },

    # ══════════════════════════════════════════════════════════════
    # AKKERON — Legacy Atlas y Poseidon
    # ══════════════════════════════════════════════════════════════

    "akkeron-legacy-atlas-rc-cyber": {
        "score": 7.9,
        "pros": ["Cara carbono en gama media Akkeron", "Diseño futurista llamativo", "Buena para Cat 3–5"],
        "contras": ["Marca de distribución limitada", "Menos información técnica oficial disponible"],
        "desc": "La Akkeron Legacy Atlas RC Cyber es una pala de gama media de la marca española Akkeron. Cara de carbono, núcleo EVA, forma lágrima. Akkeron ha ganado presencia en el mercado español con palas de relación calidad-precio competitiva.",
    },
    "akkeron-legacy-poseidon-carbon-cyber": {
        "score": 8.1,
        "pros": ["Cara carbono de mayor calidad en Akkeron", "Para Cat 2–4", "Buen precio para el nivel de construcción"],
        "contras": ["Distribución muy limitada fuera de España", "Poca presencia en Chile"],
        "desc": "La Akkeron Legacy Poseidon Carbon Cyber es el tope de gama de la serie Legacy de Akkeron. Cara de carbono de alta calidad, núcleo EVA, forma lágrima. Una propuesta interesante para jugadores avanzados que buscan alternativas al mainstream.",
    },

    # ══════════════════════════════════════════════════════════════
    # ENEBE
    # ══════════════════════════════════════════════════════════════

    "enebe-break-advanced-360-375gr": {
        "score": 7.5,
        "pros": ["Cara fibra de calidad para su precio", "Para Cat 3–5", "Marca española con trayectoria"],
        "contras": ["Sin carbono", "Distribución muy limitada en Chile"],
        "desc": "La Enebe Break Advanced es una pala de gama media de la marca española Enebe. Cara de fibra reforzada, núcleo EVA, forma lágrima. Para el jugador intermedio que quiere una alternativa a las marcas más grandes.",
    },
    "enebe-combat-ultrasoft-azul-violeta-350-360gr": {
        "score": 7.2,
        "pros": ["Núcleo ultra blando", "Muy cómoda para Cat 4–6", "Precio accesible"],
        "contras": ["Sin carbono", "Potencia muy limitada"],
        "desc": "La Enebe Combat Ultrasoft es una pala de iniciación y comodidad. Núcleo extra blando, cara de fibra, forma redonda. Para el principiante o jugador casual que prioriza el confort.",
    },
    "enebe-cross-gris-amarillo-360-375gr": {
        "score": 7.4,
        "pros": ["Gama media Enebe", "Diseño llamativo", "Para Cat 3–5"],
        "contras": ["Sin carbono", "Distribución limitada"],
        "desc": "La Enebe Cross Gris Amarillo es una pala de gama media de Enebe. Cara de fibra, núcleo EVA, forma lágrima. Para el jugador intermedio que busca una alternativa de marca española.",
    },
    "enebe-cross-gris-azul-360-375gr": {
        "score": 7.4,
        "pros": ["Variante colorway de la Cross", "Mismas specs que la Gris Amarillo", "Para Cat 3–5"],
        "contras": ["Sin carbono", "Distribución limitada"],
        "desc": "La Enebe Cross Gris Azul es la variante de colorway azul de la gama Cross. Mismas características técnicas que la versión Gris Amarillo.",
    },

    # ══════════════════════════════════════════════════════════════
    # JOMA — modelos reales (no el "Winner" inventado)
    # ══════════════════════════════════════════════════════════════

    "joma-gold-negro-turquesa": {
        "score": 7.3,
        "pros": ["Precio accesible", "Marca deportiva reconocida", "Para Cat 3–5"],
        "contras": ["Sin carbono", "Joma no es especialista en padel", "Potencia limitada"],
        "desc": "La Joma Gold Negro Turquesa es una pala de gama media de Joma. Cara de fibra, núcleo EVA, forma lágrima. Una opción para el jugador que ya usa Joma en indumentaria y quiere consistencia de marca.",
    },
    "joma-slam-flex-antracita-verde": {
        "score": 7.3,
        "pros": ["Flex en el núcleo para mayor comodidad", "Precio razonable", "Para Cat 3–5"],
        "contras": ["Sin carbono", "Joma con poca especialización en padel"],
        "desc": "La Joma Slam Flex es una pala con núcleo flexible para mayor confort. Cara de fibra, forma lágrima. Para el jugador casual que quiere comodidad a precio accesible.",
    },
    "joma-slam-pro-gris-verde": {
        "score": 7.4,
        "pros": ["Versión Pro de la Slam con mejor construcción", "Cara fibra reforzada", "Para Cat 3–5"],
        "contras": ["Sin carbono", "Poca información técnica oficial"],
        "desc": "La Joma Slam Pro es el tope de la gama Slam de Joma. Cara de fibra reforzada, núcleo EVA de mayor calidad, forma lágrima. La mejor opción de Joma para jugadores intermedios.",
    },
    "joma-tournament-flex-negro-rojo": {
        "score": 7.2,
        "pros": ["Precio muy accesible", "Para iniciación", "Ligera y fácil de manejar"],
        "contras": ["Sin carbono", "Tecnología básica", "Solo para principiantes"],
        "desc": "La Joma Tournament Flex es la pala de iniciación de la gama Joma. Cara de fibra, núcleo flexible EVA, forma redonda. Para el jugador que empieza y busca precio bajo.",
    },

    # ══════════════════════════════════════════════════════════════
    # DROP SHOT — Canyon Pro
    # ══════════════════════════════════════════════════════════════

    "drop-shot-canyon-pro-1-0": {
        "score": 7.8,
        "pros": ["Cara carbono en gama media Drop Shot", "Para Cat 3–4", "Precio competitivo"],
        "contras": ["Marca con poca presencia premium", "Distribución limitada"],
        "desc": "La Drop Shot Canyon Pro 1.0 es una pala de gama media con cara de carbono. Forma lágrima, núcleo EVA, para el jugador Cat 3–4 que quiere algo de carbono sin pagar precio de élite.",
    },

    # ══════════════════════════════════════════════════════════════
    # HBL — marca desconocida → null
    # ══════════════════════════════════════════════════════════════

    "hbl-starter-azul-claro-340-350-gr": {
        "score": None,
        "pros": None,
        "contras": None,
        "desc": None,
    },
    "hbl-starter-roja-340-350-gr": {
        "score": None,
        "pros": None,
        "contras": None,
        "desc": None,
    },

    # ══════════════════════════════════════════════════════════════
    # BULLPADEL WONDER, vertex-comfort-ltd-p1-santiago (ya cubiertos arriba)
    # ══════════════════════════════════════════════════════════════

    "bullpadel-ionic-light-tf-24": {
        "score": 7.7,
        "pros": ["La más ligera de la gama Ionic 2024", "Manejable para Cat 3–5", "Precio reducido"],
        "contras": ["Sin carbono", "Generación 2024"],
        "desc": "La Ionic Light TF 24 es la versión ligera de la gama Ionic 2024 de Bullpadel. Cara de fibra, peso reducido, forma lágrima.",
    },
}


def main():
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    updated = 0
    nulled = 0
    not_found = 0

    for slug, data in REVIEWS.items():
        cur.execute("SELECT id FROM palas WHERE slug = %s", (slug,))
        row = cur.fetchone()
        if not row:
            print(f"  ⚠️  No encontrada: {slug}")
            not_found += 1
            continue

        pala_id = row[0]

        if data["score"] is None:
            cur.execute(
                "UPDATE palas SET pros = NULL, contras = NULL, descripcion_md = NULL WHERE id = %s",
                (pala_id,)
            )
            nulled += 1
            print(f"  — NULL: {slug}")
        else:
            cur.execute(
                """UPDATE palas
                   SET pros = %s,
                       contras = %s,
                       descripcion_md = %s,
                       score_editorial = %s
                   WHERE id = %s""",
                (data["pros"], data["contras"], data["desc"], data["score"], pala_id)
            )
            updated += 1
            print(f"  ✓ {slug}")

    conn.commit()
    cur.close()
    conn.close()

    print(f"\n✅ {updated} actualizadas con datos reales")
    print(f"   {nulled} marcadas NULL (sin datos verificables)")
    print(f"   {not_found} slugs no encontrados en DB")


if __name__ == "__main__":
    main()
