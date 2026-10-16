

export function createMovieModal() {

  const modal =
    document.createElement("div");


  modal.id =
    "movieModal";


  modal.className = `
    fixed
    inset-0
    z-[9999]
    hidden
    items-center
    justify-center
    bg-black/80
    p-4
  `;


  modal.innerHTML = `
    <div
      class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#181818] p-6 text-white"
    >

      <button
        id="closeMovieModal"
        type="button"
        class="absolute left-4 top-4 z-10 h-9 w-9 rounded-full bg-white/10 text-xl text-white hover:bg-[#e5a900]"
      >
        ×
      </button>


      <div
        class="grid gap-6 md:grid-cols-[180px_1fr]"
      >

        <img
          id="modalMovieImage"
          src=""
          alt=""
          class="mx-auto w-full max-w-[180px] rounded-xl object-cover"
        />


        <div>

          <h2
            id="modalMovieTitle"
            class="text-2xl font-bold"
          ></h2>


          <div
            class="mt-4 flex flex-wrap gap-2"
          >

            <span
              id="modalMovieYear"
              class="rounded-lg bg-white/10 px-3 py-1 text-sm"
            ></span>

            <span
              id="modalMovieGenre"
              class="rounded-lg bg-white/10 px-3 py-1 text-sm"
            ></span>

            <span
              id="modalMovieRating"
              class="rounded-lg bg-black px-3 py-1 text-sm text-yellow-400"
            ></span>

          </div>


          <p
            id="modalMovieDescription"
            class="mt-5 text-sm leading-8 text-gray-300"
          ></p>


          <button
            type="button"
            class="mt-5 rounded-lg bg-[#e5a900] px-6 py-3 text-sm hover:bg-[#c99400]"
          >
            ▶ تماشای فیلم
          </button>

        </div>

      </div>

    </div>
  `;


  document.body.appendChild(
    modal
  );




  function openModal(movie) {

    document.querySelector(
      "#modalMovieImage"
    ).src =
      movie.image;


    document.querySelector(
      "#modalMovieImage"
    ).alt =
      movie.title;


    document.querySelector(
      "#modalMovieTitle"
    ).textContent =
      movie.title;


    document.querySelector(
      "#modalMovieYear"
    ).textContent =
      movie.year;


    document.querySelector(
      "#modalMovieGenre"
    ).textContent =
      movie.genre;


    document.querySelector(
      "#modalMovieRating"
    ).textContent =
      `★ ${movie.rating}`;


    document.querySelector(
      "#modalMovieDescription"
    ).textContent =
      movie.description;


    modal.classList.remove(
      "hidden"
    );


    modal.classList.add(
      "flex"
    );


    document.body.classList.add(
      "overflow-hidden"
    );

  }



  function closeModal() {

    modal.classList.add(
      "hidden"
    );


    modal.classList.remove(
      "flex"
    );


    document.body.classList.remove(
      "overflow-hidden"
    );

  }


  document
    .querySelector("#closeMovieModal")
    .addEventListener(
      "click",
      closeModal
    );




  document.addEventListener(
    "click",
    (event) => {

      const movieCard =
        event.target.closest(
          ".movie-card, .new-movie-card"
        );


      if (!movieCard) {
        return;
      }


      const movieId =
        movieCard.dataset.movieId;


      const movies =
        window.movies || [];


      const movie =
        movies.find(
          (item) =>
            String(item.id) ===
            String(movieId)
        );


      if (!movie) {
        return;
      }


      openModal(movie);

    }
  );




  modal.addEventListener(
    "click",
    (event) => {

if (
        event.target === modal
      ) {

        closeModal();

      }

    }
  );




  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        !modal.classList.contains("hidden")
      ) {

        closeModal();

      }

    }
  );

}