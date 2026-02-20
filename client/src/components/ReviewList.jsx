import React from 'react';
import { Star, User } from 'lucide-react';

const ReviewList = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px', background: 'var(--surface-color)', borderRadius: '8px' }}>
                <p style={{ opacity: 0.6 }}>No reviews yet. Be the first to review!</p>
            </div>
        );
    }

    return (
        <div className="review-list">
            {reviews.map((review, index) => (
                <div key={index} style={{ borderBottom: '1px solid var(--border-color)', padding: '24px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={20} style={{ opacity: 0.5 }} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>{review.user}</h4>
                                <span style={{ fontSize: '12px', opacity: 0.6 }}>{review.date}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    fill={i < review.rating ? "var(--text-color)" : "none"}
                                    color={i < review.rating ? "var(--text-color)" : "var(--border-color)"}
                                />
                            ))}
                        </div>
                    </div>
                    <p style={{ lineHeight: '1.6' }}>{review.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
