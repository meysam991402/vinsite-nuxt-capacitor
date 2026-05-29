export default function persianDate(val = "") {
  const date = new Date(val);
  let str = date.toLocaleDateString("fa-IR");
  return str;
}
