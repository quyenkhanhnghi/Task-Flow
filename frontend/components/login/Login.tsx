import Link from "next/link";
import { FormLogin } from "./FormLogin";
import "./login.css";

interface SigninProps {}

export function Login({}: SigninProps) {
  return (
    <>
      <div className="main">
        <div className="login-form">
          <h1 className="heading-login-form">Login</h1>
          <FormLogin />
          <p className="text-center">
            Need to create account ? {/**TODO:link to register */}
            <Link className="link-form-login" href="/">
              Create Account
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
