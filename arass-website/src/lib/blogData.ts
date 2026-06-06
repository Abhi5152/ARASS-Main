export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string; // In a real app, this might be markdown or rich HTML
  date: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'website-development-cost-in-india',
    title: 'Website Development Cost in India (2026 Guide)',
    category: 'Web Development',
    excerpt: 'A comprehensive breakdown of custom web development costs in India, comparing freelancers vs agencies.',
    date: '2026-06-01',
    readTime: '8 min read',
    content: `
      <h2>The True Cost of Web Development</h2>
      <p>When business owners ask "how much does a website cost in India?", the answer ranges from $100 to $100,000. Why the massive gap? It comes down to quality, performance, and the underlying technology.</p>
      
      <h3>1. The Template Approach ($500 - $2,000)</h3>
      <p>Many freelancers and low-tier agencies will simply purchase a $50 WordPress theme, slap your logo on it, and call it a day. While cheap, these sites suffer from bloated code, poor SEO, and security vulnerabilities. They are an expense, not an investment.</p>
      
      <h3>2. The Custom Business Website ($3,000 - $10,000)</h3>
      <p>This is where professional agencies like ARASS Tech step in. A custom website involves bespoke UX/UI design tailored to your brand, optimized code (using frameworks like Next.js), and rigorous SEO foundations. This level of investment typically pays for itself within months through increased conversions.</p>
      
      <h3>3. Complex Web Applications & SaaS ($15,000+)</h3>
      <p>For portals with complex databases, user authentication, direct booking integrations, or AI capabilities, you are building software. The cost depends entirely on the feature scope.</p>

      <h2>Conclusion</h2>
      <p>Don't look for the cheapest option; look for the highest ROI. A premium website is your top-performing salesperson.</p>
    `
  },
  {
    slug: 'ai-for-small-businesses',
    title: 'How Small Businesses Can Leverage AI in 2026',
    category: 'AI',
    excerpt: 'Discover practical AI automation strategies that small businesses can implement today to reduce costs and increase efficiency.',
    date: '2026-06-05',
    readTime: '6 min read',
    content: `
      <h2>AI is No Longer Just for Enterprises</h2>
      <p>Artificial Intelligence has become democratized. Small businesses in Kerala and across India can now leverage tools that were previously only available to tech giants.</p>
      
      <h3>1. Customer Support Automation</h3>
      <p>AI chatbots can now handle 80% of routine customer inquiries, from booking appointments to answering FAQs, 24/7 without human intervention.</p>
      
      <h3>2. Content Generation</h3>
      <p>While AI shouldn't write your core brand messaging, it is incredible for generating social media drafts, product descriptions, and email newsletters at scale.</p>

      <h3>Ready to Integrate AI?</h3>
      <p>At ARASS Tech, we build custom AI agents integrated directly into your existing website. Contact us to learn more.</p>
    `
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
