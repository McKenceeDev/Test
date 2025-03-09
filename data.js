// Datos de ejemplo para la aplicación GM Connect

// Vehículos disponibles para la compra
const vehicles = [
    { name: "Chevrolet Onix", price: "$80,000,000 COP", image: "onix.jpg", model: "Onix" },
    { name: "Chevrolet Tracker", price: "$100,000,000 COP", image: "tracker.jpg", model: "Tracker" },
    { name: "Chevrolet Equinox", price: "$120,000,000 COP", image: "equinox.jpg", model: "Equinox" },
    { name: "Chevrolet Tahoe", price: "$200,000,000 COP", image: "tahoe.jpg", model: "Tahoe" }
];

// Inventario disponible en concesionarios
const inventory = [
    { model: "Onix", count: 15, colors: ["Rojo", "Blanco"], location: "Bogotá" },
    { model: "Tracker", count: 10, colors: ["Azul", "Negro"], location: "Medellín" },
    { model: "Equinox", count: 8, colors: ["Negro", "Gris"], location: "Cali" },
    { model: "Tahoe", count: 5, colors: ["Blanco", "Plateado"], location: "Barranquilla" }
];

// Servicios en curso
const services = [
    { plate: "ABC123", model: "Onix", progress: 70, completed: ["Cambio de aceite"], pending: "Revisión de frenos", estimatedTime: "2 horas" },
    { plate: "XYZ789", model: "Tracker", progress: 40, completed: ["Diagnóstico general"], pending: "Cambio de pastillas de freno", estimatedTime: "3 horas" }
];

// Imágenes de vehículos desde URLs externas
const vehicleImages = {
    "Onix": "https://assets.static-gm.com/Assets/925e467e-b354-4c6a-bee7-094286fb63d9/1aff42ab-308c-4ca7-82fe-6a132c776268/v-1679531412/Desktop.webp",
    "Tracker": "https://www.chevrolet.com.co/content/dam/chevrolet/south-america/colombia/espanol/index/crossovers-and-suvs/2021-new-tracker-turbo/drp-refresh/masthead/mh-retail/agosto-24/tracker-turbo-desk.jpg?imwidth=960",
    "Equinox": "https://www.boycesuite.com/assets/components/phpthumbof/cache/chevroletbarbadosthumb1.468fe4c8a1068f0b34b224f264fe1f68.png",
    "Tahoe": "https://di-uploads-pod1.dealerinspire.com/dalebenetchevy/uploads/2022/07/2022-Chevrolet-Suburban-Premier-Left.jpg"
};

// Íconos SVG para las tarjetas de estadísticas
const statIcons = [
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0170CE" stroke-width="2"><path d="M19 17h2l.64-2.54c.24-.959.24-1.962 0-2.92l-1.07-4.27A2 2 0 0 0 18.65 6H5.35a2 2 0 0 0-1.92 1.27L2.36 11.54c-.24.96-.24 1.96 0 2.92L3 17h2"></path><path d="M14 5h-4M5 9l2 8h10l2-8"></path></svg>',
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E31937" stroke-width="2"><path d="M12 2L1 21h22L12 2v0z"></path><path d="M12 9v5"></path><path d="M12 17.5v.5"></path></svg>',
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0170CE" stroke-width="2"><path d="M12 20h9"></path><path d="m3 20 1.3-3.9C4.424 15.65 5.642 14 13 14l-4-8M9.5 9.5v-4L11 2 9.5 5.5m0 4L4 5.5 2 8l6.5 1.5z"></path></svg>',
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0170CE" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>'
];
