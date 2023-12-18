import { persianNumbers, arabicNumbers, iPhoneNumbers } from '@/constants/const'

export function convertPersianNumberToEnglish(number) {
  for (let i = 0; i < 10; i++) {
    number = number
      .replace(persianNumbers[i], i)
      .replace(arabicNumbers[i], i)
      .replace(iPhoneNumbers[i], i)
  }
  return number
}
