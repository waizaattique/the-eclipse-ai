import styles from "./login.module.css";
export default function LoginPage() {
  return (
    <main className={styles.loginPage}>
      <div className={styles.formContainer}>
        <h1>TheEclipse.ai</h1>
        <h2>Login</h2>

        <form action="/home">
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your Email"
            required
          />

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Confirm password"
            required
          />

          <a href="/forgot-password" className={styles.forgotPassword}>
            Forgot your password?
          </a>

          <button className={styles.button} type="submit">
            Login
          </button>

          <p className={styles.signupText}>
            Don&apos;t have an account?{" "}
            <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </main>
  );
}
