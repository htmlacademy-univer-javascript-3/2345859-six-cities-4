// Functional component representing the empty favorites screen
function EFavScreen(): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      {/* Header section */}
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            {/* Left side of the header */}
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            {/* Navigation section of the header */}
            <nav className="header__nav">
              <ul className="header__nav-list">
                {/* User profile link */}
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">0</span>
                  </a>
                </li>
                {/* Sign out link */}
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main section */}
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          {/* Empty favorites section */}
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">
                Save properties to narrow down search or plan your future trips.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer section */}
      <footer className="footer">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}

export default EFavScreen;
