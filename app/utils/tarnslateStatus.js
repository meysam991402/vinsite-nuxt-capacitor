export default function translateStatus(status) {
  let statusItem = {
    title: "",
    style: "",
    disable: false,
  };
  switch (status) {
    case "available":
      statusItem.title = "موجود";
      statusItem.style = "bg-green-600 text-white";
      break;
    case "out_of_stock":
      statusItem.title = "ناموجود";
      statusItem.style = "bg-red-600 opacity-50 cursor-not-allowed text-white";
      statusItem.disable = true;

      break;
    case "soon":
      statusItem.title = "به زودی";
      statusItem.style = "bg-yellow-600 opacity-50";
      statusItem.disable = true;

      break;
    case "new":
      statusItem.title = "جدید";
      statusItem.style = "bg-green-600 text-white";

      break;
    case "in_progress":
      statusItem.title = "در انتظار تکمیل";
      statusItem.style = "bg-orange-600 text-white";
      break;
    case "delivered":
      statusItem.title = "ارسال شده";
      statusItem.style = "bg-green-600 text-white";
      break;
    case "wait_for_payment":
      statusItem.title = "در انتظار پرداخت";
      statusItem.style = "bg-orange-600 text-white";
      break;
    case "canceled":
      statusItem.title = "کنسل شده";
      statusItem.style = "bg-red-600 text-white";

      break;
    case "failed":
      statusItem.title = "شکست خورده";
      statusItem.style = "bg-red-600 text-white";

      break;
    case "canceled_by_user":
      statusItem.title = "لغو شده توسط کاربر";
      statusItem.style = "bg-red-600 text-white";

      break;
    case "succes":
      statusItem.title = "موفق";
      statusItem.style = "bg-green-600 text-white";

      break;
    case "withdraw":
      statusItem.title = "برداشت";
      statusItem.style = "bg-red-600 text-white";

      break;
    case "deposit":
      statusItem.title = "شارژ";
      statusItem.style = "bg-green-600 text-white";

      break;
    case "pending":
      statusItem.title = "در انتظار تکمیل";
      statusItem.style = "bg-yellow-600 text-white";

      break;
    case "paying":
      statusItem.title = "در انتظار پرداخت";
      statusItem.style = "bg-yellow-700 text-white";

      break;
    case "paid":
      statusItem.title = "پرداخت شده";
      statusItem.style = "bg-green-600 text-white";

      break;

    default:
      break;
  }

  return statusItem;
}
