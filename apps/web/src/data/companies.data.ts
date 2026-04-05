export interface Company {
  id: number;
  name: string;
  logo: string;
  /** Logo display width in pixels */
  width: number;
  /** Logo display height in pixels */
  height: number;
}

export const COMPANIES: Company[] = [
  {
    id: 1,
    name: "DNM Global",
    logo: "/images/companies/dnm.png",
    width: 120,
    height: 120,
  },
  {
    id: 2,
    name: "Defence Security Corps",
    logo: "/images/companies/dsc.png",
    width: 70,
    height: 70,
  },
  {
    id: 3,
    name: "Emanate Technologies",
    logo: "/images/companies/emanate.png",
    width: 80,
    height: 80,
  },
  {
    id: 4,
    name: "Opine International FZC",
    logo: "/images/companies/opine.png",
    width: 70,
    height: 70,
  },
];
