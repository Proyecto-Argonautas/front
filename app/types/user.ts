// noinspection LanguageDetectionInspection

/**
 * {
 *   name: "Adrián Ureña Vallés",
 *   email: "adrian.urena.20@gmail.com",
 *   emailVerified: true,
 *   image: "https://lh3.googleusercontent.com/a/ACg8ocJU2ET5kzZj4cp6NKRv_is8JbYSAPwB6oKLm_1uOq3qtWRkedSo=s96-c",
 *   createdAt: "2025-07-30T11:16:46.993Z",
 *   updatedAt: "2025-07-30T11:16:46.993Z",
 *   id: "6oxMTaYZEissAPmdoZKbcF4Kgkukx0el"
 * };
 *
 */

export interface User {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  id: string;
}

export interface UserSession {}
