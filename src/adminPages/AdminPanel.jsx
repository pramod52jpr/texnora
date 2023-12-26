import React, { useState } from 'react'
import '../adminCss/adminPanel.css'
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    "email": "",
    "password": "",
  });
  const email = "texnora@gmail.com";
  const password = "12345678";

  function onsubmit(e) {
    e.preventDefault();
    if (inputs.email.length === 0 || inputs.password.length === 0) {
      alert("Please fill all inputs");
    } else if (inputs.email === email && inputs.password === password) {
      navigate("/dashboard");
    } else {
      alert("Incorrect Details");
    }
  }
  return (
    <div className="adminPanelPage">
      <div className="content">
        <h1>Welcome</h1>
        <h2>TexNora Admin</h2>
        <form onSubmit={onsubmit}>
          <div className="inputs">
            <label htmlFor="email">Email</label>
            <input type="email" value={inputs.email} onChange={(e) => setInputs({ ...inputs, "email": e.target.value })} name="email" id="email" />
          </div>
          <div className="inputs">
            <label htmlFor="password">Password</label>
            <input type="password" value={inputs.password} onChange={(e) => setInputs({ ...inputs, "password": e.target.value })} name="password" id="password" />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
      <div className="image">
        <img src="assets/admin-panel-logo.png" alt="" />
      </div>
    </div>
  )
}
