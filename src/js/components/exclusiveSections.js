

export function createExclusiveSections() {
  return `

    <!-- =================================
         سریال های اختصاصی فیلیمو
    ================================== -->

    <section
      id="exclusive-series"
      class="bg-[#111] py-12"
    >

      <div
        class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >

        <!-- TITLE -->

        <div
          class="mb-7 flex items-center justify-between"
        >

          <h2
            class="text-xl font-bold text-white sm:text-2xl md:text-3xl"
          >
            سریال‌های اختصاصی فیلیمو
          </h2>

          <button
            type="button"
            class="text-sm font-medium text-[#e5a900] transition hover:text-white"
          >
            مشاهده همه
            <span class="mr-1 text-lg">
              ‹
            </span>
          </button>

        </div>


        <!-- SLIDER -->

        <div class="relative">

          <div
            class="swiper exclusiveSeriesSwiper overflow-hidden"
          >

            <div
              id="exclusiveSeriesList"
              class="swiper-wrapper"
            >

              <div class="swiper-slide">

                <div
                  class="py-10 text-center text-sm text-gray-500"
                >
                  در حال دریافت سریال‌ها...
                </div>

              </div>

            </div>

          </div>


          <!-- PREVIOUS BUTTON -->

          <button
            type="button"
            class="exclusive-series-prev absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-3xl text-white shadow-lg backdrop-blur-sm transition hover:bg-[#00b894]"
            aria-label="قبلی"
          >
            ‹
          </button>


          <!-- NEXT BUTTON -->

          <button
            type="button"
            class="exclusive-series-next absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-3xl text-white shadow-lg backdrop-blur-sm transition hover:bg-[#00b894]"
            aria-label="بعدی"
          >
            ›
          </button>

        </div>

      </div>

    </section>


    <!-- =================================
         اکران آنلاین فیلیمو
    ================================== -->

    <section
      id="online-cinema"
      class="bg-[#111] py-12"
    >

      <div
        class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >

        <!-- TITLE -->

        <div
          class="mb-7 flex items-center justify-between"
        >

          <h2
            class="text-xl font-bold text-white sm:text-2xl md:text-3xl"
          >
            اکران آنلاین فیلیمو
          </h2>

          <button
            type="button"
            class="text-sm font-medium text-[#e5a900] transition hover:text-white"
          >
            مشاهده همه
            <span class="mr-1 text-lg">
              ‹
            </span>
          </button>

        </div>


        <!-- SLIDER -->

        <div class="relative">

          <div
            class="swiper onlineCinemaSwiper overflow-hidden"
          >

            <div
              id="onlineCinemaList"
              class="swiper-wrapper"
            >

              <div class="swiper-slide">

                <div
                  class="py-10 text-center text-sm text-gray-500"
                >
                  در حال دریافت فیلم‌ها...
                </div>

              </div>

            </div>

          </div>


          <!-- PREVIOUS BUTTON -->

          <button
            type="button"
            class="online-cinema-prev absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-3xl text-white shadow-lg backdrop-blur-sm transition hover:bg-[#00b894]"
            aria-label="قبلی"
          >
            ‹
          </button>

<!-- NEXT BUTTON -->

          <button
            type="button"
            class="online-cinema-next absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-3xl text-white shadow-lg backdrop-blur-sm transition hover:bg-[#00b894]"
            aria-label="بعدی"
          >
            ›
          </button>

        </div>

      </div>

    </section>

  `;
}




function createSectionCard(item) {

  return `
    <div class="swiper-slide">

      <article
        class="group cursor-pointer"
        data-special-id="${item.id}"
      >

        <div
          class="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/5 bg-[#222]"
        >

          <img
            src="${item.image}"
            alt="${item.title}"
            loading="lazy"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />


          <!-- DARK GRADIENT -->

          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
          ></div>


          <!-- LABEL -->

          ${
            item.label
              ? `
                <span
                  class="absolute right-3 top-3 rounded-md bg-[#e84c3d] px-2.5 py-1 text-[10px] font-medium text-white shadow"
                >
                  ${item.label}
                </span>
              `
              : ""
          }


          <!-- FILIMO LOGO -->

          <div
            class="absolute bottom-3 right-3 flex items-center gap-1.5"
          >

            <span
              class="text-xs font-bold text-white drop-shadow"
            >
              اختصاصی
            </span>

            <span
              class="flex h-4 w-4 items-center justify-center rounded-sm bg-[#e5a900] text-[9px] font-bold text-black"
            >
              ▶
            </span>

          </div>

        </div>


        <!-- TITLE -->

        <h3
          class="mt-3 truncate text-sm font-medium text-white transition group-hover:text-[#00b894] md:text-base"
        >
          ${item.title}
        </h3>

      </article>

    </div>
  `;
}




export async function loadExclusiveSections() {

  const exclusiveSeriesList =
    document.querySelector(
      "#exclusiveSeriesList"
    );


  const onlineCinemaList =
    document.querySelector(
      "#onlineCinemaList"
    );


  if (
    !exclusiveSeriesList ||
    !onlineCinemaList
  ) {
    return;
  }


  try {

    const response =
      await fetch(
        "http://localhost:3000/specialSections"
      );


    if (!response.ok) {

      throw new Error(
        "خطا در دریافت اطلاعات بخش‌ها"
      );

    }


    const data =
      await response.json();


   

    const exclusiveSeries =
      data.exclusiveSeries || [];


    if (
      exclusiveSeries.length > 0
    ) {

      exclusiveSeriesList.innerHTML =
        exclusiveSeries
          .map(createSectionCard)
          .join("");

    } else {

      exclusiveSeriesList.innerHTML = `
        <div class="swiper-slide">

          <div
            class="py-10 text-center text-gray-500"
          >
            سریالی برای نمایش وجود ندارد.
          </div>

        </div>
      `;

    }


  

    const onlineCinema =
      data.onlineCinema || [];


    if (
      onlineCinema.length > 0
    ) {

      onlineCinemaList.innerHTML =
        onlineCinema
          .map(createSectionCard)
          .join("");

    } else {

      onlineCinemaList.innerHTML = `
        <div class="swiper-slide">

          <div
            class="py-10 text-center text-gray-500"
          >
            فیلمی برای نمایش وجود ندارد.
          </div>

        </div>
      `;

    }

  } catch (error) {

    console.error(
      "Exclusive sections error:",
      error
    );


    exclusiveSeriesList.innerHTML = `
      <div class="swiper-slide">

        <div
          class="py-10 text-center text-red-400"
        >
          دریافت سریال‌ها با مشکل مواجه شد.
        </div>

      </div>
    `;


    onlineCinemaList.innerHTML = `
      <div class="swiper-slide">

        <div
          class="py-10 text-center text-red-400"
        >
          دریافت فیلم‌ها با مشکل مواجه شد.
        </div>

      </div>
    `;

  }

}