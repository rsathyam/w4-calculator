import React from 'react';
import { FaExternalLinkAlt, FaStar } from 'react-icons/fa';

const taxSoftware = [
    {
        name: 'TurboTax',
        description: 'America\'s #1 tax software. Easy step-by-step guidance.',
        features: ['Free federal filing for simple returns', 'Expert help available', 'Maximum refund guarantee'],
        link: '#turbotax-affiliate', // Replace with your affiliate link
        color: '#0077c5',
        popular: true,
    },
    {
        name: 'H&R Block',
        description: 'File online or in-person with tax experts.',
        features: ['Free online filing option', 'In-person support available', 'Audit support included'],
        link: '#hrblock-affiliate', // Replace with your affiliate link
        color: '#00a651',
        popular: false,
    },
    {
        name: 'TaxAct',
        description: 'Affordable tax filing for everyone.',
        features: ['Lower prices than competitors', 'Accuracy guarantee', 'Free phone support'],
        link: '#taxact-affiliate', // Replace with your affiliate link
        color: '#c41230',
        popular: false,
    },
];

export default function TaxSoftwareRecommendations() {
    return (
        <div className="tax-software-recommendations mt-4 p-4 bg-white rounded shadow-sm border">
            <h3 className="h5 fw-bold text-dark mb-3 text-center">
                📋 Need Help Filing Your Taxes?
            </h3>
            <p className="text-muted text-center mb-4 small">
                Now that you have your W-4, here are some trusted options for filing your tax return:
            </p>

            <div className="row g-3">
                {taxSoftware.map((software) => (
                    <div key={software.name} className="col-12 col-md-4">
                        <div
                            className={`card h-100 border-0 shadow-sm ${software.popular ? 'border-primary border-2' : ''}`}
                            style={{ borderTop: `4px solid ${software.color}` }}
                        >
                            {software.popular && (
                                <div className="position-absolute top-0 end-0 m-2">
                                    <span className="badge bg-warning text-dark">
                                        <FaStar className="me-1" />Most Popular
                                    </span>
                                </div>
                            )}
                            <div className="card-body d-flex flex-column">
                                <h4 className="card-title h6 fw-bold" style={{ color: software.color }}>
                                    {software.name}
                                </h4>
                                <p className="card-text small text-muted mb-3">
                                    {software.description}
                                </p>
                                <ul className="list-unstyled small mb-3 flex-grow-1">
                                    {software.features.map((feature, idx) => (
                                        <li key={idx} className="mb-1">
                                            <span className="text-success me-1">✓</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href={software.link}
                                    target="_blank"
                                    rel="noopener noreferrer sponsored"
                                    className="btn btn-sm w-100"
                                    style={{ backgroundColor: software.color, color: 'white' }}
                                    onClick={() => {
                                        // Track affiliate click if analytics available
                                        if (window.gtag) {
                                            window.gtag('event', 'affiliate_click', {
                                                'event_category': 'monetization',
                                                'event_label': software.name,
                                            });
                                        }
                                    }}
                                >
                                    Start Filing <FaExternalLinkAlt className="ms-1" size={10} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-muted text-center mt-3 small fst-italic">
                <small>We may earn a commission if you sign up through these links at no extra cost to you.</small>
            </p>
        </div>
    );
}
