const makeRequest = async (url: string, method: string, body?: string) => {
  return await fetch(`http://localhost:8080/${url}`, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const loadCategories = async (): Promise<any> => {
  const result = await makeRequest('categories', 'GET');
  return await result.json();
};

export const loadItems = async (category: string): Promise<any> => {
  const result = await makeRequest(`categories/${category}`, 'GET');
  return await result.json();
};

export const saveRecipe = async (recipe: any, activeCategory: string) => {
  const result = await makeRequest(
    'recipe',
    'POST',
    JSON.stringify({
      recipe,
      activeCategory,
    })
  );
  return await result.json();
};

export const addRecipeRequest = async (activeCategory: string) => {
  const result = await makeRequest(
    'recipe/new',
    'POST',
    JSON.stringify({
      activeCategory,
    })
  );
  return await result.json();
};

export const deleteRecipe = async (id: string, activeCategory: string) => {
  const result = await makeRequest(`recipe/${activeCategory}/${id}`, 'DELETE');
  return await result.json();
}
