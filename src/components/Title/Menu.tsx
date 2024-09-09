const Menu = () => {
  return (
    <div className="menu-wrap absolute w-100">
      <div className="menu mx-auto flex content-between">
        <div className="menu__main flex content-between">
          <div className="h-p">
            <a className="text-decoration-none" href="#about">
              O nás
            </a>
          </div>
          <div className="h-p">
            <a className="text-decoration-none" href="#book">
              Rezervace
            </a>
          </div>
          <div className="h-p">
            <a className="text-decoration-none" href="#giftCards">
              Dárkové poukazy
            </a>
          </div>
          <div className="h-p">
            <a className="text-decoration-none" href="#reference">
              Reference
            </a>
          </div>
        </div>
        <div className="menu__social flex content-between">
          <a className="text-decoration-none" href="https://facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a className="text-decoration-none" href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export { Menu };
