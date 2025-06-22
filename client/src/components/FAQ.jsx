import React, { useState } from 'react';

const faqs = [
  {
    question: "How accurate is this W-4 calculator?",
    answer: "Our W-4 calculator uses the same IRS worksheets and formulas found in the official IRS Publication 15-T. It's designed to provide accurate withholding estimates based on your specific tax situation."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, all calculations are performed locally in your browser. No personal tax information is stored on our servers or transmitted anywhere. Your privacy and security are our top priorities."
  },
  {
    question: "Can I use this calculator for multiple jobs?",
    answer: "Absolutely! Our calculator includes the Multiple Jobs Worksheet to help you calculate the correct withholding when you have more than one job or your spouse also works."
  },
  {
    question: "What's new in the 2024 W-4 form?",
    answer: "The 2024 W-4 form maintains the same structure as recent years, with sections for personal information, multiple jobs, dependents, and other adjustments. Tax brackets and standard deductions have been updated for inflation."
  },
  {
    question: "Do I need to fill out a new W-4 every year?",
    answer: "You don't need to submit a new W-4 annually unless your tax situation changes. However, it's good practice to review your withholding yearly, especially after major life events like marriage, divorce, or having children."
  },
  {
    question: "How often should I update my W-4?",
    answer: "Update your W-4 when you experience major life changes such as getting married, having a child, buying a home, or starting a new job. You should also review it if you consistently owe taxes or receive large refunds."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-5 pt-5 border-top">
      <div className="text-center mb-4">
        <h2 className="h3 fw-bold text-dark mb-3">Frequently Asked Questions</h2>
        <p className="text-muted">Common questions about W-4 forms and tax withholding</p>
      </div>
      
      <div className="accordion" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div key={index} className="accordion-item border-0 mb-3 shadow-sm rounded">
            <h3 className="accordion-header">
              <button
                className={`accordion-button ${openIndex === index ? '' : 'collapsed'} fw-semibold`}
                type="button"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                {faq.question}
              </button>
            </h3>
            <div
              className={`accordion-collapse collapse ${openIndex === index ? 'show' : ''}`}
            >
              <div className="accordion-body text-muted">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}