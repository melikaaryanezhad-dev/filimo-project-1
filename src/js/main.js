import "../css/main.css";

import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { createHeader, setupMobileMenu } from "./components/header.js";

import { createHero } from "./components/hero.js";

import {
  createMovieSection,
  loadMovies,
  setupMovieSearch,
} from "./components/movieSection.js";

import {
  createNewMoviesSection,
  loadNewMovies,
} from "./components/newMovies.js";

import {
  createSpecialMoviesSection,
  loadSpecialMovies,
} from "./components/specialMovies.js";

import { createMovieModal } from "./components/movieModal.js";

import { createLoginPage } from "./components/login.js";

import { createSchoolSection, loadSchoolSection } from "./components/school.js";

import {
  createExclusiveSections,
  loadExclusiveSections,
} from "./components/exclusiveSections.js";

const app = document.querySelector("#app");

if (!app) {
  throw new Error("App element not found");
}

// ساختار اصلی صفحه
app.innerHTML = `
  ${createHeader()}

  <div id="heroContainer"></div>

  ${createMovieSection()}

  ${createNewMoviesSection()}

  ${createSpecialMoviesSection()}

  ${createSchoolSection()}

  ${createExclusiveSections()}
`;

// منوی موبایل
setupMobileMenu();

// ورود به حساب کاربری
const desktopLoginButton = document.querySelector("#desktopLoginButton");

const mobileLoginButton = document.querySelector("#mobileLoginButton");

function openLoginPage() {
  createLoginPage();
}

if (desktopLoginButton) {
  desktopLoginButton.addEventListener("click", openLoginPage);
}

if (mobileLoginButton) {
  mobileLoginButton.addEventListener("click", openLoginPage);
}

// تنظیمات مشترک اسلایدرها
function createSlider(selector, nextSelector, prevSelector, options = {}) {
  const element = document.querySelector(selector);

  if (!element) {
    console.warn(`Slider not found: ${selector}`);
    return null;
  }

  return new Swiper(selector, {
    modules: [Navigation],

    slidesPerView: 2,
    spaceBetween: 12,

    navigation: {
      nextEl: nextSelector,
      prevEl: prevSelector,
    },

    observer: true,
    observeParents: true,

    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 16,
      },

      768: {
        slidesPerView: 4,
        spaceBetween: 18,
      },

      1024: {
        slidesPerView: 5,
        spaceBetween: 20,
      },

      1280: {
        slidesPerView: 6,
        spaceBetween: 20,
      },
    },

    ...options,
  });
}

// راه‌اندازی سایت
async function initializeApp() {
  try {
    // دریافت اطلاعات فیلم‌ها
    const movies = await loadMovies();

    window.movies = movies;

    // اسلایدر اصلی
    const heroContainer = document.querySelector("#heroContainer");

    if (heroContainer) {
      heroContainer.innerHTML = createHero(movies);
    }

    const heroElement = document.querySelector(".heroSwiper");

    if (heroElement) {
      new Swiper(".heroSwiper", {
        modules: [Navigation, Pagination, Autoplay],

        loop: true,

        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },

        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        observer: true,
        observeParents: true,
      });
    }

    // بخش فیلم‌ها
    const movieSwiper = createSlider(
      ".movieSwiper",
      ".movie-next",
      ".movie-prev",
    );

    setupMovieSearch(movies, movieSwiper);

    // بخش تازه‌ها
    const newMoviesSwiper = createSlider(
      ".newMoviesSwiper",
      ".new-movies-next",
      ".new-movies-prev",
    );

    await loadNewMovies(movies, newMoviesSwiper);

    // بخش ویژه‌ها
    const specialMoviesSwiper = createSlider(
      ".specialMoviesSwiper",
      ".special-movies-next",
      ".special-movies-prev",
    );

    await loadSpecialMovies(movies, specialMoviesSwiper);

    // فیلیمو مدرسه
    await loadSchoolSection();

    // سریال‌های اختصاصی
    const exclusiveSeriesSwiper = createSlider(
      ".exclusiveSeriesSwiper",
      ".exclusive-series-next",
      ".exclusive-series-prev",
      {
        slidesPerView: 1.2,

        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },

          768: {
            slidesPerView: 3,
            spaceBetween: 18,
          },

          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },

          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        },
      },
    );

    // اکران آنلاین
    const onlineCinemaSwiper = createSlider(
      ".onlineCinemaSwiper",
      ".online-cinema-next",
      ".online-cinema-prev",
      {
        slidesPerView: 1.2,

        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },

          768: {
            slidesPerView: 3,
            spaceBetween: 18,
          },

          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },

          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        },
      },
    );

    // دریافت اطلاعات سریال‌ها و اکران آنلاین
    await loadExclusiveSections();

    // به‌روزرسانی اسلایدرها
    [
      movieSwiper,
      newMoviesSwiper,
      specialMoviesSwiper,
      exclusiveSeriesSwiper,
      onlineCinemaSwiper,
    ].forEach((swiper) => {
      if (swiper && !swiper.destroyed) {
        swiper.update();
      }
    });

    // پنجره جزئیات فیلم
    createMovieModal();

    console.log("سایت فیلیمو با موفقیت راه‌اندازی شد.");
  } catch (error) {
    console.error("خطا در راه‌اندازی سایت:", error);
  }
}

initializeApp();
