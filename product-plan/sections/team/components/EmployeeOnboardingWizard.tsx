import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Upload, X } from 'lucide-react'
import type { Employee, EmployeeFormData } from '../types'

interface EmployeeOnboardingWizardProps {
  departments: string[]
  designations: string[]
  employees: Employee[]
  onSubmit: (data: EmployeeFormData) => void
  onCancel: () => void
  initialData?: Employee
}

interface StepOneData {
  profilePicture: string | null
  firstName: string
  lastName: string
  mobile: string
  email: string
  gender: 'Male' | 'Female' | 'Other' | ''
  dateOfBirth: string
  department: string
  designation: string
  dateOfJoining: string
  primaryReportingManager: string
  secondaryReportingManager: string
}

interface StepTwoData {
  officialEmail: string
  password: string
  confirmPassword: string
}

export function EmployeeOnboardingWizard({
  departments,
  designations,
  employees,
  onSubmit,
  onCancel,
  initialData,
}: EmployeeOnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [stepOneData, setStepOneData] = useState<StepOneData>(
    initialData ? {
      profilePicture: initialData.profilePicture || null,
      firstName: initialData.firstName,
      lastName: initialData.lastName,
      mobile: initialData.mobile,
      email: initialData.email,
      gender: initialData.gender as 'Male' | 'Female' | 'Other',
      dateOfBirth: initialData.dateOfBirth,
      department: initialData.department,
      designation: initialData.designation,
      dateOfJoining: initialData.dateOfJoining,
      primaryReportingManager: initialData.primaryReportingManager,
      secondaryReportingManager: initialData.secondaryReportingManager || '',
    } : {
      profilePicture: null,
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      gender: '',
      dateOfBirth: '',
      department: '',
      designation: '',
      dateOfJoining: '',
      primaryReportingManager: '',
      secondaryReportingManager: '',
    }
  )
  const [stepTwoData, setStepTwoData] = useState<StepTwoData>({
    officialEmail: initialData?.email || '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const activeManagers = employees.filter(emp => emp.status === 'active')

  const validateStepOne = () => {
    const newErrors: Record<string, string> = {}
    if (!stepOneData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!stepOneData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!stepOneData.mobile.trim()) newErrors.mobile = 'Mobile number is required'
    if (!stepOneData.email.trim()) newErrors.email = 'Email is required'
    if (!stepOneData.gender) newErrors.gender = 'Gender is required'
    if (!stepOneData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
    if (!stepOneData.department) newErrors.department = 'Department is required'
    if (!stepOneData.designation) newErrors.designation = 'Designation is required'
    if (!stepOneData.dateOfJoining) newErrors.dateOfJoining = 'Date of joining is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStepTwo = () => {
    const newErrors: Record<string, string> = {}
    if (!stepTwoData.officialEmail.trim()) newErrors.officialEmail = 'Official email is required'
    if (!stepTwoData.password.trim()) newErrors.password = 'Password is required'
    if (stepTwoData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    if (stepTwoData.password !== stepTwoData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 1 && validateStepOne()) {
      setCurrentStep(2)
    }
  }

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
    }
  }

  const handleSubmit = () => {
    if (validateStepTwo()) {
      onSubmit({
        profilePicture: stepOneData.profilePicture,
        firstName: stepOneData.firstName,
        lastName: stepOneData.lastName,
        mobile: stepOneData.mobile,
        email: stepOneData.email,
        gender: stepOneData.gender as 'Male' | 'Female' | 'Other',
        dateOfBirth: stepOneData.dateOfBirth,
        department: stepOneData.department,
        designation: stepOneData.designation,
        dateOfJoining: stepOneData.dateOfJoining,
        primaryReportingManager: stepOneData.primaryReportingManager || null,
        secondaryReportingManager: stepOneData.secondaryReportingManager || null,
        officialEmail: stepTwoData.officialEmail,
        password: stepTwoData.password,
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onCancel}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  Add New Employee
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Step {currentStep} of 2
                </p>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="hidden sm:flex items-center gap-3">
              <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-cyan-600' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep > 1 ? 'bg-cyan-600 text-white' : currentStep === 1 ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600' : 'bg-slate-200 dark:bg-slate-700'
                }`}>
                  {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
                </div>
                <span className="text-sm font-medium">Profile</span>
              </div>
              <div className={`w-12 h-0.5 ${currentStep > 1 ? 'bg-cyan-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
              <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-cyan-600' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === 2 ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium">Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 1 ? (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 lg:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              Profile Information
            </h2>

            <div className="space-y-6">
              {/* Profile Photo */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {stepOneData.profilePicture ? (
                      <img src={stepOneData.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <Upload className="w-8 h-8 text-slate-400" />
                    )}
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors">
                    Upload Photo
                  </button>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={stepOneData.firstName}
                    onChange={(e) => setStepOneData({ ...stepOneData, firstName: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={stepOneData.lastName}
                    onChange={(e) => setStepOneData({ ...stepOneData, lastName: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={stepOneData.mobile}
                    onChange={(e) => setStepOneData({ ...stepOneData, mobile: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.mobile ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                    placeholder="+919876543210"
                  />
                  {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    value={stepOneData.email}
                    onChange={(e) => setStepOneData({ ...stepOneData, email: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Gender *
                  </label>
                  <select
                    value={stepOneData.gender}
                    onChange={(e) => setStepOneData({ ...stepOneData, gender: e.target.value as any })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.gender ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={stepOneData.dateOfBirth}
                    onChange={(e) => setStepOneData({ ...stepOneData, dateOfBirth: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.dateOfBirth ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>
              </div>

              {/* Work Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Department *
                  </label>
                  <select
                    value={stepOneData.department}
                    onChange={(e) => setStepOneData({ ...stepOneData, department: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.department ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                  >
                    <option value="">Select department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Designation *
                  </label>
                  <select
                    value={stepOneData.designation}
                    onChange={(e) => setStepOneData({ ...stepOneData, designation: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.designation ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                  >
                    <option value="">Select designation</option>
                    {designations.map(des => (
                      <option key={des} value={des}>{des}</option>
                    ))}
                  </select>
                  {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
                </div>
              </div>

              {/* Date of Joining */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Date of Joining *
                </label>
                <input
                  type="date"
                  value={stepOneData.dateOfJoining}
                  onChange={(e) => setStepOneData({ ...stepOneData, dateOfJoining: e.target.value })}
                  className={`w-full sm:w-1/2 px-4 py-2.5 rounded-lg border ${errors.dateOfJoining ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                />
                {errors.dateOfJoining && <p className="text-red-500 text-sm mt-1">{errors.dateOfJoining}</p>}
              </div>

              {/* Reporting Managers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Primary Reporting Manager
                  </label>
                  <select
                    value={stepOneData.primaryReportingManager}
                    onChange={(e) => setStepOneData({ ...stepOneData, primaryReportingManager: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500"
                  >
                    <option value="">Select manager</option>
                    {activeManagers.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.fullName} - {emp.designation}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Secondary Reporting Manager
                  </label>
                  <select
                    value={stepOneData.secondaryReportingManager}
                    onChange={(e) => setStepOneData({ ...stepOneData, secondaryReportingManager: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500"
                  >
                    <option value="">Select manager (optional)</option>
                    {activeManagers.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.fullName} - {emp.designation}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 lg:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              System Access
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Set up login credentials for {stepOneData.firstName} {stepOneData.lastName}
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Official Email *
                </label>
                <input
                  type="email"
                  value={stepTwoData.officialEmail}
                  onChange={(e) => setStepTwoData({ ...stepTwoData, officialEmail: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-lg border ${errors.officialEmail ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                  placeholder="employee@company.com"
                />
                {errors.officialEmail && <p className="text-red-500 text-sm mt-1">{errors.officialEmail}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  value={stepTwoData.password}
                  onChange={(e) => setStepTwoData({ ...stepTwoData, password: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-lg border ${errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                  placeholder="Minimum 8 characters"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  value={stepTwoData.confirmPassword}
                  onChange={(e) => setStepTwoData({ ...stepTwoData, confirmPassword: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                  placeholder="Re-enter password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password Requirements:</p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Minimum 8 characters</li>
                  <li>• At least one uppercase letter</li>
                  <li>• At least one number</li>
                  <li>• At least one special character</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={currentStep === 1 ? onCancel : handleBack}
            className="flex items-center gap-2 px-4 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 1 ? 'Cancel' : 'Back'}</span>
          </button>

          {currentStep === 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Create Employee</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
