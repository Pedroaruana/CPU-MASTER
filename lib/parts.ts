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
  { id: "asus-b550f", brand: "amd", name: "ASUS ROG Strix B550-F", socket: "AM4", ramType: "DDR4", formFactor: "ATX", m2Slots: 2, priceBRL: 1199 },
  { id: "msi-b550m", brand: "amd", name: "MSI B550M Pro-VDH", socket: "AM4", ramType: "DDR4", formFactor: "mATX", m2Slots: 1, priceBRL: 649 },
  { id: "msi-b650-tomahawk", brand: "amd", name: "MSI B650 Tomahawk", socket: "AM5", ramType: "DDR5", formFactor: "ATX", m2Slots: 2, priceBRL: 1799 },
  { id: "gigabyte-x670", brand: "amd", name: "Gigabyte X670 Aorus Elite", socket: "AM5", ramType: "DDR5", formFactor: "ATX", m2Slots: 3, priceBRL: 2199 },
  { id: "gigabyte-b660", brand: "intel", name: "Gigabyte B660 Aorus Elite", socket: "LGA1700", ramType: "DDR4", formFactor: "ATX", m2Slots: 2, priceBRL: 999 },
  { id: "asus-z790", brand: "intel", name: "ASUS Prime Z790-P", socket: "LGA1700", ramType: "DDR5", formFactor: "ATX", m2Slots: 3, priceBRL: 1899 },
];

export const gpus: Gpu[] = [
  { id: "rtx-4060", brand: "nvidia", name: "Nvidia RTX 4060", lengthMm: 245, recommendedPsuW: 550, priceBRL: 2199, tier: 4 },
  { id: "rtx-4070", brand: "nvidia", name: "Nvidia RTX 4070", lengthMm: 285, recommendedPsuW: 650, priceBRL: 3599, tier: 6 },
  { id: "rtx-4080", brand: "nvidia", name: "Nvidia RTX 4080", lengthMm: 310, recommendedPsuW: 750, priceBRL: 5999, tier: 8 },
  { id: "rtx-4090", brand: "nvidia", name: "Nvidia RTX 4090", lengthMm: 336, recommendedPsuW: 850, priceBRL: 9999, tier: 10 },
  { id: "rx-7600", brand: "amd", name: "AMD RX 7600", lengthMm: 240, recommendedPsuW: 550, priceBRL: 1799, tier: 4 },
  { id: "rx-7800xt", brand: "amd", name: "AMD RX 7800 XT", lengthMm: 300, recommendedPsuW: 700, priceBRL: 3299, tier: 7 },
  { id: "rx-7900xtx", brand: "amd", name: "AMD RX 7900 XTX", lengthMm: 330, recommendedPsuW: 850, priceBRL: 5499, tier: 9 },
];

export const rams: Ram[] = [
  { id: "corsair-ddr4-16", name: "Corsair Vengeance DDR4 16GB", type: "DDR4", capacityGb: 16, priceBRL: 279 },
  { id: "kingston-ddr4-16", name: "Kingston Fury Beast DDR4 16GB", type: "DDR4", capacityGb: 16, priceBRL: 249 },
  { id: "corsair-ddr5-32", name: "Corsair Vengeance DDR5 32GB", type: "DDR5", capacityGb: 32, priceBRL: 799 },
  { id: "gskill-ddr5-32", name: "G.Skill Trident Z5 DDR5 32GB", type: "DDR5", capacityGb: 32, priceBRL: 899 },
];

export const ssds: Ssd[] = [
  { id: "samsung-980pro", name: "Samsung 980 Pro", interface: "NVMe M.2", capacityGb: 1000, priceBRL: 549 },
  { id: "wd-sn850x", name: "WD Black SN850X", interface: "NVMe M.2", capacityGb: 1000, priceBRL: 599 },
  { id: "kingston-a400", name: "Kingston A400", interface: "SATA", capacityGb: 480, priceBRL: 179 },
  { id: "crucial-mx500", name: "Crucial MX500", interface: "SATA", capacityGb: 500, priceBRL: 219 },
];

export const cpus: Cpu[] = [
  { id: "ryzen-5-5600", brand: "amd", name: "AMD Ryzen 5 5600", socket: "AM4", priceBRL: 799, tier: 5 },
  { id: "ryzen-7-5800x3d", brand: "amd", name: "AMD Ryzen 7 5800X3D", socket: "AM4", priceBRL: 1699, tier: 7 },
  { id: "ryzen-7-7800x3d", brand: "amd", name: "AMD Ryzen 7 7800X3D", socket: "AM5", priceBRL: 2399, tier: 9 },
  { id: "ryzen-9-7950x", brand: "amd", name: "AMD Ryzen 9 7950X", socket: "AM5", priceBRL: 3299, tier: 9 },
  { id: "core-i5-12400", brand: "intel", name: "Intel Core i5-12400", socket: "LGA1700", priceBRL: 899, tier: 5 },
  { id: "core-i7-13700k", brand: "intel", name: "Intel Core i7-13700K", socket: "LGA1700", priceBRL: 2299, tier: 8 },
  { id: "core-i9-13900k", brand: "intel", name: "Intel Core i9-13900K", socket: "LGA1700", priceBRL: 3599, tier: 10 },
];

export const coolers: Cooler[] = [
  { id: "cooler-master-hyper-212", name: "Cooler Master Hyper 212", type: "Air", sockets: ["AM4", "AM5", "LGA1700"], priceBRL: 199 },
  { id: "deepcool-ak400", name: "DeepCool AK400", type: "Air", sockets: ["AM4", "AM5", "LGA1700"], priceBRL: 249 },
  { id: "corsair-h100i", name: "Corsair iCUE H100i", type: "AIO", sockets: ["AM4", "AM5", "LGA1700"], radiatorMm: 240, priceBRL: 699 },
  { id: "nzxt-kraken-280", name: "NZXT Kraken 280", type: "AIO", sockets: ["AM4", "AM5", "LGA1700"], radiatorMm: 280, priceBRL: 899 },
  { id: "deepcool-castle-360", name: "DeepCool Castle 360", type: "AIO", sockets: ["AM4", "AM5", "LGA1700"], radiatorMm: 360, priceBRL: 799 },
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
