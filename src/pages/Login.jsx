import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { SignInUser } from "../services/Auth";

const Login = (props) => {
  let navigate = useNavigate();
  const [user, setUser] = useState();

  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginInfo = {
        email: formValues.email,
        password: formValues.password,
      };

      const res = await SignInUser(loginInfo);

      //   props.setUser(res);
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="signin flex-col max-container">
      <h1>Sign In</h1>
      <div className="card-overlay flex-col centered">
        <form className="warpper flex-col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Your Email"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              required
            />
          </div>
          <button
            className="btn-primary"
            disabled={!formValues.email || !formValues.password}
          >
            Sign In
          </button>
        </form>
        <Link to="/auth/register">
          <button className="btn-primary">Create Account</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
