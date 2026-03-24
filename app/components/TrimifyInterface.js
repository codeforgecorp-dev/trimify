"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './/ui/cards';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './/ui/accordion';
import { Shield, Zap, Users, Link as LinkIcon, BarChart3, Lock } from 'lucide-react';

export const FeatureCards = () => {
  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'End-to-end encryption with SSL certificates. Your links are protected with industry-standard security protocols.',
      color: 'from-blue-500 to-cyan-500',
      stats: '256-bit SSL'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: '99.9% uptime guarantee with instant redirects. Our global CDN ensures your links work everywhere, anytime.',
      color: 'from-purple-500 to-pink-500',
      stats: '<100ms redirect'
    },
    {
      icon: Users,
      title: 'Trusted by Thousands',
      description: 'Join 1,000+ users who trust Trimify for their link management. Scale from startup to enterprise.',
      color: 'from-orange-500 to-red-500',
      stats: '1,000+ Users'
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
      {/* Section Header */}
      <div className="text-center mb-12 animate-[fadeIn_0.6s_ease_forwards]">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
          Why Choose Trimify?
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Powerful features that make link shortening simple, secure, and scalable
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="group animate-[slideUp_0.6s_ease_forwards]"
              style={{ animationDelay: `${index * 0.2}s`,  }}
              data-testid={`feature-card-${index}`}
            >
              <Card className="h-full bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2">
                <CardHeader>
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-100 mb-2">
                    {feature.title}
                  </CardTitle>
                  <div className="inline-block px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 font-semibold">
                    {feature.stats}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Additional Stats Bar */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-[fadeIn_0.8s_ease_forwards_0.6s] ">
        <div className="text-center p-6 rounded-xl bg-gray-800/50 border border-gray-700" data-testid="stat-links-shortened">
          <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            10K+
          </div>
          <div className="text-gray-400 mt-2">Links Shortened</div>
        </div>
        <div className="text-center p-6 rounded-xl bg-gray-800/50 border border-gray-700" data-testid="stat-clicks-tracked">
          <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            50K+
          </div>
          <div className="text-gray-400 mt-2">Clicks Tracked</div>
        </div>
        <div className="text-center p-6 rounded-xl bg-gray-800/50 border border-gray-700" data-testid="stat-uptime">
          <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
            99.9%
          </div>
          <div className="text-gray-400 mt-2">Uptime</div>
        </div>
        <div className="text-center p-6 rounded-xl bg-gray-800/50 border border-gray-700" data-testid="stat-countries">
          <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
            120+
          </div>
          <div className="text-gray-400 mt-2">Countries</div>
        </div>
      </div>
    </section>
  );
};

/**
 * FAQ Section with Accordion
 */


export const FAQSection = () => {
  const faqs = [
      {
      question: "How does Trimify work?",
      answer:
        "Trimify converts long, complicated URLs into short, memorable links that are easy to share anywhere. Each short link redirects instantly to the original URL. Trimify also tracks real-time analytics for each link, including total clicks, countries of origin, and device usage. You can even protect links with passwords or set custom expiry conditions for extra control."
    },
    {
      question: "Is Trimify free to use?",
      answer:
        "Yes! Trimify is completely free and provides all essential features without any hidden costs. You can create unlimited short links, track analytics in real-time, generate QR codes, customize short aliases, and use UTM tracking—all but with Premium Package which also does not cost much. Our goal is to make professional link management accessible to everyone."
    },
    {
      question: "How long do shortened links last?",
      answer:
        "Trimify links are highly flexible. By default, links last indefinitely. However, you can set links to expire either after a certain date or once they reach a maximum number of clicks. This ensures that your links remain under your control and are only accessible for the intended duration or audience."
    },
    {
      question: "Can I track my link analytics?",
      answer:
        "Absolutely! Trimify provides a real-time analytics dashboard where you can monitor clicks, geographical location of visitors, device types, referrers, and more. Each short link gives detailed insights, helping you understand performance, optimize campaigns, and make data-driven decisions."
    },
    {
      question: "Is my data secure?",
      answer:
        "Security is a top priority at Trimify. All links and analytics are served over HTTPS with end-to-end encryption. Links can be protected with passwords for restricted access. We never share your data with third parties, and our systems are designed to keep all your URLs and analytics completely secure."
    },
    {
      question: "Can I customize my short links?",
      answer:
        "Yes! Trimify allows you to create custom short aliases, so your links are branded and memorable. You can also generate QR codes with customized designs, making them suitable for campaigns or printed media. Combined with UTM tracking and optional password protection, you have full control over how your links are shared and accessed."
    }
  
  ];

  return (
    <section
      className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24"
      data-testid="faq-section"
    >
      {/* Section Header */}
      <div className="text-center mb-12 cursor-pointer">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-400">
          Got questions? We've got answers
        </p>
      </div>

      {/* FAQ Accordion */}
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-gray-900/50 border border-gray-800 rounded-xl px-6 hover:border-gray-700 transition-colors cursor-pointer"
            data-testid={`faq-item-${index}`}
          >
            <AccordionTrigger className="text-lg font-semibold text-gray-100 hover:text-cyan-400 transition-colors cursor-pointer">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 text-base leading-relaxed overflow-hidden">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* CTA after FAQ */}
      <div className="mt-12 text-center p-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-gray-800 cursor-pointer">
        <h3 className="text-2xl font-bold text-gray-100 mb-3">
          Still have questions?
        </h3>
        <p className="text-gray-400 mb-6">
          We're here to help! Try Trimify now and experience the simplest way
          to shorten links.
        </p>
        <button
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-testid="scroll-to-top-button"
        >
          Start Shortening Now
        </button>
      </div>
    </section>
  );
};




