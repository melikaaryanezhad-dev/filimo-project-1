

export function createLoginPage() {

  const app =
    document.querySelector("#app");


  if (!app) {
    return;
  }


  app.innerHTML = `
    <main
      class="min-h-screen bg-[#111] flex items-center justify-center px-4 py-10"
    >

      <div
        class="w-full max-w-md rounded-2xl border border-white/10 bg-[#181818] p-6 shadow-2xl sm:p-8"
      >

        <!-- HEADER -->

        <div
          class="mb-8 text-center"
        >

          <button
            id="loginLogo"
            type="button"
            class="inline-block text-3xl font-black text-white"
          >
            فیلیمو
          </button>

          <h1
            class="mt-6 text-2xl font-bold text-white"
          >
            ورود به حساب کاربری
          </h1>

          <p
            class="mt-2 text-sm text-gray-400"
          >
            برای ادامه وارد حساب کاربری خود شوید
          </p>

        </div>


        <!-- FORM -->

        <form
          id="loginForm"
          class="space-y-5"
        >

          <!-- EMAIL -->

          <div>

            <label
              for="loginEmail"
              class="mb-2 block text-sm text-gray-300"
            >
              ایمیل
            </label>

            <input
              id="loginEmail"
              type="email"
              placeholder="example@email.com"
              autocomplete="email"
              class="w-full h-12 rounded-lg border border-white/10 bg-white/5 px-4 text-white outline-none placeholder:text-gray-600 focus:border-[#e5a900] transition"
            />

            <p
              id="emailError"
              class="hidden mt-2 text-xs text-red-400"
            ></p>

          </div>


          <!-- PASSWORD -->

          <div>

            <label
              for="loginPassword"
              class="mb-2 block text-sm text-gray-300"
            >
              رمز عبور
            </label>

            <div
              class="relative"
            >

              <input
                id="loginPassword"
                type="password"
                placeholder="رمز عبور خود را وارد کنید"
                autocomplete="current-password"
                class="w-full h-12 rounded-lg border border-white/10 bg-white/5 px-4 pl-12 text-white outline-none placeholder:text-gray-600 focus:border-[#e5a900] transition"
              />

              <button
                id="togglePassword"
                type="button"
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                aria-label="نمایش رمز عبور"
              >
                👁
              </button>

            </div>

            <p
              id="passwordError"
              class="hidden mt-2 text-xs text-red-400"
            ></p>

          </div>


          <!-- OPTIONS -->

          <div
            class="flex items-center justify-between gap-3 text-xs"
          >

            <label
              class="flex cursor-pointer items-center gap-2 text-gray-400"
            >

              <input
                id="rememberMe"
                type="checkbox"
                class="accent-[#e5a900]"
              />

              مرا به خاطر بسپار

            </label>


            <button
              type="button"
              id="forgotPassword"
              class="text-[#e5a900] transition hover:text-white"
            >
              رمز عبور را فراموش کرده‌اید؟
            </button>

          </div>


          <!-- LOGIN BUTTON -->

          <button
            id="loginSubmitButton"
            type="submit"
            class="w-full h-12 rounded-lg bg-[#e5a900] text-white font-medium transition hover:bg-[#c99400]"
          >
            ورود
          </button>


          <!-- MESSAGE -->

          <div
            id="loginMessage"
            class="hidden rounded-lg border px-4 py-3 text-center text-sm"
          ></div>

        </form>


        <!-- REGISTER -->

        <div
          class="mt-7 bor

der-t border-white/10 pt-6 text-center"
        >

          <span
            class="text-sm text-gray-500"
          >
            حساب کاربری ندارید؟
          </span>

          <button
            id="registerButton"
            type="button"
            class="mr-1 text-sm text-[#e5a900] transition hover:text-white"
          >
            ثبت‌نام کنید
          </button>

        </div>


        <!-- BACK -->

        <button
          id="backToHome"
          type="button"
          class="mt-5 w-full text-center text-sm text-gray-500 transition hover:text-white"
        >
          ← بازگشت به صفحه اصلی
        </button>

      </div>

    </main>
  `;




  const loginForm =
    document.querySelector("#loginForm");

  const emailInput =
    document.querySelector("#loginEmail");

  const passwordInput =
    document.querySelector("#loginPassword");

  const emailError =
    document.querySelector("#emailError");

  const passwordError =
    document.querySelector("#passwordError");

  const loginMessage =
    document.querySelector("#loginMessage");

  const togglePassword =
    document.querySelector("#togglePassword");

  const loginSubmitButton =
    document.querySelector("#loginSubmitButton");

  const backToHome =
    document.querySelector("#backToHome");

  const loginLogo =
    document.querySelector("#loginLogo");

  const forgotPassword =
    document.querySelector("#forgotPassword");

  const registerButton =
    document.querySelector("#registerButton");




  togglePassword.addEventListener(
    "click",
    () => {

      if (
        passwordInput.type ===
        "password"
      ) {

        passwordInput.type =
          "text";

        togglePassword.textContent =
          "🙈";

        togglePassword.setAttribute(
          "aria-label",
          "مخفی کردن رمز عبور"
        );

      } else {

        passwordInput.type =
          "password";

        togglePassword.textContent =
          "👁";

        togglePassword.setAttribute(
          "aria-label",
          "نمایش رمز عبور"
        );

      }

    }
  );




  loginForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      emailError.classList.add(
        "hidden"
      );

      passwordError.classList.add(
        "hidden"
      );

      loginMessage.classList.add(
        "hidden"
      );


      const email =
        emailInput.value.trim();

      const password =
        passwordInput.value.trim();


      let isValid = true;



      if (!email) {

        emailError.textContent =
          "لطفاً ایمیل خود را وارد کنید.";

        emailError.classList.remove(
          "hidden"
        );

        isValid = false;

      } else if (
        !email.includes("@")
      ) {

        emailError.textContent =
          "لطفاً یک ایمیل معتبر وارد کنید.";

        emailError.classList.remove(
          "hidden"
        );

        isValid = false;

      }


     

      if (!password) {

        passwordError.textContent =
          "لطفاً رمز عبور خود را وارد کنید.";

        passwordError.classList.remove(
          "hidden"
        );

        isValid = false;

      } else if (
        password.length < 6
      ) {

        passwordError.textContent =
          "رمز عبور باید حداقل ۶ کاراکتر باشد.";

        passwordError.classList.remove(
          "hidden"
        );

        isValid = false;

      }


      if (!isValid) {
        return;
      }


      

      loginSubmitButton.disabled =
        true;

      loginSubmitButton.textContent =
        "در حال بررسی...";

try {

     

        const response =
          await fetch(
            "http://localhost:3000/users"
          );


        if (!response.ok) {

          throw new Error(
            "خطا در دریافت کاربران"
          );

        }


        const users =
          await response.json();


   

        const user =
          users.find(
            (item) =>
              item.email.toLowerCase() ===
                email.toLowerCase() &&
              item.password ===
                password
          );


      

        if (!user) {

          loginMessage.textContent =
            "ایمیل یا رمز عبور اشتباه است.";

          loginMessage.className =
            "rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400";

          return;
        }


     

        loginMessage.textContent =
          `خوش آمدید ${user.name} عزیز 🌹`;

        loginMessage.className =
          "rounded-lg border border-[#e5a900]/30 bg-[#e5a900]/10 px-4 py-3 text-center text-sm text-[#e5a900]";


    

        const rememberMe =
          document.querySelector(
            "#rememberMe"
          );


        if (
          rememberMe &&
          rememberMe.checked
        ) {

          localStorage.setItem(
            "filimoUser",
            JSON.stringify(user)
          );

        } else {

          sessionStorage.setItem(
            "filimoUser",
            JSON.stringify(user)
          );

        }


  

        loginSubmitButton.textContent =
          "ورود موفق بود ✓";


    

        setTimeout(() => {

          window.location.href =
            "/";

        }, 1200);


      } catch (error) {

        console.error(error);


        loginMessage.textContent =
          "ارتباط با سرور برقرار نشد. ابتدا JSON Server را اجرا کنید.";

        loginMessage.className =
          "rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400";


      } finally {

        loginSubmitButton.disabled =
          false;


        if (
          loginSubmitButton.textContent ===
          "در حال بررسی..."
        ) {

          loginSubmitButton.textContent =
            "ورود";

        }

      }

    }
  );



  forgotPassword.addEventListener(
    "click",
    () => {

      alert(
        "بخش بازیابی رمز عبور در مرحله بعدی اضافه می‌شود."
      );

    }
  );



  registerButton.addEventListener(
    "click",
    () => {

      alert(
        "صفحه ثبت‌نام در مرحله بعدی اضافه می‌شود."
      );

    }
  );


  

  function goHome() {

    window.location.href =
      "/";

  }


  backToHome.addEventListener(
    "click",
    goHome
  );


  loginLogo.addEventListener(
    "click",
    goHome
  );

}