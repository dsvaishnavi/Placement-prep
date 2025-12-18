import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-surface rounded-xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-primary">
          Create your account
        </h2>
        <p className="text-sm text-center text-muted mt-1">
          Start your placement preparation journey
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary">
              Enter OTP
            </label>
            <input
              type="password"
              placeholder="Enter OTP"
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-primary text-white py-2 rounded-md font-medium hover:bg-primaryAccent transition-colors"
          >
            Sign up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 font-medium text-primary hover:text-primaryAccent transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
