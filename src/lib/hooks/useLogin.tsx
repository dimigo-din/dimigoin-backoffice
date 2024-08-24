import { useGoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../api/auth";
const useLogin = () => {
  const login = useGoogleLogin({
    hosted_domain: "dimigo.hs.kr",
    flow: "auth-code",
    ux_mode: "popup",
    redirect_uri: "http://localhost:3000/dashboard/stay",
    onSuccess: async (auth) => {
      await googleLogin({ token: auth.code });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { login };
};

export { useLogin };
