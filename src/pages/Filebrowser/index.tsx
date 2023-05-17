import Navbar from "~/Components/Navbar";
import FileBrowser from "./FileBrowser";

export default function Home() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-7xl sm:mx-auto">
        <FileBrowser />
      </div>
    </div>
    </>
  );
}

