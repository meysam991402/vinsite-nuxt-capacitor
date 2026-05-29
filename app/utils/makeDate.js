export default function makeDate(date){


    let arr=date.split("/")
    switch(arr[1]) {
      case "۱":
        return `${arr[2]} فروردین ${arr[0]}`
        break;
      case "۲":
          return `${arr[2]} اردیبهشت ${arr[0]}`
        break;
      case "۳":
          return `${arr[2]} خرداد ${arr[0]}`
        break;
      case "۴":
          return `${arr[2]} تیر ${arr[0]}`
        break;
      case "۵":
          return `${arr[2]} مرداد ${arr[0]}`
        break;
      case "۶":
          return `${arr[2]} شهریور ${arr[0]}`
        break;
      case "۷":
          return `${arr[2]} مهر ${arr[0]}`
        break;
      case "۸":
          return `${arr[2]} آبان ${arr[0]}`
        break;
      case "۹":
          return `${arr[2]} آذر ${arr[0]}`
        break;
      case "۱۰":
          return `${arr[2]} دی ${arr[0]}`
        break;
      case "۱۱":
          return `${arr[2]} بهمن ${arr[0]}`
        break;
      case "۱۲":
          return `${arr[2]} اسفند ${arr[0]}`
        break;
      default:
        return date
    }
}