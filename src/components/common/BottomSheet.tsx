"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { X } from "lucide-react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: string; // ex) "300px", "70vh"
}

const BottomSheet = ({
  open,
  onClose,
  children,
  height = "70vh",
}: BottomSheetProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Bottom Sheet */}
          <motion.div
            className="
              fixed bottom-0
              left-1/2 -translate-x-1/2
              w-full max-w-[480px]
              rounded-t-3xl bg-white z-50 px-2 py-4 shadow-lg
            "
            style={{
              height,
              boxShadow: "0 -8px 20px rgba(0,0,0,0.15)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Close Button */}
            <div className="flex justify-end mb-2 mr-2 text-gray-g5">
              <X className="cursor-pointer" onClick={onClose} />
            </div>

            {/* Content */}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
