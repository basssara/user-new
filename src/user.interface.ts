export class UserRequest {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class UserResponse {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
