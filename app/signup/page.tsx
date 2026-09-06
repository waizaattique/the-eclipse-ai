"use client";
import styles from "./signup.module.css";

import { useState } from "react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className={styles.signupPage}>
      <div className={styles.formContainer}>
        <form action="/home">
          <h1>TheEclipse.ai</h1>
          <h2>Sign Up</h2>

          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your Email"
            required
          />

          <div className={styles.passwordGroup}>
            <div className={styles.passwordInputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create Password"
                minLength={6}
                maxLength={12}
                required
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <small className={styles.passwordNote}>
              6–12 characters with letters, numbers, and a symbol
            </small>
          </div>

          <div className={styles.passwordInputWrapper}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
              required
            />

            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button className={styles.button} type="submit">
            Sign Up
          </button>

          <p className={styles.loginText}>
            Already have an account?{" "}
            <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </main>
  );
}
