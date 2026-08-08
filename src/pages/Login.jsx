import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

function Login2() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData
      );

      if (response) {
        toast.success(response.data.msg);

        navigate("/dashboard");
        localStorage.setItem("jwttoken", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.userData));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [error.response.data.field]: error.response.data.msg,
      }));
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="auth-page">
      <div className="auth-side">
        <a href="/" className="auth-logo">
          <span className="logo-mark">
            <MessageCircle size={18} strokeWidth={2.5} />
          </span>
          <span className="logo-word">Dukania</span>
        </a>

        <div className="auth-side__content">
          <span className="eyebrow eyebrow--onlight">
            <span className="eyebrow-dot" />
            Welcome back
          </span>
          <h2 className="auth-side__title">
            Your Store. One Link. Orders on WhatsApp.
          </h2>
          <p className="auth-side__sub">
            Log in to manage your products, track orders, and keep growing your business.
          </p>

          <div className="auth-float">
            <span className="auth-float__badge">
              <MessageCircle size={12} />
            </span>
            <div>
              <p className="auth-float__title">New order · WhatsApp</p>
              <p className="auth-float__sub">2× Embroidered Kurti — Rs 4,900</p>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <a href="/" className="auth-logo auth-logo--mobile">
            <span className="logo-mark">
              <MessageCircle size={18} strokeWidth={2.5} />
            </span>
            <span className="logo-word">Dukania</span>
          </a>

          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Log in
          </span>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-sub">Log in to keep managing your store and orders.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <div className="auth-input-wrap">
                <Mail size={16} className="auth-input-icon" />
                <input type="email" placeholder="you@example.com" className="auth-input"
                  name="email"
                  value={formData.email}
                  onChange={handleChange} />

              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrap">
                <Lock size={16} className="auth-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="auth-input"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="auth-input-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Show or hide password"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="auth-row">
              <a href="/forgot-password" className="auth-link">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn--primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <a href="/register" className="auth-link auth-link--strong">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login2;
