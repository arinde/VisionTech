
import React, { useState } from 'react';
import { ChevronRight, Calendar, User, ArrowLeft } from 'lucide-react'; // Icons for blog elements

// --- Mock Data ---
// In a real application, you would fetch this from an API (e.g., Supabase, headless CMS)
const mockBlogPosts = [
  {
    id: '1',
    title: 'The Future of E-commerce: Trends to Watch in 2025',
    imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=E-commerce+Trends',
    excerpt: 'Explore the exciting new trends shaping the online shopping landscape, from AI-powered personalization to sustainable practices.',
    author: 'Jane Doe',
    date: 'June 1, 2025',
    content: `
      <p class="mb-4">The world of e-commerce is constantly evolving, driven by technological advancements and shifting consumer behaviors. Staying ahead of these trends is crucial for any online business looking to thrive.</p>
      <h3 class="text-xl font-semibold text-gray-800 mb-3">AI-Powered Personalization</h3>
      <p class="mb-4">Artificial intelligence is revolutionizing how customers interact with online stores. AI algorithms can analyze browsing history, purchase patterns, and even real-time behavior to offer highly personalized product recommendations, dynamic pricing, and tailored user experiences. This not only boosts conversion rates but also significantly enhances customer satisfaction by making shopping feel intuitive and tailored.</p>
      <h3 class="text-xl font-semibold text-gray-800 mb-3">Sustainable E-commerce</h3>
      <p class="mb-4">Consumers are becoming increasingly conscious of their environmental impact. Businesses that prioritize sustainability in their supply chains, packaging, and product offerings are gaining a significant edge. From eco-friendly shipping options to transparent sourcing, demonstrating a commitment to the planet resonates deeply with modern shoppers.</p>
      <h3 class="text-xl font-semibold text-gray-800 mb-3">Immersive Shopping Experiences</h3>
      <p class="mb-4">Augmented Reality (AR) and Virtual Reality (VR) are no longer just for gaming. E-commerce platforms are leveraging these technologies to create immersive shopping experiences, allowing customers to virtually "try on" clothes, visualize furniture in their homes, or explore products in a 3D environment before making a purchase. This reduces returns and builds confidence.</p>
      <p class="mb-4">Other notable trends include the rise of social commerce, headless commerce architectures for greater flexibility, and the increasing importance of voice search optimization. Adapting to these changes will ensure your e-commerce business remains competitive and relevant.</p>
    `,
  },
  {
    id: '2',
    title: 'Your Guide to Choosing the Right Payment Gateway',
    imageUrl: 'https://placehold.co/600x400/fbbf24/ffffff?text=Payment+Gateway',
    excerpt: 'A critical decision for any online store. Learn about key factors like fees, security, and supported currencies.',
    author: 'John Smith',
    date: 'May 20, 2025',
    content: `
      <p class="mb-4">Selecting the right payment gateway is foundational for any successful e-commerce business. It directly impacts your conversion rates, customer trust, and operational costs. Here's what to consider:</p>
      <h3 class="text-xl font-semibold text-gray-800 mb-3">Security Features</h3>
      <p class="mb-4">PCI DSS compliance, fraud detection tools, and tokenization are non-negotiable. Your payment gateway must protect sensitive customer data to build and maintain trust. Look for providers with robust security protocols and a proven track record.</p>
      <h3 class="text-xl font-semibold text-gray-800 mb-3">Transaction Fees and Pricing Models</h3>
      <p class="mb-4">Fees can vary significantly. Understand the pricing structure: per-transaction fees, monthly fees, setup fees, and chargeback fees. Compare different providers to find a model that aligns with your business volume and profit margins. Hidden fees can quickly erode your profits.</p>
      <h3 class="text-xl font-semibold text-gray-800 mb-3">Supported Payment Methods and Currencies</h3>
      <p class="mb-4">Ensure the gateway supports the payment methods your target audience prefers (e.g., credit cards, digital wallets like PayPal, local payment options). If you plan to sell internationally, multi-currency support is essential to provide a seamless experience for global customers.</p>
      <h3 class="text-xl font-semibold text-gray-800 mb-3">Integration and Ease of Use</h3>
      <p class="mb-4">How easy is it to integrate the gateway with your existing e-commerce platform (e.g., Shopify, custom React app)? Look for clear documentation, developer-friendly APIs, and good customer support. A smooth integration process will save you time and potential headaches.</p>
      <p class="mb-4">Other factors include chargeback management, settlement times, and customer support quality. A thorough evaluation of these points will help you make an informed decision for your e-commerce store.</p>
    `,
  },
  {
    id: '3',
    title: 'Maximizing Customer Loyalty in Online Retail',
    imageUrl: 'https://placehold.co/600x400/10b981/ffffff?text=Customer+Loyalty',
    excerpt: 'Building lasting relationships with your customers is key to sustainable growth. Discover proven strategies.',
    author: 'Chris Green',
    date: 'April 10, 2025',
    content: `
      <p class="mb-4">In the competitive world of online retail, attracting new customers is only half the battle. Maximizing customer loyalty is crucial for sustainable growth, as loyal customers tend to spend more, refer others, and are less price-sensitive.</p>
      <h3 class="text-xl font-semibold text-gray-800 mb-3">Exceptional Customer Service</h3>
      <p class="mb-4">Prompt, helpful, and personalized customer support can turn a one-time buyer into a loyal advocate. Be available through multiple channels (chat, email, phone) and empower your team to resolve issues efficiently and empathetically. Going the extra mile makes a lasting impression.</p>
      <h3 class="text-xl font-semibold text-gray-800 mb-3">Loyalty Programs and Rewards</h3>
      <p class="mb-4">Implement a tiered loyalty program that rewards repeat purchases with points, discounts, exclusive access, or special gifts. This incentivizes continued engagement and makes customers feel valued. The perceived value of the rewards is key to success.</p>
      <h3 class="text-xl font-semibold text-gray-800 mb-3">Personalized Communication</h3>
      <p class="mb-4">Leverage customer data to send personalized emails, product recommendations, and special offers. Avoid generic marketing. Show that you understand their preferences and anticipate their needs. This creates a stronger emotional connection with your brand.</p>
      <h3 class="text-xl font-semibold text-gray-800 mb-3">Community Building</h3>
      <p class="mb-4">Create opportunities for customers to connect with your brand and each other. This could be through online forums, social media groups, or user-generated content campaigns. A sense of community fosters belonging and reinforces brand loyalty.</p>
      <p class="mb-4">Remember that trust, transparency, and consistently delivering on your promises are the bedrock of long-term customer relationships. Continuously gather feedback and adapt your strategies to meet evolving customer expectations.</p>
    `,
  },
  {
    id: '4',
    title: 'The Rise of Voice Commerce: Are You Ready?',
    imageUrl: 'https://placehold.co/600x400/6366f1/ffffff?text=Voice+Commerce',
    excerpt: 'Voice assistants are changing how we shop. Understand what voice commerce means for your business.',
    author: 'Alice Wonderland',
    date: 'March 1, 2025',
    content: `
      <p class="mb-4">Voice commerce, the act of purchasing products or services using voice commands via smart speakers or voice assistants, is rapidly gaining traction. While still nascent for many businesses, its growth trajectory suggests it will become a significant channel.</p>
      <h3 class="text-xl font-semibold text-gray-800 mb-3">What is Voice Commerce?</h3>
      <p class="mb-4">It's about hands-free shopping. Customers can simply tell their Amazon Echo or Google Home to "order more coffee" or "add milk to my cart." This convenience is a major driver of its adoption, especially for routine purchases.</p>
      <h3 class="text-xl font-semibold text-gray-800 mb-3">Optimizing for Voice Search</h3>
      <p class="mb-4">Voice search queries are often longer and more conversational than typed queries. Businesses need to optimize their product descriptions and SEO strategies for natural language. Think about how a customer would verbally ask for a product, not just what they would type.</p>
      <h3 class="text-xl font-semibold text-gray-800 mb-3">Simplifying the Purchase Journey</h3>
      <p class="mb-4">Since there's no visual interface, the voice shopping experience must be incredibly streamlined. This means simplified product catalogs, clear pricing, and pre-configured payment and shipping preferences. Frictionless checkout is paramount.</p>
      <h3 class="text-xl font-semibold text-gray-800 mb-3">Building Trust and Familiarity</h3>
      <p class="mb-4">Brand recognition plays a huge role in voice commerce. Consumers are more likely to order from brands they already know and trust. Voice interaction relies heavily on recall and direct requests, favoring established brands.</p>
      <p class="mb-4">While the visual aspect of shopping remains important, integrating voice capabilities or at least optimizing for voice search is a forward-thinking strategy for e-commerce businesses.</p>
    `,
  },
];
// --- End Mock Data ---


// Blog Post Card Component
const BlogPostCard = ({ post, onReadMore }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
    <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <User size={16} className="mr-1 text-blue-500" />
        <span>{post.author}</span>
        <Calendar size={16} className="ml-4 mr-1 text-blue-500" />
        <span>{post.date}</span>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
      <button
        onClick={() => onReadMore(post)}
        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300"
      >
        Read More
        <ChevronRight size={18} className="ml-1" />
      </button>
    </div>
  </div>
);

// Single Blog Post Modal/View
const SingleBlogPostView = ({ post, onClose }) => {
  if (!post) return null; // Should not happen if used correctly

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full h-full md:h-auto overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
          aria-label="Close"
        >
          <ArrowLeft size={24} />
        </button>

        <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded-t-lg" />
        <div className="p-6 md:p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h2>
          <div className="flex items-center text-sm text-gray-600 mb-6">
            <User size={16} className="mr-1 text-blue-500" />
            <span>{post.author}</span>
            <Calendar size={16} className="ml-4 mr-1 text-blue-500" />
            <span>{post.date}</span>
          </div>
          {/* Using dangerouslySetInnerHTML for HTML content from mock data */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />

          <button
            onClick={onClose}
            className="mt-8 inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300"
          >
            <ArrowLeft size={18} className="mr-1" />
            Back to Blog
          </button>
        </div>
      </div>
    </div>
  );
};


export function BlogPage() {
  const [displayedPosts, setDisplayedPosts] = useState(mockBlogPosts.slice(0, 3)); // Display initial 3 posts
  const [hasMore, setHasMore] = useState(mockBlogPosts.length > 3);
  const [selectedPost, setSelectedPost] = useState(null); // State to hold the post to view in modal

  const loadMorePosts = () => {
    const nextBatch = mockBlogPosts.slice(displayedPosts.length, displayedPosts.length + 3); // Load next 3
    setDisplayedPosts(prev => [...prev, ...nextBatch]);
    if (displayedPosts.length + nextBatch.length >= mockBlogPosts.length) {
      setHasMore(false); // No more posts to load
    }
  };

  const handleReadMore = (post) => {
    setSelectedPost(post);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 py-24 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Our E-commerce Blog
          </h1>
          <p className="text-xl font-light mb-8">
            Stay updated with the latest trends, tips, and insights in online retail.
          </p>
          <button
            onClick={() => { /* Add newsletter signup logic here */ }}
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg
                       hover:bg-gray-100 transition-colors duration-300 text-lg"
          >
            Subscribe to Newsletter
          </button>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map(post => (
            <BlogPostCard key={post.id} post={post} onReadMore={handleReadMore} />
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={loadMorePosts}
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg
                         hover:bg-blue-700 transition-colors duration-300 text-lg"
            >
              Load More Articles
            </button>
          </div>
        )}

        {!hasMore && displayedPosts.length > 0 && (
          <p className="text-center text-gray-600 mt-12 text-lg">You've reached the end of our articles!</p>
        )}
      </div>

      {/* Single Blog Post Modal/View */}
      <SingleBlogPostView post={selectedPost} onClose={handleClosePost} />
    </div>
  );
}
