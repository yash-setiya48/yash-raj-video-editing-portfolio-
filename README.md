# Yash Setiya | Video Editor Portfolio

A clean, dark, cinematic, and professional portfolio website designed for **Yash Setiya – Video Editor**.

---

## 🚀 Quick Start

1. Double-click **`index.html`** to preview the website directly in any web browser.
2. No build tools, dependencies, or server setup required.

---

## 📁 File Structure

```text
yash-portfolio/
├── index.html        # Main HTML structure with clean, factual sections
├── style.css         # Dark cinematic styling, typography, and responsive layout
├── script.js         # Showreel, sound toggle on videos, click sound, cursor, filters
├── talking-head-video.mp4
├── commercial-brand-ad.mp4
├── testimonial-ad.mp4
└── README.md         # Customization guide
(Add your own showreel.mp4 here to enable the showreel section.)
```

---

## 🎬 How to Add Your Showreel

Open **`script.js`** in any editor. Under `CONFIG` (lines 16–28):

```javascript
const CONFIG = {
  // Option A: Local MP4 video file (save 'showreel.mp4' into this project folder)
  showreelUrl: "showreel.mp4",
  isShowreelMp4: true,

  // Option B: YouTube Embed (uncomment & set isShowreelMp4 to false)
  // showreelUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1",
  // isShowreelMp4: false,

  // Option C: Vimeo Embed (uncomment & set isShowreelMp4 to false)
  // showreelUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID?autoplay=1",
  // isShowreelMp4: false,
```

---

## 📹 How to Add Your Personal Intro Video (About Section)

In **`script.js`**:
```javascript
  introVideoUrl: "intro.mp4", // or your YouTube / Vimeo embed URL
  isIntroMp4: true,
```

---

## 🎞️ How to Add Real Project Videos to Portfolio Cards

In **`script.js`**, update the `PROJECT_VIDEOS` object:

```javascript
const PROJECT_VIDEOS = {
  "Talking head video": { url: "talking-head-video.mp4", isMp4: true },
  "Commercial Brand Ad": { url: "commercial-brand-ad.mp4", isMp4: true },
  // Add other project video URLs as needed...
};
```

---

## 🔗 How to Update Social & Contact Links

In **`index.html`** under the Contact section (`#contact`):
1. **Email**: Update the email address in the contact links.
2. **Instagram**: Update the Instagram profile URL.
3. **WhatsApp**: Replace `000000000000` in the `https://wa.me/000000000000` link with your number, including country code and digits only.


---

## 🌐 Hosting
- **GitHub Pages / Netlify / Vercel:** upload the whole folder as-is. `index.html` must stay in the root.
- Keep video filenames free of spaces (as they are now).
