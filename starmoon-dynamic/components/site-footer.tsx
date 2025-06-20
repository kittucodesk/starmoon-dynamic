import Link from 'next/link'
import React from 'react'

const SiteFooter = () => {
    return (
        <>

            {/* Footer */}
            < footer className="bg-cyan-950 dark:bg-slate-950 text-white py-12" >
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">ServiceHub</h3>
                            <p className="text-gray-400 dark:text-gray-300 mb-4">Connecting customers with trusted service providers worldwide.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">For Customers</h4>
                            <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                                <li>
                                    <Link href="/browse" className="hover:text-white dark:hover:text-blue-400">
                                        Browse Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/how-it-works" className="hover:text-white dark:hover:text-blue-400">
                                        How It Works
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/customer-support" className="hover:text-white dark:hover:text-blue-400">
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Platform</h4>
                            <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                                <li>
                                    <Link href="/products" className="hover:text-white dark:hover:text-blue-400">
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/consultation" className="hover:text-white dark:hover:text-blue-400">
                                        Consultation
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/support" className="hover:text-white dark:hover:text-blue-400">
                                        Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                                <li>
                                    <Link href="/about" className="hover:text-white dark:hover:text-blue-400">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/careers" className="hover:text-white dark:hover:text-blue-400">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:text-white dark:hover:text-blue-400">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 dark:border-slate-700 mt-8 pt-8 text-center text-gray-400 dark:text-gray-300">
                        <p>&copy; 2024 ServiceHub. All rights reserved.</p>
                    </div>
                </div>
            </footer >
        </>
    )
}

export default SiteFooter