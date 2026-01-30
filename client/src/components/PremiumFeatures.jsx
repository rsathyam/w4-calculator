import React from 'react';
import { FaLock, FaChartLine, FaSave, FaUsers, FaEnvelope } from 'react-icons/fa';

const premiumFeatures = [
    {
        icon: FaChartLine,
        title: 'Multi-State Tax Optimization',
        description: 'Calculate withholding across multiple states',
    },
    {
        icon: FaSave,
        title: 'Save & Compare Scenarios',
        description: 'Test different filing options side-by-side',
    },
    {
        icon: FaUsers,
        title: 'Spouse Income Analysis',
        description: 'Optimize as a couple for maximum refund',
    },
    {
        icon: FaEnvelope,
        title: 'PDF Emailed + Yearly Reminder',
        description: 'Never forget to update your W-4',
    },
];

export default function PremiumFeatures() {
    return (
        <div className="premium-features p-4 bg-gradient rounded shadow-sm mt-4"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="text-center mb-3">
                <span className="badge bg-warning text-dark px-3 py-2 mb-2">
                    ✨ Coming Soon
                </span>
                <h3 className="h5 fw-bold text-white mb-1">Premium Features</h3>
                <p className="text-white-50 small mb-0">
                    Advanced tools for serious tax optimization
                </p>
            </div>

            <div className="row g-2 mt-3">
                {premiumFeatures.map((feature, idx) => (
                    <div key={idx} className="col-6">
                        <div className="d-flex align-items-start p-2 bg-white bg-opacity-10 rounded">
                            <div className="me-2 mt-1">
                                <FaLock className="text-white-50" size={12} />
                            </div>
                            <div>
                                <p className="mb-0 small fw-semibold text-white" style={{ fontSize: '0.8rem' }}>
                                    {feature.title}
                                </p>
                                <p className="mb-0 text-white-50" style={{ fontSize: '0.7rem' }}>
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-4">
                <button
                    className="btn btn-light btn-sm px-4"
                    onClick={() => {
                        // Scroll to email capture or show waitlist modal
                        const emailCapture = document.querySelector('.email-capture');
                        if (emailCapture) {
                            emailCapture.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            emailCapture.classList.add('border-warning');
                            setTimeout(() => emailCapture.classList.remove('border-warning'), 2000);
                        }
                    }}
                >
                    Join Waitlist for Early Access
                </button>
                <p className="text-white-50 mt-2 mb-0" style={{ fontSize: '0.7rem' }}>
                    Be the first to know when premium launches
                </p>
            </div>
        </div>
    );
}
