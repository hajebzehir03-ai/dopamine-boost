export const API_CONFIG = {
  fakestoreapi: {
    baseUrl: 'https://fakestoreapi.com',
    endpoints: {
      products: '/products',
      productById: (id: number) => `/products/${id}`,
      categories: '/products/categories',
      byCategory: (cat: string) => `/products/category/${cat}`,
    },
  },
  dummyjson: {
    baseUrl: 'https://dummyjson.com',
    endpoints: {
      products: '/products?limit=30',
      productById: (id: number) => `/products/${id}`,
      categories: '/products/categories',
      search: (q: string) => `/products/search?q=${encodeURIComponent(q)}`,
    },
  },
}
