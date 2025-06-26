export const consultantsData = [
    {
        _id: "1",
        consultation_category: "Business Strategy",
        name: "Sarah Johnson",
        profile_image: "/placeholder.svg?height=300&width=300",
        about:
            "Experienced business strategist with over 15 years of experience helping startups and Fortune 500 companies achieve their growth objectives. Specialized in digital transformation, market expansion, and operational excellence.",
        specialization: ["Digital Transformation", "Market Strategy", "Operations"],
        experience: "15+ years",
        education: [
            { degree: "MBA", institution: "Harvard Business School", year: "2008" },
            { degree: "BS Business Administration", institution: "Stanford University", year: "2005" },
        ],
        certifications: [
            { name: "Certified Management Consultant", issuer: "CMC Institute", year: "2010" },
            { name: "Digital Strategy Certificate", issuer: "MIT Sloan", year: "2020" },
        ],
        awards: [
            { title: "Top Business Consultant 2023", organization: "Business Weekly" },
            { title: "Innovation Leader Award", organization: "Tech Summit 2022" },
        ],
        links: {
            website: "https://sarahjohnson.com",
            linkedin: "https://linkedin.com/in/sarahjohnson",
            twitter: "https://twitter.com/sarahjohnson",
        },
        availability: [
            { day: "Monday", time_slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
            { day: "Tuesday", time_slots: ["10:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"] },
            { day: "Wednesday", time_slots: ["9:00 AM - 12:00 PM"] },
            { day: "Thursday", time_slots: ["2:00 PM - 5:00 PM"] },
            { day: "Friday", time_slots: ["9:00 AM - 11:00 AM"] },
        ],
        tags: ["Strategy", "Leadership", "Digital", "Growth", "Innovation"],
        pricing_type: "hourly",
        hourly_rate: 250,
        currency: "USD",
        quick_contact_no: "+1-555-0123",
        whatsapp_no: "+1-555-0123",
        is_active: true,
        faqs: [
            {
                question: "What industries do you specialize in?",
                answer:
                    "I work across various industries including technology, healthcare, finance, and retail, with particular expertise in digital transformation initiatives.",
            },
            {
                question: "How do you structure your consulting engagements?",
                answer:
                    "I offer flexible engagement models including hourly consultations, project-based work, and retainer arrangements based on your specific needs.",
            },
            {
                question: "What can I expect from our first consultation?",
                answer:
                    "In our initial session, we'll discuss your challenges, goals, and current situation. I'll provide initial insights and outline a potential roadmap for moving forward.",
            },
        ],
        features: [
            {
                title: "Strategic Planning",
                description: "Comprehensive business strategy development tailored to your market and goals",
                image: "/placeholder.svg?height=60&width=60",
            },
            {
                title: "Digital Transformation",
                description: "Guide your organization through digital adoption and process optimization",
                image: "/placeholder.svg?height=60&width=60",
            },
            {
                title: "Market Analysis",
                description: "In-depth market research and competitive analysis to inform your decisions",
                image: "/placeholder.svg?height=60&width=60",
            },
        ],
        benefits: [
            {
                title: "Accelerated Growth",
                description: "Proven strategies to scale your business faster and more efficiently",
                icon: "growth",
            },
            {
                title: "Risk Mitigation",
                description: "Identify and address potential challenges before they impact your business",
                icon: "shield",
            },
            {
                title: "Competitive Advantage",
                description: "Develop unique positioning that sets you apart in the marketplace",
                icon: "target",
            },
        ],
        testimonials: [
            {
                name: "Michael Chen",
                role: "CEO",
                company: "TechStart Inc.",
                description:
                    "Sarah's strategic guidance was instrumental in our successful Series A funding. Her insights into market positioning and operational efficiency helped us grow 300% in 18 months.",
                rating: 5,
                image: "/placeholder.svg?height=60&width=60",
            },
            {
                name: "Lisa Rodriguez",
                role: "VP Operations",
                company: "Global Retail Co.",
                description:
                    "Working with Sarah transformed our digital strategy. Her practical approach and deep expertise made the complex transformation process manageable and successful.",
                rating: 5,
                image: "/placeholder.svg?height=60&width=60",
            },
        ],
        badges: ["Top Rated", "Verified Expert", "Quick Response"],
    },
    {
        _id: "2",
        consultation_category: "Technology & AI",
        name: "Dr. Alex Kumar",
        profile_image: "/placeholder.svg?height=300&width=300",
        about:
            "AI researcher and technology consultant with a PhD in Machine Learning from MIT. Helping businesses integrate AI solutions and navigate the rapidly evolving tech landscape. Published author with 50+ research papers.",
        specialization: ["Artificial Intelligence", "Machine Learning", "Data Science"],
        experience: "12+ years",
        education: [
            { degree: "PhD Machine Learning", institution: "MIT", year: "2012" },
            { degree: "MS Computer Science", institution: "Carnegie Mellon", year: "2009" },
        ],
        certifications: [
            { name: "Google Cloud AI Architect", issuer: "Google", year: "2023" },
            { name: "AWS Machine Learning Specialty", issuer: "Amazon", year: "2022" },
        ],
        awards: [
            { title: "AI Innovation Award", organization: "Tech Leaders Forum 2023" },
            { title: "Best Research Paper", organization: "ICML 2022" },
        ],
        links: {
            website: "https://alexkumar.ai",
            linkedin: "https://linkedin.com/in/alexkumar",
            twitter: "https://twitter.com/alexkumar_ai",
        },
        availability: [
            { day: "Monday", time_slots: ["10:00 AM - 1:00 PM"] },
            { day: "Wednesday", time_slots: ["2:00 PM - 5:00 PM"] },
            { day: "Friday", time_slots: ["9:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"] },
        ],
        tags: ["AI", "Machine Learning", "Data Science", "Technology", "Research"],
        pricing_type: "hourly",
        hourly_rate: 300,
        currency: "USD",
        quick_contact_no: "+1-555-0456",
        whatsapp_no: "+1-555-0456",
        is_active: true,
        faqs: [
            {
                question: "What AI solutions do you recommend for small businesses?",
                answer:
                    "I focus on practical, cost-effective AI implementations like chatbots, predictive analytics, and automation tools that provide immediate ROI.",
            },
            {
                question: "How long does it take to implement an AI solution?",
                answer:
                    "Timeline varies based on complexity, but most projects range from 3-6 months for full implementation, with initial prototypes available in 4-6 weeks.",
            },
        ],
        features: [
            {
                title: "AI Strategy Development",
                description: "Create comprehensive AI roadmaps aligned with your business objectives",
                image: "/placeholder.svg?height=60&width=60",
            },
            {
                title: "Technical Implementation",
                description: "Hands-on development and deployment of AI solutions",
                image: "/placeholder.svg?height=60&width=60",
            },
        ],
        benefits: [
            {
                title: "Automation Efficiency",
                description: "Reduce manual work and increase productivity through intelligent automation",
                icon: "automation",
            },
            {
                title: "Data-Driven Insights",
                description: "Transform your data into actionable business intelligence",
                icon: "insights",
            },
        ],
        testimonials: [
            {
                name: "Jennifer Park",
                role: "CTO",
                company: "DataFlow Systems",
                description:
                    "Alex helped us implement a machine learning pipeline that improved our prediction accuracy by 40%. His expertise is unmatched.",
                rating: 5,
                image: "/placeholder.svg?height=60&width=60",
            },
        ],
        badges: ["AI Expert", "Research Leader", "Top Rated"],
    },
    {
        _id: "3",
        consultation_category: "Marketing & Growth",
        name: "Emma Thompson",
        profile_image: "/placeholder.svg?height=300&width=300",
        about:
            "Growth marketing expert with a track record of scaling startups from zero to millions in revenue. Specialized in digital marketing, customer acquisition, and retention strategies across multiple channels.",
        specialization: ["Growth Marketing", "Digital Advertising", "Customer Acquisition"],
        experience: "10+ years",
        education: [
            { degree: "MBA Marketing", institution: "Wharton School", year: "2014" },
            { degree: "BA Communications", institution: "UCLA", year: "2011" },
        ],
        certifications: [
            { name: "Google Ads Certified", issuer: "Google", year: "2023" },
            { name: "Facebook Marketing Professional", issuer: "Meta", year: "2023" },
        ],
        awards: [{ title: "Marketing Professional of the Year", organization: "Marketing Association 2023" }],
        links: {
            website: "https://emmathompson.marketing",
            linkedin: "https://linkedin.com/in/emmathompson",
            instagram: "https://instagram.com/emmathompson_marketing",
        },
        availability: [
            { day: "Tuesday", time_slots: ["9:00 AM - 12:00 PM", "1:00 PM - 4:00 PM"] },
            { day: "Thursday", time_slots: ["10:00 AM - 1:00 PM"] },
            { day: "Saturday", time_slots: ["9:00 AM - 11:00 AM"] },
        ],
        tags: ["Growth", "Marketing", "Digital", "Acquisition", "Retention"],
        pricing_type: "hourly",
        hourly_rate: 200,
        currency: "USD",
        quick_contact_no: "+1-555-0789",
        whatsapp_no: "+1-555-0789",
        is_active: true,
        faqs: [
            {
                question: "What's your approach to growth marketing?",
                answer:
                    "I focus on data-driven strategies, starting with understanding your customer journey and identifying the highest-impact growth levers for your specific business.",
            },
        ],
        features: [
            {
                title: "Growth Strategy",
                description: "Develop comprehensive growth plans with clear KPIs and milestones",
                image: "/placeholder.svg?height=60&width=60",
            },
        ],
        benefits: [
            {
                title: "Increased Revenue",
                description: "Proven strategies to boost your bottom line through optimized marketing",
                icon: "revenue",
            },
        ],
        testimonials: [
            {
                name: "David Wilson",
                role: "Founder",
                company: "EcoTech Solutions",
                description:
                    "Emma's growth strategies helped us achieve 500% revenue growth in just 12 months. Her expertise is invaluable.",
                rating: 5,
                image: "/placeholder.svg?height=60&width=60",
            },
        ],
        badges: ["Growth Expert", "Top Performer"],
    },
    {
        _id: "4",
        consultation_category: "Finance & Investment",
        name: "Robert Chen",
        profile_image: "/placeholder.svg?height=300&width=300",
        about:
            "Senior financial advisor with expertise in investment strategies, portfolio management, and financial planning. Former Wall Street analyst with deep knowledge of market dynamics and risk management.",
        specialization: ["Investment Strategy", "Portfolio Management", "Risk Assessment"],
        experience: "18+ years",
        education: [
            { degree: "MBA Finance", institution: "Columbia Business School", year: "2006" },
            { degree: "BS Economics", institution: "University of Chicago", year: "2003" },
        ],
        certifications: [
            { name: "CFA Charter", issuer: "CFA Institute", year: "2008" },
            { name: "FRM Certification", issuer: "GARP", year: "2009" },
        ],
        awards: [{ title: "Financial Advisor of the Year", organization: "Finance Today 2022" }],
        links: {
            website: "https://robertchen.finance",
            linkedin: "https://linkedin.com/in/robertchen",
        },
        availability: [
            { day: "Monday", time_slots: ["9:00 AM - 12:00 PM"] },
            { day: "Wednesday", time_slots: ["1:00 PM - 4:00 PM"] },
            { day: "Friday", time_slots: ["10:00 AM - 1:00 PM"] },
        ],
        tags: ["Finance", "Investment", "Portfolio", "Risk", "Planning"],
        pricing_type: "hourly",
        hourly_rate: 350,
        currency: "USD",
        quick_contact_no: "+1-555-0321",
        whatsapp_no: "+1-555-0321",
        is_active: true,
        faqs: [
            {
                question: "What investment strategies do you recommend?",
                answer:
                    "I tailor investment strategies based on individual risk tolerance, time horizon, and financial goals, focusing on diversified portfolios and long-term wealth building.",
            },
        ],
        features: [
            {
                title: "Portfolio Analysis",
                description: "Comprehensive review and optimization of your investment portfolio",
                image: "/placeholder.svg?height=60&width=60",
            },
        ],
        benefits: [
            {
                title: "Wealth Growth",
                description: "Strategic investment approaches to maximize your financial returns",
                icon: "growth",
            },
        ],
        testimonials: [
            {
                name: "Maria Garcia",
                role: "Entrepreneur",
                company: "Self-employed",
                description:
                    "Robert's investment advice helped me diversify my portfolio and achieve consistent returns even during market volatility.",
                rating: 5,
                image: "/placeholder.svg?height=60&width=60",
            },
        ],
        badges: ["Finance Expert", "CFA Certified"],
    },
    {
        _id: "5",
        consultation_category: "Legal & Compliance",
        name: "Jennifer Walsh",
        profile_image: "/placeholder.svg?height=300&width=300",
        about:
            "Corporate lawyer specializing in business law, compliance, and regulatory matters. Extensive experience helping startups and established companies navigate legal challenges and ensure regulatory compliance.",
        specialization: ["Corporate Law", "Compliance", "Contract Review"],
        experience: "14+ years",
        education: [
            { degree: "JD", institution: "Yale Law School", year: "2010" },
            { degree: "BA Political Science", institution: "Princeton University", year: "2007" },
        ],
        certifications: [
            { name: "Bar Admission", issuer: "New York State Bar", year: "2010" },
            { name: "Compliance Certification", issuer: "Compliance Institute", year: "2015" },
        ],
        awards: [{ title: "Rising Star in Law", organization: "Legal Times 2020" }],
        links: {
            website: "https://jenniferwalsh.law",
            linkedin: "https://linkedin.com/in/jenniferwalsh",
        },
        availability: [
            { day: "Tuesday", time_slots: ["10:00 AM - 1:00 PM"] },
            { day: "Thursday", time_slots: ["2:00 PM - 5:00 PM"] },
        ],
        tags: ["Legal", "Compliance", "Corporate", "Contracts", "Regulatory"],
        pricing_type: "hourly",
        hourly_rate: 400,
        currency: "USD",
        quick_contact_no: "+1-555-0654",
        whatsapp_no: "+1-555-0654",
        is_active: true,
        faqs: [
            {
                question: "What legal services do you provide for startups?",
                answer:
                    "I help startups with entity formation, contract drafting, compliance setup, intellectual property protection, and regulatory guidance.",
            },
        ],
        features: [
            {
                title: "Legal Review",
                description: "Thorough review of contracts, agreements, and legal documents",
                image: "/placeholder.svg?height=60&width=60",
            },
        ],
        benefits: [
            {
                title: "Legal Protection",
                description: "Ensure your business is protected from legal risks and compliance issues",
                icon: "shield",
            },
        ],
        testimonials: [
            {
                name: "Tom Anderson",
                role: "Founder",
                company: "StartupXYZ",
                description:
                    "Jennifer's legal expertise was crucial in our funding round. Her attention to detail and strategic advice saved us from potential legal issues.",
                rating: 5,
                image: "/placeholder.svg?height=60&width=60",
            },
        ],
        badges: ["Legal Expert", "Startup Specialist"],
    },
    {
        _id: "6",
        consultation_category: "Health & Wellness",
        name: "Dr. Amanda Foster",
        profile_image: "/placeholder.svg?height=300&width=300",
        about:
            "Licensed clinical psychologist and wellness coach with expertise in stress management, work-life balance, and mental health optimization. Helping professionals achieve peak performance while maintaining well-being.",
        specialization: ["Mental Health", "Stress Management", "Work-Life Balance"],
        experience: "11+ years",
        education: [
            { degree: "PhD Clinical Psychology", institution: "UCLA", year: "2013" },
            { degree: "MS Psychology", institution: "University of California", year: "2010" },
        ],
        certifications: [
            { name: "Licensed Clinical Psychologist", issuer: "California Board", year: "2013" },
            { name: "Certified Wellness Coach", issuer: "Wellness Institute", year: "2016" },
        ],
        awards: [{ title: "Excellence in Mental Health", organization: "Psychology Today 2023" }],
        links: {
            website: "https://amandafoster.wellness",
            linkedin: "https://linkedin.com/in/amandafoster",
        },
        availability: [
            { day: "Monday", time_slots: ["2:00 PM - 5:00 PM"] },
            { day: "Wednesday", time_slots: ["9:00 AM - 12:00 PM"] },
            { day: "Friday", time_slots: ["1:00 PM - 4:00 PM"] },
            { day: "Saturday", time_slots: ["10:00 AM - 12:00 PM"] },
        ],
        tags: ["Mental Health", "Wellness", "Stress", "Balance", "Psychology"],
        pricing_type: "hourly",
        hourly_rate: 180,
        currency: "USD",
        quick_contact_no: "+1-555-0987",
        whatsapp_no: "+1-555-0987",
        is_active: true,
        faqs: [
            {
                question: "How can you help with work-related stress?",
                answer:
                    "I provide evidence-based strategies for managing workplace stress, improving resilience, and creating sustainable work-life balance practices.",
            },
        ],
        features: [
            {
                title: "Stress Assessment",
                description: "Comprehensive evaluation of stress factors and coping mechanisms",
                image: "/placeholder.svg?height=60&width=60",
            },
        ],
        benefits: [
            {
                title: "Improved Well-being",
                description: "Develop healthy coping strategies and enhance overall mental wellness",
                icon: "wellness",
            },
        ],
        testimonials: [
            {
                name: "Sarah Kim",
                role: "Marketing Director",
                company: "Creative Agency",
                description:
                    "Dr. Foster's guidance helped me overcome burnout and develop sustainable work habits. I'm more productive and happier than ever.",
                rating: 5,
                image: "/placeholder.svg?height=60&width=60",
            },
        ],
        badges: ["Licensed Professional", "Wellness Expert"],
    },
]
