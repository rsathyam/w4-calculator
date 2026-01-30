import React, { useState } from 'react';
import { FaEnvelope, FaBell, FaCheck } from 'react-icons/fa';

export default function EmailCapture() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setErrorMessage('Please enter a valid email address');
            setStatus('error');
            return;
        }

        setStatus('submitting');
        setErrorMessage('');

        try {
            // Using Formspree for email collection (free tier)
            // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
            const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    source: 'w4-calculator',
                    timestamp: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');

                // Track conversion if analytics available
                if (window.gtag) {
                    window.gtag('event', 'email_signup', {
                        'event_category': 'lead_generation',
                        'event_label': 'tax_reminders',
                    });
                }
            } else {
                throw new Error('Submission failed');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    if (status === 'success') {
        return (
            <div className="email-capture-success p-4 bg-success bg-opacity-10 border border-success rounded text-center">
                <FaCheck className="text-success mb-2" size={32} />
                <h4 className="h6 fw-bold text-success mb-2">You're all set!</h4>
                <p className="small text-muted mb-0">
                    We'll send you tax deadline reminders and W-4 updates when tax laws change.
                </p>
            </div>
        );
    }

    return (
        <div className="email-capture p-4 bg-primary bg-opacity-10 border border-primary rounded mt-4">
            <div className="text-center mb-3">
                <FaBell className="text-primary mb-2" size={24} />
                <h4 className="h6 fw-bold text-dark mb-1">Never Miss a Tax Deadline</h4>
                <p className="small text-muted mb-0">
                    Get free reminders for tax deadlines and W-4 updates when tax laws change.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-3">
                <div className="input-group">
                    <span className="input-group-text bg-white">
                        <FaEnvelope className="text-muted" />
                    </span>
                    <input
                        type="email"
                        className={`form-control ${status === 'error' ? 'is-invalid' : ''}`}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === 'submitting'}
                        aria-label="Email address"
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={status === 'submitting'}
                    >
                        {status === 'submitting' ? (
                            <span className="spinner-border spinner-border-sm" role="status" />
                        ) : (
                            'Subscribe'
                        )}
                    </button>
                </div>
                {status === 'error' && errorMessage && (
                    <div className="invalid-feedback d-block small mt-1">
                        {errorMessage}
                    </div>
                )}
            </form>

            <p className="text-muted text-center mt-2 mb-0 small">
                <small>No spam, ever. Unsubscribe anytime.</small>
            </p>
        </div>
    );
}
