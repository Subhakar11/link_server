import React from 'react'
import API from '../api/api'

export default function BookmarkCard({ bookmark, onChange }){
  const handleDelete = async () => {
    if (!confirm('Delete this bookmark?')) return;
    await API.delete(`/bookmarks/${bookmark._id}`);
    onChange();
  }

  return (
    <div className="card" style={{display:'flex',gap:12,alignItems:'center'}}>
      <img src={bookmark.favicon || `https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}`} alt="favicon" width={24} height={24} />
      <div style={{flex:1}}>
        <div style={{fontWeight:600}}><a href={bookmark.url} target="_blank" rel="noreferrer">{bookmark.title || bookmark.url}</a></div>
        <div className="small">{bookmark.url}</div>
        {bookmark.tags?.length > 0 && <div className="small">Tags: {bookmark.tags.join(', ')}</div>}
        {bookmark.summary && <div className="small" style={{marginTop:8}}>{bookmark.summary}</div>}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:6}}>
        <button className="btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}