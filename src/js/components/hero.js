

export function createHero(movies) {

  if (
    !movies ||
    movies.length === 0
  ) {

    return `
      <section class="pt-16">
        <div
          class="flex h-[420px] items-center justify-center bg-[#111] text-gray-400 md:h-[550px]"
        >
          فیلمی برای نمایش وجود ندارد.
        </div>
      </section>
    `;

  }


  return `
    <section class="pt-16">

      <div
        class="swiper heroSwiper w-full"
      >

        <div
          class="swiper-wrapper"
        >

          ${movies.map((movie) => {

            return `
              <div
                class="swiper-slide"
              >

                <div
                  class="relative h-[420px] bg-cover bg-center md:h-[550px]"
                  style="background-image: url('${movie.heroImage}');"
                >

                  <div
                    class="absolute inset-0 bg-gradient-to-l from-black/95 via-black/60 to-black/20"
                  ></div>


                  <div
                    class="relative z-10 flex h-full items-center"
                  >

                    <div
                      class="mx-auto w-full max-w-7xl px-6"
                    >

                      <div
                        class="max-w-xl"
                      >

                        <span
                          class="text-sm text-[#00b894]"
                        >
                          ${movie.genre}
                        </span>


                        <h1
                          class="mt-4 text-4xl font-black leading-tight text-white md:text-6xl"
                        >
                          ${movie.title}
                        </h1>


                        <div
                          class="mt-4 flex items-center gap-4 text-sm"
                        >

                          <span
                            class="text-gray-300"
                          >
                            ${movie.year}
                          </span>


                          <span
                            class="text-yellow-400"
                          >
                            ★ ${movie.rating}
                          </span>

                        </div>


                        <p
                          class="mt-5 text-sm leading-8 text-gray-300 md:text-base"
                        >
                          ${movie.description}
                        </p>


                        <button
                          type="button"
                          class="mt-7 rounded-lg bg-[#e5a900] px-6 py-3 font-medium text-white transition hover:bg-[#c99400]"
                        >
                          ▶️ تماشای فیلم
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            `;

          }).join("")}

        </div>


        <div
          class="swiper-button-next"
        ></div>

        <div
          class="swiper-button-prev"
        ></div>

        <div
          class="swiper-pagination"
        ></div>

      </div>

    </section>
  `;

}