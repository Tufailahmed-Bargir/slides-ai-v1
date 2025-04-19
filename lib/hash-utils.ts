import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

// Add the comparePasswords function
export async function comparePasswords(plainPassword: string, hashedPassword: string) {
  return bcrypt.compare(plainPassword, hashedPassword);
}