import React from 'react';

export default function Footer({ onFAQClick }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light border-top mt-5 py-4">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="row px-3">
              <div className="col-12 col-md-6">
                <h6 className="fw-bold text-dark mb-3">Easy W-4 Calculator</h6>
                <p className="text-muted small mb-2">
                  Free, secure, and IRS-compliant tax withholding calculator
                </p>
                <p className="text-muted small mb-0">
                  © {currentYear} Easy W-4 Calculator. All rights reserved.
                </p>
              </div>
              <div className="col-12 col-md-6 text-md-end">
                <h6 className="fw-bold text-dark mb-3">Quick Links</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <button 
                      className="btn btn-link p-0 text-decoration-none small text-muted"
                      onClick={onFAQClick}
                    >
                      Frequently Asked Questions
                    </button>
                  </li>
                  <li className="mb-2">
                    <a 
                      href="https://www.irs.gov/forms-pubs/about-form-w-4" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-decoration-none small text-muted"
                    >
                      Official IRS W-4 Information
                    </a>
                  </li>
                  <li className="mb-2">
                    <a 
                      href="https://www.irs.gov/pub/irs-pdf/fw4.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-decoration-none small text-muted"
                    >
                      Download Blank W-4 Form
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}