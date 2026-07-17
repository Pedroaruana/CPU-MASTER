export type Brand = "amd" | "nvidia" | "intel";
export type RamType = "DDR4" | "DDR5";
export type FormFactor = "ATX" | "mATX" | "ITX";
export type SsdInterface = "NVMe M.2" | "SATA";

export type Motherboard = {
  id: string;
  brand: Brand;
  name: string;
  socket: string;
  ramType: RamType;
  formFactor: FormFactor;
  m2Slots: number;
  priceBRL: number;
};

export type Gpu = {
  id: string;
  brand: Brand;
  name: string;
  lengthMm: number;
  recommendedPsuW: number;
  tdpW: number;
  priceBRL: number;
  tier: number;
};

export type Ram = {
  id: string;
  name: string;
  type: RamType;
  capacityGb: number;
  priceBRL: number;
};

export type Ssd = {
  id: string;
  name: string;
  interface: SsdInterface;
  capacityGb: number;
  priceBRL: number;
};

export type Cpu = {
  id: string;
  brand: Brand;
  name: string;
  socket: string;
  tdpW: number;
  priceBRL: number;
  tier: number;
};

export type CoolerType = "Air" | "AIO";

export type Cooler = {
  id: string;
  name: string;
  type: CoolerType;
  sockets: string[];
  radiatorMm?: number;
  priceBRL: number;
};

export type Psu = {
  id: string;
  name: string;
  wattage: number;
  priceBRL: number;
};

export const motherboards: Motherboard[] = [
  { id: "asrock-b450m", brand: "amd", name: "ASRock B450M Pro4", socket: "AM4", ramType: "DDR4", formFactor: "mATX", m2Slots: 1, priceBRL: 549 },
  { id: "asus-b550f", brand: "amd", name: "ASUS ROG Strix B550-F", socket: "AM4", ramType: "DDR4", formFactor: "ATX", m2Slots: 2, priceBRL: 1199 },
  { id: "msi-b550m", brand: "amd", name: "MSI B550M Pro-VDH", socket: "AM4", ramType: "DDR4", formFactor: "mATX", m2Slots: 1, priceBRL: 649 },
  { id: "gigabyte-b550-aorus", brand: "amd", name: "Gigabyte B550 Aorus Elite", socket: "AM4", ramType: "DDR4", formFactor: "ATX", m2Slots: 2, priceBRL: 899 },
  { id: "asrock-x570", brand: "amd", name: "ASRock X570 Phantom Gaming 4", socket: "AM4", ramType: "DDR4", formFactor: "ATX", m2Slots: 2, priceBRL: 1299 },
  { id: "asrock-b650m", brand: "amd", name: "ASRock B650M Pro RS", socket: "AM5", ramType: "DDR5", formFactor: "mATX", m2Slots: 2, priceBRL: 999 },
  { id: "asus-tuf-b650", brand: "amd", name: "ASUS TUF Gaming B650-Plus", socket: "AM5", ramType: "DDR5", formFactor: "ATX", m2Slots: 2, priceBRL: 1399 },
  { id: "msi-b650-tomahawk", brand: "amd", name: "MSI B650 Tomahawk", socket: "AM5", ramType: "DDR5", formFactor: "ATX", m2Slots: 2, priceBRL: 1799 },
  { id: "gigabyte-x670", brand: "amd", name: "Gigabyte X670 Aorus Elite", socket: "AM5", ramType: "DDR5", formFactor: "ATX", m2Slots: 3, priceBRL: 2199 },
  { id: "msi-x670e-carbon", brand: "amd", name: "MSI X670E Carbon WiFi", socket: "AM5", ramType: "DDR5", formFactor: "ATX", m2Slots: 4, priceBRL: 2999 },
  { id: "asus-rog-x870", brand: "amd", name: "ASUS ROG Strix X870-A", socket: "AM5", ramType: "DDR5", formFactor: "ATX", m2Slots: 4, priceBRL: 2699 },
  { id: "asrock-h610m", brand: "intel", name: "ASRock H610M-HVS", socket: "LGA1700", ramType: "DDR4", formFactor: "mATX", m2Slots: 1, priceBRL: 549 },
  { id: "gigabyte-b660", brand: "intel", name: "Gigabyte B660 Aorus Elite", socket: "LGA1700", ramType: "DDR4", formFactor: "ATX", m2Slots: 2, priceBRL: 999 },
  { id: "msi-b760m", brand: "intel", name: "MSI PRO B760M-A", socket: "LGA1700", ramType: "DDR5", formFactor: "mATX", m2Slots: 2, priceBRL: 899 },
  { id: "gigabyte-z690", brand: "intel", name: "Gigabyte Z690 Aorus Elite", socket: "LGA1700", ramType: "DDR5", formFactor: "ATX", m2Slots: 3, priceBRL: 1599 },
  { id: "asus-z790", brand: "intel", name: "ASUS Prime Z790-P", socket: "LGA1700", ramType: "DDR5", formFactor: "ATX", m2Slots: 3, priceBRL: 1899 },
  { id: "asus-tuf-z790", brand: "intel", name: "ASUS TUF Gaming Z790-Plus", socket: "LGA1700", ramType: "DDR5", formFactor: "ATX", m2Slots: 4, priceBRL: 1799 },
  { id: "msi-b860p", brand: "intel", name: "MSI PRO B860-P", socket: "LGA1851", ramType: "DDR5", formFactor: "ATX", m2Slots: 3, priceBRL: 1199 },
  { id: "asus-rog-z890", brand: "intel", name: "ASUS ROG Strix Z890-E", socket: "LGA1851", ramType: "DDR5", formFactor: "ATX", m2Slots: 4, priceBRL: 2899 },
];

export const gpus: Gpu[] = [
  { id: "rtx-3060", brand: "nvidia", name: "Nvidia RTX 3060", lengthMm: 242, recommendedPsuW: 550, tdpW: 170, priceBRL: 1699, tier: 4 },
  { id: "rtx-3060ti", brand: "nvidia", name: "Nvidia RTX 3060 Ti", lengthMm: 242, recommendedPsuW: 600, tdpW: 200, priceBRL: 1999, tier: 5 },
  { id: "rtx-3070", brand: "nvidia", name: "Nvidia RTX 3070", lengthMm: 242, recommendedPsuW: 650, tdpW: 220, priceBRL: 2399, tier: 6 },
  { id: "rtx-3080", brand: "nvidia", name: "Nvidia RTX 3080", lengthMm: 285, recommendedPsuW: 750, tdpW: 320, priceBRL: 3299, tier: 7 },
  { id: "rtx-4060", brand: "nvidia", name: "Nvidia RTX 4060", lengthMm: 245, recommendedPsuW: 550, tdpW: 115, priceBRL: 2199, tier: 4 },
  { id: "rtx-4060ti", brand: "nvidia", name: "Nvidia RTX 4060 Ti", lengthMm: 250, recommendedPsuW: 550, tdpW: 160, priceBRL: 2599, tier: 5 },
  { id: "rtx-4070", brand: "nvidia", name: "Nvidia RTX 4070", lengthMm: 285, recommendedPsuW: 650, tdpW: 200, priceBRL: 3599, tier: 6 },
  { id: "rtx-4070super", brand: "nvidia", name: "Nvidia RTX 4070 Super", lengthMm: 285, recommendedPsuW: 650, tdpW: 220, priceBRL: 3999, tier: 7 },
  { id: "rtx-4070ti", brand: "nvidia", name: "Nvidia RTX 4070 Ti", lengthMm: 300, recommendedPsuW: 700, tdpW: 285, priceBRL: 4599, tier: 7 },
  { id: "rtx-4070tisuper", brand: "nvidia", name: "Nvidia RTX 4070 Ti Super", lengthMm: 305, recommendedPsuW: 700, tdpW: 285, priceBRL: 4999, tier: 8 },
  { id: "rtx-4080", brand: "nvidia", name: "Nvidia RTX 4080", lengthMm: 310, recommendedPsuW: 750, tdpW: 320, priceBRL: 5999, tier: 8 },
  { id: "rtx-4080super", brand: "nvidia", name: "Nvidia RTX 4080 Super", lengthMm: 310, recommendedPsuW: 750, tdpW: 320, priceBRL: 6499, tier: 9 },
  { id: "rtx-4090", brand: "nvidia", name: "Nvidia RTX 4090", lengthMm: 336, recommendedPsuW: 850, tdpW: 450, priceBRL: 9999, tier: 10 },
  { id: "rtx-5070", brand: "nvidia", name: "Nvidia RTX 5070", lengthMm: 280, recommendedPsuW: 650, tdpW: 250, priceBRL: 4499, tier: 7 },
  { id: "rtx-5080", brand: "nvidia", name: "Nvidia RTX 5080", lengthMm: 310, recommendedPsuW: 750, tdpW: 360, priceBRL: 7499, tier: 9 },
  { id: "rtx-5090", brand: "nvidia", name: "Nvidia RTX 5090", lengthMm: 340, recommendedPsuW: 1000, tdpW: 575, priceBRL: 13999, tier: 10 },
  { id: "rx-6600", brand: "amd", name: "AMD RX 6600", lengthMm: 220, recommendedPsuW: 500, tdpW: 132, priceBRL: 1299, tier: 3 },
  { id: "rx-6650xt", brand: "amd", name: "AMD RX 6650 XT", lengthMm: 240, recommendedPsuW: 550, tdpW: 180, priceBRL: 1499, tier: 4 },
  { id: "rx-6700xt", brand: "amd", name: "AMD RX 6700 XT", lengthMm: 267, recommendedPsuW: 650, tdpW: 230, priceBRL: 1899, tier: 5 },
  { id: "rx-6750xt", brand: "amd", name: "AMD RX 6750 XT", lengthMm: 267, recommendedPsuW: 650, tdpW: 250, priceBRL: 1999, tier: 6 },
  { id: "rx-6800", brand: "amd", name: "AMD RX 6800", lengthMm: 267, recommendedPsuW: 700, tdpW: 250, priceBRL: 2599, tier: 7 },
  { id: "rx-6800xt", brand: "amd", name: "AMD RX 6800 XT", lengthMm: 267, recommendedPsuW: 750, tdpW: 300, priceBRL: 2999, tier: 8 },
  { id: "rx-6900xt", brand: "amd", name: "AMD RX 6900 XT", lengthMm: 267, recommendedPsuW: 800, tdpW: 300, priceBRL: 3499, tier: 8 },
  { id: "rx-7600", brand: "amd", name: "AMD RX 7600", lengthMm: 240, recommendedPsuW: 550, tdpW: 165, priceBRL: 1799, tier: 4 },
  { id: "rx-7700xt", brand: "amd", name: "AMD RX 7700 XT", lengthMm: 267, recommendedPsuW: 700, tdpW: 245, priceBRL: 2799, tier: 6 },
  { id: "rx-7800xt", brand: "amd", name: "AMD RX 7800 XT", lengthMm: 300, recommendedPsuW: 700, tdpW: 263, priceBRL: 3299, tier: 7 },
  { id: "rx-7900xtx", brand: "amd", name: "AMD RX 7900 XTX", lengthMm: 330, recommendedPsuW: 850, tdpW: 355, priceBRL: 5499, tier: 9 },
  { id: "rx-9070", brand: "amd", name: "AMD RX 9070", lengthMm: 290, recommendedPsuW: 700, tdpW: 220, priceBRL: 4299, tier: 7 },
  { id: "rx-9070xt", brand: "amd", name: "AMD RX 9070 XT", lengthMm: 305, recommendedPsuW: 750, tdpW: 304, priceBRL: 4999, tier: 8 },
];

export const rams: Ram[] = [
  { id: "corsair-ddr4-16", name: "Corsair Vengeance DDR4 16GB", type: "DDR4", capacityGb: 16, priceBRL: 279 },
  { id: "kingston-ddr4-16", name: "Kingston Fury Beast DDR4 16GB", type: "DDR4", capacityGb: 16, priceBRL: 249 },
  { id: "corsair-ddr5-32", name: "Corsair Vengeance DDR5 32GB", type: "DDR5", capacityGb: 32, priceBRL: 799 },
  { id: "gskill-ddr5-32", name: "G.Skill Trident Z5 DDR5 32GB", type: "DDR5", capacityGb: 32, priceBRL: 899 },
];

export const ssds: Ssd[] = [
  { id: "samsung-970evoplus", name: "Samsung 970 EVO Plus (NVMe Gen3) 500GB", interface: "NVMe M.2", capacityGb: 500, priceBRL: 329 },
  { id: "samsung-980pro", name: "Samsung 980 Pro (NVMe Gen4) 1TB", interface: "NVMe M.2", capacityGb: 1000, priceBRL: 549 },
  { id: "samsung-990pro", name: "Samsung 990 Pro (NVMe Gen4) 1TB", interface: "NVMe M.2", capacityGb: 1000, priceBRL: 649 },
  { id: "samsung-990pro-2tb", name: "Samsung 990 Pro (NVMe Gen4) 2TB", interface: "NVMe M.2", capacityGb: 2000, priceBRL: 1199 },
  { id: "wd-sn770", name: "WD Black SN770 (NVMe Gen4) 1TB", interface: "NVMe M.2", capacityGb: 1000, priceBRL: 449 },
  { id: "wd-sn850x", name: "WD Black SN850X (NVMe Gen4) 1TB", interface: "NVMe M.2", capacityGb: 1000, priceBRL: 599 },
  { id: "seagate-firecuda-530", name: "Seagate FireCuda 530 (NVMe Gen4) 1TB", interface: "NVMe M.2", capacityGb: 1000, priceBRL: 599 },
  { id: "kingston-nv2", name: "Kingston NV2 (NVMe Gen4) 1TB", interface: "NVMe M.2", capacityGb: 1000, priceBRL: 399 },
  { id: "kingston-kc3000", name: "Kingston KC3000 (NVMe Gen4) 2TB", interface: "NVMe M.2", capacityGb: 2000, priceBRL: 1099 },
  { id: "xpg-gammix-s70", name: "ADATA XPG Gammix S70 Blade (NVMe Gen4) 1TB", interface: "NVMe M.2", capacityGb: 1000, priceBRL: 579 },
  { id: "corsair-mp600pro", name: "Corsair MP600 Pro (NVMe Gen4) 1TB", interface: "NVMe M.2", capacityGb: 1000, priceBRL: 629 },
  { id: "teamgroup-mp44", name: "TeamGroup MP44 (NVMe Gen4) 1TB", interface: "NVMe M.2", capacityGb: 1000, priceBRL: 479 },
  { id: "crucial-t700", name: "Crucial T700 (NVMe Gen5) 1TB", interface: "NVMe M.2", capacityGb: 1000, priceBRL: 899 },
  { id: "kingston-a400", name: "Kingston A400 480GB", interface: "SATA", capacityGb: 480, priceBRL: 179 },
  { id: "crucial-mx500", name: "Crucial MX500 500GB", interface: "SATA", capacityGb: 500, priceBRL: 219 },
  { id: "samsung-870evo", name: "Samsung 870 EVO 1TB", interface: "SATA", capacityGb: 1000, priceBRL: 399 },
  { id: "seagate-barracuda", name: "Seagate Barracuda 1TB", interface: "SATA", capacityGb: 1000, priceBRL: 329 },
];

export const cpus: Cpu[] = [
  { id: "ryzen-3-4100", brand: "amd", name: "AMD Ryzen 3 4100", socket: "AM4", tdpW: 65, priceBRL: 499, tier: 3 },
  { id: "ryzen-5-5500", brand: "amd", name: "AMD Ryzen 5 5500", socket: "AM4", tdpW: 65, priceBRL: 649, tier: 4 },
  { id: "ryzen-5-5600", brand: "amd", name: "AMD Ryzen 5 5600", socket: "AM4", tdpW: 65, priceBRL: 799, tier: 5 },
  { id: "ryzen-7-5700x", brand: "amd", name: "AMD Ryzen 7 5700X", socket: "AM4", tdpW: 65, priceBRL: 1199, tier: 6 },
  { id: "ryzen-7-5800x3d", brand: "amd", name: "AMD Ryzen 7 5800X3D", socket: "AM4", tdpW: 105, priceBRL: 1699, tier: 7 },
  { id: "ryzen-5-7600", brand: "amd", name: "AMD Ryzen 5 7600", socket: "AM5", tdpW: 65, priceBRL: 1099, tier: 6 },
  { id: "ryzen-7-7700x", brand: "amd", name: "AMD Ryzen 7 7700X", socket: "AM5", tdpW: 105, priceBRL: 1899, tier: 8 },
  { id: "ryzen-7-7800x3d", brand: "amd", name: "AMD Ryzen 7 7800X3D", socket: "AM5", tdpW: 120, priceBRL: 2399, tier: 9 },
  { id: "ryzen-9-7900x", brand: "amd", name: "AMD Ryzen 9 7900X", socket: "AM5", tdpW: 170, priceBRL: 2799, tier: 9 },
  { id: "ryzen-9-7950x", brand: "amd", name: "AMD Ryzen 9 7950X", socket: "AM5", tdpW: 170, priceBRL: 3299, tier: 9 },
  { id: "ryzen-9-9950x", brand: "amd", name: "AMD Ryzen 9 9950X", socket: "AM5", tdpW: 170, priceBRL: 4299, tier: 10 },
  { id: "core-i3-12100f", brand: "intel", name: "Intel Core i3-12100F", socket: "LGA1700", tdpW: 60, priceBRL: 599, tier: 3 },
  { id: "core-i5-12400", brand: "intel", name: "Intel Core i5-12400", socket: "LGA1700", tdpW: 65, priceBRL: 899, tier: 5 },
  { id: "core-i5-13400f", brand: "intel", name: "Intel Core i5-13400F", socket: "LGA1700", tdpW: 65, priceBRL: 1099, tier: 6 },
  { id: "core-i5-14600k", brand: "intel", name: "Intel Core i5-14600K", socket: "LGA1700", tdpW: 125, priceBRL: 1799, tier: 7 },
  { id: "core-i7-12700k", brand: "intel", name: "Intel Core i7-12700K", socket: "LGA1700", tdpW: 125, priceBRL: 1999, tier: 8 },
  { id: "core-i7-13700k", brand: "intel", name: "Intel Core i7-13700K", socket: "LGA1700", tdpW: 125, priceBRL: 2299, tier: 8 },
  { id: "core-i9-13900k", brand: "intel", name: "Intel Core i9-13900K", socket: "LGA1700", tdpW: 150, priceBRL: 3599, tier: 10 },
  { id: "core-i9-14900k", brand: "intel", name: "Intel Core i9-14900K", socket: "LGA1700", tdpW: 150, priceBRL: 3999, tier: 10 },
  { id: "core-ultra5-245k", brand: "intel", name: "Intel Core Ultra 5 245K", socket: "LGA1851", tdpW: 125, priceBRL: 1899, tier: 7 },
  { id: "core-ultra7-265k", brand: "intel", name: "Intel Core Ultra 7 265K", socket: "LGA1851", tdpW: 125, priceBRL: 2599, tier: 8 },
  { id: "core-ultra9-285k", brand: "intel", name: "Intel Core Ultra 9 285K", socket: "LGA1851", tdpW: 125, priceBRL: 3799, tier: 10 },
];

export const coolers: Cooler[] = [
  { id: "cooler-master-hyper-212", name: "Cooler Master Hyper 212", type: "Air", sockets: ["AM4", "AM5", "LGA1700", "LGA1851"], priceBRL: 199 },
  { id: "deepcool-ak400", name: "DeepCool AK400", type: "Air", sockets: ["AM4", "AM5", "LGA1700", "LGA1851"], priceBRL: 249 },
  { id: "corsair-h100i", name: "Corsair iCUE H100i", type: "AIO", sockets: ["AM4", "AM5", "LGA1700", "LGA1851"], radiatorMm: 240, priceBRL: 699 },
  { id: "nzxt-kraken-280", name: "NZXT Kraken 280", type: "AIO", sockets: ["AM4", "AM5", "LGA1700", "LGA1851"], radiatorMm: 280, priceBRL: 899 },
  { id: "deepcool-castle-360", name: "DeepCool Castle 360", type: "AIO", sockets: ["AM4", "AM5", "LGA1700", "LGA1851"], radiatorMm: 360, priceBRL: 799 },
];

export const psus: Psu[] = [
  { id: "corsair-cv550", name: "Corsair CV550", wattage: 550, priceBRL: 349 },
  { id: "corsair-tx650", name: "Corsair TX650", wattage: 650, priceBRL: 549 },
  { id: "xpg-core-reactor-750", name: "XPG Core Reactor 750W", wattage: 750, priceBRL: 699 },
  { id: "corsair-rm850x", name: "Corsair RM850x", wattage: 850, priceBRL: 899 },
  { id: "evga-1000w", name: "EVGA SuperNOVA 1000W", wattage: 1000, priceBRL: 1299 },
];

export const CASE_MAX_GPU_LENGTH_MM = 330;
export const CASE_MAX_RADIATOR_MM = 280;
export const BASE_SYSTEM_W = 100;
export const PSU_HEADROOM = 1.2;

export function priceSearchUrl(store: "kabum" | "amazon", name: string): string {
  const query = encodeURIComponent(name);
  if (store === "kabum") return `https://www.kabum.com.br/busca/${query}`;
  return `https://www.amazon.com.br/s?k=${query}`;
}

export type BuildPreset = {
  id: string;
  label: string;
  motherboardId: string;
  cpuId: string;
  coolerId: string;
  gpuId: string;
  ramId: string;
  ssdId: string;
  psuId: string;
};

export const buildPresets: BuildPreset[] = [
  {
    id: "custo-beneficio",
    label: "Custo-benefício",
    motherboardId: "gigabyte-b660",
    cpuId: "core-i5-12400",
    coolerId: "cooler-master-hyper-212",
    gpuId: "rx-7600",
    ramId: "kingston-ddr4-16",
    ssdId: "kingston-a400",
    psuId: "corsair-cv550",
  },
  {
    id: "gamer",
    label: "Gamer",
    motherboardId: "msi-b550m",
    cpuId: "ryzen-5-5600",
    coolerId: "deepcool-ak400",
    gpuId: "rtx-4070",
    ramId: "corsair-ddr4-16",
    ssdId: "samsung-980pro",
    psuId: "corsair-tx650",
  },
  {
    id: "extremo",
    label: "Extremo",
    motherboardId: "gigabyte-x670",
    cpuId: "ryzen-9-7950x",
    coolerId: "deepcool-castle-360",
    gpuId: "rtx-4090",
    ramId: "gskill-ddr5-32",
    ssdId: "wd-sn850x",
    psuId: "evga-1000w",
  },
];
