export interface UserData {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  emailVerified: boolean | null;
  phoneNumber?: string | null;
  Cin?: number  | null;
}
