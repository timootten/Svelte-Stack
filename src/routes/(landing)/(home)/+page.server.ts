import type { Actions } from "./$types";

export const actions: Actions = {
  changeTheme: async ({ cookies }) => {

    let theme = cookies.get('theme');

    theme === "light" ? theme = "dark" : theme = "light";

    cookies.set("theme", theme, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: false,
      secure: true,
    });
  }
}