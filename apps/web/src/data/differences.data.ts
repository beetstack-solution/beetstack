export interface DifferenceItem {
  id: string;
  title: string;
  description: string;
  span: string;
  bgColor: string;
  iconPath: string;
}

export const DIFFERENCES: DifferenceItem[] = [
  { id: "experience", title: "Proven Experience", description: "Deep technical background in building real-world, high-impact systems that drive critical infrastructure.", span: "md:col-span-2", bgColor: "bg-brand-lite-red", iconPath: "M13,2L3,14h9l-1,8l10-12h-9l1-8z" },
  { id: "security", title: "Secure Environments", description: "Architecting software for highly secure and controlled environments with extreme resilience.", span: "col-span-1", bgColor: "bg-brand-green", iconPath: "M12,1L3,5v6c0,5.5,3.8,10.7,9,12c5.2-1.3,9-6.5,9-12V5L12,1z" },
  { id: "custom", title: "Fully Custom", description: "Purpose-built solutions tailored exactly to your unique business logic and operational goals.", span: "col-span-1", bgColor: "bg-brand-green", iconPath: "M19.4,15c0.3-0.8,0.3-1.6,0-2.4l2.1-1.6c0.2-0.2,0.3-0.5,0.1-0.7l-2-3.5c-0.1-0.2-0.4-0.3-0.6-0.2l-2.5,1 c-0.7-0.5-1.4-1-2.2-1.3l-0.4-2.6C14,3.4,13.7,3.2,13.5,3.2h-4c-0.3,0-0.5,0.2-0.6,0.5L8.5,6.3C7.7,6.6,7,7.1,6.3,7.6l-2.5-1 c-0.2-0.1-0.5,0-0.6,0.2l-2,3.5c-0.1,0.2-0.1,0.5,0.1,0.7l2.1,1.6c-0.3,0.8-0.3,1.6,0,2.4l-2.1,1.6c-0.2,0.2-0.3,0.5-0.1,0.7l2,3.5 c0.1,0.2,0.4,0.3,0.6,0.2l2.5-1c0.7,0.5,1.4,1,2.2,1.3l0.4,2.6c0.1,0.3,0.3,0.5,0.6,0.5h4c0.3,0,0.5-0.2,0.6-0.5l0.4-2.6 c0.8-0.3,1.5-0.8,2.2-1.3l2.5,1c0.2,0.1,0.5,0,0.6-0.2l2-3.5c0.1-0.2,0.1-0.5-0.1-0.7L19.4,15z M12,15.5c-1.9,0-3.5-1.6-3.5-3.5 s1.6-3.5,3.5-3.5s3.5,1.6,3.5,3.5S13.9,15.5,12,15.5z" },
  { id: "global", title: "Global Efficiency", description: "Optimized technical delivery models providing premium quality at competitive global scales.", span: "md:col-span-2", bgColor: "bg-brand-lite-red", iconPath: "M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M11,7h2v2h-2V7z M11,11h2v6h-2V11z" },
  { id: "support", title: "Performance & Support", description: "Unwavering focus on scalability, benchmarks, and dedicated long-term technical evolution.", span: "md:col-span-2", bgColor: "bg-brand-lite-red", iconPath: "M16,6l2.29,2.29l-4.88,4.88l-4-4L2,16.59L3.41,18l6-6l4,4l6.3-6.29L22,12V6H16z" },
  { id: "innovation", title: "Technical Precision", description: "Executing complex technical roadmaps with extreme engineering meticulousness and accuracy.", span: "col-span-1", bgColor: "bg-brand-green", iconPath: "M12,2L12,22 M2,12L22,12 M12,12 m-8,0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0" },
];
