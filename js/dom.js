import { pagesArray } from "./data.js";
import { scrollToNext, scrollToPrevious } from "./scroll.js";

export function createPageElement(
  { title, content, image },
  isLastPage,
  index
) {
  const section = document.createElement("section");
  section.className = "page";
  section.style.backgroundImage = `url('assets/images/${image}')`;

  const contentDiv = document.createElement("div");
  contentDiv.className = "content";

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const p = document.createElement("p");
  p.innerHTML = content;

  contentDiv.appendChild(h2);
  contentDiv.appendChild(p);
  section.appendChild(contentDiv);

  if (index > 0) {
    const chevronUp = document.createElement("div");
    chevronUp.className = "chevron chevron-up";
    chevronUp.innerHTML = '<i class="fas fa-chevron-up"></i>';
    chevronUp.addEventListener("click", () => scrollToPrevious(chevronUp));
    section.appendChild(chevronUp);
  }

  if (!isLastPage) {
    const chevronDown = document.createElement("div");
    chevronDown.className = "chevron chevron-down";
    chevronDown.innerHTML = '<i class="fas fa-chevron-down"></i>';
    chevronDown.addEventListener("click", () => scrollToNext(chevronDown));
    section.appendChild(chevronDown);
  }

  return section;
}

export function loadPages() {
  const container = document.getElementById("pages-container");
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  pagesArray.forEach((page, index) => {
    const isLast = index === pagesArray.length - 1;
    fragment.appendChild(createPageElement(page, isLast, index));
  });

  container.appendChild(fragment);
}
