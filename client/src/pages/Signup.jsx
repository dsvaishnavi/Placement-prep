import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Snowfall from "react-snowfall";
import { ToastContainer, toast } from "react-toastify";
import { handleerror } from "../utils";
import "react-toastify/dist/ReactToastify.css";

// Mouse Follower Pink Circle
const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const circleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={circleRef}
      className="fixed pointer-events-none z-30 mix-blend-screen"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        transition: "left 0.1s ease-out, top 0.1s ease-out",
        willChange: "transform",
      }}
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-sm" />
      <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r from-pink-400/40 to-purple-400/40 blur-sm" />
      <div className="absolute inset-0 w-4 h-4 rounded-full bg-pink-400/60 blur-sm" />
    </div>
  );
};

const Signup = ({ theme }) => {
  const [signupinfo, setSignupinfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    otp: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setSignupinfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, password, confirmpassword, otp } = signupinfo;

    if (!name || !email || !password || !confirmpassword || !otp) {
      handleerror("All fields are required!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      handleerror("Please enter a valid email address!");
      return false;
    }

    if (password.length < 6) {
      handleerror("Password must be at least 6 characters long!");
      return false;
    }

    if (password !== confirmpassword) {
      handleerror("Passwords do not match!");
      return false;
    }

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      handleerror("OTP must be 6 digits!");
      return false;
    }

    return true;
  };

  const handlesignup = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { name, email, password, otp } = signupinfo;
    console.log("Signup info:", { name, email, password, otp });

    toast.success("Account created successfully! Please login.", {
      position: "top-right",
      autoClose: 3000,
    });

    setSignupinfo({
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      otp: "",
    });
  };

  return (
    <>
      <Snowfall
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 1,
        }}
        snowflakeCount={100}
        color={theme === "dark" ? "#ffffff" : "#cbd5e1"}
        speed={[0.5, 1.5]}
        wind={[-0.5, 0.5]}
        radius={[0.5, 3]}
      />
      <MouseFollower />

      {/* Toast Container - Fixed HIGH z-index to appear above navbar */}
      <div className="fixed top-4 right-4 z-[9999]">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme}
          toastStyle={{
            marginTop: "4rem", // Add margin to push below navbar if needed
            zIndex: 9999,
          }}
        />
      </div>

      {/* Alternative: Toast Container below navbar with top margin */}
      <div className="fixed top-20 right-4 z-[9999]">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme}
        />
      </div>

      <div className="min-h-screen flex items-center justify-center p-4 pt-20">
        {" "}
        {/* Added pt-20 for navbar space */}
        <div
          className={`w-full max-w-lg rounded-2xl p-8 shadow-lg border ${
            theme === "dark"
              ? "bg-gray-900/80 border-gray-700 backdrop-blur-sm"
              : "bg-white/90 border-gray-200 backdrop-blur-sm"
          }`}
        >
          <div className="text-center mb-8">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                theme === "dark" ? "bg-blue-500/20" : "bg-blue-100"
              }`}
            >
              <LogIn
                className={`w-8 h-8 ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
              />
            </div>
            <h2
              className={`text-2xl font-bold mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Create Account
            </h2>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Start your placement preparation journey
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handlesignup}>
            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Full Name
                </label>
                <input
                  name="name"
                  value={signupinfo.name}
                  onChange={handlechange}
                  type="text"
                  placeholder="Enter your name"
                  className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-800/50 text-white focus:ring-blue-500 focus:border-blue-500"
                      : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Email address
                </label>
                <input
                  name="email"
                  onChange={handlechange}
                  type="email"
                  value={signupinfo.email}
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-800/50 text-white focus:ring-blue-500 focus:border-blue-500"
                      : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Password
                </label>
                <input
                  name="password"
                  onChange={handlechange}
                  type="password"
                  value={signupinfo.password}
                  placeholder="Create a password (min. 6 characters)"
                  className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-800/50 text-white focus:ring-blue-500 focus:border-blue-500"
                      : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Confirm Password
                </label>
                <input
                  name="confirmpassword"
                  onChange={handlechange}
                  type="password"
                  placeholder="Confirm password"
                  value={signupinfo.confirmpassword}
                  className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-800/50 text-white focus:ring-blue-500 focus:border-blue-500"
                      : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Enter OTP (6 digits)
                </label>
                <input
                  name="otp"
                  type="text"
                  value={signupinfo.otp}
                  onChange={handlechange}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-800/50 text-white focus:ring-blue-500 focus:border-blue-500"
                      : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                theme === "dark"
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Sign up
            </button>
          </form>

          {/* Footer */}
          <p
            className={`mt-6 text-center text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Already have an account?
            <Link
              to="/login"
              className={`ml-1 font-medium transition-colors ${
                theme === "dark"
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-800"
              }`}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
