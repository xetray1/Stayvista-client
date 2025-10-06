import "./navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const isAdmin = Boolean(user?.isAdmin);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const primaryLinks = [
    { label: "Discover", path: "/" },
    { label: "Experiences", path: "/experiences" },
    { label: "Stories", path: "/stories" },
  ];

  if (isAdmin) {
    return (
      <header className="admin-navbar">
        <div className="admin-navbar__container">
          <Link to="/" className="admin-navbar__brand">
            <img src="/Icon.ico" alt="StayVista" className="admin-navbar__logo" />
            <span className="admin-navbar__title">StayVista</span>
          </Link>

          <nav className="admin-navbar__nav">
            <div className="admin-navbar__nav-group">
              {primaryLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`admin-navbar__link ${isActive(item.path) ? "admin-navbar__link--active" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="admin-navbar__nav-divider" aria-hidden="true" />
            <div className="admin-navbar__nav-group admin-navbar__nav-group--admin">
              <Link
                to="/admin/manage-hotel"
                className={`admin-navbar__link ${isActive("/admin/manage-hotel") ? "admin-navbar__link--active" : ""}`}
              >
                Manage hotel
              </Link>
              <Link
                to="/admin/manage-rooms"
                className={`admin-navbar__link ${isActive("/admin/manage-rooms") ? "admin-navbar__link--active" : ""}`}
              >
                Manage rooms
              </Link>
              <Link
                to="/admin/today-bookings"
                className={`admin-navbar__link ${isActive("/admin/today-bookings") ? "admin-navbar__link--active" : ""}`}
              >
                Today's bookings
              </Link>
              <Link
                to="/admin/today-transactions"
                className={`admin-navbar__link ${isActive("/admin/today-transactions") ? "admin-navbar__link--active" : ""}`}
              >
                Today's transactions
              </Link>
            </div>
          </nav>

          <div className="admin-navbar__actions">
            {user && (
              <div className="admin-navbar__user">
                <div className="admin-navbar__avatar">
                  {user.username?.[0]?.toUpperCase()}
                </div>
                <span className="admin-navbar__username">{user.username}</span>
                <button
                  className="admin-navbar__logout"
                  onClick={handleLogout}
                  aria-label="Sign out"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand">
          <div className="navbar__logo-wrap">
            <img
              src="/Icon.ico"
              alt="StayVista logo"
              className="navbar__logo"
            />
          </div>
          <div className="navbar__brand-text" aria-label="StayVista home">
            <span className="navbar__brand-title">StayVista</span>
            <span className="navbar__brand-accent" />
          </div>
        </Link>
        <button
          type="button"
          className={`navbar__menu-toggle ${isMenuOpen ? "is-active" : ""}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
        >
          <span className="navbar__menu-icon" aria-hidden="true" />
          <span className="navbar__menu-label">Menu</span>
        </button>

        <nav
          id="primary-navigation"
          className={`navbar__nav ${isMenuOpen ? "navbar__nav--open" : ""}`}
          aria-label="Primary navigation"
        >
          <div className="navbar__link-group navbar__link-group--primary">
            <Link to="/" className={`navbar__link ${isActive("/") ? "navbar__link--active" : ""}`} onClick={closeMenu}>
              Discover
            </Link>
            {!isAdmin && (
              <Link
                to="/hotels"
                className={`navbar__link ${isActive("/hotels") ? "navbar__link--active" : ""}`}
                onClick={closeMenu}
              >
                Stays
              </Link>
            )}
            <Link
              to="/experiences"
              className={`navbar__link ${isActive("/experiences") ? "navbar__link--active" : ""}`}
              onClick={closeMenu}
            >
              Experiences
            </Link>
            <Link
              to="/stories"
              className={`navbar__link ${isActive("/stories") ? "navbar__link--active" : ""}`}
              onClick={closeMenu}
            >
              Stories
            </Link>
          </div>
          {user && !isAdmin && (
            <div className="navbar__link-group navbar__link-group--user">
              <Link
                to="/bookings"
                className={`navbar__link ${isActive("/bookings") ? "navbar__link--active" : ""}`}
                onClick={closeMenu}
              >
                My bookings
              </Link>
              <Link
                to="/transactions"
                className={`navbar__link ${isActive("/transactions") ? "navbar__link--active" : ""}`}
                onClick={closeMenu}
              >
                Transactions
              </Link>
            </div>
          )}
        </nav>
        <div className="navbar__actions">
          {user ? (
            <div className={`navbar__profile ${isAdmin ? "navbar__profile--admin" : ""}`}>
              <div className="navbar__avatar">{user.username?.[0]?.toUpperCase()}</div>
              <div className="navbar__profile-info">
                <span className="navbar__profile-name">{user.username}</span>
                <span className="navbar__profile-role">
                  {isAdmin ? "Administrator" : "Member"}
                </span>
              </div>
              <button
                type="button"
                className={`navbar__button ${isAdmin ? "navbar__button--admin" : "btn-outline"}`}
                onClick={handleLogout}
                aria-label="Sign out"
              >
                {isAdmin ? (
                  <svg
                    className="navbar__button-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                ) : (
                  "Sign out"
                )}
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-outline navbar__button" onClick={closeMenu}>
                Sign in
              </Link>
              <Link to="/register" className="btn-primary navbar__button" onClick={closeMenu}>
                Create account
              </Link>
            </>
          )}
        </div>
        <div
          className={`navbar__mobile-overlay ${isMenuOpen ? "navbar__mobile-overlay--visible" : ""}`}
          role="presentation"
          onClick={closeMenu}
        />
      </div>
    </header>
  );
};

export default Navbar;
