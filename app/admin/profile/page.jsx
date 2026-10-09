'use client';

import React, { useState } from 'react';
import { User, Shield, Mail, Phone, Save, CheckCircle2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useStockora } from '@/context/StockoraContext';

export default function ProfilePage() {
  const { user, updateUserProfile } = useStockora();
  const [profileData, setProfileData] = useState({
    name: user.name || 'Admin User',
    email: user.email || 'admin@vyavasthakendra.com',
    phone: user.phone || '+91 98290 12345',
    role: user.role || 'Super Admin',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(profileData);
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Admin Profile &amp; Credentials
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your personal profile information, system display name, and emergency contact details.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          {/* User Avatar Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-[#3157D5] text-white flex items-center justify-center font-bold text-2xl shadow-md">
              {profileData.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {profileData.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
                  {profileData.role}
                </span>
                <span className="text-xs text-slate-400">
                  Shree Ganesh Distribution Hub
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Display Name
              </label>
              <input
                type="text"
                required
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={profileData.email}
                  className="w-full px-3.5 py-2 text-xs bg-slate-100 dark:bg-slate-800/50 border rounded-xl opacity-70 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Assigned System Role
              </label>
              <input
                type="text"
                disabled
                value={profileData.role}
                className="w-full px-3.5 py-2 text-xs bg-slate-100 dark:bg-slate-800/50 border rounded-xl opacity-70 cursor-not-allowed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Roles can be toggled dynamically from the top header using the &quot;Role Demo&quot; switcher.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
