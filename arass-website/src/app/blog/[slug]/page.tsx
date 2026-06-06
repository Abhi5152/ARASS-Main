import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SEOPageLayout from '@/components/layouts/SEOPageLayout';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/blogData';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: `${post.title} | ARASS Tech Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://arasstech.com/blog/${post.slug}`,
    }
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Adding Article Schema dynamically
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "ARASS Tech"
    }
  };

  return (
    <SEOPageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full mb-6 inline-block">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold font-orbitron text-white mt-4 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto prose prose-invert prose-lg prose-cyan font-inter text-gray-300">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Want to implement these strategies?</h3>
        <p className="text-gray-400 mb-6">Our team at ARASS Tech is ready to help you build your digital presence.</p>
        <Link href="/#contact" className="btn-primary inline-block no-underline text-sm py-3 px-6">
          Contact Our Team
        </Link>
      </div>
    </SEOPageLayout>
  );
}
