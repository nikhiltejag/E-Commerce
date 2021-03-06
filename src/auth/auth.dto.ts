export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO extends LoginDTO {
  seller?: boolean;
  admin?: boolean;
}
