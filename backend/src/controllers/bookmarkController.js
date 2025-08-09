const Bookmark = require('../models/Bookmark');
const fetch = require('node-fetch');
const jina = require('../utils/jina');

// Create bookmark — fetch title + favicon server-side if not provided
exports.createBookmark = async (req, res) => {
  const { url, title, favicon, tags } = req.body;
  try {
    // Basic metadata fetching (server-side) — try to get title and favicon if missing
    let metaTitle = title;
    let metaFavicon = favicon;

    if (!title || !favicon) {
      try {
        const r = await fetch(url);
        const html = await r.text();
        if (!title) {
          const m = html.match(/<title>([^<]*)<\/title>/i);
          if (m) metaTitle = m[1].trim();
        }
        if (!favicon) {
          const fm = html.match(/rel="shortcut icon" href="([^"]+)"|rel="icon" href="([^"]+)"/i);
          if (fm) metaFavicon = fm[1] || fm[2];
        }
      } catch (err) {
        console.warn('Could not fetch URL metadata', err.message);
      }
    }

    // create object
    const bm = new Bookmark({
      user: req.user.id,
      url,
      title: metaTitle || url,
      favicon: metaFavicon || `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`,
      tags: tags || [],
    });

    // generate summary using jina util (may be async)
    try {
      bm.summary = await jina.generateSummary(url);
    } catch (e) {
      console.warn('Jina summary failed', e.message);
    }

    await bm.save();
    res.json(bm);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const q = req.query.q || '';
    const tag = req.query.tag || '';
    const filter = { user: req.user.id };
    if (tag) filter.tags = tag;
    if (q) filter.$or = [ { title: { $regex: q, $options: 'i' } }, { url: { $regex: q, $options: 'i' } }, { tags: { $regex: q, $options: 'i' } } ];

    const list = await Bookmark.find(filter).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBookmark = async (req, res) => {
  try {
    const bm = await Bookmark.findOne({ _id: req.params.id, user: req.user.id });
    if (!bm) return res.status(404).json({ msg: 'Not found' });
    res.json(bm);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    const bm = await Bookmark.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!bm) return res.status(404).json({ msg: 'Not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};