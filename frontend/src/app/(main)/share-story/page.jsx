"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ShareStoryPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [stories, setStories] = useState([]);
  const [message, setMessage] = useState("");
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => { fetchStories(); }, []);

  const fetchStories = () => {
    axios.get("http://localhost:5000/stories")
      .then(res => setStories(res.data))
      .catch(() => setStories([]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/stories", { title, content, author });
      setStories([res.data, ...stories]);
      setTitle(""); setContent(""); setAuthor("");
      setMessage("✅ Story submitted!");
    } catch (err) {
      setMessage("❌ Failed to submit story.");
    }
  };

  const handleCommentChange = (storyId, field, value) => {
    setCommentInputs(inputs => ({
      ...inputs,
      [storyId]: { ...inputs[storyId], [field]: value }
    }));
  };

  const handleCommentSubmit = async (e, storyId) => {
    e.preventDefault();
    const { author, content } = commentInputs[storyId] || {};
    if (!content) return;
    try {
      await axios.post(`http://localhost:5000/stories/${storyId}/comments`, { author, content });
      fetchStories();
      setCommentInputs(inputs => ({ ...inputs, [storyId]: { author: "", content: "" } }));
    } catch {
      alert("Failed to add comment.");
    }
  };

  return (
    <>
      {/* ------------------ 🎨 Inline Style for Improvements ------------------ */}
      <style>{`
        .ssp-root {
          max-width: 640px;
          margin: 60px auto 40px;
          padding: 32px 30px 48px;
          background: linear-gradient(132deg,#f3e8ff 0%,#e9d8fd 100%);
          border-radius: 18px;
          box-shadow: 0 4px 32px #5022ba19;
          font-family: 'Inter',sans-serif;
        }
        .ssp-title { font-size: 2.3rem; font-weight: 800; color: #383269; margin-bottom: 8px; letter-spacing: -1px; }
        .ssp-subtext { font-size: 1.1rem; color: #705fa9; margin: 0 0 28px; }
        .ssp-form, .ssp-comment-form { display: flex; flex-direction: column; gap: 14px; }
        .ssp-form-input, .ssp-form-textarea {
          padding: 11px 14px; border-radius: 7px; border: 1.5px solid #bda3e0;
          font-size: 1.03rem; font-family: inherit; background: #f8fafc;
          transition: box-shadow .13s;
        }
        .ssp-form-input:focus, .ssp-form-textarea:focus {
          outline: none; box-shadow: 0 0 0 2.5px #925eea66;
          border-color: #7c3aed;
        }
        .ssp-form-btn {
          padding: 12px; border-radius: 7px; background: linear-gradient(90deg,#825cf7,#a770ef 70%);
          color: #fff; font-weight: bold; border: none;
          font-size: 1.12rem; letter-spacing: 1px;
          cursor: pointer; margin-top: 4px;
          box-shadow: 0 2px 8px #7c3aed15;
          transition: background .15s,transform .07s;
        }
        .ssp-form-btn:hover, .ssp-form-btn:focus { background: #5a31be; transform: translateY(-1px) scale(1.01);}
        .ssp-message {
          margin: 18px 0 22px 0; font-weight: 600; font-size: 1.08rem;
          min-height: 28px;
        }
        .ssp-section-head {
          font-size: 1.15rem; font-weight: 700; letter-spacing: 0.25px;
          padding-top: 16px; color: #523a83; margin-bottom: 10px;
        }
        .ssp-story-card {
          background: linear-gradient(115deg, #f4f1fb 80%, #f8fafc 100%);
          padding: 21px 20px 18px 20px; border-radius: 11px;
          margin-bottom: 18px;
          box-shadow: 0 2.5px 10px #ae88ef17;
          position: relative; transition: box-shadow .14s;
        }
        .ssp-story-card:hover { box-shadow: 0 6px 32px #9c77ea2a;}
        .ssp-story-title { font-size: 1.22rem; font-weight: 700; color: #4f3b9b; letter-spacing:0; margin: 0 0 3px; }
        .ssp-story-content { font-size: 1.08rem; margin: 9px 0 5px 0; color: #35353b;}
        .ssp-story-meta { font-size: 13px; color: #726f80;}
        .ssp-comment-block { background: #f5f3fe; border-radius: 7px; padding: 9px 14px 11px 14px; margin-top: 14px; }
        .ssp-comment-list { padding-left: 20px; font-size: 0.98rem;}
        .ssp-comment-list li { margin-bottom: 6px; line-height: 1.6;}
        .ssp-comment-list .ssp-comment-author { font-weight: 500; color: #7c3aed;}
        .ssp-comment-list .ssp-comment-date { font-size: 11px; color: #b99aea; margin-left: 8px;}
        .ssp-comment-list .ssp-empty { color: #bbb8c7;}
        .ssp-comment-form { margin-top: 10px; flex-direction: row; gap:8px;}
        .ssp-comment-form input {
          padding: 6px 8px; border-radius: 6px; border: 1px solid #cebafb;
          background: #fff; font-size: 0.99rem; transition: border .12s;
        }
        .ssp-comment-form input:focus { border-color: #a782ed;}
        .ssp-comment-form button {
          padding: 7px 16px; border-radius: 6px; background: linear-gradient(90deg,#7c3aed,#965ae4);
          color: #fff; border: none; cursor: pointer; font-weight: bold;
          transition: background .15s,filter .09s;
        }
        .ssp-comment-form button:hover, .ssp-comment-form button:focus {
          background: #4e329d;
          filter: brightness(1.07);
        }
        @media (max-width: 700px) {
          .ssp-root {padding: 13vw 4vw;}
          .ssp-story-card {padding: 12vw 5vw;}
        }
      `}</style>

      <div className="ssp-root">
        <h2 className="ssp-title">Share Your Story</h2>
        <div className="ssp-subtext">Inspire, encourage, or just express yourself. Your story matters.</div>
        <form className="ssp-form" onSubmit={handleSubmit} autoComplete="off">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Story Title"
            required
            className="ssp-form-input"
            maxLength={80}
            aria-label="Story Title"
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Type your story here..."
            required
            rows={5}
            className="ssp-form-textarea"
            maxLength={1600}
            aria-label="Story Content"
          />
          <input
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="Your name (optional)"
            className="ssp-form-input"
            maxLength={45}
            aria-label="Author Name"
          />
          <button type="submit" className="ssp-form-btn">Submit Story</button>
        </form>
        {message && (
          <div className="ssp-message" style={{
            color: message.startsWith("✅") ? "#2b6e5e" : "#bf1650",
            background: message.startsWith("✅") ? "#f0fdf4" : "#fff0f7",
            borderRadius: 8,
            padding: "10px 16px",
          }}>{message}</div>
        )}

        <div className="ssp-section-head">Recent Stories</div>
        <div>
          {stories.map(story => (
            <div className="ssp-story-card" key={story._id}>
              <div className="ssp-story-title">{story.title}</div>
              <div className="ssp-story-content">{story.content}</div>
              <div className="ssp-story-meta">
                — {story.author || "Anonymous"}, &nbsp;
                {new Date(story.createdAt).toLocaleString()}
              </div>

              <div className="ssp-comment-block">
                <strong>Comments:</strong>
                <ul className="ssp-comment-list">
                  {story.comments && story.comments.length > 0 ? (
                    story.comments.map((c, i) => (
                      <li key={i}>
                        <span className="ssp-comment-author">{c.author || "Anonymous"}:</span> {c.content}
                        <span className="ssp-comment-date">({new Date(c.createdAt).toLocaleString()})</span>
                      </li>
                    ))
                  ) : (
                    <li className="ssp-empty">No comments yet.</li>
                  )}
                </ul>
                <form className="ssp-comment-form" onSubmit={e => handleCommentSubmit(e, story._id)} autoComplete="off">
                  <input
                    value={commentInputs[story._id]?.author || ""}
                    onChange={e => handleCommentChange(story._id, "author", e.target.value)}
                    placeholder="Your name"
                    maxLength={45}
                    aria-label="Comment Author"
                  />
                  <input
                    value={commentInputs[story._id]?.content || ""}
                    onChange={e => handleCommentChange(story._id, "content", e.target.value)}
                    placeholder="Add a comment..."
                    required
                    maxLength={250}
                    aria-label="Comment Content"
                  />
                  <button type="submit" tabIndex={0}>Post</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
