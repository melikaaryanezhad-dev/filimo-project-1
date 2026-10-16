export function createNewMoviesSection() {
  return `
    <section id="new-movies" class="bg-[#111] py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl md:text-3xl font-bold text-white">
            تازه‌ها
          </h2>

          <button
            type="button"
            class="text-sm text-[#e5a900] hover:text-white transition"
          >
            مشاهده همه
          </button>
        </div>

        <div class="relative">

          <div class="swiper newMoviesSwiper">
            <div
              class="swiper-wrapper"
              id="newMoviesList"
            >
              <div class="swiper-slide">
                <div class="py-10 text-center text-sm text-gray-400">
                  در حال دریافت فیلم‌ها...
                </div>
              </div>
            </div>
          </div>

          <div class="swiper-button-prev new-movies-prev"></div>
          <div class="swiper-button-next new-movies-next"></div>

        </div>
      </div>
    </section>
  `;
}


function createNewMovieCard(movie) {
  return `
    <div class="swiper-slide">

      <article
        class="group cursor-pointer movie-card"
        data-movie-id="${movie.id}"
      >

        <div
          class="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/5 bg-[#222]"
        >

          <img
            src="${movie.newImage}"
            alt="${movie.title}"
            loading="lazy"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div
            class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"
          ></div>

          <span
            class="absolute right-2 top-2 rounded-md bg-black/70 px-2 py-1 text-xs text-white"
          >
            ${movie.year}
          </span>

          <span
            class="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-xs text-yellow-400"
          >
            ★ ${movie.rating}
          </span>

        </div>

        <h3
          class="mt-3 truncate text-sm font-medium text-white transition group-hover:text-[#e5a900] md:text-base"
        >
          ${movie.title}
        </h3>

        <p class="mt-1 text-xs text-gray-500">
          ${movie.genre}
        </p>

      </article>

    </div>
  `;
}


export function loadNewMovies(movies, swiper) {
  const newMoviesList =
    document.querySelector("#newMoviesList");

  if (!newMoviesList) {
    return;
  }

  const newMovies =
    movies.filter(
      (movie) => movie.category === "new"
    );

  if (newMovies.length === 0) {

    newMoviesList.innerHTML = `
      <div class="swiper-slide">
        <div class="py-10 text-center text-gray-400">
          فیلم جدیدی پیدا نشد.
        </div>
      </div>
    `;

    swiper.update();

    return;
  }

  newMoviesList.innerHTML =
    newMovies
      .map(createNewMovieCard)
      .join("");

  swiper.update();
}