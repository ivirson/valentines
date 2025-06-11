let currentPageIndex = 0;
const MAX_VISIBLE_DOTS = 7;
let pages = [];

export function initializePages() {
  pages = document.querySelectorAll(".page");
}

export function scrollToPage(index) {
  if (index < 0 || index >= pages.length) return;
  pages[index].scrollIntoView({ behavior: "smooth" });
  currentPageIndex = index;
  renderVisibleDots(currentPageIndex);
}

function scrollToNext(chevron) {
  const current = chevron.closest(".page");
  const next = current.nextElementSibling;
  if (next) {
    const nextIndex = [...pages].indexOf(next);
    scrollToPage(nextIndex);
  }
}

function scrollToPrevious(chevron) {
  const current = chevron.closest(".page");
  const previous = current.previousElementSibling;
  if (previous) {
    const previousIndex = [...pages].indexOf(previous);
    scrollToPage(previousIndex);
  }
}

export function setupScrollBehavior() {
  initializePages();
  renderVisibleDots(0);

  setupIntersectionObserver();

  //   let autoScrollInterval = setInterval(() => {
  //     if (currentPageIndex < pages.length - 1) {
  //       currentPageIndex++;
  //       scrollToPage(currentPageIndex);
  //     } else {
  //       clearInterval(autoScrollInterval);
  //     }

  //     scrollToPage(currentPageIndex);
  //   }, 10000);

  window.addEventListener("scroll", () => {
    let closestIndex = 0;
    let minDistance = Infinity;

    pages.forEach((page, index) => {
      const distance = Math.abs(page.getBoundingClientRect().top);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== currentPageIndex) {
      currentPageIndex = closestIndex;
      renderVisibleDots(currentPageIndex);
    }
  });
}

function setupIntersectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      let visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (visibleEntry) {
        const index = [...pages].indexOf(visibleEntry.target);
        if (index !== currentPageIndex) {
          currentPageIndex = index;
          renderVisibleDots(currentPageIndex);
        }
      }
    },
    {
      root: null,
      threshold: 0.6,
    }
  );

  pages.forEach((page) => observer.observe(page));
}

function renderVisibleDots(currentIndex = 0) {
  const indicator = document.getElementById("page-indicator");
  indicator.innerHTML = "";

  const total = pages.length;
  let start = Math.max(0, currentIndex - Math.floor(MAX_VISIBLE_DOTS / 2));
  let end = Math.min(total, start + MAX_VISIBLE_DOTS);

  if (end - start < MAX_VISIBLE_DOTS) {
    start = Math.max(0, end - MAX_VISIBLE_DOTS);
  }

  for (let i = start; i < end; i++) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("dot-wrapper");

    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === currentIndex) dot.classList.add("active");

    dot.addEventListener("click", () => scrollToPage(i));

    wrapper.appendChild(dot);
    indicator.appendChild(wrapper);
  }
}

export { scrollToNext, scrollToPrevious };
