import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface MainLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
  isSidebarOpen?: boolean;
  onCloseSidebar?: () => void;
}

export const MainLayout = ({
  sidebar,
  children,
  isSidebarOpen = false,
  onCloseSidebar,
}: MainLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 relative">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r border-gray-200 bg-white p-4">
        {sidebar}
      </aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseSidebar}
            />

            {/* Sidebar */}
            <motion.aside
              className="flex flex-row justify-between fixed top-0 left-0 bottom-0 w-3/4 max-w-sm bg-white z-40 p-4 border-r border-gray-200 md:hidden shadow-lg overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              role="dialog"
              aria-modal="true"
            >
              <div>{sidebar}</div>
              <button
                onClick={onCloseSidebar}
                className="w-8 h-8  items-center rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300  mb-4"
                aria-label="Close sidebar"
              >
                <span className="text-xl text-gray-600">&times;</span>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">{children}</main>
    </div>
  );
};
