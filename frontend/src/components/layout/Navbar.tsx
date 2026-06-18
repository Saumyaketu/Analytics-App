import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="border-b px-10 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <h1 className="text-xl font-bold">Analytics Dashboard</h1>

        <div className="flex gap-6">
          <Link
            to="/"
            className={`font-medium ${
              location.pathname === "/" ? "text-black" : "text-gray-500"
            }`}
          >
            Sessions
          </Link>

          <Link
            to="/heatmap"
            className={`font-medium ${
              location.pathname === "/heatmap" ? "text-black" : "text-gray-500"
            }`}
          >
            Heatmap
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
