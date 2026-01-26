import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#ABE7B2] text-black/80">
      <div className="mx-auto max-w-7xl px-6 py-14">

        {/* Top Sectionss */}
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Chess..
            </h3>
            <p className="text-sm text-gray-900 leading-relaxed">
              A simple platform for publishing chess tournaments and
              registering players to participate.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tournaments" className="hover:text-white transition">
                  Tournaments
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Players */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Players</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tournaments" className="hover:text-white transition">
                  Browse Tournaments
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition">
                  Register to Participate
                </Link>
              </li>
            </ul>
          </div>

          {/* For Organizers */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Organizers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/publish" className="hover:text-white transition">
                  Publish a Tournament
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="hover:text-white transition">
                  Publishing Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-300 gap-4">
          <p>
            © {new Date().getFullYear()} Chess. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
