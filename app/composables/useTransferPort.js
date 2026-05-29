export default function useTransferPort() {
  const transferPort = (data) => {
    const store = useCartStore();

    let router = useRouter();
    let formContainer = document.getElementById("formContainer");
    let responseData = data;
    if (responseData.need_pay) {
      let makeResponse = responseData.make_response;
      let params = makeResponse.inputs;
      useNuxtApp().$toast.success("درحال اتتقال به درگاه پرداهت", {
        autoClose: 2000,
        dangerouslyHTMLString: true,
        rtl: true,
      });
      //   this.transferPortal = true;
      if (responseData.method == "POST") {
        const form = document.createElement("form");
        form.method = makeResponse.method;
        form.action = makeResponse.url;
        form.target = "_self"; // اطمینان از اینکه در پنجره جاری باز شود
        for (const key in params) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = params[key];
          form.appendChild(input);
        }
        // اضافه کردن فیلدهای مخفی

        // اضافه کردن و ارسال فرم
        formContainer.value.innerHTML = "";
        formContainer.value.appendChild(form);

        // این خط باعث ریدایرکت کاربر با متد POST می‌شود
        form.submit();
      } else {
        //اگه متد get بود باید بسنجیم که مقدار inputs اگه پر بود انتهای url به صورت کوییری استرینگ اضافه کنیم و بعدش ریدایرکت کنیم
        let query = "";
        if (params && typeof params === "object") {
          Object.entries(params).forEach(([key, input], index) => {
            if (index === 0) {
              query += "?" + key + "=" + input;
            } else {
              query += "&" + key + "=" + input;
            }
            index++;
          });
        }
        window.location.href = makeResponse.url + query;
      }
    } else {
      useNuxtApp().$toast.success("خرید با موفقیت انجام شد.", {
        autoClose: 2000,
        dangerouslyHTMLString: true,
        rtl: true,
      });

      store.setCartsCount(0);
      router.push("/orders/" + responseData.order_id);
    }
  };

  return { transferPort };
}
