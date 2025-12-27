"use client";

import React, { useState, useEffect } from "react";
import { productsCopy } from "../../content";

export default function CtaSection() {
  const { title, subtitle } = productsCopy.cta;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const message = String(formData.get('message') || '');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your message has been sent successfully.');
        form.reset();
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Failed to send message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section section-cta" id="contact">
      <div className="container">
        <div className="card card-hover card-pad" style={{ textAlign: "center" }}>
          <h2 className="section-title" style={{ marginBottom: 10 }}>
            {title}
          </h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            {subtitle}
          </p>

          <div className="contact-form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label className="form-label text-left">
                  Your Name
                  <input
                    name="name"
                    required
                    className="form-input"
                    placeholder="Enter your name"
                  />
                </label>
              </div>

              <div className="form-row">
                <label className="form-label text-left">
                  Your Email
                  <input
                    name="email"
                    type="email"
                    required
                    className="form-input"
                    placeholder="Enter your email"
                  />
                </label>
              </div>

              <div className="form-row">
                <label className="form-label text-left">
                  Your Message
                  <textarea
                    name="message"
                    required
                    className="form-textarea"
                    placeholder="How can we help you?"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus !== 'idle' && (
                <div className={`form-message ${submitStatus === 'success' ? 'success' : 'error'}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
