// ==========================================
// ساخت بخش فیلیمو مدرسه
// ==========================================

export function createSchoolSection() {
  return `
    <section
      id="school"
      class="bg-[#111] px-4 py-12 sm:px-6 lg:px-8"
    >
      <div
        class="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1d302d] via-[#203936] to-[#172522] shadow-2xl"
      >
        <div class="px-5 py-10 sm:px-8 md:px-12 lg:px-16">

          <div class="text-center">
            <div class="flex items-center justify-center gap-3">

              <div
                class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#e53935] text-xl font-black text-white shadow-lg sm:h-14 sm:w-14 sm:text-2xl"
              >
                ▶️
              </div>

              <h2
                id="schoolTitle"
                class="text-3xl font-black text-white sm:text-4xl md:text-5xl"
              >
                فیلیمو مدرسه
              </h2>

            </div>

            <p
              id="schoolDescription"
              class="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base"
            >
              در حال دریافت اطلاعات...
            </p>
          </div>

          <div
            id="schoolGrades"
            class="mx-auto mt-9 flex max-w-6xl flex-wrap justify-center gap-3 sm:gap-4"
          >
            <div class="py-5 text-sm text-gray-400">
              در حال دریافت اطلاعات...
            </div>
          </div>

          <div class="my-8 border-t border-white/10"></div>

          <div
            id="schoolServices"
            class="flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
          >
            <div class="text-sm text-gray-400">
              در حال دریافت اطلاعات...
            </div>
          </div>

        </div>
      </div>
    </section>
  `;
}

// ==========================================
// دریافت اطلاعات مدرسه از db.json
// ==========================================

export async function loadSchoolSection() {
  const title = document.querySelector("#schoolTitle");
  const description = document.querySelector("#schoolDescription");
  const gradesContainer = document.querySelector("#schoolGrades");
  const servicesContainer = document.querySelector("#schoolServices");

  if (!title || !description || !gradesContainer || !servicesContainer) {
    return;
  }

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}db.json`);

    if (!response.ok) {
      throw new Error(`خطا در دریافت اطلاعات: ${response.status}`);
    }

    const data = await response.json();
    const school = data.school;

    if (!school) {
      throw new Error("اطلاعات مدرسه در db.json پیدا نشد.");
    }

    title.textContent = school.title ?? "فیلیمو مدرسه";
    description.textContent = school.description ?? "";

    const grades = Array.isArray(school.grades) ? school.grades : [];

    const services = Array.isArray(school.services) ? school.services : [];

    // نمایش پایه‌های تحصیلی
    gradesContainer.innerHTML = grades
      .map(
        (grade) => `
        <button
          type="button"
          class="school-grade group flex min-w-[125px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-200 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:text-white sm:min-w-[140px]"
          data-grade-id="${grade.id}"
        >
          <span>${grade.title ?? ""}</span>

          <span
            class="flex h-6 w-6 items-center justify-center rounded-full bg-[#29423e] text-[10px] text-gray-300 transition group-hover:bg-[#e5a900] group-hover:text-white"
          >
            ${grade.id}
          </span>
        </button>
      `,
      )
      .join("");

    // نمایش خدمات آموزشی
    servicesContainer.innerHTML = services
      .map(
        (service) => `
        <button
          type="button"
          class="group flex items-center gap-3 text-sm text-

gray-200 transition hover:text-white"
          data-service-id="${service.id}"
        >
          <span
            class="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-sm text-gray-300 transition group-hover:bg-[#e5a900] group-hover:text-white"
          >
            ${service.icon ?? ""}
          </span>

          <span class="whitespace-nowrap">
            ${service.title ?? ""}
          </span>
        </button>
      `,
      )
      .join("");

    // رویداد کلیک روی پایه‌های تحصیلی
    gradesContainer.querySelectorAll(".school-grade").forEach((button) => {
      button.addEventListener("click", () => {
        const grade = grades.find(
          (item) => String(item.id) === button.dataset.gradeId,
        );

        if (grade) {
          alert(`بخش ${grade.title} در نسخه بعدی اضافه می‌شود.`);
        }
      });
    });

    // رویداد کلیک روی خدمات
    servicesContainer.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const service = services.find(
          (item) => String(item.id) === button.dataset.serviceId,
        );

        if (service) {
          alert(`بخش «${service.title}» در نسخه بعدی اضافه می‌شود.`);
        }
      });
    });
  } catch (error) {
    console.error("خطا در دریافت اطلاعات فیلیمو مدرسه:", error);

    gradesContainer.innerHTML = `
      <div class="w-full py-5 text-center text-sm text-red-300">
        دریافت اطلاعات با مشکل مواجه شد.
      </div>
    `;

    servicesContainer.innerHTML = "";
  }
}
