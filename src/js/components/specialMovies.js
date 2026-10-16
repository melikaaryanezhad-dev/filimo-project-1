// ==========================================
// بخش ویژه‌ها
// ==========================================

export function createSpecialMoviesSection() {
  return `
    <section id="special-movies" class="bg-[#111] py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-2xl font-bold text-white md:text-3xl">
            ویژه‌ها
          </h2>

          <button
            type="button"
            class="text-sm text-[#e5a900] transition hover:text-white"
          >
            مشاهده همه
          </button>
        </div>

        <div class="relative">
          <div class="swiper specialMoviesSwiper">
            <div
              class="swiper-wrapper"
              id="specialMoviesList"
            >
              <div class="swiper-slide">
                <div class="py-10 text-center text-sm text-gray-400">
                  در حال دریافت فیلم‌ها...
                </div>
              </div>
            </div>
          </div>

          <div class="swiper-button-prev special-movies-prev"></div>
          <div class="swiper-button-next special-movies-next"></div>
        </div>

      </div>
    </section>
  `;
}

// ==========================================
// اصلاح مسیر تصاویر
// ==========================================

function getSpecialImageUrl(imagePath) {
  if (!imagePath) {
    return "";
  }

  const cleanPath = imagePath
    .replace(/^\.\/public\//, "")
    .replace(/^public\//, "")
    .replace(/^\.\//, "")
    .replace(/^\/+/, "");

  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

// ==========================================
// ساخت کارت فیلم ویژه
// ==========================================

function createSpecialMovieCard(movie) {
  const imageUrl = getSpecialImageUrl(movie.specialImage);

  return `
    <div class="swiper-slide">

      <article
        class="group cursor-pointer movie-card"
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

      </article>

    </div>
  `;
}

// ==========================================
// نمایش فیلم‌های ویژه
// ==========================================

export function loadSpecialMovies(movies, swiper) {
  const specialMoviesList = document.querySelector("#specialMoviesList");

  if (!specialMoviesList) {
    return;
  }

  const specialMovies = movies.filter((movie) => movie.category === "special");

  if (specialMovies.length === 0) {
    specialMoviesList.innerHTML = `
      <div class="swiper-slide">
        <div class="py-10 text-center text-gray-400">
          فیلم ویژه‌ای پیدا نشد.
        </div>
      </div>
    `;

    if (swiper) {
      swiper.update();
    }

    return;
  }

  specialMoviesList.innerHTML = specialMovies
    .map(createSpecialMovieCard)
    .join("");

  if (swiper) {
    swiper.update();
    swiper.slideTo(0);
  }
}
