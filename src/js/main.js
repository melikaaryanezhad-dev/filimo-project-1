import "../css/main.css";

import Swiper from "swiper";

import {
  Navigation,
  Pagination,
  Autoplay
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";




import {
  createHeader,
  setupMobileMenu
} from "./components/header.js";

import {
  createHero
} from "./components/hero.js";

import {
  createMovieSection,
  loadMovies,
  setupMovieSearch
} from "./components/movieSection.js";

import {
  createNewMoviesSection,
  loadNewMovies
} from "./components/newMovies.js";

import {
  createSpecialMoviesSection,
  loadSpecialMovies
} from "./components/specialMovies.js";

import {
  createMovieModal
} from "./components/movieModal.js";

import {
  createLoginPage
} from "./components/login.js";

import {
  createSchoolSection,
  loadSchoolSection
} from "./components/school.js";

import {
  createExclusiveSections,
  loadExclusiveSections
} from "./components/exclusiveSections.js";




const app =
  document.querySelector("#app");


if (!app) {

  throw new Error(
    "App element not found"
  );

}




app.innerHTML = `

  ${createHeader()}

  <!-- HERO -->

  <div
    id="heroContainer"
  ></div>


  <!-- MOVIES -->

  ${createMovieSection()}


  <!-- NEW MOVIES -->

  ${createNewMoviesSection()}


  <!-- SPECIAL MOVIES -->

  ${createSpecialMoviesSection()}


  <!-- FILIMO SCHOOL -->

  ${createSchoolSection()}


  <!-- EXCLUSIVE + ONLINE -->

  ${createExclusiveSections()}

`;




setupMobileMenu();




const desktopLoginButton =
  document.querySelector(
    "#desktopLoginButton"
  );


const mobileLoginButton =
  document.querySelector(
    "#mobileLoginButton"
  );


function openLoginPage() {

  createLoginPage();

}


if (desktopLoginButton) {

  desktopLoginButton.addEventListener(
    "click",
    openLoginPage
  );

}


if (mobileLoginButton) {

  mobileLoginButton.addEventListener(
    "click",
    openLoginPage
  );

}




loadSchoolSection();




const movies =
  await loadMovies();


window.movies =
  movies;




const heroContainer =
  document.querySelector(
    "#heroContainer"
  );


if (heroContainer) {

  heroContainer.innerHTML =
    createHero(movies);

}




const heroElement =
  document.querySelector(
    ".heroSwiper"
  );


if (heroElement) {

  new Swiper(
    ".heroSwiper",
    {

      modules: [
        Navigation,
        Pagination,
        Autoplay
      ],

      loop: true,

      autoplay: {

        delay: 4000,

        disableOnInteraction: false

      },

      pagination: {

        el: ".swiper-pagination",

        clickable: true

      },

      navigation: {

        nextEl:
          ".swiper-button-next",

        prevEl:
          ".swiper-button-prev"

      }

    }
  );

}




const movieSwiper =
  new Swiper(
    ".movieSwiper",
    {

      modules: [
        Navigation
      ],

      slidesPerView: 2,

      spaceBetween: 12,

      navigation: {

        nextEl:
          ".movie-next",

        prevEl:
          ".movie-prev"

      },

      breakpoints: {

        640: {

          slidesPerView: 3,

          spaceBetween: 16

        },

        768: {

          slidesPerView: 4,

          spaceBetween: 18

        },

        1024: {

          slidesPerView: 5,

          spaceBetween: 20

        },

        1280: {

          slidesPerView: 6,

          spaceBetween: 20

        }

      }

    }

);




setupMovieSearch(
  movies,
  movieSwiper
);




const newMoviesSwiper =
  new Swiper(
    ".newMoviesSwiper",
    {

      modules: [
        Navigation
      ],

      slidesPerView: 2,

      spaceBetween: 12,

      navigation: {

        nextEl:
          ".new-movies-next",

        prevEl:
          ".new-movies-prev"

      },

      breakpoints: {

        640: {

          slidesPerView: 3,

          spaceBetween: 16

        },

        768: {

          slidesPerView: 4,

          spaceBetween: 18

        },

        1024: {

          slidesPerView: 5,

          spaceBetween: 20

        },

        1280: {

          slidesPerView: 6,

          spaceBetween: 20

        }

      }

    }
  );




loadNewMovies(
  movies,
  newMoviesSwiper
);




const specialMoviesSwiper =
  new Swiper(
    ".specialMoviesSwiper",
    {

      modules: [
        Navigation
      ],

      slidesPerView: 2,

      spaceBetween: 12,

      navigation: {

        nextEl:
          ".special-movies-next",

        prevEl:
          ".special-movies-prev"

      },

      breakpoints: {

        640: {

          slidesPerView: 3,

          spaceBetween: 16

        },

        768: {

          slidesPerView: 4,

          spaceBetween: 18

        },

        1024: {

          slidesPerView: 5,

          spaceBetween: 20

        },

        1280: {

          slidesPerView: 6,

          spaceBetween: 20

        }

      }

    }
  );




loadSpecialMovies(
  movies,
  specialMoviesSwiper
);




const exclusiveSeriesSwiper =
  new Swiper(
    ".exclusiveSeriesSwiper",
    {

      modules: [
        Navigation
      ],

      slidesPerView: 1.2,

      spaceBetween: 12,

      navigation: {

        nextEl:
          ".exclusive-series-prev",

        prevEl:
          ".exclusive-series-next"

      },

      breakpoints: {

        640: {

          slidesPerView: 2,

          spaceBetween: 16

        },

        768: {

          slidesPerView: 3,

          spaceBetween: 18

        },

        1024: {

          slidesPerView: 4,

          spaceBetween: 20

        },

        1280: {

          slidesPerView: 5,

          spaceBetween: 20

        }

      }

    }
  );




const onlineCinemaSwiper =
  new Swiper(
    ".onlineCinemaSwiper",
    {

      modules: [
        Navigation
      ],

      slidesPerView: 1.2,

      spaceBetween: 12,

      navigation: {

        nextEl:
          ".online-cinema-prev",

        prevEl:
          ".online-cinema-next"

      },

      breakpoints: {

        640: {

          slidesPerView: 2,

          spaceBetween: 16

        },

        768: {

          slidesPerView: 3,

          spaceBetween: 18

        },

        1024: {

          slidesPerView: 4,

          spaceBetween: 20

        },

        1280: {

          slidesPerView: 5,

          spaceBetween: 20

        }

      }

    }
  );



await loadExclusiveSections();




exclusiveSeriesSwiper.update();

onlineCinemaSwiper.update();




createMovieModal();