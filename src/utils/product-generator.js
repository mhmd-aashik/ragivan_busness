// Product generator for creating 80+ products across different categories
const categories = [
  "Keyboards",
  "Mice",
  "Audio",
  "Monitors",
  "Laptops",
  "Graphics Cards",
  "Storage",
  "Memory",
  "Motherboards",
  "CPUs",
  "Cooling",
  "Cases",
  "Power Supplies",
  "Accessories",
  "Networking",
  "Cameras",
  "Tablets",
  "Phones",
];

const brands = {
  Keyboards: [
    "Corsair",
    "Razer",
    "Logitech",
    "SteelSeries",
    "HyperX",
    "Ducky",
    "Keychron",
    "Varmilo",
    "Leopold",
    "Filco",
  ],
  Mice: [
    "Logitech",
    "Razer",
    "SteelSeries",
    "Corsair",
    "Zowie",
    "Glorious",
    "Finalmouse",
    "Pulsar",
    "Xtrfy",
    "Roccat",
  ],
  Audio: [
    "Sony",
    "Sennheiser",
    "Audio-Technica",
    "Beyerdynamic",
    "SteelSeries",
    "HyperX",
    "Corsair",
    "JBL",
    "Bose",
    "AKG",
  ],
  Monitors: [
    "ASUS",
    "Dell",
    "LG",
    "Samsung",
    "BenQ",
    "Acer",
    "MSI",
    "ViewSonic",
    "AOC",
    "HP",
  ],
  Laptops: [
    "Apple",
    "Dell",
    "HP",
    "Lenovo",
    "ASUS",
    "MSI",
    "Acer",
    "Razer",
    "Alienware",
    "Framework",
  ],
  "Graphics Cards": [
    "NVIDIA",
    "AMD",
    "ASUS",
    "MSI",
    "Gigabyte",
    "EVGA",
    "Sapphire",
    "PowerColor",
    "XFX",
    "Zotac",
  ],
  Storage: [
    "Samsung",
    "Western Digital",
    "Seagate",
    "Crucial",
    "Kingston",
    "SanDisk",
    "Intel",
    "ADATA",
    "Corsair",
    "Sabrent",
  ],
  Memory: [
    "Corsair",
    "G.Skill",
    "Kingston",
    "Crucial",
    "TeamGroup",
    "Patriot",
    "ADATA",
    "HyperX",
    "OLOy",
    "Silicon Power",
  ],
  Motherboards: [
    "ASUS",
    "MSI",
    "Gigabyte",
    "ASRock",
    "EVGA",
    "Biostar",
    "Supermicro",
    "ASRock Rack",
    "Colorful",
    "Maxsun",
  ],
  CPUs: ["Intel", "AMD", "Apple"],
  Cooling: [
    "Noctua",
    "Corsair",
    "Cooler Master",
    "be quiet!",
    "Arctic",
    "Thermaltake",
    "NZXT",
    "Fractal Design",
    "Scythe",
    "ID-Cooling",
  ],
  Cases: [
    "Fractal Design",
    "NZXT",
    "Corsair",
    "Lian Li",
    "Cooler Master",
    "Phanteks",
    "be quiet!",
    "Thermaltake",
    "Antec",
    "Rosewill",
  ],
  "Power Supplies": [
    "Corsair",
    "Seasonic",
    "EVGA",
    "be quiet!",
    "Cooler Master",
    "Thermaltake",
    "Antec",
    "FSP",
    "Super Flower",
    "Rosewill",
  ],
  Accessories: [
    "Corsair",
    "SteelSeries",
    "Razer",
    "Logitech",
    "HyperX",
    "NZXT",
    "Cooler Master",
    "Thermaltake",
    "Lian Li",
    "Phanteks",
  ],
  Networking: [
    "TP-Link",
    "Netgear",
    "ASUS",
    "Linksys",
    "Ubiquiti",
    "Cisco",
    "D-Link",
    "Zyxel",
    "Mikrotik",
    "Aruba",
  ],
  Cameras: [
    "Canon",
    "Nikon",
    "Sony",
    "Fujifilm",
    "Panasonic",
    "Olympus",
    "Leica",
    "Pentax",
    "Sigma",
    "Tamron",
  ],
  Tablets: [
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "Huawei",
    "Amazon",
    "Google",
    "OnePlus",
    "Xiaomi",
    "Realme",
  ],
  Phones: [
    "Apple",
    "Samsung",
    "Google",
    "OnePlus",
    "Xiaomi",
    "Huawei",
    "Sony",
    "LG",
    "Motorola",
    "Nothing",
  ],
};

const features = {
  Keyboards: [
    "RGB Backlight",
    "Mechanical Switches",
    "Wireless",
    "Gaming Mode",
    "Macro Keys",
    "Hot-swappable",
    "Numeric Keypad",
    "Compact Layout",
  ],
  Mice: [
    "Wireless",
    "High DPI",
    "RGB Lighting",
    "Ergonomic",
    "Gaming",
    "Programmable Buttons",
    "Ultra Light",
    "Ambidextrous",
  ],
  Audio: [
    "Wireless",
    "Noise Cancelling",
    "Surround Sound",
    "Studio Quality",
    "Gaming",
    "Bluetooth",
    "Wired",
    "Microphone",
  ],
  Monitors: [
    "4K UHD",
    "144Hz",
    "HDR",
    "Curved",
    "Gaming",
    "Professional",
    "USB-C",
    "FreeSync",
    "G-Sync",
    "IPS Panel",
  ],
  Laptops: [
    "Gaming",
    "Professional",
    "Ultrabook",
    "2-in-1",
    "Touchscreen",
    "Gaming GPU",
    "High Resolution",
    "Long Battery",
  ],
  "Graphics Cards": [
    "Gaming",
    "Ray Tracing",
    "AI",
    "High Performance",
    "Low Power",
    "Compact",
    "Overclocked",
    "RGB",
  ],
  Storage: [
    "NVMe SSD",
    "SATA SSD",
    "HDD",
    "High Speed",
    "Large Capacity",
    "Portable",
    "Internal",
    "External",
  ],
  Memory: [
    "DDR4",
    "DDR5",
    "High Speed",
    "Low Latency",
    "RGB",
    "Gaming",
    "Professional",
    "Overclocked",
  ],
  Motherboards: [
    "Gaming",
    "Professional",
    "WiFi",
    "Bluetooth",
    "RGB",
    "Overclocking",
    "High End",
    "Budget",
  ],
  CPUs: [
    "High Performance",
    "Gaming",
    "Professional",
    "Low Power",
    "Overclocked",
    "Multi-core",
    "High Frequency",
  ],
  Cooling: [
    "Air Cooling",
    "Liquid Cooling",
    "RGB",
    "Silent",
    "High Performance",
    "Compact",
    "Professional",
  ],
  Cases: [
    "Gaming",
    "Professional",
    "RGB",
    "Tempered Glass",
    "Compact",
    "Full Tower",
    "Mid Tower",
    "Mini ITX",
  ],
  "Power Supplies": [
    "Modular",
    "Semi-modular",
    "80 Plus Gold",
    "80 Plus Platinum",
    "Silent",
    "High Efficiency",
    "Gaming",
  ],
  Accessories: [
    "RGB",
    "Gaming",
    "Professional",
    "Wireless",
    "Wired",
    "High Quality",
    "Durable",
  ],
  Networking: [
    "WiFi 6",
    "WiFi 6E",
    "Gigabit",
    "10 Gigabit",
    "Mesh",
    "Gaming",
    "Professional",
    "High Speed",
  ],
  Cameras: [
    "Mirrorless",
    "DSLR",
    "4K Video",
    "Professional",
    "Gaming",
    "Compact",
    "High Resolution",
  ],
  Tablets: [
    "Gaming",
    "Professional",
    "Drawing",
    "High Resolution",
    "Long Battery",
    "Stylus Support",
  ],
  Phones: [
    "Gaming",
    "Professional",
    "High Resolution",
    "Long Battery",
    "Fast Charging",
    "5G",
  ],
};

const descriptions = {
  Keyboards:
    "High-quality keyboard designed for productivity and gaming with advanced features and premium build quality.",
  Mice: "Precision gaming mouse with advanced sensor technology and ergonomic design for optimal performance.",
  Audio:
    "Premium audio equipment delivering exceptional sound quality and comfort for extended use.",
  Monitors:
    "High-resolution display with advanced features for gaming, professional work, and entertainment.",
  Laptops:
    "Powerful laptop computer designed for productivity, gaming, and professional applications.",
  "Graphics Cards":
    "High-performance graphics card for gaming, content creation, and professional applications.",
  Storage:
    "Fast and reliable storage solution for your data with high-speed performance and durability.",
  Memory:
    "High-speed memory modules for improved system performance and multitasking capabilities.",
  Motherboards:
    "Feature-rich motherboard providing the foundation for your high-performance computer system.",
  CPUs: "High-performance processor delivering exceptional computing power for demanding applications.",
  Cooling:
    "Efficient cooling solution to keep your system running cool and quiet under heavy loads.",
  Cases:
    "Premium computer case with excellent airflow, cable management, and modern design features.",
  "Power Supplies":
    "Reliable power supply unit delivering clean, stable power to your computer components.",
  Accessories:
    "Essential accessories to enhance your computing experience and improve productivity.",
  Networking:
    "High-speed networking equipment for fast, reliable internet connectivity and data transfer.",
  Cameras:
    "Professional camera equipment for photography and videography with advanced features.",
  Tablets:
    "Versatile tablet computer perfect for work, entertainment, and creative applications.",
  Phones:
    "Advanced smartphone with cutting-edge features and exceptional performance.",
};

function generateProducts() {
  const products = [];
  let id = 1;

  categories.forEach((category) => {
    const categoryBrands = brands[category] || ["Generic"];
    const categoryFeatures = features[category] || ["High Quality"];
    const categoryDescription =
      descriptions[category] || "High-quality product with excellent features.";

    // Generate 5-6 products per category
    const productsPerCategory = Math.floor(Math.random() * 2) + 5;

    for (let i = 0; i < productsPerCategory; i++) {
      const brand =
        categoryBrands[Math.floor(Math.random() * categoryBrands.length)];
      const basePrice = Math.floor(Math.random() * 50000) + 1000; // 1000 to 51000
      const discount = Math.floor(Math.random() * 30) + 5; // 5% to 35%
      const price = Math.floor(basePrice * (1 - discount / 100));
      const rating = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 to 5.0
      const reviewCount = Math.floor(Math.random() * 500) + 10;

      const product = {
        id: id.toString(),
        name: `${brand} ${category} ${Math.floor(Math.random() * 999) + 100}`,
        price: price,
        rating: parseFloat(rating),
        image: `/assets/images/carocel${(id % 3) + 1}.jpg`,
        category: category,
        brand: brand,
        originalPrice: basePrice,
        discount: discount,
        reviewCount: reviewCount,
        isNew: Math.random() < 0.2, // 20% chance
        isBestSeller: Math.random() < 0.3, // 30% chance
        featured: Math.random() < 0.4, // 40% chance
        features: categoryFeatures.slice(0, Math.floor(Math.random() * 4) + 2),
        description: categoryDescription,
        specifications: generateSpecifications(category),
        reviews: [],
        createdAt: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
        ).toISOString(),
        tags: generateTags(category, brand),
        availability: Math.random() < 0.9 ? "in-stock" : "out-of-stock",
        shipping: Math.random() < 0.8 ? "free" : "paid",
      };

      products.push(product);
      id++;
    }
  });

  return products;
}

function generateSpecifications(category) {
  const specs = {};

  switch (category) {
    case "Keyboards":
      specs["Switch Type"] = [
        "Cherry MX Red",
        "Cherry MX Blue",
        "Gateron Red",
        "Gateron Blue",
      ][Math.floor(Math.random() * 4)];
      specs["Connectivity"] = ["USB", "Bluetooth", "Wireless 2.4GHz"][
        Math.floor(Math.random() * 3)
      ];
      specs["Backlight"] = ["RGB", "Single Color", "None"][
        Math.floor(Math.random() * 3)
      ];
      break;
    case "Mice":
      specs["Sensor"] = [
        "PixArt PAW3370",
        "Focus Pro 30K",
        "Hero 25K",
        "PMW3310",
      ][Math.floor(Math.random() * 4)];
      specs["DPI Range"] = "100-16000";
      specs["Connectivity"] = ["USB", "Wireless 2.4GHz", "Bluetooth"][
        Math.floor(Math.random() * 3)
      ];
      break;
    case "Audio":
      specs["Driver Size"] = ["40mm", "45mm", "50mm"][
        Math.floor(Math.random() * 3)
      ];
      specs["Frequency Response"] = "20-20000 Hz";
      specs["Connectivity"] = ["Wired", "Bluetooth", "Wireless 2.4GHz"][
        Math.floor(Math.random() * 3)
      ];
      break;
    case "Monitors":
      specs["Screen Size"] = ["24 inches", "27 inches", "32 inches"][
        Math.floor(Math.random() * 3)
      ];
      specs["Resolution"] = ["1920x1080", "2560x1440", "3840x2160"][
        Math.floor(Math.random() * 3)
      ];
      specs["Refresh Rate"] = ["60Hz", "144Hz", "240Hz"][
        Math.floor(Math.random() * 3)
      ];
      break;
    default:
      specs["Type"] = "Standard";
      specs["Compatibility"] = "Universal";
  }

  return specs;
}

function generateTags(category, brand) {
  const baseTags = [category.toLowerCase(), brand.toLowerCase()];
  const additionalTags = [
    "gaming",
    "professional",
    "wireless",
    "rgb",
    "premium",
    "high-quality",
  ];

  const numAdditional = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < numAdditional; i++) {
    const tag =
      additionalTags[Math.floor(Math.random() * additionalTags.length)];
    if (!baseTags.includes(tag)) {
      baseTags.push(tag);
    }
  }

  return baseTags;
}

// Generate and export the products
const generatedProducts = generateProducts();
console.log(`Generated ${generatedProducts.length} products`);

// Write to file (this would be done in a Node.js environment)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { generateProducts, generatedProducts };
}
