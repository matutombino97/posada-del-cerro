export const MOCK_ROOMS = [
  {
    id: 'room-1',
    name: "Suite Royal Cordillera",
    price: 350,
    capacity: 2,
    bedType: "King Size",
    description: "Nuestra suite más exclusiva con vista directa al Cordón del Plata y tina de hidromasaje privada.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000"
    ],
    amenities: ['wifi', 'ac', 'tv', 'coffee', 'breakfast', 'pool'],
    published: true
  },
  {
    id: 'room-2',
    name: "Habitación Deluxe Viñedos",
    price: 240,
    capacity: 2,
    bedType: "Queen Size",
    description: "Despierta rodeado de viñas. Una experiencia rústica-moderna con todo el confort boutique.",
    image: "habitacion-deluxe.jpg",
    gallery: [
      "habitacion-deluxe.jpg",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000",
      "https://images.unsplash.com/photo-1537726235470-8504e3beef77?q=80&w=1000"
    ],
    amenities: ['wifi', 'ac', 'tv', 'breakfast', 'pool'],
    published: true
  },
  {
    id: 'room-3',
    name: "Loft Familiar Montaña",
    price: 420,
    capacity: 4,
    bedType: "1 King + 2 Twin",
    description: "Espacio amplio de dos niveles, ideal para familias que buscan desconexión y aventura.",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1000",
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000"
    ],
    amenities: ['wifi', 'ac', 'tv', 'coffee', 'breakfast', 'pool'],
    published: true
  },
  {
    id: 'room-4',
    name: "Master Suite Presidencial",
    price: 580,
    capacity: 2,
    bedType: "Super King Size",
    description: "La joya de la corona. 120m2 de puro lujo con terraza privada, cava de vinos personal y mayordomo las 24hs. Una experiencia diseñada para los gustos más exigentes que buscan la máxima privacidad y exclusividad en el corazón de Mendoza.",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1000"
    ],
    amenities: ['wifi', 'ac', 'tv', 'coffee', 'breakfast', 'pool', 'gym', 'spa'],
    published: true
  }
];

export const MOCK_GALLERY = [
  { id: 'g1', url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000", category: 'espacios' },
  { id: 'g2', url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000", category: 'habitaciones' },
  { id: 'g3', url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000", category: 'espacios' },
  { id: 'g4', url: "https://images.unsplash.com/photo-1506102383123-c8ef1e872756?q=80&w=1000", category: 'jardin' },
  { id: 'g5', url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000", category: 'espacios' },
  { id: 'g6', url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000", category: 'desayuno' },
  { id: 'g7', url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000", category: 'habitaciones' },
  { id: 'g8', url: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1000", category: 'jardin' },
  { id: 'g9', url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000", category: 'habitaciones' },
  { id: 'g10', url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000", category: 'habitaciones' },
  { id: 'g11', url: "patio.jpg", category: 'jardin' },
  { id: 'g12', url: "terraza.jpg", category: 'desayuno' },
  { id: 'g13', url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000", category: 'espacios' },
  { id: 'g14', url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000", category: 'habitaciones' },
  { id: 'g15', url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1000", category: 'espacios' },
  { id: 'g16', url: "pasillo.jpg", category: 'espacios' }
];

export const MOCK_BLOG = [
  {
    id: 'b1',
    title: "5 Viñedos que no puedes perderte en Luján de Cuyo",
    summary: "Descubre la ruta del Malbec con nuestra selección exclusiva de bodegas boutique cerca de la posada.",
    content: `
      <p>Luján de Cuyo es conocida mundialmente como la Tierra del Malbec. Su terroir único, situado a los pies de los Andes, ofrece condiciones inmejorables para el cultivo de la vid. En este artículo, te guiaremos por las 5 bodegas boutique que capturan la esencia más pura de nuestra región.</p>
      
      <p>La primera parada obligatoria es Bodega Lagarde. Con más de 120 años de historia, sus viñedos antiguos son un testimonio viviente de la tradición mendocina. Aquí, el almuerzo bajo los olivos es una experiencia que despierta todos los sentidos, maridando platos regionales con etiquetas de clase mundial.</p>
      
      <p>Continuamos hacia Bodega Vistalba. Fundada por Carlos Pulenta, esta bodega combina arquitectura moderna con métodos tradicionales. Su cava subterránea es una de las más bellas de la zona, proporcionando la temperatura perfecta para que sus cortes reposen hasta alcanzar la perfección.</p>
      
      <p>No podemos olvidar Bodega Casarena. Ubicada en una centenaria propiedad restaurada, se especializa en Single Vineyards. Su enfoque en el detalle y en la expresión máxima de cada micro-región dentro de Luján de Cuyo la convierte en una visita técnica y sensorial fascinante.</p>
      
      <p>Cerca de nuestra posada se encuentra Renacer. Con su arquitectura inspirada en la Toscana, esta bodega destaca por su compromiso con la sustentabilidad. Sus vinos son potentes, elegantes y reflejan el carácter innovador de la nueva generación de enólogos mendocinos.</p>
      
      <p>En quinto lugar, recomendamos Bodega Tierras Altas. Es una bodega familiar donde la cercanía con el proceso es total. Aquí podrás realizar catas directamente de los tanques y barricas, comprendiendo la evolución del vino antes de que llegue a la botella.</p>
      
      <p>Explorar Luján de Cuyo no es solo probar vino, es entender la cultura del esfuerzo y el respeto por la naturaleza. Cada una de estas bodegas tiene una personalidad distinta, pero todas comparten un amor incondicional por el Malbec.</p>
      
      <p>Desde La Posada del Cerro, podemos organizar traslados privados y reservas exclusivas en cada uno de estos establecimientos. Nuestra recomendación es visitar dos bodegas por día para disfrutar de cada recorrido sin prisas, permitiendo que el paisaje y los sabores se asienten en la memoria.</p>
      
      <p>Además de la cata, muchas de estas bodegas ofrecen actividades complementarias como paseos en bicicleta por los viñedos, clases de cocina o incluso sesiones de yoga frente a la cordillera. Existe un plan perfecto para cada tipo de viajero.</p>
      
      <p>Para culminar un día de turismo enológico, nada mejor que regresar a la posada y disfrutar de una copa de tu hallazgo favorito frente a nuestra chimenea, mientras el sol se oculta tras los picos nevados del Cordón del Plata.</p>
    `,
    image: "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=1000",
    category: "Turismo",
    date: "15 Mar 2026",
    createdAt: { seconds: 1742044800 }
  },
  {
    id: 'b2',
    title: "Gastronomía Mendocina: El secreto de nuestras brasas",
    summary: "Conoce nuestra propuesta culinaria donde el fuego y los ingredientes locales son los protagonistas.",
    content: `
      <p>En La Posada del Cerro, creemos en el sabor de la tierra. La cocina mendocina está intrínsecamente ligada al fuego. No es solo un método de cocción, es un ritual que convoca y celebra el producto regional en su estado más genuino.</p>
      
      <p>El secreto de nuestras brasas reside en la elección de la leña. Utilizamos madera de vid y de algarrobo, que aportan aromas sutiles y un calor persistente. Cada corte de carne, cada vegetal de nuestra huerta, pasa por el tamiz de las llamas antes de llegar a la mesa.</p>
      
      <p>Nuestro asado es el protagonista indiscutido. Seleccionamos cuidadosamente las piezas, prefiriendo aquellas de pastura y producción local. El proceso de cocción es lento, respetuoso de los tiempos naturales, logrando texturas que se deshacen en el paladar.</p>
      
      <p>Pero no todo es carne. Los vegetales de estación asados al rescoldo tienen un sabor inigualable. El pimiento, la berenjena y las cebollas adquieren una dulzura especial cuando se cocinan directamente sobre las cenizas calientes.</p>
      
      <p>Las empanadas mendocinas merecen un capítulo aparte. Cocidas en nuestro horno de barro, con un relleno jugoso de carne cortada a cuchillo, son el inicio perfecto para cualquier velada. La masa casera, crocante y con el punto justo de grasa, es una tradición que protegemos con recelo.</p>
      
      <p>La integración con el vino es total. Nuestra carta está diseñada para que cada plato encuentre su compañero ideal. Un Cabernet Sauvignon con cuerpo para el costillar, o un Torrontés fresco para acompañar nuestras humitas en chala.</p>
      
      <p>Creemos en el concepto de "kilómetro cero". La mayoría de nuestros insumos provienen de productores que conocemos por nombre propio. Quesos de cabra de la precordillera, aceite de oliva virgen extra de cavas vecinas y miel de flores silvestres.</p>
      
      <p>El postre no es una excepción. El clásico alcayota con nuez o los higos en almíbar son el cierre dulce que honra los frutales de nuestra provincia. Sabores que nos transportan a las meriendas en las fincas de antaño.</p>
      
      <p>Comer en nuestra posada es un acto de introspección y disfrute. El ambiente relajado, el sonido del fuego crepitando y la vista a las viñas crean un marco donde la comida se disfruta con todos los sentidos.</p>
      
      <p>Te invitamos a participar de nuestras clases de cocina al aire libre. Podrás aprender a encender el fuego, elegir los ingredientes y descubrir por ti mismo por qué el humo es el condimento más importante de Mendoza.</p>
    `,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000",
    category: "Gastronomía",
    date: "10 Mar 2026",
    createdAt: { seconds: 1741612800 }
  }
];
export const MOCK_REVIEWS = [
  {
    id: 'r1',
    name: 'Valentina Ramos',
    rating: 5,
    comment: 'Una experiencia absolutamente mágica. Las vistas al Cordón del Plata desde la suite son impresionantes, y el desayuno casero con productos de la zona fue el mejor que prové. Volvemos sin dudas.',
    photo: 'https://i.pravatar.cc/150?img=47',
    approved: true,
    createdAt: { seconds: 1742044800 }
  },
  {
    id: 'r2',
    name: 'Marcus Hoffmann',
    rating: 5,
    comment: 'Stayed 5 nights and it felt like a home. The team went above and beyond — private wine tasting, sunset horse ride, and the most comfortable bed I\'ve slept in on my entire South America trip.',
    photo: 'https://i.pravatar.cc/150?img=12',
    approved: true,
    createdAt: { seconds: 1741612800 }
  },
  {
    id: 'r3',
    name: 'Camila Fernández',
    rating: 5,
    comment: 'El concepto boutique no es solo marketing acá. Cada detalle está pensado: desde los aromas del cuarto hasta la curación musical del bar. Uno de los mejores lugares donde me hospedé en Argentina.',
    photo: 'https://i.pravatar.cc/150?img=32',
    approved: true,
    createdAt: { seconds: 1741180800 }
  },
  {
    id: 'r4',
    name: 'Diego & Lucia Torres',
    rating: 4,
    comment: 'Fuimos por nuestra luna de miel y superaron todas las expectativas. La privacidad, el silencio y la naturaleza te desconectan completamente. La tina de hidromasaje con vista a la montaña es el lujo definitivo.',
    photo: 'https://i.pravatar.cc/150?img=25',
    approved: true,
    createdAt: { seconds: 1740748800 }
  }
];
