import React from 'react'

const useable = () => {
    return (
        <div>


            {/* Stats Section */}
            {/* <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl transform -rotate-6 scale-95 transition-transform group-hover:rotate-0 group-hover:scale-105" />
              <div className="relative p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2">10,000+</div>
                <div className="text-gray-600 text-lg">Active Service Providers</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl transform -rotate-6 scale-95 transition-transform group-hover:rotate-0 group-hover:scale-105" />
              <div className="relative p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2">50,000+</div>
                <div className="text-gray-600 text-lg">Services Completed</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl transform -rotate-6 scale-95 transition-transform group-hover:rotate-0 group-hover:scale-105" />
              <div className="relative p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2">4.8/5</div>
                <div className="text-gray-600 text-lg">Average Rating</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section> */}

            {/* Search Section */}
            {/* <section className="bg-gradient-to-b from-[#c6eafd] to-white text-transparent shrink-0 py-28">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 md:px-6 text-center"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Find the Perfect Service Provider</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with skilled professionals for all your service needs. From web development to home cleaning, find
            trusted providers in your area.
          </p>

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input placeholder="What service are you looking for?" className="pl-10 h-12 text-lg" />
              </div>
              <Button size="lg" className="h-12 px-8">
                Search Services
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-gray-600">Active Service Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-gray-600">Services Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </motion.div>
      </section> */}

            {/* Hero Section */}
            {/* <section className="w-full py-12 bg-muted">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 md:px-6"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge variant="outline" className="w-fit">
                  Trusted by 500+ Businesses
                </Badge>
                <h1 className="text-3xl font-bold tracking-normal sm:text-5xl xl:text-6xl/none">
                  Transform Your Business with Expert Solutions
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  We deliver cutting-edge products, specialized services, and expert consultation to help your
                  business thrive in today's competitive landscape.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="inline-flex items-center gap-2" onClick={() => window.location.href = "/products"}>
                  Explore Our Solutions
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = "/consultation"}>
                  Book a Consultation
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Free Initial Consultation</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/Banner/business-solutions-hero.jpeg"
                width={600}
                height={400}
                alt="Business Solutions Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </section> */}


       {/* Trust & Safety */}
      {/* <section className="py-16 bg-muted container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trust & Safety</h2>
            <p className="text-gray-600">Your security and satisfaction are our top priorities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verified Providers</h3>
              <p className="text-gray-600">
                All service providers go through our verification process including background checks and skill
                assessments.
              </p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our customer support team is available around the clock to help resolve any issues or concerns.
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Money-Back Guarantee</h3>
              <p className="text-gray-600">
                If you're not satisfied with the service, we offer a full refund within 48 hours of completion.
              </p>
            </div>
          </div>
        </motion.div>
      </section> */}

       {/* Categories */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-gray-600">Find the right service for your needs</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={`/browse?category=${encodeURIComponent(category.name)}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer text-center p-6">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} services</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* About Us Section */}
      {/* <section id="about" className="w-full py-12 md:py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Trusted Partner for Business Excellence
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                For over two decades, we've been helping businesses transform, grow, and succeed. Our mission is to
                deliver innovative solutions that drive real results and create lasting value for our clients.
              </p>
            </div>
          </div>
          <div className="mx-auto md:flex items-center justify-center content-center gap-6 py-12 grid grid-cols-2 lg:gap-12">
            <Card className="text-center space-y-2 w-fit p-10">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-sm font-medium">Satisfied Clients</div>
            </Card>
            <Card className="text-center space-y-2 w-fit p-10">
              <div className="text-4xl font-bold text-primary">20+</div>
              <div className="text-sm font-medium">Years of Experience</div>
            </Card>
            <Card className="text-center space-y-2 w-fit p-10">
              <div className="text-4xl font-bold text-primary">98%</div>
              <div className="text-sm font-medium">Success Rate</div>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Services Section */}
      {/* <section id="services" className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="secondary">Our Services</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Specialized Services That Drive Results
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Expert services tailored to your unique business needs and challenges.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <Zap className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Digital Transformation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  Modernize your business operations with cutting-edge technology solutions and strategic digital
                  initiatives.
                </CardDescription>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Process Optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Technology Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Change Management</span>
                  </li>
                </ul>
                <Button className="w-full">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Cybersecurity Solutions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  Protect your business with comprehensive security assessments, implementation, and ongoing
                  monitoring.
                </CardDescription>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Security Audits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Threat Monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Compliance Management</span>
                  </li>
                </ul>
                <Button className="w-full">Request Quote</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Business Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  Strategic planning and execution support to help your business achieve sustainable growth and
                  competitive advantage.
                </CardDescription>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Market Analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Growth Planning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Performance Optimization</span>
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* How It Works */}
      {/* <section className="py-12 bg-muted">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 md:px-6"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Get started in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Search & Browse</h3>
              <p className="text-gray-600">
                Find the perfect service provider for your needs using our advanced search and filtering options.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Connect & Book</h3>
              <p className="text-gray-600">
                Review profiles, read reviews, and book your preferred service provider with secure payment processing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Get Service & Review</h3>
              <p className="text-gray-600">
                Receive your service and leave a review to help other customers make informed decisions.
              </p>
            </div>
          </div>
        </motion.div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers and service providers</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/signup?type=customer">
              <Button size="lg">
                Find Our Products
              </Button>
            </Link>
            <Link href="/signup?type=customer">
              <Button size="lg">
                Find Services
              </Button>
            </Link>
            <Link href="/signup?type=customer">
              <Button size="lg">
                Book an Expert
              </Button>
            </Link>
          </div>
        </motion.div>
      </section> */}

       {/* <section id="brands" className="container py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4">
               
                <div className="text-center mb-12">
                  <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 px-3 py-1">
                    <Shield className="w-3 h-3 mr-1" />
                    Authorized Distributor
                  </Badge>
      
                  <h2 className="text-3xl font-semibold text-gray-900 mb-4">Trusted Technology Partners</h2>
      
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    We are proud to be the official distributor of industry-leading software solutions, ensuring genuine
                    products with full support.
                  </p>
                </div>
      
                
                <Swiper
                  modules={[Navigation, Pagination, A11y, Autoplay]}
                  spaceBetween={24}
                  navigation
                  pagination={{ clickable: true, type: "progressbar" }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    
                  }}
                  className="h-[400px]"
                >
                  {partners.map((partner, idx) => (
                    <SwiperSlide key={idx} className="py-3">
                      <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 h-full flex flex-col">
                       
                        <div className="flex items-center justify-center h-52 mb-4">
                          <Image
                            src={partner.image || "/placeholder.svg"}
                            alt={`${partner.name} logo`}
                            width={80}
                            height={140}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        
                        <div className="mt-auto text-center">
                          <h3 className="font-semibold text-gray-900 mb-2">{partner.name}</h3>
                          <div className="flex justify-center">
                            <ArrowRight className="w-5 h-5 text-purple-600" />
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
      
               
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-5">
                  <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg">
                    Browse Solutions
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
      
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg"
                  >
                    Become a Partner
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </section> */}

            

            {/* <section className="py-16 bg-white">
    <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Bitrix24</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
                icon={<LayoutDashboard className="w-8 h-8 text-blue-500" />}
                title="CRM"
                description="Modern CRM complete with sales enablement, analytics, and automation tools."
                bgColor="bg-blue-50"
                textColor="text-blue-800"
                className="transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            />
            <FeatureCard
                icon={<ClipboardCheck className="w-8 h-8 text-green-500" />}
                title="Tasks and Projects"
                description="Kanban boards and Gantt charts give a full set of Scrum tools to facilitate your project management."
                bgColor="bg-green-50"
                textColor="text-green-800"
                className="transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            />
            <FeatureCard
                icon={<Layers className="w-8 h-8 text-pink-500" />}
                title="Sites and Stores"
                description="Template-based website builder to help you create beautiful sites and SEO-ready online stores."
                bgColor="bg-pink-50"
                textColor="text-pink-800"
                className="transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            />
            <FeatureCard
                icon={<MessageSquare className="w-8 h-8 text-orange-500" />}
                title="Collaboration"
                description="Communicate and collaborate using our internal chat, video calls, shared documents, and more."
                bgColor="bg-orange-50"
                textColor="text-orange-800"
                className="transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            />
            <FeatureCard
                icon={<Briefcase className="w-8 h-8 text-teal-500" />}
                title="HR & Automation"
                description="Manage your HR records, track employee work, calendar, and automate routine operations."
                bgColor="bg-teal-50"
                textColor="text-teal-800"
                className="transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            />
            <FeatureCard
                icon={<Bot className="w-8 h-8 text-purple-500" />}
                title="CoPilot"
                description="A powerful AI tool inside Bitrix24 designed to help you with anything, from writing to boosting your creativity."
                bgColor="bg-purple-50"
                textColor="text-purple-800"
                className="transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            />
        </div>
    </div>
</section> */}


{/* Footer Section (from Image 2) */}
            {/* <footer className="bg-gray-800 text-gray-300 py-12">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-white font-bold mb-4">STARMOON</h4>
                        <p className="text-sm mb-4">
                            Leading IT consultancy agency which help organization to reduce their current running cost.
                        </p>
                        <div className="flex space-x-4 mb-4">
                            <a href="#" className="hover:text-white"><i className="fab fa-linkedin"></i></a>
                            <a href="#" className="hover:text-white"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="hover:text-white"><i className="fab fa-instagram"></i></a>
                        </div>
                        <p className="text-sm flex items-center gap-2">
                            <i className="fas fa-phone-alt"></i> +91-9718963567
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Our Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                            <li><a href="#" className="hover:text-white">Career</a></li>
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms and Conditions</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">For Clients</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Find Expert</a></li>
                            <li><a href="#" className="hover:text-white">Find Service</a></li>
                            <li><a href="#" className="hover:text-white">Partner Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms and Conditions</a></li>
                            <li><a href="#" className="hover:text-white">Cancellation and Refund</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">For Experts</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Expert Partnership</a></li>
                            <li><a href="#" className="hover:text-white">Work with Us</a></li>
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms and Conditions</a></li>
                            <li><a href="#" className="hover:text-white">Tax-Show Policy</a></li>
                            <li><a href="#" className="hover:text-white">Account Creation</a></li>
                        </ul>
                    </div>
                </div>
                <div className="container mx-auto px-6 text-center text-xs text-gray-500 mt-10">
                    <p>Copyright © 2024 Starmoon Consulting Services Pvt. Ltd. All rights reserved.</p>
                </div>
            </footer> */}
        </div>
    )
}

export default useable