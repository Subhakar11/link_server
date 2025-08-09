import React from 'react'
import BookmarkCard from './BookmarkCard'

export default function BookmarkList({ bookmarks, onChange }){
  if (!bookmarks?.length) return <div className="card">No bookmarks yet</div>
  return (
    <div>
      {bookmarks.map(b => (
        <BookmarkCard key={b._id} bookmark={b} onChange={onChange} />
      ))}
    </div>
  )
}