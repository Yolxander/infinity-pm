'use client'

import { useState, useLayoutEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, Star, Building, Search, X, Menu, Users, Wrench, BarChart } from "lucide-react"
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion"
import Image from 'next/image'

// Define services as an array of strings
const services: string[] = [
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

const Navbar = ({ setShowContactForm }: { setShowContactForm: (value: boolean) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50) // Trigger effect after scrolling 50px
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-gradient-to-r from-[#e6c9c9] to-[#f5f5f5] shadow-lg py-4' : 'bg-transparent py-6'} backdrop-blur-md`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.h1
              className="md:text-2xl text-[22px] font-semibold md:flex hover:text-[#333333] transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
              style={{ willChange: 'transform' }}
          >
            INFINITY PROPERTY MANAGEMENT
          </motion.h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center text-sm">
            <motion.a
                href="#home"
                className="text-gray-600 hover:text-black transition-colors relative group"
                onClick={() => scrollToSection('home')}
                style={{ willChange: 'transform' }}
            >
              <span className="group-hover:underline">HOME</span>
              <motion.div
                  className="h-0.5 bg-black absolute bottom-0 left-0 w-0 group-hover:w-full transition-all duration-300"
                  style={{ willChange: 'transform' }}
              />
            </motion.a>
            <motion.a
                href="#our-story"
                className="text-gray-600 hover:text-black transition-colors relative group"
                onClick={() => scrollToSection('our-story')}
                style={{ willChange: 'transform' }}
            >
              <span className="group-hover:underline">OUR STORY</span>
              <motion.div
                  className="h-0.5 bg-black absolute bottom-0 left-0 w-0 group-hover:w-full transition-all duration-300"
                  style={{ willChange: 'transform' }}
              />
            </motion.a>
            <motion.a
                href="#services"
                className="text-gray-600 hover:text-black transition-colors relative group"
                onClick={() => scrollToSection('services')}
                style={{ willChange: 'transform' }}
            >
              <span className="group-hover:underline">SERVICES</span>
              <motion.div
                  className="h-0.5 bg-black absolute bottom-0 left-0 w-0 group-hover:w-full transition-all duration-300"
                  style={{ willChange: 'transform' }}
              />
            </motion.a>
            <motion.a
                href="#reviews"
                className="text-gray-600 hover:text-black transition-colors relative group"
                onClick={() => scrollToSection('reviews')}
                style={{ willChange: 'transform' }}
            >
              <span className="group-hover:underline">REVIEWS</span>
              <motion.div
                  className="h-0.5 bg-black absolute bottom-0 left-0 w-0 group-hover:w-full transition-all duration-300"
                  style={{ willChange: 'transform' }}
              />
            </motion.a>
            <MotionButton
                variant="outline"
                className="rounded-full px-6 py-2 border-black text-sm hover:bg-black hover:text-white transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              CONTACT
            </MotionButton>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
              <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden bg-white shadow-md"
              >
                <nav className="flex flex-col items-center py-4 space-y-6">
                  <a href="#home" onClick={() => scrollToSection('home')} className="text-sm hover:underline">HOME</a>
                  <a href="#our-story" onClick={() => scrollToSection('our-story')} className="text-sm hover:underline">OUR STORY</a>
                  <a href="#services" onClick={() => scrollToSection('services')} className="text-sm hover:underline">SERVICES</a>
                  <a href="#reviews" onClick={() => scrollToSection('reviews')} className="text-sm hover:underline">REVIEWS</a>
                  <MotionButton
                      variant="outline"
                      className="rounded-full px-6 py-2 border-black text-sm hover:bg-black hover:text-white transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    GET IN TOUCH
                  </MotionButton>
                </nav>
              </motion.div>
          )}
        </AnimatePresence>
      </header>
  )
}

const ScrollAnimationWrapper = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useLayoutEffect(() => {
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
          style={{ willChange: 'transform' }}
      >
        {children}
      </motion.div>
  )
}

const ContactFormModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
      <AnimatePresence>
        {isOpen && (
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
                  className="bg-white rounded-3xl p-8 max-w-lg w-full relative"
              >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-semibold mb-4">Contact US</h2>
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
                    <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      Property Address
                    </label>
                    <Input id="propertyAddress" placeholder="123 Main St, Toronto, ON" />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Select Service
                    </label>
                    <select
                        id="service"
                        className="block w-full p-2.5 border rounded-lg"
                    >
                      {services.map((service, index) => (
                          <option key={index} value={service}>
                            {service}
                          </option>
                      ))}
                    </select>
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
                    Submit
                  </MotionButton>
                </form>
              </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
  )
}

export function LandingPageComponent() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [carouselIndex, setCarouselIndex] = useState<number>(0)
  const [showAllServices, setShowAllServices] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const filteredServices = services.filter(service =>
      service.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const visibleServices = showAllServices ? filteredServices : filteredServices.slice(0, 3)
  const [showContactForm, setShowContactForm] = useState<boolean>(false)

  return (
      <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
        <Navbar setShowContactForm={setShowContactForm} />

        <main className="flex-grow pt-20">
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
            <section id="our-story" className="py-24 px-4 sm:px-6 lg:px-8 ">
              <div className="container mx-auto ">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">Our Story</h2>
                  <p className="text-gray-700 max-w-2xl mx-auto">
                    Founded in 2010, Infinity Property Management has been revolutionizing
                    the Toronto real estate scene with our innovative approach and unwavering
                    commitment to excellence. Over the years, we’ve helped property owners
                    maximize the potential of their investments through hands-on management,
                    superior customer service, and a passion for perfection.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {/* Story Block 1 */}
                  <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#e6c9c9] rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-800" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Our People</h3>
                    <p className="text-gray-600">
                      Our team consists of dedicated professionals with years of
                      experience in property management and a commitment to
                      delivering top-tier service to our clients.
                    </p>
                  </motion.div>

                  {/* Story Block 2 */}
                  <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#e6c9c9] rounded-full flex items-center justify-center">
                      <BarChart className="w-8 h-8 text-gray-800" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Our Growth</h3>
                    <p className="text-gray-600">
                      Over the years, we have expanded our services to cover a wide range
                      of property management needs, helping hundreds of property owners
                      achieve their goals.
                    </p>
                  </motion.div>

                  {/* Story Block 3 */}
                  <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#e6c9c9] rounded-full flex items-center justify-center">
                      <Wrench className="w-8 h-8 text-gray-800" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Our Expertise</h3>
                    <p className="text-gray-600">
                      From tenant management to property maintenance, our expertise ensures
                      your property is well taken care of and continues to deliver strong
                      returns.
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper>
            <section id="services" className="mt-10 py-24 border-t border-gray-200 px-4 sm:px-6 lg:px-8  inset-0 bg-gradient-to-r from-[#e6c9c9] via-[#e6c9c9] to-[#f5f5f5] animate-gradient-x">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-semibold">OUR COMPREHENSIVE SERVICES</h3>
                  </div>
                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative w-full md:w-auto">
                      <Input
                          type="text"
                          placeholder="Search services..."
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setCarouselIndex(0)
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
            <section id="reviews" className="py-24 border-t border-gray-200">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                      <Star className="w                      -6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold">CUSTOMER REVIEWS</h3>
                  </div>
                  <MotionButton
                      variant="outline"
                      className="rounded-full px-6"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    See All Reviews
                  </MotionButton>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
        </main>

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

        <ContactFormModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} />

        <footer className="border-t border-gray-200 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-600">INFINITY PROPERTY MANAGEMENT</p>
                <p className="text-sm text-gray-600">386 Eglinton Ave W, Suite 201, Toronto, ON</p>
                <p className="text-sm text-gray-600">info@infinitypropertymanagement.com</p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
  )
}

