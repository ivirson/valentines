import { pagesArray } from "./data.js";

export function createPageElement(
  { title, content, image },
  isLastPage,
  onScrollNext
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

  if (!isLastPage) {
    const chevron = document.createElement("div");
    chevron.className = "chevron";
    chevron.innerHTML = "⌄";
    chevron.addEventListener("click", () => onScrollNext(chevron));
    section.appendChild(chevron);
  }

  return section;
}

export function loadPages(onScrollNext) {
  const container = document.getElementById("pages-container");
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  pagesArray.forEach((page, index) => {
    const isLast = index === pagesArray.length - 1;
    fragment.appendChild(createPageElement(page, isLast, onScrollNext));
  });

  container.appendChild(fragment);
}
