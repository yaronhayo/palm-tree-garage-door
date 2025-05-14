import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag, Facebook, Twitter, Linkedin } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ArticleSchema from "@/components/ArticleSchema"

// Blog data - in a real application, this would come from a CMS or database
const blogPosts = [
  {
    id: "garage-door-maintenance-tips",
    title: "10 Essential Garage Door Maintenance Tips",
    excerpt:
      "Keep your garage door operating smoothly with these essential maintenance tips that every homeowner should know.",
    content: `
      <p>Your garage door is one of the most frequently used components of your home, operating multiple times a day. Yet, it's often overlooked when it comes to regular maintenance. Proper maintenance not only extends the life of your garage door but also ensures it operates safely and efficiently.</p>
      
      <h2>1. Inspect and Tighten Hardware</h2>
      <p>The average garage door moves up and down more than a thousand times a year. This movement can loosen hardware over time. Inspect and tighten all roller brackets and bolts with a socket wrench about once a year.</p>
      
      <h2>2. Test the Door Balance</h2>
      <p>If your garage door is improperly balanced, the garage door opener will have to work harder, shortening its lifespan. To check balance, disconnect the opener by pulling the release handle and manually move the door about halfway up. If it doesn't stay put, the counterweight system (springs) may need adjustment.</p>
      
      <h2>3. Lubricate Moving Parts</h2>
      <p>Keep your garage door's moving parts lubricated to reduce friction and wear. Use a spray lithium grease on the opener's chain or screw, and a spray lubricant on the overhead springs. Apply every six months.</p>
      
      <h2>4. Check and Replace Weatherstripping</h2>
      <p>The rubber weatherstripping at the bottom of your door keeps out the elements. If it's cracked or brittle, replace it to maintain energy efficiency and keep out debris.</p>
      
      <h2>5. Test the Auto-Reverse Safety Features</h2>
      <p>There are two mechanisms: mechanical and photoelectric. Test the mechanical feature by placing a piece of wood or a brick on the ground in the path of the door. When the door hits the object, it should reverse. For the photoelectric system, wave your leg in the door's path as it closes to ensure it reverses.</p>
      
      <h2>6. Clean the Tracks</h2>
      <p>Debris can accumulate in the tracks on either side of the door. Clean them with a damp cloth and then lubricate with a non-silicon-based lubricant.</p>
      
      <h2>7. Inspect and Replace Rollers</h2>
      <p>Inspect rollers for chips, cracks, or wear. Replace any damaged rollers immediately. Even if they're not damaged, they should be replaced every 7 years or so.</p>
      
      <h2>8. Check the Cables</h2>
      <p>Look for fraying or damage to the high-tension cables that lift your door. Due to the high tension, these should only be replaced by professionals.</p>
      
      <h2>9. Keep the Tracks Aligned</h2>
      <p>If the tracks are not properly aligned, the door may not operate smoothly. If you notice gaps between the rollers and rail or bends in the rails, it's time to call a professional.</p>
      
      <h2>10. Schedule Professional Maintenance</h2>
      <p>Even with regular DIY maintenance, it's a good idea to have your garage door professionally serviced once a year. A technician can spot potential problems before they become serious and make adjustments that you might not be able to do yourself.</p>
      
      <p>By following these maintenance tips, you can ensure your garage door operates smoothly and safely for years to come. Remember, if you're ever unsure about performing maintenance yourself, it's always best to call a professional.</p>
    `,
    date: "2023-05-15",
    author: "John Smith",
    category: "Maintenance",
    tags: ["maintenance", "DIY", "safety", "home improvement"],
    imageUrl: "/placeholder.svg?height=600&width=800&query=garage%20door%20maintenance",
  },
  {
    id: "choosing-the-right-garage-door",
    title: "How to Choose the Right Garage Door for Your Home",
    excerpt:
      "A comprehensive guide to selecting the perfect garage door that complements your home's style and meets your functional needs.",
    content: `<p>Sample content for choosing the right garage door...</p>`,
    date: "2023-06-22",
    author: "Sarah Johnson",
    category: "Installation",
    tags: ["installation", "design", "home improvement"],
    imageUrl: "/placeholder.svg?height=600&width=800&query=choosing%20garage%20door",
  },
]

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.id === params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.id === params.slug)

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-900 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/blog"
              className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        publishDate={post.date}
        authorName={post.author}
        imageUrl={post.imageUrl}
        slug={post.id}
      />

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="bg-primary-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Link href="/blog" className="inline-flex items-center text-accent-400 hover:text-accent-300 mb-4">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Blog
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center justify-center text-sm text-gray-300 mb-6">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(post.date).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
                <span className="mx-2">•</span>
                <User className="h-4 w-4 mr-1" />
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <Tag className="h-4 w-4 mr-1" />
                <span>{post.category}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.imageUrl || "/placeholder.svg"}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              <article className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-primary-900 mb-4">Share this article</h3>
                <div className="flex gap-4">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      `https://palmtreegaragedoor.com/blog/${post.id}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      `https://palmtreegaragedoor.com/blog/${post.id}`,
                    )}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-sky-500 text-white p-2 rounded-full hover:bg-sky-600 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                      `https://palmtreegaragedoor.com/blog/${post.id}`,
                    )}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-primary-900 mb-8 text-center">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.imageUrl || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-primary-900 mb-2">{relatedPost.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                      <Link
                        href={`/blog/${relatedPost.id}`}
                        className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800"
                      >
                        Read More
                        <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-primary-600 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Need Garage Door Service?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today for expert garage door repair, installation, and maintenance.
            </p>
            <Link
              href="/#contact"
              className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-8 rounded-md transition-colors inline-flex items-center"
            >
              Get a Free Quote
              <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
