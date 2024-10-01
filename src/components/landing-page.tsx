'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, Star, Building, Search, X, Menu } from "lucide-react" // Removed unused Clock and MapPin imports
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion"
import Image from 'next/image'

const services = [
  "Condo complex management",
  "Industrial property management",
  "Property inspections",
  "Property investment management",
  "Property maintenance",
  "Property management",
  "Property sales",
  "Real estate valuation",
  "Rent collection",
  "Rental property management",
  "Repairs & maintenance",
  "Tenant management",
]

const MotionButton = motion(Button)

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false) // Close the menu after selecting an option
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="md:text-xl text-[20px] font-semibold md:flex">INFINITY PROPERTY MANAGEMENT</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#home" onClick={() => scrollToSection('home')} className="text-sm hover:underline">HOME</a>
            <a href="#services" onClick={() => scrollToSection('services')} className="text-sm hover:underline">SERVICES</a>
            <a href="#reviews" onClick={() => scrollToSection('reviews')} className="text-sm hover:underline">REVIEWS</a>
            <a href="#contact" onClick={() => scrollToSection('contact')} className="text-sm hover:underline">CONTACT</a>
          </nav>
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
              <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden bg-white shadow-md"
              >
                <nav className="flex flex-col items-center py-4 space-y-4">
                  <a href="#home" onClick={() => scrollToSection('home')} className="text-sm hover:underline">HOME</a>
                  <a href="#services" onClick={() => scrollToSection('services')} className="text-sm hover:underline">SERVICES</a>
                  <a href="#reviews" onClick={() => scrollToSection('reviews')} className="text-sm hover:underline">REVIEWS</a>
                  <a href="#contact" onClick={() => scrollToSection('contact')} className="text-sm hover:underline">CONTACT</a>
                </nav>
              </motion.div>
          )}
        </AnimatePresence>
      </header>
  )
}

const ScrollAnimationWrapper = ({ children }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
      <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          transition={{ duration: 0.5 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 }
          }}
      >
        {children}
      </motion.div>
  )
}

export function LandingPageComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [showAllServices, setShowAllServices] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredServices = services.filter(service =>
      service.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const visibleServices = showAllServices ? filteredServices : filteredServices.slice(0, 3)

  return (
      <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
        <Navbar />

        <main className="flex-grow pt-20 overflow-x-hidden">
          <ScrollAnimationWrapper>
            <section id="home" className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#e6c9c9] rounded-full flex items-center justify-center mr-4">
                      <Star className="w-6 h-6 text-black" />
                    </div>
                    <span className="text-lg font-semibold">4.8/5 Average Rating</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-light mb-6">
                    PREMIER PROPERTY MANAGEMENT
                  </h2>
                  <div className="mb-6">
                    <MotionButton
                        variant="outline"
                        className="rounded-full text-xs px-4 py-1 border-gray-400"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                      24/7 AVAILABILITY
                    </MotionButton>
                  </div>
                  <p className="text-gray-600 mb-8 max-w-md">
                    INFINITY PROPERTY MANAGEMENT OFFERS COMPREHENSIVE SERVICES FOR PROPERTY OWNERS, FROM TENANT SCREENING TO MAINTENANCE, WITH UNPARALLELED PROFESSIONALISM AND EFFICIENCY.
                  </p>
                  <div className="space-x-4">
                    <MotionButton
                        variant="outline"
                        className="rounded-full px-6"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                      OUR SERVICES
                    </MotionButton>
                    <MotionButton
                        variant="outline"
                        className="rounded-full px-6"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsModalOpen(true)}
                    >
                      GET IN TOUCH
                    </MotionButton>
                  </div>
                </div>
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/condos%20in%20toronto%20for%20sale-9Bg5Fcm7fzX2YOXVCab3MMi22k3CGY.webp"
                      alt="Toronto skyline with CN Tower and rooftop terrace"
                      width={1200}
                      height={800}
                      className="rounded-3xl w-full h-auto"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 flex flex-col items-center">
                    <div className="w-2 h-2 bg-black rounded-full mb-1"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full mb-1"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white rounded-full p-2">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                  <div className="absolute top-4 left-4 bg-gray-500 text-white rounded-full px-3 py-1 text-sm">
                    TOP RATED
                  </div>
                </motion.div>
              </div>
            </section>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper>
            <section id="services" className="mt-10 py-24 border-t border-gray-200 px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-semibold">OUR COMPREHENSIVE SERVICES</h3>
                  </div>
                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    {/* Flex column on mobile */}
                    <div className="relative w-full md:w-auto">
                      <Input
                          type="text"
                          placeholder="Search services..."
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCarouselIndex(0);
                          }}
                          className="pl-10 pr-4 py-2 rounded-full w-full md:w-auto"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <MotionButton
                        variant="outline"
                        className="rounded-full px-6"
                        onClick={() => setShowAllServices(!showAllServices)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                      {showAllServices ? "Show Less" : "See All"}
                    </MotionButton>
                  </div>
                </div>
                <div className="relative">
                  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 ${showAllServices ? 'grid-rows-2' : 'grid-rows-1'}`}>
                    {visibleServices.slice(carouselIndex * 3, (carouselIndex + (showAllServices ? 3 : 1)) * 3).map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                              <h4 className="text-xl font-semibold mb-2">{service}</h4>
                              <p className="text-gray-600">Professional {service.toLowerCase()} tailored to your needs.</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </ScrollAnimationWrapper>



          <ScrollAnimationWrapper>
            <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8">
              <div className="container mx-auto">
                {/* Updated flex behavior for mobile and desktop */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                  <div className="flex items-center mb-4 md:mb-0"> {/* Adjust for better spacing on mobile */}
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-semibold">CUSTOMER REVIEWS</h3>
                  </div>
                  <MotionButton
                      variant="outline"
                      className="rounded-full px-6 w-full md:w-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    See All Reviews
                  </MotionButton>
                </div>

                {/* Responsive grid layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {[
                    {
                      content: "Infinity Property Management has been exceptional in handling our rental property. Their professionalism and efficiency are unmatched. We've seen a significant improvement in our property's performance since partnering with them.",
                      author: "Sarah T."
                    },
                    {
                      content: "Lee Corbin from Infinity Property Management has been incredibly responsive and attentive to our needs. Their 24/7 availability has been a game-changer for us. Highly recommended for any property owner!",
                      author: "Michael R."
                    },
                    {
                      content: "The team at Infinity Property Management has made managing our properties stress-free. Their detailed financial reporting has given us clear insights into our investments. We're extremely satisfied with their services.",
                      author: "David L."
                    }
                  ].map((review, index) => (
                      <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="bg-white rounded-2xl shadow-md h-80 hover:shadow-lg transition-shadow duration-300">
                          <CardContent className="p-6 flex flex-col justify-between h-full">
                            <div>
                              <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'} mr-1`} />
                                ))}
                              </div>
                              <p className="text-gray-600 mb-4">{review.content}</p>
                            </div>
                            <p className="font-semibold">- {review.author}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollAnimationWrapper>


          <ScrollAnimationWrapper>
            <section id="contact" className="py-24 border-t border-gray-200 relative overflow-hidden px-4 sm:px-6 lg:px-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f5f5f5] via-[#e6c9c9] to-[#f5f5f5] animate-gradient-x"></div>
              <div className="container mx-auto relative z-10">
                <div className="text-center mb-12">
                  <h3 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-800">GET IN TOUCH</h3>
                  <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                    Have questions about our property management services? Want to learn more about how we can help you maximize the potential of your property? Get in touch with us today!
                  </p>
                  <MotionButton
                      variant="outline"
                      className="rounded-full px-8 py-3 text-lg bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-300 text-gray-800"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsModalOpen(true)}
                  >
                    GET IN TOUCH
                  </MotionButton>
                </div>
              </div>
            </section>
          </ScrollAnimationWrapper>

          <AnimatePresence>
            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                >
                  <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-white rounded-3xl p-8 max-w-md w-full relative"
                  >
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <Input id="name" placeholder="Your Name" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <Textarea id="message" placeholder="How can we help you?" rows={4} />
                      </div>
                      <MotionButton
                          type="submit"
                          className="w-full rounded-full"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                      >
                        Send Message
                      </MotionButton>
                    </form>
                  </motion.div>
                </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
  )
}
