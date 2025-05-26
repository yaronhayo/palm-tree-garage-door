import type { Metadata } from "next"
import { faqCategories, getPopularFAQs } from "@/data/faq-items"
import SchemaMarkup from "@/components/SchemaMarkup"
import { Search, ThumbsUp, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Palm Tree Garage Door",
  description:
    "Find answers to common questions about garage door repair, installation, maintenance, and costs in South Florida. Get expert advice from Palm Tree Garage Door.",
  openGraph: {
    title: "Garage Door FAQ - Your Questions Answered",
    description: "Expert answers to your garage door questions. Learn about repairs, costs, maintenance, and more.",
    url: "https://palmtreegaragedoor.com/faq",
    type: "website",
  },
}

export default function FAQPage() {
  const popularFAQs = getPopularFAQs(5)

  return (
    <>
      <SchemaMarkup
        page="faq"
        breadcrumbs={[
          { name: "Home", url: "https://palmtreegaragedoor.com" },
          { name: "FAQ", url: "https://palmtreegaragedoor.com/faq" },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-xl mb-8 text-gray-100">Get expert answers to your garage door questions</p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search for answers..."
                  className="pl-10 pr-4 py-6 text-lg bg-white text-gray-900 border-0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Popular Questions */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ThumbsUp className="h-6 w-6 text-primary" />
                Most Popular Questions
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-12">
                {popularFAQs.map((faq, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-start justify-between">
                        <span>{faq.question}</span>
                        <span className="text-sm text-gray-500 flex items-center gap-1 ml-2">
                          <ThumbsUp className="h-4 w-4" />
                          {faq.upvoteCount}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 line-clamp-3">{faq.answer}</p>
                      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {faq.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Updated {new Date(faq.dateModified || faq.datePublished || "").toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* FAQ Categories */}
              <div className="space-y-8">
                {faqCategories.map((category) => (
                  <div key={category.slug} className="bg-white rounded-lg shadow-sm border">
                    <div className="p-6 border-b">
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>

                    <Accordion type="single" collapsible className="px-6">
                      {category.items.map((item, index) => (
                        <AccordionItem key={index} value={`${category.slug}-${index}`}>
                          <AccordionTrigger className="text-left hover:no-underline">
                            <div className="flex-1 pr-4">
                              <h4 className="font-medium">{item.question}</h4>
                              {item.relatedServices && item.relatedServices.length > 0 && (
                                <div className="flex gap-2 mt-1">
                                  {item.relatedServices.map((service) => (
                                    <span
                                      key={service}
                                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                                    >
                                      {service}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="prose prose-sm max-w-none">
                              <p className="text-gray-600 whitespace-pre-line">{item.answer}</p>

                              {item.keywords && item.keywords.length > 0 && (
                                <div className="mt-4 pt-4 border-t">
                                  <p className="text-xs text-gray-500">Related topics: {item.keywords.join(", ")}</p>
                                </div>
                              )}

                              <div className="mt-4 flex items-center justify-between">
                                <div className="text-xs text-gray-500">
                                  Last updated:{" "}
                                  {new Date(item.dateModified || item.datePublished || "").toLocaleDateString()}
                                </div>
                                <Button variant="ghost" size="sm" className="text-xs">
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  Helpful ({item.upvoteCount || 0})
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>

              {/* Contact CTA */}
              <Card className="mt-12 bg-primary text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h3>
                  <p className="mb-6 text-gray-100">
                    Our expert technicians are ready to answer your specific questions
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary">
                      Call (954) 864-2525
                    </Button>
                    <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100">
                      Schedule Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
