export function convertPersianNumberToEnglish(number) {
  const persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ]
  const arabicNumbers = [
    /٠/g,
    /١/g,
    /٢/g,
    /٣/g,
    /٤/g,
    /٥/g,
    /٦/g,
    /٧/g,
    /٨/g,
    /٩/g,
  ]
  const iPhoneNumbers = [
    /٠/g,
    /١/g,
    /٢/g,
    /٣/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /٧/g,
    /٨/g,
    /٩/g,
  ]
  for (let i = 0; i < 10; i++) {
    number = number
      .replace(persianNumbers[i], i)
      .replace(arabicNumbers[i], i)
      .replace(iPhoneNumbers[i], i)
  }
  return number
}
