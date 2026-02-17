import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

function SuccessTickPopup({ show, message = "Success!", onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
        >
          <div className="bg-neutral-900 rounded-xl p-6 flex flex-col items-center shadow-lg">
            <CheckCircle className="text-emerald-400 w-16 h-16 mb-4 animate-bounce" />
            <p className="text-white text-lg font-semibold">{message}</p>
            <button
              onClick={onClose}
              className="mt-4 bg-emerald-400 text-black px-4 py-2 rounded hover:bg-emerald-500"
            >
              OK
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SuccessTickPopup;
