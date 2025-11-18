import type React from "react";

export default function Badge({ children }: React.PropsWithChildren) {
  return <button className="bg-gray-600 text-white font-bold mb-2 text-m cursor-pointer rounded-2xl">{children}</button>
}