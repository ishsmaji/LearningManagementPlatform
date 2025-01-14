import React, { useEffect, useState } from 'react';
import CancelBtn from '../CancelBtn';
import IconBtn from '../../../common/IconBtn';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { changePassword } from '../../../../services/operations/SettingsAPI';
import { useDispatch, useSelector } from 'react-redux';

const UpdatePassword = () => {
  const dispatch = useDispatch();

  // fetching token
  const { token } = useSelector((state) => state.auth);

  // state variables for password visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // form
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm();


  
  // submit function
  const passwordUpdate =async (data) => {
    console.log("Password Data:", data);

    try {
        if (token) {
          dispatch(changePassword(token, data));
        } 
    } catch (error) {
        console.error("Token is missing. Please log in.");
    }
  };

  // reset form on successful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        oldPassword: "",
        newPassword: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(passwordUpdate)}>
      <div className='flex flex-col gap-6 rounded-lg border border-richblack-700 bg-richblack-800 p-8 px-12'>
        <h3 className='font-semibold text-lg text-richblack-5'>Password</h3>
        <div className='flex flex-col lg:flex-row gap-6 justify-between'>
          <label className='flex flex-col gap-2 w-[100%] lg:w-[50%] relative'>
            <p className='font-medium text-sm text-richblack-5'>Current Password</p>
            <input
              type={showOldPassword ? "text" : "password"}
              name='oldPassword'
              {...register("oldPassword", { required: true })}
              placeholder='Enter Current Password'
              className='p-3 rounded-lg bg-richblack-700 CTAblackbutton font-medium text-base text-richblack-5'
            />
            {errors.oldPassword && (
              <div className='text-xs text-yellow-100'>Please enter your Current Password.</div>
            )}
            <div
              onClick={() => setShowOldPassword((prev) => !prev)}
              className='absolute right-3 top-10 cursor-pointer'>
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </div>
          </label>

          <label className='flex flex-col gap-2 w-[100%] lg:w-[50%] relative'>
            <p className='font-medium text-sm text-richblack-5'>New Password</p>
            <input
              type={showNewPassword ? "text" : "password"}
              name='newPassword'
              {...register("newPassword", { required: true })}
              placeholder='Enter New Password'
              className='p-3 rounded-lg bg-richblack-700 CTAblackbutton font-medium text-base text-richblack-5'
            />
            {errors.newPassword && (
              <div className='text-xs text-yellow-100'>Please enter your New Password.</div>
            )}
            <div
              onClick={() => setShowNewPassword((prev) => !prev)}
              className='absolute right-3 top-10 cursor-pointer'>
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </div>
          </label>
        </div>
      </div>

      <div className='flex flex-row-reverse mt-10 gap-2'>
        <IconBtn type="submit">Update</IconBtn>
        <CancelBtn />
      </div>
    </form>
  );
};

export default UpdatePassword;
