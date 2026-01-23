import { Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "@/assets/logo.jpg";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Tournaments", path: "/tournaments" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  return (
    <header className="sticky top-0 z-50 bg-[#ABE7B2] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-10 cursor-pointer" />
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-black"
          >

            Chess..
          </button>
        </div>

        {/* ---------------- DESKTOP NAV ---------------- */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              className={`text-sm font-medium transition cursor-pointer ${isActive(link.path)
                  ? "text-pink-600"
                  : "text-gray-700 hover:text-black"
                }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* ---------------- MOBILE NAV ---------------- */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right">
            <div className="mt-10 flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    navigate(link.path);
                    setOpen(false);
                  }}
                  className={`rounded-lg px-4 py-3 text-left text-base transition
                    ${isActive(link.path)
                      ? "bg-green-600 text-white"
                      : "text-gray-800 hover:bg-green-100"
                    }`}
                >
                  {link.name}
                </button>
              ))}

              {/* CTA */}
              <Button
                className="mt-4"
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
              >
                Get Started
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
