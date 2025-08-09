import React, { useEffect, useState, useContext } from 'react';
import API from '../api/api';
import BookmarkForm from '../components/BookmarkForm';
import BookmarkList from '../components/BookmarkList';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard(){
  const [bookmarks, setBookmarks] = useState([]);
  const [q, setQ] = useState('');
  const { user, logout } = useContext(AuthContext);

  const fetchBookmarks = async () => {
    try{
      const res = await API.get('/bookmarks', { params: { q } });
      setBookmarks(res.data);
    }catch(e){ console.error(e); }
  }

  useEffect(()=>{ fetchBookmarks() }, [q]);

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h3>Welcome, {user?.name}</h3>
        <div>
          <input placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
          <button className="btn" style={{marginLeft:8}} onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={{display:'flex',gap:12,marginTop:12}}>
        <div style={{flex:1}}>
          <BookmarkForm onCreate={fetchBookmarks} />
        </div>
        <div style={{flex:2}}>
          <BookmarkList bookmarks={bookmarks} onChange={fetchBookmarks} />
        </div>
      </div>
    </div>
  )
}