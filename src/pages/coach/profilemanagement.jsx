import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Upload, X, Plus, Award } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function ProfileManagement() {
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@coachplatform.com',
    phone: '+1 (555) 123-4567',
    location: 'Los Angeles, CA',
    sports: ['Tennis', 'Badminton'],
    experience: '12 years',
    bio: 'Passionate tennis coach with over a decade of experience in developing young talent. Specialized in tournament preparation and mental conditioning.',
    certifications: ['USPTA Certified', 'Sports Psychology']
  });

  const [newSport, setNewSport] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    toast.info('Changes discarded');
  };

  const addSport = () => {
    if (newSport.trim()) {
      setProfile({ ...profile, sports: [...profile.sports, newSport.trim()] });
      setNewSport('');
    }
  };

  const removeSport = (sport) => {
    setProfile({ ...profile, sports: profile.sports.filter(s => s !== sport) });
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setProfile({ ...profile, certifications: [...profile.certifications, newCertification.trim()] });
      setNewCertification('');
    }
  };

  const removeCertification = (cert) => {
    setProfile({ ...profile, certifications: profile.certifications.filter(c => c !== cert) });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-slate-900 mb-2">Profile Management</h1>
        <p className="text-slate-600">Update your coaching profile and credentials</p>
      </div>

      {/* Profile Summary */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-lg">
              <Upload className="w-4 h-4 text-white" />
            </button>
          </div>
          <div>
            <h2 className="text-slate-900 mb-1">{profile.name}</h2>
            <p className="text-slate-600 text-sm mb-2">{profile.email}</p>
            <div className="flex flex-wrap gap-2">
              {profile.sports.map((sport) => (
                <Badge key={sport} className="bg-emerald-500 text-white border-0 hover:bg-emerald-600">
                  {sport}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Edit Form */}
      <Card className="p-6">
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-slate-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="Enter your location"
                />
              </div>
              <div>
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={profile.experience}
                  onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                  placeholder="e.g., 12 years"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Biography</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Tell us about yourself and your coaching philosophy"
              rows={4}
            />
          </div>

          {/* Sports */}
          <div>
            <Label>Sports Coached</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.sports.map((sport) => (
                <Badge key={sport} className="bg-blue-100 text-blue-700 border-0 hover:bg-blue-200 flex items-center gap-1">
                  {sport}
                  <button onClick={() => removeSport(sport)} className="ml-1 hover:bg-blue-300 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSport}
                onChange={(e) => setNewSport(e.target.value)}
                placeholder="Add a sport"
                onKeyPress={(e) => e.key === 'Enter' && addSport()}
              />
              <Button onClick={addSport} variant="outline" size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <Label>Certifications</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.certifications.map((cert) => (
                <Badge key={cert} className="bg-amber-100 text-amber-700 border-0 hover:bg-amber-200 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {cert}
                  <button onClick={() => removeCertification(cert)} className="ml-1 hover:bg-amber-300 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                placeholder="Add a certification"
                onKeyPress={(e) => e.key === 'Enter' && addCertification()}
              />
              <Button onClick={addCertification} variant="outline" size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Upload Certifications */}
          <div>
            <Label>Upload Certification Documents</Label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 mb-1">Click to upload or drag and drop</p>
              <p className="text-slate-400 text-sm">PDF, JPG, PNG up to 10MB</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={handleSave} className="bg-emerald-500 hover:bg-emerald-600 text-white">
              Save Changes
            </Button>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
