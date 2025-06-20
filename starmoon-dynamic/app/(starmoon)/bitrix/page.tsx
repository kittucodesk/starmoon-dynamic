"use client"

import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CheckCircle, Star, DollarSign, Settings, Shield, Code, BarChart3, Lightbulb, Globe, Zap, Target, Search, Users, LayoutDashboard, Gem, PiggyBank, Calendar, MessageSquare, Briefcase, Waypoints, Zap as ZapIcon, Bot, Send, ClipboardCheck, Clock, Layers, TrendingUp } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function BitrixPage() {
    const [planType, setPlanType] = useState("annually"); // 'monthly' or 'annually'

    const commonPlanFeatures = [
        "Includes 5 users",
        "CRM",
        "Tasks & projects",
        "Online documents",
        "Website builder",
        "Online store",
        "Customer support",
    ];

    const plans = {
        basic: {
            annually: { price: 1590, features: commonPlanFeatures.slice(0, 5).concat(["Online store (basic)", "Customer support (email)"]) },
            monthly: { price: 199, features: commonPlanFeatures.slice(0, 5).concat(["Online store (basic)", "Customer support (email)"]) },
        },
        standard: {
            annually: { price: 3990, features: commonPlanFeatures.concat(["Sales Intelligence", "Automation", "HR"]) },
            monthly: { price: 499, features: commonPlanFeatures.concat(["Sales Intelligence", "Automation", "HR"]) },
        },
        professional: {
            annually: { price: 7990, features: commonPlanFeatures.concat(["Sales Intelligence", "Automation", "HR", "Online meetings", "e-Signature for HR", "Multiple branches", "Inventory", "Invoice pack"]) },
            monthly: { price: 999, features: commonPlanFeatures.concat(["Sales Intelligence", "Automation", "HR", "Online meetings", "e-Signature for HR", "Multiple branches", "Inventory", "Invoice pack"]) },
        },
        enterprise: {
            annually: { price: 15990, features: commonPlanFeatures.concat(["Sales Intelligence", "Automation", "HR", "Online meetings", "e-Signature for HR", "Multiple branches", "Inventory", "Invoice pack", "Customer support (dedicated)", "Administration"]) },
            monthly: { price: 1999, features: commonPlanFeatures.concat(["Sales Intelligence", "Automation", "HR", "Online meetings", "e-Signature for HR", "Multiple branches", "Inventory", "Invoice pack", "Customer support (dedicated)", "Administration"]) },
        },
    };

    return (
        <div className="container mx-auto min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-700 to-purple-600 text-white py-20 text-center rounded-md">
                <div className="container mx-auto px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Schedule your Bitrix24 consultant in just 1 hour with our expert!
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
                    >
                        Discover how Bitrix24's robust suite of tools can streamline your business processes: from CRM and project management to team collaboration and communication.
                    </motion.p>
                </div>
            </section>

            {/* Main Features Grid */}
            <section className="py-16 bg-white rounded-md">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12">Bitrix24</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className='transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
                            <FeatureCard
                                icon={<LayoutDashboard className="w-8 h-8 text-blue-500" />}
                                title="CRM"
                                description="Modern CRM complete with sales enablement, analytics, and automation tools."
                                bgColor="bg-blue-50"
                                textColor="text-blue-800"

                            />
                        </div>
                        <div className='transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
                            <FeatureCard
                                icon={<ClipboardCheck className="w-8 h-8 text-green-500" />}
                                title="Tasks and Projects"
                                description="Kanban boards and Gantt charts give a full set of Scrum tools to facilitate your project management."
                                bgColor="bg-green-50"
                                textColor="text-green-800"
                            />
                        </div>
                        <div className='transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
                            <FeatureCard
                                icon={<Layers className="w-8 h-8 text-pink-500" />}
                                title="Sites and Stores"
                                description="Template-based website builder to help you create beautiful sites and SEO-ready online stores."
                                bgColor="bg-pink-50"
                                textColor="text-pink-800"
                            />
                        </div>
                        <div className='transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
                            <FeatureCard
                                icon={<MessageSquare className="w-8 h-8 text-orange-500" />}
                                title="Collaboration"
                                description="Communicate and collaborate using our internal chat, video calls, shared documents, and more."
                                bgColor="bg-orange-50"
                                textColor="text-orange-800"
                            />
                        </div>
                        <div className='transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
                            <FeatureCard
                                icon={<Briefcase className="w-8 h-8 text-teal-500" />}
                                title="HR & Automation"
                                description="Manage your HR records, track employee work, calendar, and automate routine operations."
                                bgColor="bg-teal-50"
                                textColor="text-teal-800"
                            />
                        </div>
                        <div className='transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
                            <FeatureCard
                                icon={<Bot className="w-8 h-8 text-purple-500" />}
                                title="CoPilot"
                                description="A powerful AI tool inside Bitrix24 designed to help you with anything, from writing to boosting your creativity."
                                bgColor="bg-purple-50"
                                textColor="text-purple-800"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-gray-100 rounded-md">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Connect with an Expert?</h2>
                        <p className="text-5xl font-extrabold text-blue-600 mb-6">+91-9718963567</p>
                        <p className="text-gray-600 mb-6 max-w-md md:mx-0 mx-auto">
                            At Starmoon Technology Consultants, we're dedicated to simplifying corporate life. Our mission is to help companies achieve seamless operations and stay competitive in the market using cutting-edge technologies.
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg">Request</Button>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <Image
                            src="Gif/call.gif" // Replace with actual image path if available
                            alt="Contact us"
                            width={500}
                            height={300}
                            objectFit="contain"
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-white rounded-md">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12">We are ready to help at your Bitrix24</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <BenefitCard
                                icon={<Users className="w-10 h-10 text-blue-500" />}
                                title="For any & every business"
                                description="Bitrix24 has teams of any size and work on projects effectively, being able to easily scale from 1 to 10,000 users."
                                bgColor="bg-blue-50"
                            />
                        </div>
                        <div className="transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <BenefitCard
                                icon={<LayoutDashboard className="w-10 h-10 text-green-500" />}
                                title="All-in-one solution"
                                description="Bitrix24 features CRM, tasks, chat, video calls, website, store, project, HR, communication, automation, and 30+ other tools."
                                bgColor="bg-green-50"
                            />
                        </div>
                        <div className="transition-transform duration-300 hover:scale-105 ">
                            <BenefitCard
                                icon={<DollarSign className="w-10 h-10 text-yellow-500" />}
                                title="Business-friendly pricing"
                                description="Each Bitrix24 plan has a user limit and a fixed monthly/annually fee, helping businesses keep costs low."
                                bgColor="bg-yellow-50"
                            />
                        </div>
                    </div>


                </div>
            </section>

            {/* Detailed Feature Sections (from Image 3) */}

            {/* CRM Detailed Section */}
            <section className="py-16 bg-gradient-to-r from-blue-50 to-white rounded-md">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <h3 className="text-3xl font-bold text-blue-700 mb-4">CRM</h3>
                        <p className="text-gray-700 text-lg mb-6">
                            Bitrix24 CRM enables you to streamline sales, marketing, and customer service processes, improve customer relationships, and increase sales.
                        </p>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Sales automation and pipeline management</li>
                            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Customer database and communication tools</li>
                            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Marketing automation and campaigns</li>
                        </ul>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <Image
                            src="/Products/bitrixcrm.jpg" // Placeholder, replace if exact image path exists
                            alt="CRM Screenshot"
                            width={600}
                            height={400}
                            objectFit="contain"
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* CoPilot AI Section */}
            <section className="py-16 bg-white rounded-md">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12">CoPilot AI</h2>
                    <p className="text-gray-600 mb-10 max-w-3xl mx-auto">
                        CoPilot in Bitrix24 is an AI-driven feature designed to assist users in managing tasks, improving communication, and streamlining workflows. By leveraging artificial intelligence, CoPilot helps automate various processes.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        <div className="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-2xl">
                            <CoPilotCard
                                icon={<Send className="w-7 h-7 text-red-500" />}
                                title="CoPilot in Chat"
                                description="CoPilot in Bitrix24 Chat: Revolutionizing Communication with Smart Summaries, Automated Replies, and Enhanced Team Collaboration and Efficiency."
                                bgColor="bg-red-50"
                            />
                        </div>
                        <div className="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-2xl">
                            <CoPilotCard
                                icon={<ClipboardCheck className="w-7 h-7 text-purple-500" />}
                                title="CoPilot in Tasks"
                                description="Boosting Productivity: CoPilot's Role in Bitrix24 Tasks Automation, Smart and efficient Task Creation, and Enhanced Program abd Task Management with CoPilot in Bitrix24."
                                bgColor="bg-purple-50"
                            /></div>
                        <div className="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-2xl">
                            <CoPilotCard
                                icon={<Clock className="w-7 h-7 text-yellow-500" />}
                                title="CoPilot in Feed"
                                description="CoPilot in Bitrix24 Feed: Simplified and efficient Content Regulations for Better Engagement. How CoPilot in Bitrix24 Feed Keeps Teams Optimized and Informed."
                                bgColor="bg-yellow-50"
                            />
                        </div>
                        <div className="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-2xl">
                            <CoPilotCard
                                icon={<Bot className="w-7 h-7 text-blue-500" />}
                                title="CoPilot AI"
                                description="Empowering Workforce through a Redefined User Experience: How CoPilot AI Transforms the Total Experience in Bitrix24."
                                bgColor="bg-blue-50"
                            />
                        </div>
                        <div className="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-2xl">
                            <CoPilotCard
                                icon={<Layers className="w-7 h-7 text-green-500" />}
                                title="CoPilot in Projects"
                                description="Seamlessly organize, assign, and monitor projects with CoPilot, turning Bitrix24 into a powerful AI-driven project manager."
                                bgColor="bg-green-50"
                            />
                        </div>
                        <div className="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-2xl">
                            <CoPilotCard
                                icon={<MessageSquare className="w-7 h-7 text-pink-500" />}
                                title="CoPilot in Communication"
                                description="Enhance internal communication with CoPilot's smart suggestions, instant feedback tools, and real-time summaries in Bitrix24."
                                bgColor="bg-pink-50"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Image
                            src="Products/copilot.jpg" // Placeholder for the large AI image
                            alt="CoPilot AI"
                            width={800}
                            height={450}
                            objectFit="contain"
                        />
                    </div>
                </div>
            </section>

            {/* Collaboration Section */}
            <section className="py-16 bg-gradient-to-r from-purple-50 to-white rounded-md">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12">Collaboration</h2>
                    <p className="text-gray-600 mb-10 max-w-3xl mx-auto">
                        Bitrix24 is a comprehensive collaboration platform designed to streamline communication, project management, and teamwork across organizations of all sizes. Work efficiently whether in the office or remotely.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        <FeatureDetailCard
                            icon={<MessageSquare className="w-7 h-7 text-blue-500" />}
                            title="Chat"
                            description="Communicate with teams in private or group chats for real-time and clear discussions."
                            bgColor="bg-blue-50"
                        />
                        <FeatureDetailCard
                            icon={<Waypoints className="w-7 h-7 text-green-500" />}
                            title="Channels"
                            description="Organize dedicated communication spaces for teams, projects, or special topics."
                            bgColor="bg-green-50"
                        />
                        <FeatureDetailCard
                            icon={<ZapIcon className="w-7 h-7 text-orange-500" />}
                            title="Mobile Check-in"
                            description="Use the Bitrix24 mobile devices to track attendance, break and working hours."
                            bgColor="bg-orange-50"
                        />
                        <FeatureDetailCard
                            icon={<Calendar className="w-7 h-7 text-red-500" />}
                            title="Calendar"
                            description="Manage your schedules, organize meetings, and plan events efficiently and effectively."
                            bgColor="bg-red-50"
                        />
                        {/* </div> */}
                    </div>

                    <div className="flex justify-center">
                        <Image
                            src="Products/bitrix24.png" // Placeholder for the large image
                            alt="Collaboration Screenshot"
                            width={800}
                            height={450}
                            objectFit="contain"
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* Tasks and Projects Detailed Section */}
            <section className="py-16 bg-white rounded-md">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12">Tasks and Projects</h2>
                    <p className="text-gray-600 mb-10 max-w-3xl mx-auto">
                        Bitrix24 Tasks and projects are integral features that help businesses and teams collaborate, stay organized, and achieve their goals. Use this tool to help you track individual tasks, manage team projects, set deadlines, and assign responsibilities.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        <FeatureDetailCard
                            icon={<ClipboardCheck className="w-7 h-7 text-blue-500" />}
                            title="Scrum"
                            description="Scrum sprints and backlogs with Bitrix24 scrum boards and task management in Bitrix24. Tracking sprint progress with Bitrix24 analytics."
                            bgColor="bg-blue-50"
                        />
                        <FeatureDetailCard
                            icon={<TrendingUp className="w-7 h-7 text-green-500" />}
                            title="Flows"
                            description="Building business processes with Bitrix24 workflows. Creating custom workflows in Bitrix24."
                            bgColor="bg-green-50"
                        />
                        <FeatureDetailCard
                            icon={<Bot className="w-7 h-7 text-purple-500" />}
                            title="AI Powered Tasks"
                            description="Automating repetitive processes with Bitrix24 workflows. Creating custom workflows in Bitrix24."
                            bgColor="bg-purple-50"
                        />
                        <FeatureDetailCard
                            icon={<Clock className="w-7 h-7 text-orange-500" />}
                            title="Project Management"
                            description="Managing projects and deadlines in Bitrix24. Visualizing project timelines with gantt charts. Creating milestones and tracking progress."
                            bgColor="bg-orange-50"
                        />
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src="/Products/tasks_and_projects.png" // Placeholder for the large image
                            alt="Tasks and Projects Screenshot"
                            width={800}
                            height={450}
                            objectFit="contain"
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* HR and Automation Detailed Section */}
            <section className="py-16 bg-gradient-to-r from-red-50 to-white rounded-md">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12">HR and Automation</h2>
                    <p className="text-gray-600 mb-10 max-w-3xl mx-auto">
                        Bitrix24 offers a comprehensive set of HR tools that streamline recruitment, employee management, and workflow automation. With its integrated approach, HR departments can save time on routine tasks, improve internal communications, and focus on strategic initiatives.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <FeatureDetailCard
                            icon={<Users className="w-7 h-7 text-blue-500" />}
                            title="Employee Time"
                            description="Bitrix24 includes HR tools enabling organizations to track employee attendance, manage time off, and integrate time tracking."
                            bgColor='bg-blue-50'
                        />
                        <FeatureDetailCard
                            icon={<Briefcase className="w-7 h-7 text-green-500" />}
                            title="Management"
                            description="Bitrix24 offers HR tracking and project management into one comprehensive tool to help teams manage their time."
                            bgColor='bg-green-50'
                        />
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src="Products/hr_automation.png" // Placeholder for the large image
                            alt="HR and Automation Screenshot"
                            width={800}
                            height={450}
                            objectFit="contain"
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* Work Reports & Workflow Automation Section */}
            <section className="py-16 bg-white rounded-md">
                <div className="container mx-auto px-6 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <FeatureDetailCard
                            icon={<BarChart3 className="w-7 h-7 text-blue-500" />}
                            title="Work Reports"
                            description="Bitrix24 work reports automatically, saving time and reducing errors. Gain insights into individual team performance."
                            bgColor='bg-blue-50'
                        />
                        <FeatureDetailCard
                            icon={<TrendingUp className="w-7 h-7 text-green-500" />}
                            title="Workflow Automation"
                            description="Automate routine processes with seamless work transitions without delays, streamlining workflows."
                            bgColor='bg-green-50'
                        />
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src="Products/websites-main.png" // Placeholder for the image
                            alt="Work Reports and Workflow Automation Screenshot"
                            width={800}
                            height={450}
                            objectFit="contain"
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* 30 Million Organizations Section */}
            <section className="bg-gradient-to-r from-blue-700 to-purple-600 text-white py-20 text-center rounded-md">
                <div className="container mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Bitrix24© 30,000,000 Organizations have chosen Bitrix24
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
                    >
                        Bitrix24 is a leading collaboration platform offering CRM, project management, communication, and automation tools to help businesses streamline their operations.
                    </motion.p>
                    <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold">Click to choose Bitrix</Button>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16 bg-white rounded-md">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-10">One price for ALL users included within the plan limit</h2>

                    <div className="flex justify-center mb-8">
                        <div className="inline-flex rounded-full bg-gray-200 p-1">
                            <Button
                                className={`px-6 py-2 rounded-full ${planType === "monthly" ? "bg-blue-600 text-white" : "bg-transparent text-gray-700 hover:bg-gray-300"}`}
                                onClick={() => setPlanType("monthly")}
                            >
                                Monthly
                            </Button>
                            <Button
                                className={`px-6 py-2 rounded-full ${planType === "annually" ? "bg-blue-600 text-white" : "bg-transparent text-gray-700 hover:bg-gray-300"}`}
                                onClick={() => setPlanType("annually")}
                            >
                                Annually
                                <span className="ml-2 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-0.5 rounded-full">Save Up to 50%</span>
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Object.entries(plans).map(([key, plan]) => (
                            <PricingCard
                                key={key}
                                title={key.charAt(0).toUpperCase() + key.slice(1)}
                                price={planType === "annually" ? plan.annually.price : plan.monthly.price}
                                period={planType === "annually" ? "/organization/month/billed annually" : "/organization/month/billed monthly"}
                                features={planType === "annually" ? plan.annually.features : plan.monthly.features}
                                isPopular={key === "professional"}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

// Helper components for reusability
interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    bgColor: string;
    textColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, bgColor, textColor }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-6 rounded-xl shadow-lg ${bgColor} ${textColor} flex flex-col items-center text-center`}
    >
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-80">{description}</p>
    </motion.div>
);

interface BenefitCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    bgColor: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, bgColor }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`p-8 ${bgColor} rounded-xl shadow-lg border border-gray-200 text-center flex flex-col items-center`}
    >
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
);

interface CoPilotCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    bgColor: string;
}

const CoPilotCard: React.FC<CoPilotCardProps> = ({ icon, title, description, bgColor }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-6 rounded-xl shadow-lg ${bgColor} text-gray-800 flex flex-col items-center text-center`}
    >
        <div className="mb-4">{icon}</div>
        <h4 className="text-lg font-bold mb-2">{title}</h4>
        <p className="text-sm text-gray-700">{description}</p>
    </motion.div>
);

interface FeatureDetailCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    bgColor: string;
}

const FeatureDetailCard: React.FC<FeatureDetailCardProps> = ({ icon, title, description, bgColor }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-6 ${bgColor} shadow-md border border-gray-200 text-center flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-2xl`}
    >
        <div className="mb-3">{icon}</div>
        <h4 className="text-lg font-bold text-gray-800 mb-2">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
);

interface PricingCardProps {
    title: string;
    price: number;
    period: string;
    features: string[];
    isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, period, features, isPopular = false }) => (
    <Card className={`relative h-full flex flex-col flex-1 justify-between p-6 rounded-2xl shadow-xl transition-all duration-300 ${isPopular ? "border-2 border-blue-600 scale-105" : "border border-gray-200"}`}>
        {isPopular && (
            <div className="absolute -top-3 right-6 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Most Popular
            </div>
        )}
        <CardContent className="flex flex-col items-center text-center p-0 h-full flex-1 justify-between">
            <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
                <div className="text-5xl font-extrabold text-blue-600 mb-2">
                    Rs. {price.toLocaleString()}
                </div>
                <p className="text-sm text-gray-500 mb-6">{period}</p>
                <ul className="space-y-3 text-left text-gray-700 mb-8 w-full">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <Button className={`w-full py-3 rounded-full text-lg font-semibold ${isPopular ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}>
                Buy
            </Button>
        </CardContent>
    </Card>
); 