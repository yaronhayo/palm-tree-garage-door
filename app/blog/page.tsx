import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Blog",
  description: "Tips, guides, and news about garage door maintenance, repair, and installation.",
}

// Blog data - in a real application, this would come from a CMS or database
const blogPosts = [
  {
    id: "garage-door-maintenance-tips",
    title: "10 Essential Garage Door Maintenance Tips",
    excerpt:
      "Keep your garage door operating smoothly with these essential maintenance tips that every homeowner should know.",
    date: "2023-05-15",
    author: "John Smith",
    category: "Maintenance",
    imageUrl: "/placeholder.svg?height=600&width=800&query=garage%20door%20maintenance",
  },
  {
    id: "choosing-the-right-garage-door",
    title: "How to Choose the Right Garage Door for Your Home",
    excerpt:
      "A comprehensive guide to selecting the perfect garage door that complements your home's style and meets your functional needs.",
    date: "2023-06-22",
    author: "Sarah Johnson",
    category: "Installation",
    imageUrl: "/placeholder.svg?height=600&width=800&query=choosing%20garage%20door",
  },
  {
    id: "garage-door-opener-guide",
    title: "The Ultimate Guide to Garage Door Openers",
    excerpt:
      "Everything you need to know about different types of garage door openers, their features, and how to choose the best one.",
    date: "2023-07-10",
    author: "Mike Rodriguez",
    category: "Openers",
    imageUrl: "/placeholder.svg?height=600&width=800&query=garage%20door%20opener",
  },
  {
    id: "signs-garage-door-needs-repair",
    title: "5 Signs Your Garage Door Needs Repair",
    excerpt:
      "Learn to recognize the warning signs that indicate your garage door needs professional attention before a small issue becomes a major problem.",
    date: "2023-08-05",
    author: "John Smith",
    category: "Repair",
    imageUrl: "/placeholder.svg?height=600&width=800&query=garage%20door%20repair",
  },
  {
    id: "increase-home-value-with-garage-door",
    title: "How a New Garage Door Can Increase Your Home's Value",
    excerpt:
      "Discover how investing in a new garage door can significantly boost your home's curb appeal and market value.",
    date: "2023-09-18",
    author: "Sarah Johnson",
    category: "Installation",
    imageUrl: "/placeholder.svg?height=600&width=800&query=new%20garage%20door%20home%20value",
  },
  {
    id: "garage-door-safety-features",
    title: "Essential Safety Features for Modern Garage Doors",
    excerpt:
      "An overview of the latest safety features in modern garage doors and why they're important for protecting your family.",
    date: "2023-10-07",
    author: "Mike Rodriguez",
    category: "Safety",
    imageUrl: "/placeholder.svg?height=600&width=800&query=garage%20door%20safety%20features",
  },
]

export default function BlogPage() {
  // Group blog posts by category
  const categories = [...new Set(blogPosts.map((post) => post.category))]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Garage Door Blog</h1>
              <p className="text-xl text-gray-200 mb-8">
                Expert tips, guides, and news about garage door maintenance, repair, and installation
              </p>
            </div>
          </div>
        </section>

        {/* Blog Filter */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/blog"
                className="px-4 py-2 rounded-md bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
              >
                All Posts
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog?category=${category.toLowerCase()}`}
                  className="px-4 py-2 rounded-md bg-white border border-gray-300 text-primary-700 font-medium hover:bg-gray-100 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(post.date).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
                      <span className="mx-2">•</span>
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-primary-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary-900 mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-lg text-gray-600 mb-8">
                Stay up-to-date with the latest garage door tips, trends, and special offers.
              </p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
