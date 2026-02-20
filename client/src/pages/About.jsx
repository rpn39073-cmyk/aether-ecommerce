import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="about-page">
            <Navbar />
            <div className="container section" style={{ paddingTop: '120px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
                >
                    <h1 className="section-title" style={{ fontSize: '48px', marginBottom: '24px' }}>Our Story</h1>
                    <p style={{ fontSize: '18px', lineHeight: '1.8', opacity: 0.8, marginBottom: '48px' }}>
                        AETHER was born from a desire to bridge the gap between high-performance technical apparel and modern minimalist aesthetics.
                        We believe that what you wear should not only look good but also enhance your daily life through superior comfort and functionality.
                    </p>
                </motion.div>

                <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '120px' }}>
                    <motion.img
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
                        alt="Design Studio"
                        style={{ width: '100%', borderRadius: '4px' }}
                    />
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Design Philosophy</h2>
                        <p style={{ fontSize: '16px', lineHeight: '1.6', opacity: 0.7, marginBottom: '24px' }}>
                            Every stitch is intentional. We use premium, sustainable fabrics that are durable yet breathable. Our color palette is inspired by the urban landscape—monochromatic, sleek, and timeless.
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: '1.6', opacity: 0.7 }}>
                            We reject fast fashion. Instead, we focus on creating capsule collections that stand the test of time, both in style and quality.
                        </p>
                    </motion.div>
                </div>

                <div className="about-values" style={{ textAlign: 'center', background: 'var(--surface-color)', padding: '80px 24px', borderRadius: '8px' }}>
                    <h2 style={{ fontSize: '32px', marginBottom: '48px' }}>Core Values</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                        <div>
                            <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Innovation</h3>
                            <p style={{ opacity: 0.7 }}>Pushing boundaries with new materials and cuts.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Sustainability</h3>
                            <p style={{ opacity: 0.7 }}>Ethical production and eco-friendly sourcing.</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Minimalism</h3>
                            <p style={{ opacity: 0.7 }}>Stripping away the unnecessary to focus on the essential.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;
