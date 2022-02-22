export interface CreateProductDTO {
  title: string;
  description: string;
  price: number;
  created_at?: string;
  id?: string;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;
