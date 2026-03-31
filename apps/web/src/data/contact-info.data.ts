export interface ContactInfoItem {
  icon: string;
  label: string;
  value: string;
  href: string;
}

export const CONTACT_INFO: ContactInfoItem[] = [
  { icon: "Mail", label: "Email", value: "info@beetstack.in", href: "mailto:info@beetstack.in" },
  { icon: "Globe", label: "Website", value: "www.beetstack.in", href: "https://www.beetstack.in" },
  { icon: "WhatsApp", label: "WhatsApp", value: "+91 6282345226", href: "https://wa.me/916282345226" },
  { icon: "Phone", label: "Roshin", value: "+91 9037275308", href: "tel:+919037275308" },
];
