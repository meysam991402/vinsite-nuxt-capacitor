export default defineNuxtRouteMiddleware((to, from) => {
  let cookie = useCookie("auth");

  if (to.path == "/panel" || to.path == "/orders-list") {
    if (!cookie.value) {
      return navigateTo("/");
    }
  }
});
