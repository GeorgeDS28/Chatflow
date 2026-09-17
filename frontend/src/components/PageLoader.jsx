import { LoaderIcon } from "lucide-react";

function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#020617] gap-4">
      <div className="relative">
        <div className="absolute inset-0 size-16 rounded-full bg-blue-500/20 blur-xl animate-pulse-glow" />
        <LoaderIcon className="relative size-12 text-blue-400 animate-spin" />
      </div>
      <p className="text-blue-300/70 text-sm animate-pulse">Loading...</p>
    </div>
  );
}

export default PageLoader;
