'use client'

import classNames from "classnames";
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface SnackbarContextType {
  (message: string, variant?: "success" | "error" | "warning" | "info"): void;
}

interface SnackbarProviderProps {
  children: ReactNode;
}

interface SnackbarState {
  show: boolean;
  message: string;
  variant: "success" | "error" | "warning" | "info";
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

const SNACKBAR_TIMER = 5000;

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    show: false,
    message: "",
    variant: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, show: false }));
  };

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showSnackbar = useCallback<SnackbarContextType>(
    (message, variant = "success") => {
      setSnackbar({ show: true, message, variant });

      // Clear the exsiting timer if it exists
      if(timerRef.current) {
        clearTimeout(timerRef.current)
      }
      // Set a new timer to hide the snackbar after 5 seconds
      timerRef.current = setTimeout(() => {
        handleSnackbarClose();
        timerRef.current = null;
      }, SNACKBAR_TIMER);
    },
    []
  );

  useEffect(() => {
    // Clean up the timer when the component unmounts
    return () => {
        if(timerRef.current) {
            clearTimeout(timerRef.current)
        }
    }
  }, [])

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <div
        className={classNames(
          "transition-transform bottom-8 font-medium text-white left-8 fixed flex justify-between gap-2 items-center shadow-md min-h-[48px] max-w-[50vw] px-4 py-2 rounded-lg min-w-[300px] text-sm truncate whitespace-nowrap",
          {
            ["bg-successBg"]: snackbar?.variant === "success",
            ["bg-errorBg"]: snackbar.variant === "error",
            ["bg-warningBg"]: snackbar?.variant === "warning",
            ["bg-infoBg"]: snackbar.variant === "info",
            ["-translate-x-[200%]"]: !snackbar?.show,
            ["translate-x-0"]: snackbar?.show,
          }
        )}
      >
        {snackbar?.message}
        <div
          className="hover:bg-black/20 p-1 rounded-full cursor-pointer"
          onClick={handleSnackbarClose}
        >
          <IoMdClose size={20} />
        </div>
      </div>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
    const context = useContext(SnackbarContext)
    if(!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider')
    }
    return context
}