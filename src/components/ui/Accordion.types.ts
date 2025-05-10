import type { ReactNode } from "react";

export interface AccordionProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}
