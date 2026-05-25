"use client";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import "./ProductFaqSection.css";

const faqs = [
  {
    question: "How can I place an order?",
    answer:
      "Browse the store, choose the products you need, add them to your cart, and continue through checkout with your shipping and payment details.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major cards, PayPal, and secure online payment options. Payment details are encrypted during checkout.",
  },
  {
    question: "How long will it take to receive my order?",
    answer:
      "Most orders are processed within 1-2 business days. Delivery timing depends on your location and the shipping method selected at checkout.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes. Once the order ships, a tracking number is sent by email so you can follow the delivery progress.",
  },
  {
    question: "What if I need help with my order?",
    answer:
      "Our support team can help with product questions, order updates, returns, and exchanges through the contact channels listed in the store.",
  },
];

export default function ProductFaqSection() {
  const [activeAudience, setActiveAudience] = useState<"dog" | "cat">("dog");
  const [openQuestion, setOpenQuestion] = useState(faqs[0].question);
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="product-faq section section--padded color-scheme-2" ref={ref}>
      <div className={`page-width product-faq__inner animate-fade-up ${isVisible ? "is-visible" : ""}`}>
        <div className="product-faq__intro">
          <p className="product-faq__eyebrow">Dog Cat FAQ</p>
          <h2 className="heading-bold">Order & Support</h2>
          <div className="product-faq__tabs" role="tablist" aria-label="FAQ audience">
            <button
              className={activeAudience === "dog" ? "active" : ""}
              onClick={() => setActiveAudience("dog")}
              type="button"
            >
              Dog
            </button>
            <button
              className={activeAudience === "cat" ? "active" : ""}
              onClick={() => setActiveAudience("cat")}
              type="button"
            >
              Cat
            </button>
          </div>
        </div>

        <div className="product-faq__list">
          {faqs.map((faq) => {
            const isOpen = openQuestion === faq.question;
            return (
              <div className={`product-faq__item ${isOpen ? "open" : ""}`} key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenQuestion(isOpen ? "" : faq.question)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <svg viewBox="0 0 10 6" fill="currentColor" aria-hidden="true">
                    <path d="M9.354.646a.5.5 0 0 0-.708 0L5 4.293 1.354.646a.5.5 0 1 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708z" />
                  </svg>
                </button>
                <div className="product-faq__answer">
                  <p>
                    {activeAudience === "dog"
                      ? faq.answer
                      : faq.answer.replace("products", "cat essentials")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
