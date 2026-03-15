export interface ProductIngredient {
  name: string
  description: string
}

export interface ProductDosage {
  weight: string
  dose: string
}

export interface Product {
  id: number
  slug: string
  name: string
  tagline: string
  description: string
  longDescription: string
  price: number
  originalPrice: number | null
  rating: number
  reviews: number
  badge: string | null
  category: string
  registro: string
  pets: string[]
  benefits: string[]
  presentations: { size: string; price: number }[]
  ingredients: ProductIngredient[]
  dosage: ProductDosage[]
  usage: string[]
  warnings: string[]
  storage: string
  image: string
}

export const products: Product[] = [
  {
    id: 1,
    slug: "silygran-pro",
    name: "Silygran-Pro",
    tagline: "Hepatoprotector con Nanotecnologia",
    description: "Hepatoprotector con extracto de cardo mariano nanoencapsulado. Protege y regenera la funcion hepatica en perros y gatos.",
    longDescription: "Silygran-Pro es un hepatoprotector veterinario de ultima generacion desarrollado con nanotecnologia avanzada. Su formula unica combina silimarina nanoencapsulada con colina y fosfolipidos, proporcionando una proteccion integral del higado. Especialmente formulado para mascotas expuestas a toxinas, medicamentos hepatotoxicos o con condiciones hepaticas cronicas.",
    price: 89900,
    originalPrice: null,
    rating: 4.9,
    reviews: 156,
    badge: "Mas vendido",
    category: "Salud Hepatica",
    registro: "ICA: 17959 SL",
    pets: ["perro", "gato"],
    benefits: ["Hepatoprotector", "Antioxidante", "Regenerador celular", "Desintoxicante"],
    presentations: [
      { size: "30ml", price: 89900 },
      { size: "120ml", price: 289900 },
    ],
    ingredients: [
      {
        name: "Silimarina Nanoencapsulada",
        description: "Extracto de cardo mariano con alta biodisponibilidad que protege las celulas hepaticas del dano oxidativo y promueve su regeneracion."
      },
      {
        name: "Colina",
        description: "Nutriente esencial que previene la acumulacion de grasa en el higado y mejora el metabolismo hepatico."
      },
      {
        name: "Fosfolipidos",
        description: "Componentes estructurales de las membranas celulares que mejoran la absorcion y eficacia de los principios activos."
      },
      {
        name: "Complejo B",
        description: "Vitaminas que apoyan el metabolismo energetico y la funcion hepatica optima."
      }
    ],
    dosage: [
      { weight: "Hasta 5 kg", dose: "0.5 ml cada 12 horas" },
      { weight: "5 - 15 kg", dose: "1 ml cada 12 horas" },
      { weight: "15 - 30 kg", dose: "2 ml cada 12 horas" },
      { weight: "Mas de 30 kg", dose: "3 ml cada 12 horas" },
    ],
    usage: [
      "Administrar directamente en la boca o mezclar con el alimento",
      "Agitar bien antes de usar",
      "Usar la jeringa dosificadora incluida para una medicion precisa",
      "Tratamiento recomendado: minimo 30 dias continuos"
    ],
    warnings: [
      "No administrar en hembras gestantes sin supervision veterinaria",
      "Mantener fuera del alcance de los ninos",
      "Suspender uso si observa reacciones adversas",
      "Consulte a su veterinario antes de usar en conjunto con otros medicamentos"
    ],
    storage: "Conservar en lugar fresco y seco, protegido de la luz directa. No refrigerar. Una vez abierto, consumir en 60 dias.",
    image: "/images/silygran-pro.jpg"
  },
  {
    id: 2,
    slug: "nano-lyptus",
    name: "Nano-Lyptus",
    tagline: "Maxima Efectividad en un Solo Producto",
    description: "Solucion natural con nanotecnologia para problemas respiratorios. Accion antiviral, antibacteriana y expectorante.",
    longDescription: "Nano-Lyptus es un producto veterinario revolucionario que combina 7 ingredientes activos con nanotecnologia para el tratamiento de problemas respiratorios en perros y gatos. Su formula unica incluye aceite esencial de eucalipto, vitamina C, plata coloidal y nano colageno, proporcionando accion antiviral, antibacteriana, antifungica y expectorante.",
    price: 79900,
    originalPrice: 89900,
    rating: 4.8,
    reviews: 203,
    badge: "Nuevo",
    category: "Sistema Respiratorio",
    registro: "ICA: 21905 SL",
    pets: ["perro", "gato"],
    benefits: ["Antiviral", "Expectorante", "Inmunologico", "Antibacteriano", "Antifungico"],
    presentations: [
      { size: "60ml", price: 79900 },
      { size: "120ml", price: 149900 },
      { size: "1 Litro", price: 450000 },
    ],
    ingredients: [
      {
        name: "Aceite Esencial de Eucalipto",
        description: "Facilita la eliminacion del moco y reduce la inflamacion de las vias respiratorias, mejorando la respiracion y combatiendo infecciones con sus propiedades anticatarrales y antivirales."
      },
      {
        name: "Vitamina C",
        description: "Potente antioxidante que protege las celulas, fortalece el sistema inmunologico, mejora la absorcion de hierro y reduce el estres."
      },
      {
        name: "Yodo Inorganico",
        description: "Mineral clave para la salud respiratoria, potencia las propiedades antibacterianas e inmunoestimulantes junto al eucalipto y la vitamina C."
      },
      {
        name: "Timol",
        description: "Compuesto natural del tomillo y oregano con propiedades antibacterianas, antifungicas, antiinflamatorias y expectorantes."
      },
      {
        name: "L-mentol",
        description: "Descongestionante natural que alivia la inflamacion, mejora la respiracion, y reduce la carga microbiana."
      },
      {
        name: "Plata Coloidal",
        description: "Poderoso antibacteriano, antiviral y desinfectante que mejora la respuesta inmune y combate infecciones."
      },
      {
        name: "Nano Colageno",
        description: "Colageno de ultra baja particula que fortalece los tejidos respiratorios, reduce la inflamacion y acelera la recuperacion."
      }
    ],
    dosage: [
      { weight: "Hasta 5 kg", dose: "1 ml cada 12 horas" },
      { weight: "5 - 15 kg", dose: "2 ml cada 12 horas" },
      { weight: "15 - 30 kg", dose: "3 ml cada 12 horas" },
      { weight: "Mas de 30 kg", dose: "5 ml cada 12 horas" },
    ],
    usage: [
      "Administrar directamente en la boca",
      "Puede nebulizarse para casos respiratorios severos",
      "Uso oral y aromatizante",
      "Tratamiento recomendado: 7-14 dias segun severidad"
    ],
    warnings: [
      "Uso exclusivo veterinario",
      "No administrar en animales con alergia conocida a alguno de los componentes",
      "Consultar veterinario en casos de gestacion",
      "Mantener fuera del alcance de los ninos"
    ],
    storage: "Conservar en lugar fresco y seco, protegido de la luz solar directa. No refrigerar.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qZ5vrkfp0EUWuOKo5QtjotiCGEWkh3.png"
  },
  {
    id: 3,
    slug: "glucopass",
    name: "Glucopass",
    tagline: "Control Natural de Glucosa",
    description: "Control natural de glucosa para mascotas con problemas metabolicos. Formula avanzada con ingredientes nanoencapsulados.",
    longDescription: "Glucopass es una formula veterinaria avanzada disenada para ayudar en el control de los niveles de glucosa en perros y gatos. Utilizando nanotecnologia de ultima generacion, sus ingredientes activos se absorben de manera optima, proporcionando un soporte metabolico integral para mascotas con diabetes o predisposicion a problemas de glucosa.",
    price: 94900,
    originalPrice: null,
    rating: 4.7,
    reviews: 98,
    badge: null,
    category: "Metabolismo",
    registro: "ICA: En tramite",
    pets: ["perro", "gato"],
    benefits: ["Control glucosa", "Metabolismo", "Energia", "Antioxidante"],
    presentations: [
      { size: "30ml", price: 94900 },
      { size: "120ml", price: 319900 },
    ],
    ingredients: [
      {
        name: "Berberina Nanoencapsulada",
        description: "Compuesto natural que ayuda a regular los niveles de glucosa en sangre y mejora la sensibilidad a la insulina."
      },
      {
        name: "Canela de Ceylon",
        description: "Extracto que contribuye al metabolismo normal de la glucosa y tiene propiedades antioxidantes."
      },
      {
        name: "Cromo",
        description: "Mineral traza esencial para el metabolismo de carbohidratos y el mantenimiento de niveles normales de glucosa."
      },
      {
        name: "Acido Alfa Lipoico",
        description: "Potente antioxidante que apoya la funcion metabolica y la utilizacion de glucosa celular."
      }
    ],
    dosage: [
      { weight: "Hasta 5 kg", dose: "0.5 ml cada 12 horas" },
      { weight: "5 - 15 kg", dose: "1 ml cada 12 horas" },
      { weight: "15 - 30 kg", dose: "1.5 ml cada 12 horas" },
      { weight: "Mas de 30 kg", dose: "2 ml cada 12 horas" },
    ],
    usage: [
      "Administrar antes de las comidas principales",
      "Puede mezclarse con alimento humedo",
      "Monitorear niveles de glucosa regularmente",
      "Uso continuo bajo supervision veterinaria"
    ],
    warnings: [
      "No reemplaza el tratamiento de insulina prescrito",
      "Monitoreo veterinario obligatorio",
      "No usar en animales gestantes o lactantes",
      "Puede potenciar efectos de medicamentos hipoglucemiantes"
    ],
    storage: "Conservar en lugar fresco y seco. Proteger de la humedad. Una vez abierto, consumir en 45 dias.",
    image: "/images/glucopass.jpg"
  }
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id)
}
