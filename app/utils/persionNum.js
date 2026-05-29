export default function conv2EnNum(str){
    let Num = str; // Output should be "33665any55453200"
  // ٠٩١١٢٣٤٥٦٧٨
  Num = Num.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(
    /[۰-۹]/g,
    (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)
  );
  return Num;

}