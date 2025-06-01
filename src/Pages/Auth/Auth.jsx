import React, { useContext, useState } from "react";
import styles from "./Auth.module.css";
import Logo from "../../assets/amazon_PNG24.png";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../Firebase/Firebase";
import { DataContext } from "../../components/Context/Context";
import { Type } from "../../Utility/action.type";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Styles = {
  textAlign: "center",
  padding: "5px",
  color: "red",
  fontweight: "bold",
};
function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [_, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navState = useLocation();
  console.log(navState);

  const redirect = navState?.state?.redirect || "/";
  const msg = navState?.state?.msg;

  function toggleLeAuthMode() {
    setIsLogin(!isLogin);
  }

  async function authHandler(e) {
    e.preventDefault();

    if (e.target.name === "signin") {
      setIsLoading(true);
      try {
        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userInfo.user);
        dispatch({ type: Type.SET_USER, user: userInfo.user });
        navigate(redirect);
      } catch (err) {
        console.error(err);
        setIsLoading(false);

        toast.error(err.code.split("/")[1].split("-").join(" "));
      }
    } else {
      setIsLoading(true);
      try {
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(auth.currentUser, { displayName: name });
        dispatch({
          type: Type.SET_USER,
          user: { ...userInfo.user, displayName: name },
        });
        console.log("Sign up");
        navigate("/");
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        toast.error(err.code.split("/")[1].split("-").join(" "));
      }
    }
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.logo}>
        <img src={Logo} alt="Amazon Logo" />
      </Link>

      <div className={styles.authBox}>
        {msg && <p sytles={styles}>{msg}</p>}
        <h1>{isLogin ? "Sign in" : "Create account"}</h1>

        <form>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email or mobile phone number</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.showPasswordBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoEyeOutline size={20} />
                ) : (
                  <IoEyeOffOutline size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            name={isLogin ? "signin" : "signup"}
            className={styles.submitBtn}
            onClick={authHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader size={15} color="#222" />
            ) : isLogin ? (
              "Sign in"
            ) : (
              "Create your Amazon account"
            )}
          </button>
        </form>

        <div className={styles.terms}>
          By continuing, you agree to Amazon's <a href="#">Conditions of Use</a>{" "}
          and <a href="#">Privacy Notice</a>.
        </div>

        <div className={styles.divider}>
          <span>New to Amazon?</span>
        </div>

        <button className={styles.toggleAuthBtn} onClick={toggleLeAuthMode}>
          {isLogin ? "Create your Amazon account" : "Sign in to your account"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
