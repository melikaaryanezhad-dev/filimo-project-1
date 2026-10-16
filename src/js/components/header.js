

export function createHeader() {

  return `
    <header
      class="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#111]/95 backdrop-blur-md"
    >

      <div
        class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >

        <div
          class="flex h-16 items-center justify-between gap-4"
        >

          <!-- LOGO -->

          <button
            id="headerLogo"
            type="button"
            class="shrink-0 text-2xl font-black text-white"
          >
            فیلیمو
          </button>


          <!-- DESKTOP NAV -->

          <nav
            class="hidden items-center gap-6 text-sm text-gray-300 lg:flex"
          >

            <a
              href="#"
              class="transition hover:text-white"
            >
              خانه
            </a>

            <a
              href="#movies"
              class="transition hover:text-white"
            >
              فیلم‌ها
            </a>

            <a
              href="#new-movies"
              class="transition hover:text-white"
            >
              تازه‌ها
            </a>

            <a
              href="#special-movies"
              class="transition hover:text-white"
            >
              ویژه‌ها
            </a>

            <a
              href="#school"
              class="transition hover:text-white"
            >
              فیلیمو مدرسه
            </a>

          </nav>


          <!-- SEARCH -->

          <div
            class="hidden max-w-xs flex-1 md:flex"
          >

            <div
              class="relative w-full"
            >

              <input
                id="searchInput"
                type="text"
                placeholder="جستجوی فیلم و سریال..."
                class="h-10 w-full rounded-lg border border-white/10 bg-white/10 px-4 pl-4 pr-10 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-[#e5a900] focus:bg-white/15"
              />

              <span
                class="absolute right-3 top-1/2 -translate-y-1/2 text-base text-gray-400"
              >
                🔍
              </span>

            </div>

          </div>


          <!-- BUTTONS -->

          <div
            class="hidden shrink-0 items-center gap-2 sm:flex"
          >

            <button
              type="button"
              class="rounded-lg bg-[#e5a900] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#00a383]"
            >
              خرید اشتراک
            </button>


            <button
              id="desktopLoginButton"
              type="button"
              class="rounded-lg border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              ورود
            </button>

          </div>


          <!-- MOBILE BUTTON -->

          <button
            id="mobileMenuButton"
            type="button"
            aria-label="باز کردن منو"
            aria-expanded="false"
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-xl text-white transition hover:bg-white/20 lg:hidden"
          >
            ☰
          </button>

        </div>

      </div>


      <!-- MOBILE MENU -->

      <div
        id="mobileMenu"
        class="hidden border-t border-white/10 bg-[#151515] lg:hidden"
      >

        <div
          class="px-4 py-5"
        >

          <!-- SEARCH -->

          <div
            class="relative mb-5"
          >

            <input
              id="mobileSearchInput"
              type="text"
              placeholder="جستجوی فیلم و سریال..."
              class="h-11 w-full rounded-lg border border-white/10 bg-white/10 px-4 pl-4 pr-10 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#e5a900]"
            />

            <span
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              🔍
            </span>

          </div>


          <!--

LINKS -->

          <nav
            class="flex flex-col"
          >

            <a
              href="#"
              class="mobile-menu-link border-b border-white/5 py-3 text-gray-300 transition hover:text-white"
            >
              خانه
            </a>


            <a
              href="#school"
              class="mobile-menu-link border-b border-white/5 py-3 text-gray-300 transition hover:text-white"
            >
              فیلیمو مدرسه
            </a>


            <a
              href="#movies"
              class="mobile-menu-link border-b border-white/5 py-3 text-gray-300 transition hover:text-white"
            >
              فیلم‌ها
            </a>


            <a
              href="#new-movies"
              class="mobile-menu-link border-b border-white/5 py-3 text-gray-300 transition hover:text-white"
            >
              تازه‌ها
            </a>


            <a
              href="#special-movies"
              class="mobile-menu-link py-3 text-gray-300 transition hover:text-white"
            >
              ویژه‌ها
            </a>

          </nav>


          <!-- BUTTONS -->

          <div
            class="mt-5 flex gap-2"
          >

            <button
              type="button"
              class="flex-1 rounded-lg bg-[#e5a900] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#00a383]"
            >
              خرید اشتراک
            </button>


            <button
              id="mobileLoginButton"
              type="button"
              class="flex-1 rounded-lg border border-white/20 px-4 py-3 text-sm text-white transition hover:bg-white/10"
            >
              ورود
            </button>

          </div>

        </div>

      </div>

    </header>
  `;
}




export function setupMobileMenu() {

  const menuButton =
    document.querySelector(
      "#mobileMenuButton"
    );


  const mobileMenu =
    document.querySelector(
      "#mobileMenu"
    );


  if (
    !menuButton ||
    !mobileMenu
  ) {
    return;
  }




  menuButton.addEventListener(
    "click",
    () => {

      const isOpen =
        !mobileMenu.classList.contains(
          "hidden"
        );


      if (isOpen) {

        mobileMenu.classList.add(
          "hidden"
        );

        menuButton.textContent =
          "☰";

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      } else {

        mobileMenu.classList.remove(
          "hidden"
        );

        menuButton.textContent =
          "×";

        menuButton.setAttribute(
          "aria-expanded",
          "true"
        );

      }

    }
  );




  const menuLinks =
    document.querySelectorAll(
      ".mobile-menu-link"
    );


  menuLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        () => {

          mobileMenu.classList.add(
            "hidden"
          );

          menuButton.textContent =
            "☰";

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    }
  );

}