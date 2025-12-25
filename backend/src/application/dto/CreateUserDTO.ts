export interface CreateUserDTO {
  name:  string;
  email: string;
  phone?:  string;
}

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  phone?:  string;
  createdAt:  Date;
}