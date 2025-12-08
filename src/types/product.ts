export type Product = {
  id: string;
  name: string;
  image?: string;
  // En la app lo manejamos en unidades (129.99 en vez de 12999)
  price: number;
  stock: number;
  category?: string;
  description?: string; // viene de product_details
};


export type CartItem = Product & {
  quantity: number;
};
