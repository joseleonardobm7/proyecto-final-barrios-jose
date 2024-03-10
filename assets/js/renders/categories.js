const renderCategories = (environmentData) => {
  const { allCategories } = environmentData;
  let container = document.getElementById("categories-container");
  let content = "";
  ["electronics", "jewelery", "men's clothing", "women's clothing"];
  const dictionary = {
    electronics: "Electrónicos",
    jewelery: "Joyería",
    "men's clothing": "Ropa de Hombre",
    "women's clothing": "Ropa de Mujer",
  };
  for (const category of allCategories) {
    content += `
      <li>
        <a 
          class="dropdown-item navbar-options-selector"
          href="#"
          data-value="${category}"
        >
          ${dictionary[category]}
        </a>
      </li>
    `;
  }
  container.innerHTML = content;
};

export default {
  renderCategories,
};
