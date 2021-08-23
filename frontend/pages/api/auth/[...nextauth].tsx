import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const user = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(user),
        });

        if (res.ok && user) {
          return user;
        } else {
          throw new Error("aaa");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },
});
