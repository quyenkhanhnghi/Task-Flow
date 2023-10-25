"use client";
import "./login.css";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../button/Button";

export const FormLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: email,
        password,
        callbackUrl,
      });
      console.log("Res", res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("Invalid email or password");
      }
    } catch (err: any) {}
  };

  return (
    <form onSubmit={onSubmit} className="form-container">
      <div className="input-form-container">
        <label htmlFor="email">E-mail</label>
        <input
          className="input-form"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
        />
      </div>
      <div className="input-form-container">
        <label htmlFor="password">Password</label>
        <input
          className="input-form"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />
      </div>
      {/* {error && <alert>{error}</alert>} */}
      <div className="w-full">
        <Button variant="contained" fullWidth={true}>
          Login
        </Button>
      </div>
    </form>
  );
};
