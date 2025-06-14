import { auth, provider, signInWithPopup } from "@/utils/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { convertFirebaseToAppUser } from "@/utils/convertFirebaseUser";
import { FaGoogle, FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import {
  useUserGoogleAuthenticationMutation,
  useGetUserQuery,
} from "@/redux/services/authApis";

const SocialButton = () => {
  const dispatch = useDispatch();
  const [userGoogleAuthentication] = useUserGoogleAuthenticationMutation();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const firebaseToken = await user.getIdToken();

      const userValue = await userGoogleAuthentication({
        token: firebaseToken,
        name: user.displayName || "Unknown User",
      }).unwrap();

      toast.success("Google login successful!");
      dispatch(setUser(userValue));
    } catch (error: any) {
      toast.error("Google login failed!");
      console.error(error);
    }
  };

  const handleFacebookLogin = () => {
    toast.info("Facebook login not implemented yet.");
  };

  const handlePhoneLogin = () => {
    toast.info("Phone login not implemented yet.");
  };

  const buttonData = [
    {
      text: "LOGIN WITH GOOGLE",
      color: "bg-[#DB4437] hover:bg-[#c5392f]",
      icon: <FaGoogle size={20} />,
      onClick: handleGoogleLogin,
    },
    {
      text: "LOGIN WITH FACEBOOK",
      color: "bg-[#3b5998] hover:bg-[#2d4373]",
      icon: <FaFacebookF size={20} />,
      onClick: handleFacebookLogin,
    },
    {
      text: "LOGIN WITH PHONE",
      color: "bg-[#34A853] hover:bg-[#2e8b47]",
      icon: <FaPhoneAlt size={20} />,
      onClick: handlePhoneLogin,
    },
  ];

  return (
    <div className="my-6 flex flex-col items-center gap-4">
      {buttonData.map(({ text, color, icon, onClick }, index) => (
        <button
          key={index}
          onClick={onClick}
          className={`w-[80%] flex items-center justify-center gap-3 rounded-md py-3 px-6 text-sm font-semibold text-white shadow-md transition duration-300 ${color}`}
        >
          <span>{icon}</span>
          <span>{text}</span>
        </button>
      ))}
    </div>
  );
};

export default SocialButton;
