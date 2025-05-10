import { auth, provider, signInWithPopup } from "@/utils/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { convertFirebaseToAppUser } from "@/utils/convertFirebaseUser";
import { FaGoogle } from "react-icons/fa";

const SocialButton = () => {
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const appUser = convertFirebaseToAppUser(user);

      // You can store user in Redux or make an API call to sync with your backend
      dispatch(setUser({
        user: appUser,
        token: await user.getIdToken(),
      }));

      toast.success("Google login successful!");
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
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5694FF] text-white transition hover:bg-[#003084]"
    >
          <Icon size={20} />
    </button>
      ))}
    </div>
  );
};

export default SocialButton;
