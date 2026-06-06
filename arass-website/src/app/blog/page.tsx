import { Metadata } from 'next';
import Link from 'next/link';
import SEOPageLayout from '@/components/layouts/SEOPageLayout';
import { getAllPosts } from '@/lib/blogData';

export const metadata: Metadata = {
  title: 'Blog | ARASS Tech Insights',
  description: 'Insights on Web Development, AI, and Business Growth from the experts at ARASS Tech.',
  alternates: {
    canonical: 'https://arasstech.com/blog',
  }
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <SEOPageLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            Insights & Strategy
          </h1>
          <p className="text-xl text-gray-400 font-inter">
            Expert articles on Web Development, AI, and growing your digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-full transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/50 hover:-translate-y-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <div className="text-sm font-medium text-blue-400 flex items-center gap-2 mt-auto">
                  Read Article <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SEOPageLayout>
  );
}
