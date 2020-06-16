export type UserDto = {
  id: number;
  username: string;
  signupDate: string;
};

export type UserDao = {
  id?: number;
  username: string;
  signupDate: string;
  updated_at: string;
  created_at: string;
};

export type CreateUserDto = {
  username: string;
};

export function mapUserDtoFromDao(userDao: UserDao): UserDto {
  if (userDao.id === undefined) throw new Error("Dao needs to have an id set");
  return {
    id: userDao.id,
    username: userDao.username,
    signupDate: userDao.signupDate,
  };
}
