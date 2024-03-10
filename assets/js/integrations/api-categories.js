const getCategories = async () => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const categories = response.json();
    return categories;
  } catch (e) {
    console.error(
      "Ocurrio un error al obtener las categorias o la 'API SE ENCUENTRA CAIDA', se cargaron lo datos manualmente",
      e
    );
    return ["electronics", "jewelery", "men's clothing", "women's clothing"];
  }
};

// EXPORTAR
export default {
  getCategories,
};
