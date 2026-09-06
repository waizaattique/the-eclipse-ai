export default function Home() {
  return (
    <main>
      <nav className="navbar">
        <div className="logo">TheEclipse.ai</div>

        <a href="/login" className="login-btn">
          Login
        </a>
      </nav>

      <section className="hero">
        <h1>Study Smarter, Not Harder</h1>

        <p>
          Your all-in-one student workspace for
          <br />
          notes, planner, reminders, and tasks.
        </p>

        <a href="/signup" className="start-btn">
          Start Now
        </a>
      </section>
    </main>
  );
}