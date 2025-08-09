import React, { useState } from 'react';
import API from '../api/api';

export default function BookmarkForm({ onCreate }){
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const submit = async () => {
    if (!url) return setErr('Enter URL');
    setErr(''); setLoading(true);
    try{
      await API.post('/bookmarks', { url, tags: tags.split(',').map(t=>t.trim()).filter(Boolean) });
      setUrl(''); setTags('');
      onCreate();
    }catch(e){ setErr(e.response?.data?.msg || 'Failed'); }
    setLoading(false);
  }

  return (
    <div className="card">
      <h4>Add Bookmark</h4>
      {err && <div className="small" style={{color:'red'}}>{err}</div>}
      <div style={{display:'grid',gap:8}}>
        <input placeholder="https://example.com" value={url} onChange={e=>setUrl(e.target.value)} />
        <input placeholder="tags (comma separated)" value={tags} onChange={e=>setTags(e.target.value)} />
        <button className="btn" onClick={submit} disabled={loading}>{loading? 'Saving...' : 'Save'}</button>
      </div>
    </div>
  )
}