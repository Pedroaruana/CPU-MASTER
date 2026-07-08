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
};

export type Gpu = {
  id: string;
  brand: Brand;
  name: string;
  lengthMm: number;
  recommendedPsuW: number;
};

export type Ram = {
  id: string;
  name: string;
  type: RamType;
  capacityGb: number;
};

export type Ssd = {
  id: string;
  name: string;
  interface: SsdInterface;
  capacityGb: number;
};

export type Cpu = {
  id: string;
  brand: Brand;
  name: string;
  socket: string;
};

export type CoolerType = "Air" | "AIO";

export type Cooler = {
  id: string;
  name: string;
  type: CoolerType;
  sockets: string[];
  radiatorMm?: number;
};

export const motherboards: Motherboard[] = [
  { id: "asus-b550f", brand: "amd", name: "ASUS ROG Strix B550-F", socket: "AM4", ramType: "DDR4", formFactor: "ATX", m2Slots: 2 },
  { id: "msi-b550m", brand: "amd", name: "MSI B550M Pro-VDH", socket: "AM4", ramType: "DDR4", formFactor: "mATX", m2Slots: 1 },
  { id: "msi-b650-tomahawk", brand: "amd", name: "MSI B650 Tomahawk", socket: "AM5", ramType: "DDR5", formFactor: "ATX", m2Slots: 2 },
  { id: "gigabyte-x670", brand: "amd", name: "Gigabyte X670 Aorus Elite", socket: "AM5", ramType: "DDR5", formFactor: "ATX", m2Slots: 3 },
  { id: "gigabyte-b660", brand: "intel", name: "Gigabyte B660 Aorus Elite", socket: "LGA1700", ramType: "DDR4", formFactor: "ATX", m2Slots: 2 },
  { id: "asus-z790", brand: "intel", name: "ASUS Prime Z790-P", socket: "LGA1700", ramType: "DDR5", formFactor: "ATX", m2Slots: 3 },
];

export const gpus: Gpu[] = [
  { id: "rtx-4060", brand: "nvidia", name: "Nvidia RTX 4060", lengthMm: 245, recommendedPsuW: 550 },
  { id: "rtx-4070", brand: "nvidia", name: "Nvidia RTX 4070", lengthMm: 285, recommendedPsuW: 650 },
  { id: "rtx-4080", brand: "nvidia", name: "Nvidia RTX 4080", lengthMm: 310, recommendedPsuW: 750 },
  { id: "rtx-4090", brand: "nvidia", name: "Nvidia RTX 4090", lengthMm: 336, recommendedPsuW: 850 },
  { id: "rx-7600", brand: "amd", name: "AMD RX 7600", lengthMm: 240, recommendedPsuW: 550 },
  { id: "rx-7800xt", brand: "amd", name: "AMD RX 7800 XT", lengthMm: 300, recommendedPsuW: 700 },
  { id: "rx-7900xtx", brand: "amd", name: "AMD RX 7900 XTX", lengthMm: 330, recommendedPsuW: 850 },
];

export const rams: Ram[] = [
  { id: "corsair-ddr4-16", name: "Corsair Vengeance DDR4 16GB", type: "DDR4", capacityGb: 16 },
  { id: "kingston-ddr4-16", name: "Kingston Fury Beast DDR4 16GB", type: "DDR4", capacityGb: 16 },
  { id: "corsair-ddr5-32", name: "Corsair Vengeance DDR5 32GB", type: "DDR5", capacityGb: 32 },
  { id: "gskill-ddr5-32", name: "G.Skill Trident Z5 DDR5 32GB", type: "DDR5", capacityGb: 32 },
];

export const ssds: Ssd[] = [
  { id: "samsung-980pro", name: "Samsung 980 Pro", interface: "NVMe M.2", capacityGb: 1000 },
  { id: "wd-sn850x", name: "WD Black SN850X", interface: "NVMe M.2", capacityGb: 1000 },
  { id: "kingston-a400", name: "Kingston A400", interface: "SATA", capacityGb: 480 },
  { id: "crucial-mx500", name: "Crucial MX500", interface: "SATA", capacityGb: 500 },
];

export const cpus: Cpu[] = [
  { id: "ryzen-5-5600", brand: "amd", name: "AMD Ryzen 5 5600", socket: "AM4" },
  { id: "ryzen-7-5800x3d", brand: "amd", name: "AMD Ryzen 7 5800X3D", socket: "AM4" },
  { id: "ryzen-7-7800x3d", brand: "amd", name: "AMD Ryzen 7 7800X3D", socket: "AM5" },
  { id: "ryzen-9-7950x", brand: "amd", name: "AMD Ryzen 9 7950X", socket: "AM5" },
  { id: "core-i5-12400", brand: "intel", name: "Intel Core i5-12400", socket: "LGA1700" },
  { id: "core-i7-13700k", brand: "intel", name: "Intel Core i7-13700K", socket: "LGA1700" },
  { id: "core-i9-13900k", brand: "intel", name: "Intel Core i9-13900K", socket: "LGA1700" },
];

export const coolers: Cooler[] = [
  { id: "cooler-master-hyper-212", name: "Cooler Master Hyper 212", type: "Air", sockets: ["AM4", "AM5", "LGA1700"] },
  { id: "deepcool-ak400", name: "DeepCool AK400", type: "Air", sockets: ["AM4", "AM5", "LGA1700"] },
  { id: "corsair-h100i", name: "Corsair iCUE H100i", type: "AIO", sockets: ["AM4", "AM5", "LGA1700"], radiatorMm: 240 },
  { id: "nzxt-kraken-280", name: "NZXT Kraken 280", type: "AIO", sockets: ["AM4", "AM5", "LGA1700"], radiatorMm: 280 },
  { id: "deepcool-castle-360", name: "DeepCool Castle 360", type: "AIO", sockets: ["AM4", "AM5", "LGA1700"], radiatorMm: 360 },
];

export const CASE_MAX_GPU_LENGTH_MM = 330;
export const CASE_MAX_RADIATOR_MM = 280;
