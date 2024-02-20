"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Cairo } from "next/font/google";
const cairo = Cairo({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="dashboard-error">
      <h2>Something went wrong!</h2>
      <button
        onClick={
          () => reset()
        }
        className={cairo.className}
      >
        Try again
      </button>
    </div>
  );
}
