'use client';

import React, { use, useEffect, useState } from 'react';
import SendButton from '@/components/Button/SendButton';
import { useGetUserQuery } from '@/redux/services/authApis';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {  useUpdateUserMutation } from '@/redux/services/userApis';
import { toast } from 'react-toastify';
import { updateUser } from '@/redux/slices/authSlice';
import ClientLoading from '@/components/ClientLoading';
import InputField from '@/components/InputField';
import SelectField from '@/components/FormElements/SelectField';


export default function EditProfile() {
  const lang = useSelector((state: RootState) => state.language.language);
  const { data: user, isLoading, isError, refetch } = useGetUserQuery();
  const [updateUserData, { isLoading: isUpdating }] = useUpdateUserMutation();
  const dispatch = useDispatch<AppDispatch>()
  // ✅ Dispatch only when user data changes
  useEffect(() => {
    if (user) {
      dispatch(updateUser(user));
    }
  }, [user, dispatch]);
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    anniversary: '',
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        phone: user.phone || '',
        dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
        gender: user.gender || '',
        maritalStatus: user.marital_status || '',
        anniversary: user.anniversary_date
          ? new Date(user.anniversary_date).toISOString().split('T')[0]
          : '',
      });
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (profile.maritalStatus === "married" && !profile.anniversary) {
      return toast.info("Anniversary date is required")
    }
    try {
      const res = await updateUserData({
        name: profile.name || undefined,
        phone: profile.phone || undefined,
        dob: profile.dob || undefined,
        gender: profile.gender || undefined,
        marital_status: profile.maritalStatus || undefined,
        anniversary_date:
          profile.maritalStatus === 'single'
            ? undefined
            : profile.maritalStatus === 'divorced'
              ? undefined
              : profile.anniversary,
      }).unwrap();
      refetch();

      toast.success('Profile Updated Successfully!');
    } catch (err: any) {
      console.error('Update Failed:', err);
      toast.error(err?.data?.message);
    }
  };

  //address part

  if (isLoading) return <ClientLoading />;
  if (isError)
    return (
      <p className="text-red-500">
        {lang === 'bn' ? 'প্রোফাইল লোড করতে ব্যর্থ হয়েছে।' : 'Failed to load profile.'}
      </p>
    );

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border bg-gradient-to-tr  p-10 shadow-xl">
      <h2 className="mb-6 text-center text-2xl font-semibold text-primaryBlue md:mb-12 md:text-4xl">
        {lang === 'bn' ? 'আপনার প্রোফাইল সম্পাদনা করুন' : 'Edit Your Profile'}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputField
          label={lang === 'bn' ? 'নাম' : 'Name'}
          value={profile.name}
          placeholder="Enter Your Name"
          onChange={(value) => handleChange('name', value)}
        />
        <InputField
          label={lang === 'bn' ? 'ফোন' : 'Phone'}
          type="tel"
          value={profile.phone}
          placeholder="Enter Your Phone"
          onChange={(value) => handleChange('phone', value)}
        />
        <InputField
          label={lang === 'bn' ? 'জন্মতারিখ' : 'Date of Birth'}
          type="date"
          value={profile.dob}
          onChange={(value) => handleChange('dob', value)}
        />
        <SelectField
          label={lang === 'bn' ? 'লিঙ্গ' : 'Gender'}
          value={profile.gender}
          onChange={(value) => handleChange('gender', value)}
          options={[
            { label: 'Select Gender', value: '' },
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
          ]}
        />
        <SelectField
          label={lang === 'bn' ? 'বৈবাহিক অবস্থা' : 'Marital Status'}
          value={profile.maritalStatus}
          onChange={(value) => handleChange('maritalStatus', value)}
          options={[
            { label: 'Select Marital Status', value: '' },
            { label: 'Married', value: 'married' },
            { label: 'Single', value: 'single' },
            { label: 'Divorced', value: 'divorced' },
          ]}
        />
        {profile.maritalStatus === 'married' && (
          <InputField
            label={lang === 'bn' ? 'বিবাহ বার্ষিকী*' : 'Anniversary Date*'}
            type="date"

            value={profile.anniversary}
            onChange={(value) => handleChange('anniversary', value)}
          />
        )}
      </div>
      <div className="mt-5 flex justify-center md:mt-10">
        <SendButton
          link={handleSubmit}
          text={
            isUpdating
              ? lang === 'bn'
                ? 'প্রোফাইল আপডেট হচ্ছে...'
                : 'Updating...'
              : lang === 'bn'
                ? 'প্রোফাইল আপডেট করুন'
                : 'Update Profile'
          }
        />
      </div>
      {/* <hr className="mt-6" /> */}

    </div>
  );
}
