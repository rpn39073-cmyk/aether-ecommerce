import React, { useState } from 'react';
import Button from './Button';
import { Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ReviewForm = ({ onSubmit }) => {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            addToast('Please select a rating', 'error');
            return;
        }
        onSubmit({ rating, comment, user: user.name, date: new Date().toLocaleDateString() });
        setRating(0);
        setComment('');
        addToast('Review submitted successfully', 'success');
    };

    if (!user) {
        return (
            <div style={{ padding: '24px', background: 'var(--surface-color)', borderRadius: '8px', textAlign: 'center' }}>
                <p>Please <a href="/login">log in</a> to write a review.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Write a Review</h3>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Rating</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                            <Star
                                size={24}
                                fill={(hoverRating || rating) >= star ? "var(--text-color)" : "none"}
                                color={(hoverRating || rating) >= star ? "var(--text-color)" : "var(--border-color)"}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Review</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                    required
                    style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', resize: 'vertical' }}
                />
            </div>

            <Button type="submit" variant="primary">Submit Review</Button>
        </form>
    );
};

export default ReviewForm;
