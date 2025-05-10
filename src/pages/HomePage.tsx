import { useState } from "react";
import { motion } from "framer-motion";

import { useAppSelector } from "../app/hooks";
import { useFilteredEvents } from "../hooks/useFilteredEvents";
import { useFetchInitialData } from "../hooks/useFetchInitialData";
import { useGroupedSports } from "../hooks/useGroupedSports";

import { MainLayout } from "../components/layout/MainLayout";
import { ContentWrapper } from "../components/states/ContentWrapper";
import SearchBar from "../components/ui/SearchBar";
import MatchList from "../components/lists/MatchList";
import { SportsSidebar } from "../components/sidebar/SportsSidebar";

const HomePage = () => {
  const { selectedSport } = useAppSelector((state) => state.sports);
  const { searchTerm, setSearchTerm, clearSearchTerm, filteredEvents } =
    useFilteredEvents();
  const { groupedSports, status, error } = useGroupedSports();

  useFetchInitialData();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const title = selectedSport?.title || "Select a sport";
  const isEmpty = Object.keys(groupedSports).length === 0;

  return (
    <>
      <MainLayout
        sidebar={<SportsSidebar onItemClick={() => setSidebarOpen(false)} />}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
      >
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold tracking-tight text-gray-800 border-b border-gray-200 pb-1">
            {title}
          </h2>

          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden bg-transparent border border-gray-300 rounded-md p-2"
            aria-label="Open sidebar"
          >
            <div className="space-y-1">
              <span className="block w-5 h-[2px] bg-gray-700 rounded-sm"></span>
              <span className="block w-5 h-[2px] bg-gray-700 rounded-sm"></span>
              <span className="block w-5 h-[2px] bg-gray-700 rounded-sm"></span>
            </div>
          </button>
        </motion.div>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={clearSearchTerm}
        />

        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <ContentWrapper
            status={status}
            error={error}
            isEmpty={isEmpty}
            emptyTitle="No sports available"
            emptyDescription="Try again later or check your network connection."
          >
            <MatchList events={filteredEvents} />
          </ContentWrapper>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default HomePage;
