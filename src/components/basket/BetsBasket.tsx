import { motion, AnimatePresence } from "framer-motion";
import BetSlipHeader from "./BetsBasketHeader";
import TotalSummary from "./BetsBasketTotalSummary";
import BetsBasketList from "../lists/BetsBasketList";
import { useAppSelector } from "../../app/hooks";
import { useEffect, useRef, useState } from "react";
import { BETTING_UI_TEXT } from "../../constants/baskets";
import { Button } from "../ui/Button";

const BetsBasket = () => {
  const outcomes = useAppSelector((state) => state.cart.selectedOutcomes) || [];
  const [isOpen, setIsOpen] = useState(true);
  const basketRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (outcomes.length > 0) {
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(outcomes)]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        window.innerWidth < 640 &&
        basketRef.current &&
        !basketRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && outcomes.length > 0 && (
          <motion.div
            ref={basketRef}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-0 right-0 w-full sm:w-[340px] bg-gray-50 p-4 z-50 sm:rounded-tl-xl shadow-md"
          >
            <BetSlipHeader onClose={() => setIsOpen(false)} />
            <BetsBasketList />
            <TotalSummary />
          </motion.div>
        )}
      </AnimatePresence>

      {(!isOpen || outcomes.length === 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 sm:right-6 z-50"
        >
          <Button
            variant={outcomes.length === 0 ? "secondary" : "primary"}
            className="mt-2"
            onClick={() => setIsOpen(true)}
          >
            {outcomes.length === 0
              ? BETTING_UI_TEXT.NO_BETS
              : BETTING_UI_TEXT.SHOW_BET_SLIP}
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default BetsBasket;
