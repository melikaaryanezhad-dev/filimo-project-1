export function createMovieSection() {
  return `
    <section id="movies" class="bg-[#111] py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-2xl font-bold text-white md:text-3xl">
            پیشنهاد برای تماشا
          </h2>

          <button
            type="button"
            class="text-sm text-[#e5a900] transition hover:text-white"
          >
            مشاهده همه
          </button>
        </div>

        <div class="mb-7">
          <div class="flex flex-wrap gap-2">

            <button
              type="button"
              class="genre-filter active rounded-lg bg-[#e5a900] px-4 py-2 text-sm text-white transition"
              data-genre="all"
            >
              همه
            </button>

            <button
              type="button"
              class="genre-filter rounded-lg bg-white/10 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/20"
              data-genre="علمی تخیلی"
            >
              علمی تخیلی
            </button>

            <button
              type="button"
              class="genre-filter rounded-lg bg-white/10 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/20"
              data-genre="اکشن"
            >
              اکشن
            </button>

            <button
              type="button"
              class="genre-filter rounded-lg bg-white/10 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/20"
              data-genre="ماجراجویی"
            >
              ماجراجویی
            </button>

            <button
              type="button"
              class="genre-filter rounded-lg bg-white/10 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/20"
              data-genre="درام"
            >
              درام
            </button>

          </div>
        </div>

        <div class="relative">
          <div class="swiper movieSwiper">
            <div class="swiper-wrapper" id="movieList">
              <div class="swiper-slide">
                <div class="py-10 text-center text-sm text-gray-400">
                  در حال دریافت فیلم‌ها...
                </div>
              </div>
            </div>
          </div>

          <div class="swiper-button-prev movie-prev"></div>
          <div class="swiper-button-next movie-next"></div>
        </div>

      </div>
    </section>
  `;
}


// تبدیل مسیر تصاویر برای نسخه محلی و GitHub Pages
function getMovieImageUrl(imagePath) {
  if (!imagePath) {
    return "";
  }

  const cleanPath = imagePath
    .replace(/^\.\/public\//, "")
    .replace(/^public\//, "")
    .replace(/^\.\//, "");

  return `${import.meta.env.BASE_URL}${cleanPath}`;
}


// ساخت کارت هر فیلم
function createMovieCard(movie) {
  const imageUrl = getMovieImageUrl(movie.image);

  return `
    <div class="swiper-slide">
      <article
        class="movie-card group cursor-pointer"
        data-movie-id="${movie.id}"
      >

        <div class="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/5 bg-[#222]">

          <img
            src="${imageUrl}"
            alt="${movie.title ?? "فیلم"}"
            loading="lazy"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onerror="this.style.display='none'"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>

          <span class="absolute right-2 top-2 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
            ${movie.year ?? ""}
          </span>

          <span class="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-xs text-yellow-400">
            ★ ${movie.rating ?? ""}
          </span>

        </div>

        <h3 class="mt-3 truncate text-sm font-medium text-white transition group-hover:text-[#e5a900] md:text-base">
          ${movie.title ?? ""}
        </h3>

        <p class="mt-1 text-xs text-gray-500">
          ${movie.genre ?? ""}
        </p>

      </ar

ticle>
    </div>
  `;
}


// دریافت اطلاعات فیلم‌ها
export async function loadMovies() {
  try {
    let response;

    if (import.meta.env.PROD) {
      // دریافت اطلاعات در نسخه منتشرشده
      response = await fetch(
        `${import.meta.env.BASE_URL}db.json`
      );
    } else {
      // دریافت اطلاعات از JSON Server در نسخه محلی
      response = await fetch(
        "http://localhost:3000/movies"
      );
    }

    if (!response.ok) {
      throw new Error(
        `خطا در دریافت فیلم‌ها: ${response.status}`
      );
    }

    const data = await response.json();

    const movies = Array.isArray(data)
      ? data
      : data.movies;

    if (!Array.isArray(movies)) {
      throw new Error(
        "ساختار اطلاعات فیلم‌ها در db.json صحیح نیست."
      );
    }

    const movieList = document.querySelector("#movieList");

    if (movieList) {
      movieList.innerHTML = movies
        .map(createMovieCard)
        .join("");
    }

    return movies;

  } catch (error) {
    console.error("خطا در دریافت فیلم‌ها:", error);

    const movieList = document.querySelector("#movieList");

    if (movieList) {
      movieList.innerHTML = `
        <div class="swiper-slide">
          <div class="py-10 text-center text-red-400">
            دریافت فیلم‌ها با مشکل مواجه شد.
          </div>
        </div>
      `;
    }

    return [];
  }
}


// جست‌وجو و فیلتر فیلم‌ها
export function setupMovieSearch(movies, movieSwiper) {
  const searchInput = document.querySelector("#searchInput");
  const mobileSearchInput = document.querySelector(
    "#mobileSearchInput"
  );

  const movieList = document.querySelector("#movieList");
  const genreButtons = document.querySelectorAll(
    ".genre-filter"
  );

  if (!movieList) {
    return;
  }

  let selectedGenre = "all";
  let searchText = "";

  function renderMovies() {
    const filteredMovies = movies.filter((movie) => {
      const matchesGenre =
        selectedGenre === "all" ||
        movie.genre === selectedGenre;

      const matchesSearch =
        (movie.title ?? "")
          .toLowerCase()
          .includes(searchText);

      return matchesGenre && matchesSearch;
    });

    if (filteredMovies.length === 0) {
      movieList.innerHTML = `
        <div class="swiper-slide">
          <div class="py-10 text-center text-gray-400">
            فیلمی پیدا نشد.
          </div>
        </div>
      `;
    } else {
      movieList.innerHTML = filteredMovies
        .map(createMovieCard)
        .join("");
    }

    if (movieSwiper) {
      movieSwiper.update();
      movieSwiper.slideTo(0);
    }
  }

  // جست‌وجوی دسکتاپ
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchText = searchInput.value
        .trim()
        .toLowerCase();

      if (mobileSearchInput) {
        mobileSearchInput.value = searchInput.value;
      }

      renderMovies();
    });
  }

  // جست‌وجوی موبایل
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("input", () => {
      searchText = mobileSearchInput.value
        .trim()
        .toLowerCase();

      if (searchInput) {
        searchInput.value = mobileSearchInput.value;
      }

      renderMovies();
    });
  }

  // فیلتر ژانر
  genreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedGenre = button.dataset.genre;

      genreButtons.forEach((item) => {
        item.classList.remove(
          "bg-[#e5a900]",
          "text-white",
          "active"
        );

        item.classList.add(
          "bg-white/10",
          "text-gray-300"
        );
      });

      button.classList.remove(
        "bg-white/10",
        "text-gray-300"
      );

      button.classList.add(
        "bg-[#e5a900]",
        "text-white",
        "active"
      );

      renderMovies();
    });
  });
}
