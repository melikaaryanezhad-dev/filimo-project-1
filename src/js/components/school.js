

export function createSchoolSection() {

  return `
    <section
      id="school"
      class="bg-[#111] px-4 py-12 sm:px-6 lg:px-8"
    >

      <div
        class="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1d302d] via-[#203936] to-[#172522] shadow-2xl"
      >

        <div
          class="px-5 py-10 sm:px-8 md:px-12 lg:px-16"
        >

          <!-- HEADER -->

          <div class="text-center">

            <div
              class="flex items-center justify-center gap-3"
            >

              <div
                class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#e53935] text-xl font-black text-white shadow-lg sm:h-14 sm:w-14 sm:text-2xl"
              >
                ▶
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


          <!-- GRADES -->

          <div
            id="schoolGrades"
            class="mx-auto mt-9 flex max-w-6xl flex-wrap justify-center gap-3 sm:gap-4"
          >

            <div
              class="py-5 text-sm text-gray-400"
            >
              در حال دریافت اطلاعات...
            </div>

          </div>


          <!-- DIVIDER -->

          <div
            class="my-8 border-t border-white/10"
          ></div>


          <!-- SERVICES -->

          <div
            id="schoolServices"
            class="flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
          >

            <div
              class="text-sm text-gray-400"
            >
              در حال دریافت اطلاعات...
            </div>

          </div>

        </div>

      </div>

    </section>
  `;
}




export async function loadSchoolSection() {

  const title =
    document.querySelector("#schoolTitle");

  const description =
    document.querySelector("#schoolDescription");

  const gradesContainer =
    document.querySelector("#schoolGrades");

  const servicesContainer =
    document.querySelector("#schoolServices");


  if (
    !title ||
    !description ||
    !gradesContainer ||
    !servicesContainer
  ) {
    return;
  }


  try {

    const response =
      await fetch(
        "http://localhost:3000/school"
      );


    if (!response.ok) {

      throw new Error(
        "خطا در دریافت اطلاعات فیلیمو مدرسه"
      );

    }


    const school =
      await response.json();




    title.textContent =
      school.title;




    description.textContent =
      school.description;


  

    gradesContainer.innerHTML =
      school.grades
        .map((grade) => {

          return `
            <button
              type="button"
              class="school-grade group flex min-w-[125px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-200 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:text-white sm:min-w-[140px]"
              data-grade-id="${grade.id}"
            >

              <span>
                ${grade.title}
              </span>

              <span
                class="flex h-6 w-6 items-center justify-center rounded-full bg-[#29423e] text-[10px] text-gray-300 transition group-hover:bg-[#e5a900] group-hover:text-white"
              >
                ${grade.id}
              </span>

</button>
          `;

        })
        .join("");


  

    servicesContainer.innerHTML =
      school.services
        .map((service) => {

          return `
            <button
              type="button"
              class="group flex items-center gap-3 text-sm text-gray-200 transition hover:text-white"
              data-service-id="${service.id}"
            >

              <span
                class="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-sm text-gray-300 transition group-hover:bg-[#e5a900] group-hover:text-white"
              >
                ${service.icon}
              </span>

              <span
                class="whitespace-nowrap"
              >
                ${service.title}
              </span>

            </button>
          `;

        })
        .join("");




    const gradeButtons =
      document.querySelectorAll(
        ".school-grade"
      );


    gradeButtons.forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const gradeId =
            button.dataset.gradeId;


          const grade =
            school.grades.find(
              (item) =>
                String(item.id) ===
                String(gradeId)
            );


          if (!grade) {
            return;
          }


          alert(
            `بخش ${grade.title} در نسخه بعدی اضافه می‌شود.`
          );

        }
      );

    });



    const serviceButtons =
      document.querySelectorAll(
        "#schoolServices button"
      );


    serviceButtons.forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const serviceId =
            button.dataset.serviceId;


          const service =
            school.services.find(
              (item) =>
                String(item.id) ===
                String(serviceId)
            );


          if (!service) {
            return;
          }


          alert(
            `بخش «${service.title}» در نسخه بعدی اضافه می‌شود.`
          );

        }
      );

    });


  } catch (error) {

    console.error(error);


    gradesContainer.innerHTML = `
      <div
        class="w-full py-5 text-center text-sm text-red-300"
      >
        دریافت اطلاعات با مشکل مواجه شد.
      </div>
    `;


    servicesContainer.innerHTML = "";

  }

}