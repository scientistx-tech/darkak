import { auth, provider, signInWithPopup } from "@/utils/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { convertFirebaseToAppUser } from "@/utils/convertFirebaseUser";
import { FaGoogle } from "react-icons/fa";
import { useUserGoogleAuthenticationMutation, useGetUserQuery } from "@/redux/services/authApis";
import { GoogleAuthProvider } from "firebase/auth";

const SocialButton = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, refetch } = useGetUserQuery(undefined);
  const [userGoogleAuthentication] = useUserGoogleAuthenticationMutation();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // const appUser = convertFirebaseToAppUser(user);

      const firebaseToken = await user.getIdToken();
      // console.log("🚀 ~ handleGoogleLogin ~ token:", firebaseToken);
      // console.log("🚀 ~ handleGoogleLogin ~ user.displayName:", user.displayName);
      
      const userValue = await userGoogleAuthentication({ token: firebaseToken, name: user.displayName || "Unknown User" }).unwrap();
      toast.success("Google login successful!");
      console.log("🚀 ~ handleGoogleLogin ~ userValue:", userValue)

      dispatch(setUser(userValue));

    } catch (error: any) {
      toast.error("Google login failed!");
      console.error(error);
    }
  };

  return (
    <div className="my-4 flex justify-center gap-4">
      {[FaGoogle].map((Icon, index) => (
    <button
          onClick={handleGoogleLogin}
          key={index}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primaryBlue text-white transition hover:bg-primary"
    >
          <Icon size={20} />
    </button>
      ))}
    </div>
  );
};

export default SocialButton;
