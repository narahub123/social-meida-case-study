import React, { useEffect } from "react";

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (ref.current && !ref.current.contains(target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, setOpenDropdown]);
  return;
};

export default useClickOutside;
