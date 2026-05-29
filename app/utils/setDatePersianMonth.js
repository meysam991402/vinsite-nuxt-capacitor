export default function persianMonth(val = "") {
  const date = new Date(val);

  const option = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let str = date.toLocaleDateString("fa-IR", option);
  let parts = str.split(" ");
  let day = parts[2].split(",");

  return parts[3] + " " + day[0] + " " + parts[1] + " " + parts[0];
}
