import React, { useState, useContext } from 'react';
import API from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [err, setErr] = useState('');

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async () => {
    try{
      const res = await API.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/');
    }catch(e){ setErr(e.response?.data?.msg || 'Registration failed'); }
  }

  return (
    <div className="card">
      <h3>Register</h3>
      {err && <div className="small" style={{color:'red'}}>{err}</div>}
      <div style={{display:'grid',gap:8,maxWidth:420}}>
        <input name="name" placeholder="Name" onChange={handle} />
        <input name="email" placeholder="Email" onChange={handle} />
        <input name="password" placeholder="Password" type="password" onChange={handle} />
        <button className="btn" onClick={submit}>Register</button>
      </div>
    </div>
  )
}