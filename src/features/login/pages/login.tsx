import { useState } from 'react';
import { toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";

import Input from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import { useSignupRoles } from '@/hooks/use-signup-role';

// import useAuthStore from "@/store/auth-store";
import loginVideo from '@/assets/login.mp4';

import { useLoginEmail } from '@/hooks/use-login-email';
import { useLoginFide } from '@/hooks/use-login-fide';
import { useSendOtp, useVerifyOtp } from '@/hooks/use-login-mobile';
import { useRegister } from '@/hooks/use-register';
import { useStates, useDistricts, useTaluks } from '@/hooks/uselocation';

const fieldClass =
  'w-full h-10 rounded-md bg-black/40 border border-white/20 px-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500';

const selectContentClass =
  'bg-gray-900 border-gray-700 text-white max-h-[200px]';
// Explicitly setting text-white to ensure visibility against dark background
const selectItemClass =
  'text-white focus:bg-green-600 focus:text-white cursor-pointer hover:bg-white/10';

interface FormInputProps extends React.ComponentProps<'input'> {
  label: string;
  error?: string;
  optional?: boolean;
}

const FormInput = ({ label, error, className, ...props }: FormInputProps) => (
  <div className="space-y-1.5">
    <Label className="text-white">{label}</Label>
    <Input
      className={`bg-black/40 border-white/20 text-white placeholder:text-gray-400 focus:bg-black/60 transition-colors ${className}`}
      {...props}
    />
    {error && <span className="text-xs text-red-400 font-medium">{error}</span>}
  </div>
);

export default function LoginPage() {
  // const navigate = useNavigate();
  // const { isAuthenticated } = useAuthStore();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile' | 'fide'>(
    'email'
  );

  // Global form state
  const [form, setForm] = useState<Record<string, string>>({});
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  // Location State
  const [stateId, setStateId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [talukId, setTalukId] = useState('');

  const update = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /* ---------------- HOOKS ---------------- */
  const loginEmailMutation = useLoginEmail();
  const loginFideMutation = useLoginFide();
  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();
  const registerMutation = useRegister();
  const { roles, isLoading } = useSignupRoles();

  // Location Hooks
  const { data: states = [] } = useStates();
  const { data: districts = [] } = useDistricts(stateId);
  const { data: taluks = [] } = useTaluks(districtId);

  const isPending =
    loginEmailMutation.isPending ||
    loginFideMutation.isPending ||
    sendOtpMutation.isPending ||
    verifyOtpMutation.isPending ||
    registerMutation.isPending;

  /* ---------------- EVENT HANDLERS ---------------- */
  const onStateChange = (value: string) => {
    setStateId(value);
    setDistrictId('');
    setTalukId('');
    update('stateId', value);
  };

  const onDistrictChange = (value: string) => {
    setDistrictId(value);
    setTalukId('');
    update('districtId', value);
  };

  const onTalukChange = (value: string) => {
    setTalukId(value);
    update('talukId', value);
  };

  /* ---------------- LOGIN VALIDATION ---------------- */
  const validateLogin = () => {
    const e: Record<string, string> = {};

    if (loginMethod === 'email') {
      if (!/^\S+@\S+\.\S+$/.test(form.email || ''))
        e.email = 'Valid email required';
      if (!form.password) e.password = 'Password required';

      setValidationErrors(e);
      if (Object.keys(e).length === 0) {
        loginEmailMutation.mutate(
          { email: form.email, password: form.password },
          {
            onError: (err: any) =>
              toast.error(err.response?.data?.message || err.message),
          }
        );
      }
    }

    if (loginMethod === 'mobile') {
      if (!/^[6-9][0-9]{9}$/.test(form.mobile || '')) {
        e.mobile = 'Valid mobile required';
        setValidationErrors(e);
        return;
      }

      // If OTP is not sent yet, send OTP
      if (!sendOtpMutation.isSuccess) {
        sendOtpMutation.mutate(
          { mobile: form.mobile },
          {
            onSuccess: () => toast.success('OTP Sent!'),
            onError: (err: any) =>
              toast.error(err.response?.data?.message || err.message),
          }
        );
      } else {
        // Verify OTP
        if (!/^[0-9]{4,6}$/.test(form.otp || '')) e.otp = 'Valid OTP required';

        setValidationErrors(e);
        if (Object.keys(e).length === 0) {
          verifyOtpMutation.mutate(
            { mobile: form.mobile, otp: form.otp },
            {
              onError: (err: any) =>
                toast.error(err.response?.data?.message || err.message),
            }
          );
        }
      }
    }

    if (loginMethod === 'fide') {
      if (!/^[0-9]{6,8}$/.test(form.fideId || ''))
        e.fideId = 'Valid FIDE ID required';
      if (!form.password) e.password = 'Password required';

      setValidationErrors(e);
      if (Object.keys(e).length === 0) {
        loginFideMutation.mutate(
          { fideId: form.fideId, password: form.password },
          {
            onError: (err: any) =>
              toast.error(err.response?.data?.message || err.message),
          }
        );
      }
    }
  };

  /* ---------------- SIGNUP VALIDATION ---------------- */
  const validateSignup = () => {
    const e: Record<string, string> = {};

    // Personal
    if (!form.firstName) e.firstName = 'First name required';
    if (!form.lastName) e.lastName = 'Last name required';
    if (!form.gender) e.gender = 'Gender required';
    if (!form.dob) e.dob = 'Date of Birth required';

    // Contact
    if (!/^[6-9][0-9]{9}$/.test(form.mobile || ''))
      e.mobile = 'Valid mobile required';
    if (!/^\S+@\S+\.\S+$/.test(form.email || ''))
      e.email = 'Valid email required';
    if (form.altMobile && !/^[6-9][0-9]{9}$/.test(form.altMobile))
      e.altMobile = 'Valid alt mobile required';

    // Security
    if (!form.password) e.password = 'Password required';
    if (form.password !== form.confirmPassword)
      e.confirmPassword = 'Passwords do not match';
    if (!form.role_id) e.role_id = 'Role required';

    // Location
    if (!stateId) e.state = 'State required';
    if (!districtId) e.district = 'District required';
    if (!talukId) e.taluk = 'Taluk required';

    setValidationErrors(e);

    if (Object.keys(e).length > 0) {
      toast.error(`Missing fields: ${Object.keys(e).join(', ')}`);
    }

    if (Object.keys(e).length === 0) {
      const payload = {
        firstname: form.firstName,
        lastname: form.lastName,
        email: form.email,
        mobile: form.mobile,
        ...(form.altMobile ? { alt_mobile: form.altMobile } : {}),
        password: form.password,
        gender: form.gender,
        dob: new Date(form.dob).toISOString(),
        role_id: form.role_id,

        state_id: stateId,
        district_id: districtId,
        taluk_id: talukId,

        ...(form.fideId ? { fide_id: form.fideId } : {}),
        ...(form.tnscaId ? { tnsca_id: form.tnscaId } : {}),
        ...(form.aicfId ? { aicf_id: form.aicfId } : {}),
      };

      registerMutation.mutate(payload, {
        onError: (err: any) =>
          toast.error(err.response?.data?.message || err.message),
      });
    }
  };

  return (
    <div className="relative min-h-screen text-white">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={loginVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div
          className={`w-full ${
            mode === 'signup' ? 'max-w-6xl' : 'max-w-md'
          } bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl`}
        >
          <h2 className="text-3xl font-bold text-center mb-6 tracking-tight">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>

          {/* LOGIN METHOD SWITCH */}
          {mode === 'login' && (
            <div className="flex bg-black/40 rounded-lg p-1 mb-6 border border-white/5">
              {(['email', 'mobile', 'fide'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setLoginMethod(m);
                    setValidationErrors({});
                    setForm({});
                    sendOtpMutation.reset();
                  }}
                  className={`flex-1 py-2 rounded-md transition-all font-medium text-sm ${
                    loginMethod === m
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          <div
            className={
              mode === 'signup'
                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {/* ---------------- SIGNUP FIELDS ---------------- */}
            {mode === 'signup' && (
              <>
                {/* 1. Identity & Role */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-400 border-b border-white/10 pb-2 flex items-center gap-2">
                    <span className="bg-green-400/20 p-1 rounded">👤</span>{' '}
                    Identity
                  </h3>

                  <FormInput
                    label="First Name *"
                    placeholder="First name"
                    error={validationErrors.firstName}
                    onChange={(e) => update('firstName', e.target.value)}
                  />
                  <FormInput
                    label="Last Name *"
                    placeholder="Last name"
                    error={validationErrors.lastName}
                    onChange={(e) => update('lastName', e.target.value)}
                  />

                  <div className="space-y-1.5">
                    <Label className="text-white">Date of Birth *</Label>
                    <Input
                      type="date"
                      className={fieldClass}
                      onChange={(e) => update('dob', e.target.value)}
                    />
                    {validationErrors.dob && (
                      <span className="text-xs text-red-400 font-medium">
                        {validationErrors.dob}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-white">Gender *</Label>
                    <Select onValueChange={(v) => update('gender', v)}>
                      <SelectTrigger className={fieldClass}>
                        <SelectValue
                          placeholder="Select Gender"
                          className="text-gray-400"
                        />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        <SelectItem className={selectItemClass} value="Male">
                          Male
                        </SelectItem>
                        <SelectItem className={selectItemClass} value="Female">
                          Female
                        </SelectItem>
                        <SelectItem className={selectItemClass} value="Other">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.gender && (
                      <span className="text-xs text-red-400 font-medium">
                        {validationErrors.gender}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-white">Role *</Label>

                    <Select
                      value={form.role_id || ''}
                      onValueChange={(v) => update('role_id', v)}
                    >
                      <SelectTrigger className={fieldClass}>
                        <SelectValue
                          placeholder={
                            isLoading ? 'Loading roles...' : 'Select role'
                          }
                          className="text-gray-400"
                        />
                      </SelectTrigger>

                      <SelectContent className={selectContentClass}>
                        {roles.map((role) => (
                          <SelectItem
                            key={role.role_id}
                            value={role.role_id}
                            className={selectItemClass}
                          >
                            {role.role_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {validationErrors.role_id && (
                      <span className="text-xs text-red-400">
                        {validationErrors.role_id}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Contact & Security */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-400 border-b border-white/10 pb-2 flex items-center gap-2">
                    <span className="bg-blue-400/20 p-1 rounded">📞</span>{' '}
                    Contact & Security
                  </h3>

                  <FormInput
                    label="Email *"
                    placeholder="Email address"
                    error={validationErrors.email}
                    onChange={(e) => update('email', e.target.value)}
                  />
                  <FormInput
                    label="Mobile *"
                    placeholder="Mobile number"
                    error={validationErrors.mobile}
                    onChange={(e) => update('mobile', e.target.value)}
                  />
                  <FormInput
                    label="Alt Mobile"
                    optional={true}
                    placeholder="Alternate number"
                    error={validationErrors.altMobile}
                    onChange={(e) => update('altMobile', e.target.value)}
                  />

                  <FormInput
                    type="password"
                    label="Password *"
                    placeholder="Enter password"
                    error={validationErrors.password}
                    onChange={(e) => update('password', e.target.value)}
                  />
                  <FormInput
                    type="password"
                    label="Confirm Password *"
                    placeholder="Confirm password"
                    error={validationErrors.confirmPassword}
                    onChange={(e) => update('confirmPassword', e.target.value)}
                  />
                </div>

                {/* 3. Location & Chess IDs */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-400 border-b border-white/10 pb-2 flex items-center gap-2">
                    <span className="bg-purple-400/20 p-1 rounded">📍</span>{' '}
                    Location / IDs
                  </h3>

                  {/* Location Dropdowns */}
                  <div className="space-y-1.5">
                    <Label className="text-white">State *</Label>
                    <Select onValueChange={onStateChange} value={stateId}>
                      <SelectTrigger className={fieldClass}>
                        <SelectValue
                          placeholder="Select State"
                          className="text-gray-400"
                        />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        {(Array.isArray(states) ? states : []).map((s: any) => (
                          <SelectItem
                            className={selectItemClass}
                            key={s.state_id}
                            value={s.state_id}
                          >
                            {s.state_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.state && (
                      <span className="text-xs text-red-400 font-medium">
                        {validationErrors.state}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-white">District *</Label>
                    <Select
                      onValueChange={onDistrictChange}
                      value={districtId}
                      disabled={!stateId}
                    >
                      <SelectTrigger className={fieldClass}>
                        <SelectValue
                          placeholder="Select District"
                          className="text-gray-400"
                        />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        {(Array.isArray(districts) ? districts : []).map(
                          (d: any) => (
                            <SelectItem
                              className={selectItemClass}
                              key={d.district_id}
                              value={d.district_id}
                            >
                              {d.district_name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    {validationErrors.district && (
                      <span className="text-xs text-red-400 font-medium">
                        {validationErrors.district}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-white">Taluk *</Label>
                    <Select
                      onValueChange={onTalukChange}
                      value={talukId}
                      disabled={!districtId}
                    >
                      <SelectTrigger className={fieldClass}>
                        <SelectValue
                          placeholder="Select Taluk"
                          className="text-gray-400"
                        />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        {(Array.isArray(taluks) ? taluks : []).map((t: any) => (
                          <SelectItem
                            className={selectItemClass}
                            key={t.taluk_id}
                            value={t.taluk_id}
                          >
                            {t.taluk_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.taluk && (
                      <span className="text-xs text-red-400 font-medium">
                        {validationErrors.taluk}
                      </span>
                    )}
                  </div>

                  {/* IDs */}
                  <FormInput
                    label="FIDE ID (optional)"
                    placeholder="Enter FIDE ID"
                    onChange={(e) => update('fideId', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <FormInput
                      label="TNSCA ID (optional)"
                      placeholder="Enter TNSCA ID"
                      onChange={(e) => update('tnscaId', e.target.value)}
                    />
                    <FormInput
                      label="AICF ID (optional)"
                      placeholder="Enter AICF ID"
                      onChange={(e) => update('aicfId', e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {/* ---------------- LOGIN FIELDS ---------------- */}
            {mode === 'login' && loginMethod === 'email' && (
              <>
                <FormInput
                  label="Email *"
                  placeholder="Enter email"
                  error={validationErrors.email}
                  onChange={(e) => update('email', e.target.value)}
                />
                <FormInput
                  type="password"
                  label="Password *"
                  placeholder="Enter password"
                  error={validationErrors.password}
                  onChange={(e) => update('password', e.target.value)}
                />
              </>
            )}

            {mode === 'login' && loginMethod === 'mobile' && (
              <>
                <FormInput
                  label="Mobile *"
                  placeholder="Enter mobile number"
                  error={validationErrors.mobile}
                  onChange={(e) => update('mobile', e.target.value)}
                />
                {sendOtpMutation.isSuccess && (
                  <FormInput
                    label="OTP *"
                    placeholder="Enter OTP"
                    error={validationErrors.otp}
                    onChange={(e) => update('otp', e.target.value)}
                  />
                )}
              </>
            )}

            {mode === 'login' && loginMethod === 'fide' && (
              <>
                <FormInput
                  label="FIDE ID *"
                  placeholder="Enter FIDE ID"
                  error={validationErrors.fideId}
                  onChange={(e) => update('fideId', e.target.value)}
                />
                <FormInput
                  type="password"
                  label="Password *"
                  placeholder="Enter password"
                  error={validationErrors.password}
                  onChange={(e) => update('password', e.target.value)}
                />
              </>
            )}

            {/* SUBMIT */}
            <button
              onClick={mode === 'login' ? validateLogin : validateSignup}
              disabled={isPending}
              className="col-span-full w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold disabled:opacity-60 transition-all mt-6 shadow-lg shadow-green-900/20"
            >
              {isPending
                ? 'Please wait...'
                : mode === 'login'
                  ? loginMethod === 'mobile' && !sendOtpMutation.isSuccess
                    ? 'Send OTP'
                    : 'Login'
                  : 'Sign Up'}
            </button>
          </div>

          <p className="text-center text-sm mt-6 text-gray-300">
            {mode === 'login' ? (
              <>
                Don’t have an account?{' '}
                <button
                  type="button"
                  className="text-green-400 cursor-pointer hover:underline font-medium bg-transparent border-0 p-0"
                  onClick={() => {
                    setMode('signup');
                    setValidationErrors({});
                    setForm({});
                  }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  className="text-green-400 cursor-pointer hover:underline font-medium bg-transparent border-0 p-0"
                  onClick={() => {
                    setMode('login');
                    setValidationErrors({});
                    setForm({});
                  }}
                >
                  Login
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
