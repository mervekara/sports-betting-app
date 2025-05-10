import { motion, AnimatePresence } from "framer-motion";
import type { AccordionProps } from "./Accordion.types";

export const Accordion = ({
  label,
  isOpen,
  onToggle,
  children,
}: AccordionProps) => {
  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left text-sm font-medium text-gray-800 py-2 px-2 hover:bg-gray-100 rounded transition-colors"
      >
        {label}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pl-4 mt-1 border-l-2 border-blue-500 max-h-[300px] overflow-hidden"
          >
            <div className="overflow-y-auto max-h-[250px] pr-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
