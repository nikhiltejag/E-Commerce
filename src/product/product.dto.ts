export interface CreateProductDTO {
    title: string,
    image: string,
    descritpion: string,
    price: number
}

export type UpdateProductDTO = Partial<CreateProductDTO>