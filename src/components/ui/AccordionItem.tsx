import type { ReactNode } from "react";

interface AccordionItemProps {
  children: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

export const AccordionItem = ({
  children,
  onClick,
  isActive,
}: AccordionItemProps) => {
  return (
    <li
      onClick={onClick}
      className={`text-sm cursor-pointer transition-colors px-2 py-1 rounded 
        ${isActive ? "text-blue-600 font-medium bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"}`}
    >
      {children}
    </li>
  );
};
