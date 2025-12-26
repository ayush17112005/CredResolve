export interface CreateUserDTO {
  name:  string;
  email: string;
  phone?:  string | undefined;
}

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string ;
  phone?:  string | undefined;
  createdAt:  Date;
}