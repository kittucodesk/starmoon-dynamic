"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Camera, Shield, Bell, Palette, Globe, Key, Trash2, Save, Eye, EyeOff } from "lucide-react"

export function SettingsPage() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Profile form state
    const [profileData, setProfileData] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
        bio: "Software developer with 5+ years of experience in web development.",
        company: "Tech Solutions Inc.",
        website: "https://johndoe.dev",
    })

    // Preferences state
    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        pushNotifications: false,
        marketingEmails: true,
        weeklyDigest: true,
        theme: "light",
        language: "en",
        timezone: "America/New_York",
    })

    const handleProfileSave = () => {
        console.log("Saving profile data:", profileData)
        alert("Profile updated successfully!")
    }

    const handlePreferencesSave = () => {
        console.log("Saving preferences:", preferences)
        alert("Preferences updated successfully!")
    }

    const handlePasswordChange = () => {
        console.log("Changing password...")
        alert("Password changed successfully!")
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <Badge variant="secondary">Account Settings</Badge>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Profile Information
                            </CardTitle>
                            <CardDescription>Update your personal information and profile details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Profile Picture */}
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <Button variant="outline" size="sm">
                                        <Camera className="mr-2 h-4 w-4" />
                                        Change Photo
                                    </Button>
                                    <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 2MB.</p>
                                </div>
                            </div>

                            <Separator />

                            {/* Profile Form */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={profileData.firstName}
                                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={profileData.lastName}
                                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                        id="company"
                                        value={profileData.company}
                                        onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Website</Label>
                                    <Input
                                        id="website"
                                        value={profileData.website}
                                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={profileData.location}
                                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Tell us about yourself..."
                                    value={profileData.bio}
                                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                    rows={4}
                                />
                            </div>

                            <Button onClick={handleProfileSave} className="w-full md:w-auto">
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-6">
                    <div className="grid gap-6">
                        {/* Notifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="h-5 w-5" />
                                    Notifications
                                </CardTitle>
                                <CardDescription>Manage how you receive notifications</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Email Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                                    </div>
                                    <Switch
                                        checked={preferences.emailNotifications}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Push Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                                    </div>
                                    <Switch
                                        checked={preferences.pushNotifications}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, pushNotifications: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Marketing Emails</Label>
                                        <p className="text-sm text-muted-foreground">Receive emails about new features and offers</p>
                                    </div>
                                    <Switch
                                        checked={preferences.marketingEmails}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, marketingEmails: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Weekly Digest</Label>
                                        <p className="text-sm text-muted-foreground">Receive a weekly summary of your activity</p>
                                    </div>
                                    <Switch
                                        checked={preferences.weeklyDigest}
                                        onCheckedChange={(checked) => setPreferences({ ...preferences, weeklyDigest: checked })}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Appearance */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Palette className="h-5 w-5" />
                                    Appearance
                                </CardTitle>
                                <CardDescription>Customize the look and feel of your dashboard</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Theme</Label>
                                    <Select
                                        value={preferences.theme}
                                        onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="dark">Dark</SelectItem>
                                            <SelectItem value="system">System</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Localization */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="h-5 w-5" />
                                    Localization
                                </CardTitle>
                                <CardDescription>Set your language and regional preferences</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Language</Label>
                                        <Select
                                            value={preferences.language}
                                            onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="en">English</SelectItem>
                                                <SelectItem value="es">Spanish</SelectItem>
                                                <SelectItem value="fr">French</SelectItem>
                                                <SelectItem value="de">German</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Timezone</Label>
                                        <Select
                                            value={preferences.timezone}
                                            onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="America/New_York">Eastern Time</SelectItem>
                                                <SelectItem value="America/Chicago">Central Time</SelectItem>
                                                <SelectItem value="America/Denver">Mountain Time</SelectItem>
                                                <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                                                <SelectItem value="Europe/London">London</SelectItem>
                                                <SelectItem value="Europe/Paris">Paris</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Button onClick={handlePreferencesSave} className="w-full md:w-auto">
                            <Save className="mr-2 h-4 w-4" />
                            Save Preferences
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                    <div className="grid gap-6">
                        {/* Password Change */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Key className="h-5 w-5" />
                                    Change Password
                                </CardTitle>
                                <CardDescription>Update your password to keep your account secure</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="currentPassword"
                                            type={showCurrentPassword ? "text" : "password"}
                                            placeholder="Enter current password"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        >
                                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="newPassword"
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="Enter new password"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                        >
                                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm new password"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                                <Button onClick={handlePasswordChange}>
                                    <Key className="mr-2 h-4 w-4" />
                                    Change Password
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Two-Factor Authentication */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Two-Factor Authentication
                                </CardTitle>
                                <CardDescription>Add an extra layer of security to your account</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Two-Factor Authentication</Label>
                                        <p className="text-sm text-muted-foreground">Secure your account with 2FA</p>
                                    </div>
                                    <Badge variant="outline">Not Enabled</Badge>
                                </div>
                                <Button variant="outline">
                                    <Shield className="mr-2 h-4 w-4" />
                                    Enable 2FA
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Active Sessions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Sessions</CardTitle>
                                <CardDescription>Manage your active sessions across devices</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">Current Session</p>
                                            <p className="text-sm text-muted-foreground">Chrome on Windows • New York, NY</p>
                                        </div>
                                        <Badge>Active</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">Mobile App</p>
                                            <p className="text-sm text-muted-foreground">iPhone • Last active 2 hours ago</p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Revoke
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="account" className="space-y-6">
                    <div className="grid gap-6">
                        {/* Account Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Information</CardTitle>
                                <CardDescription>View your account details and subscription status</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium">Account ID</Label>
                                        <p className="text-sm text-muted-foreground">USR-2024-001234</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">Member Since</Label>
                                        <p className="text-sm text-muted-foreground">January 15, 2023</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">Subscription</Label>
                                        <Badge>Premium Plan</Badge>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">Next Billing</Label>
                                        <p className="text-sm text-muted-foreground">February 15, 2024</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Data Export */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Data Export</CardTitle>
                                <CardDescription>Download a copy of your data</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline">
                                    <Save className="mr-2 h-4 w-4" />
                                    Export My Data
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Danger Zone */}
                        <Card className="border-destructive">
                            <CardHeader>
                                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                                <CardDescription>Irreversible and destructive actions</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Delete Account</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Once you delete your account, there is no going back. Please be certain.
                                    </p>
                                    <Button variant="destructive">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete Account
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
