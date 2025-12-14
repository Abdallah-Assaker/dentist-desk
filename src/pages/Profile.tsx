import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Copy, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "Dr. Ahmed Hassan",
    phone: "01012345678",
    email: "ahmed.hassan@email.com",
    whatsappNumber: "01012345678",
    secondaryPhone: "",
    publicContactName: "Dr. Ahmed Hassan",
    profilePhoto: "",
  });

  const [originalData, setOriginalData] = useState({ ...formData });

  const bookingLink = "https://book.dentalapp.com/dr-ahmed-hassan";

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const url = URL.createObjectURL(file);
    setFormData({ ...formData, profilePhoto: url });
    setIsUploading(false);
    
    toast({
      title: "Photo uploaded",
      description: "Your profile photo has been updated.",
    });
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(bookingLink);
    setCopied(true);
    toast({
      title: "Link copied",
      description: "Booking link copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    // Validate
    if (!formData.fullName.trim()) {
      toast({
        title: "Validation error",
        description: "Full name is required.",
        variant: "destructive",
      });
      return;
    }
    if (!formData.phone.trim()) {
      toast({
        title: "Validation error",
        description: "Phone number is required.",
        variant: "destructive",
      });
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Validation error",
        description: "Valid email address is required.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setOriginalData({ ...formData });
    setIsEditing(false);
    setIsSaving(false);
    
    toast({
      title: "Profile updated successfully",
      description: "Your changes have been saved.",
    });
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);
  const initials = formData.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link to="/more" className="p-2 -ml-2 hover:bg-primary-foreground/10 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">Profile</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Profile Header Card */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarImage src={formData.profilePhoto} alt={formData.fullName} />
                <AvatarFallback className="bg-primary-light text-primary text-2xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute bottom-0 right-0 h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Camera className="h-4 w-4" />
                )}
              </button>
            </div>
            
            <h2 className="mt-4 text-xl font-bold text-foreground">{formData.fullName}</h2>
            <p className="text-sm text-muted-foreground">Freelance Dentist</p>
          </div>
        </div>

        {/* Personal Information */}
        <section className="space-y-4">
          <h3 className="font-semibold text-foreground px-1">Personal Information</h3>
          <div className="bg-card rounded-xl shadow-card p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                disabled={!isEditing}
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                placeholder="01XXXXXXXXX"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                placeholder="your@email.com"
              />
            </div>
          </div>
        </section>

        {/* Contact Details */}
        <section className="space-y-4">
          <h3 className="font-semibold text-foreground px-1">Contact Details</h3>
          <div className="bg-card rounded-xl shadow-card p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input
                id="whatsapp"
                type="tel"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                disabled={!isEditing}
                placeholder="01XXXXXXXXX"
              />
              <p className="text-xs text-muted-foreground">
                This number will be used to send WhatsApp notifications to patients.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondaryPhone">Secondary Phone (Optional)</Label>
              <Input
                id="secondaryPhone"
                type="tel"
                value={formData.secondaryPhone}
                onChange={(e) => setFormData({ ...formData, secondaryPhone: e.target.value })}
                disabled={!isEditing}
                placeholder="Alternative phone number"
              />
            </div>
          </div>
        </section>

        {/* Booking Information */}
        <section className="space-y-4">
          <h3 className="font-semibold text-foreground px-1">Booking Information</h3>
          <div className="bg-card rounded-xl shadow-card p-4 space-y-4">
            <div className="space-y-2">
              <Label>Booking Link</Label>
              <div className="flex gap-2">
                <Input
                  value={bookingLink}
                  readOnly
                  className="bg-muted text-muted-foreground"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="publicContactName">Public Contact Name</Label>
              <Input
                id="publicContactName"
                value={formData.publicContactName}
                onChange={(e) => setFormData({ ...formData, publicContactName: e.target.value })}
                disabled={!isEditing}
                placeholder="Name shown on booking page"
              />
              <p className="text-xs text-muted-foreground">
                This name will be displayed on your booking page header.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        {isEditing ? (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        ) : (
          <Button className="w-full" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
}
