"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import GradientText from "../../components/GradientText";

export default function ShareStoryPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [stories, setStories] = useState([]);
  const [message, setMessage] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [likes, setLikes] = useState({});

  useEffect(() => { fetchStories(); }, []);

  const fetchStories = () => {
    axios.get("http://localhost:5000/stories")
      .then(res => {
        setStories(res.data);
        const initialLikes = res.data.reduce((acc, story) => ({
          ...acc,
          [story._id]: story.likes || 0
        }), {});
        setLikes(initialLikes);
      })
      .catch(() => setStories([]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/stories", { title, content, author });
      setStories([res.data, ...stories]);
      setLikes(prev => ({ ...prev, [res.data._id]: 0 }));
      setTitle(""); setContent(""); setAuthor("");
      setShowForm(false);
      setMessage("✅ Story dropped like a mic!");
    } catch {
      setMessage("❌ Story flopped. Try again.");
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
      alert("Comment didn’t land. Server’s sulking.");
    }
  };

  const handleLike = async (storyId) => {
    try {
      await axios.post(`http://localhost:5000/stories/${storyId}/like`);
      setLikes(prev => ({ ...prev, [storyId]: (prev[storyId] || 0) + 1 }));
    } catch {
      alert("Like didn’t stick. Blame the server.");
    }
  };

  return (
    <>
      <style>{`
        .ssp-root {
          max-width: 720px;
          margin: 40px auto;
          padding: 30px;
          background: linear-gradient(145deg, #0f172a 0%, #1e293b 100%);
          border-radius: 16px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        .ssp-root::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle at center, rgba(124, 58, 237, 0.2), transparent 70%);
          animation: pulse 15s ease-in-out infinite;
          z-index: -1;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }
        .ssp-title { font-size: 2.8rem; font-weight: 900; margin-bottom: 10px; }
        .ssp-subtext { font-size: 1.2rem; color: #a5b4fc; margin-bottom: 20px; }
        .ssp-form { display: flex; flex-direction: column; gap: 12px; position: relative; }
        .ssp-form-input, .ssp-form-textarea {
          padding: 12px; border-radius: 8px; border: 1px solid #334155;
          background: #1e293b; color: #e2e8f0; font-size: 1rem;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .ssp-form-input:focus, .ssp-form-textarea:focus {
          border-color: #7c3aed; box-shadow: 0 0 8px rgba(124, 58, 237, 0.5);
          outline: none;
        }
        .ssp-form-btn {
          padding: 12px; border-radius: 8px; background: linear-gradient(90deg, #7c3aed, #a5b4fc);
          color: #fff; font-weight: 600; border: none; font-size: 1.1rem;
          cursor: pointer; transition: transform 0.1s, background 0.2s;
        }
        .ssp-form-btn:hover { background: #5b21b6; transform: scale(1.02); }
        .ssp-cancel-btn { background: #475569 !important; }
        .ssp-cancel-btn:hover { background: #334155 !important; }
        .ssp-message {
          margin: 15px 0; font-size: 1rem; padding: 10px 15px; border-radius: 8px;
          background: ${message.startsWith("✅") ? "#1a3c34" : "#4b1c2e"};
          color: ${message.startsWith("✅") ? "#4ade80" : "#f87171"};
        }
        .ssp-section-head { font-size: 1.4rem; font-weight: 800; margin: 20px 0 15px; }
        .ssp-story-card {
          background: #1e293b; padding: 20px; border-radius: 12px; margin-bottom: 15px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); transition: transform 0.2s, box-shadow 0.2s;
        }
        .ssp-story-card:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4); }
        .ssp-story-title { font-size: 1.5rem; font-weight: 700; color: #e2e8f0; margin-bottom: 8px; }
        .ssp-story-content { font-size: 1.05rem; color: #cbd5e1; line-height: 1.6; }
        .ssp-story-meta { font-size: 0.9rem; color: #94a3b8; margin-top: 10px; }
        .ssp-like-btn {
          display: flex; align-items: center; gap: 6px; color: #a5b4fc; cursor: pointer;
          font-size: 0.9rem; margin-top: 10px; transition: color 0.2s;
        }
        .ssp-like-btn:hover { color: #7c3aed; }
        .ssp-comment-block { background: #334155; border-radius: 8px; padding: 15px; margin-top: 15px; }
        .ssp-comment-list { padding-left: 15px; font-size: 0.95rem; color: #cbd5e1; }
        .ssp-comment-list li { margin-bottom: 8px; line-height: 1.5; }
        .ssp-comment-author { font-weight: 600; color: #7c3aed; }
        .ssp-comment-date { font-size: 0.8rem; color: #94a3b8; margin-left: 6px; }
        .ssp-comment-empty { color: #6b7280; font-style: italic; }
        .ssp-comment-form { display: flex; gap: 8px; margin-top: 10px; }
        .ssp-comment-form input {
          flex: 1; padding: 8px; border-radius: 6px; border: 1px solid #334155;
          background: #1e293b; color: #e2e8f0; font-size: 0.95rem;
        }
        .ssp-comment-form input:focus { border-color: #7c3aed; outline: none; }
        .ssp-comment-form button {
          padding: 8px 16px; border-radius: 6px; background: linear-gradient(90deg, #7c3aed, #a5b4fc);
          color: #fff; border: none; font-weight: 600; cursor: pointer;
        }
        .ssp-comment-form button:hover { background: #5b21b6; }
        @media (max-width: 600px) {
          .ssp-root { padding: 20px; margin: 20px; }
          .ssp-story-card { padding: 15px; }
          .ssp-comment-form { flex-direction: column; }
          .ssp-title { font-size: 2rem; }
        }
      `}</style>

      <div className="ssp-root">
        <GradientText className="ssp-title" colors={["#7c3aed", "#a5b4fc", "#7c3aed"]} animationSpeed={5}>
          Share Your Story
        </GradientText>
        <div className="ssp-subtext">Drop something epic. The world’s watching.</div>
        {!showForm && (
          <button
            className="ssp-form-btn"
            onClick={() => setShowForm(true)}
          >
            Tell Your Story
          </button>
        )}
        {showForm && (
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
              placeholder="Spill the tea..."
              required
              rows={5}
              className="ssp-form-textarea"
              maxLength={1600}
              aria-label="Story Content"
            />
            <input
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="Your name (or stay anon)"
              className="ssp-form-input"
              maxLength={45}
              aria-label="Author Name"
            />
            <button type="submit" className="ssp-form-btn">Post Story</button>
            <button
              type="button"
              className="ssp-form-btn ssp-cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        )}
        {message && <div className="ssp-message">{message}</div>}
        <GradientText className="ssp-section-head" colors={["#a5b4fc", "#7c3aed"]} animationSpeed={5}>
          Recent Stories
        </GradientText>
        <div>
          {stories.map(story => (
            <div className="ssp-story-card" key={story._id}>
              <div className="ssp-story-title">{story.title}</div>
              <div className="ssp-story-content">{story.content}</div>
              <div className="ssp-story-meta">
                — {story.author || "Anonymous"}, {new Date(story.createdAt).toLocaleString()}
              </div>
              <div className="ssp-like-btn" onClick={() => handleLike(story._id)}>
                <span role="img" aria-label="Like">❤️</span> {likes[story._id] || 0}
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
                    <li className="ssp-comment-empty">No comments yet. Be the first!</li>
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
                    placeholder="Drop a comment..."
                    required
                    maxLength={250}
                    aria-label="Comment Content"
                  />
                  <button type="submit">Post</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}