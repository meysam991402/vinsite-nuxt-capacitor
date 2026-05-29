export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  //  setCookie(event, 'ln',body.langCookie)
  setCookie(event, "auth", body.langCookie);
  setCookie(event, "likes", body.likesCookie);

  //  Authorization: auth.logged ? `Bearer ${auth.accessToken}` : ''
});
