import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Upload, X, Shield } from 'lucide-react'
import type { Employee, EmployeeFormData, Permissions } from '@/../product/sections/team/types'

interface EmployeeOnboardingWizardProps {
  departments: string[]
  designations: string[]
  employees: Employee[]
  modules: string[]
  flows: { [module: string]: string[] }
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
  company: string
  primaryReportingManager: string
  secondaryReportingManager: string
}

interface AddressFields {
  country: string
  state: string
  city: string
  area: string
  address: string
  pincode: string
}

interface StepAddressData {
  currentAddress: AddressFields
  permanentAddress: AddressFields
  sameAsCurrent: boolean
}

interface StepCredentialsData {
  officialEmail: string
  password: string
  confirmPassword: string
}

export function EmployeeOnboardingWizard({
  departments,
  designations,
  employees,
  modules,
  flows,
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
      company: 'Lawyered',
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
      company: 'Lawyered',
      primaryReportingManager: '',
      secondaryReportingManager: '',
    }
  )
  const emptyAddress: AddressFields = { country: 'India', state: '', city: '', area: '', address: '', pincode: '' }
  const [stepAddressData, setStepAddressData] = useState<StepAddressData>({
    currentAddress: { ...emptyAddress },
    permanentAddress: { ...emptyAddress },
    sameAsCurrent: true,
  })
  const [stepCredentialsData, setStepCredentialsData] = useState<StepCredentialsData>({
    officialEmail: initialData?.email || '',
    password: '',
    confirmPassword: '',
  })
  const [stepPermissionsData, setStepPermissionsData] = useState<Permissions>(initialData ? {
    moduleAccess: [...initialData.permissions.moduleAccess],
    flowAccess: { ...initialData.permissions.flowAccess },
  } : {
    moduleAccess: [],
    flowAccess: {},
  })
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
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

  const validateStepAddress = () => {
    const newErrors: Record<string, string> = {}
    if (!stepAddressData.currentAddress.country) newErrors['current.country'] = 'Country is required'
    if (!stepAddressData.currentAddress.state) newErrors['current.state'] = 'State is required'
    if (!stepAddressData.currentAddress.city) newErrors['current.city'] = 'City is required'
    if (!stepAddressData.currentAddress.address.trim()) newErrors['current.address'] = 'Address is required'
    if (!stepAddressData.currentAddress.pincode.trim()) newErrors['current.pincode'] = 'Pin code is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStepCredentials = () => {
    const newErrors: Record<string, string> = {}
    if (!stepCredentialsData.officialEmail.trim()) newErrors.officialEmail = 'Official email is required'
    if (!stepCredentialsData.password.trim()) newErrors.password = 'Password is required'
    if (stepCredentialsData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    if (stepCredentialsData.password !== stepCredentialsData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 1 && validateStepOne()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && validateStepAddress()) {
      setCurrentStep(3)
    } else if (currentStep === 3 && validateStepCredentials()) {
      setCurrentStep(4)
    }
  }

  const updateCurrentAddress = (field: keyof AddressFields, value: string) => {
    const updated = { ...stepAddressData, currentAddress: { ...stepAddressData.currentAddress, [field]: value } }
    if (stepAddressData.sameAsCurrent) {
      updated.permanentAddress = { ...updated.currentAddress }
    }
    setStepAddressData(updated)
  }

  const toggleSameAsCurrent = () => {
    const newSame = !stepAddressData.sameAsCurrent
    setStepAddressData({
      ...stepAddressData,
      sameAsCurrent: newSame,
      permanentAddress: newSame ? { ...stepAddressData.currentAddress } : { ...emptyAddress },
    })
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleModuleAccess = (module: string) => {
    const hasAccess = stepPermissionsData.moduleAccess.includes(module)
    if (hasAccess) {
      setStepPermissionsData({
        moduleAccess: stepPermissionsData.moduleAccess.filter(m => m !== module),
        flowAccess: { ...stepPermissionsData.flowAccess, [module]: [] },
      })
    } else {
      setStepPermissionsData({
        moduleAccess: [...stepPermissionsData.moduleAccess, module],
        flowAccess: { ...stepPermissionsData.flowAccess, [module]: [] },
      })
    }
  }

  const toggleFlowAccess = (module: string, flow: string) => {
    const currentFlows = stepPermissionsData.flowAccess[module] || []
    const hasFlow = currentFlows.includes(flow)
    setStepPermissionsData({
      ...stepPermissionsData,
      flowAccess: {
        ...stepPermissionsData.flowAccess,
        [module]: hasFlow ? currentFlows.filter(f => f !== flow) : [...currentFlows, flow],
      },
    })
  }

  const selectAllFlows = (module: string) => {
    setStepPermissionsData({
      ...stepPermissionsData,
      flowAccess: { ...stepPermissionsData.flowAccess, [module]: [...(flows[module] || [])] },
    })
  }

  const deselectAllFlows = (module: string) => {
    setStepPermissionsData({
      ...stepPermissionsData,
      flowAccess: { ...stepPermissionsData.flowAccess, [module]: [] },
    })
  }

  const formatFlowName = (flow: string) => {
    return flow.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const handleSubmit = () => {
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
      officialEmail: stepCredentialsData.officialEmail,
      password: stepCredentialsData.password,
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
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
                  Step {currentStep} of 4
                </p>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="hidden sm:flex items-center gap-2 ml-12">
              {[
                { num: 1, label: 'Profile' },
                { num: 2, label: 'Address' },
                { num: 3, label: 'Credentials' },
                { num: 4, label: 'Permissions' },
              ].map((step, idx) => (
                <div key={step.num} className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 ${currentStep >= step.num ? 'text-cyan-600' : 'text-slate-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep > step.num ? 'bg-cyan-600 text-white' : currentStep === step.num ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                    }`}>
                      {currentStep > step.num ? <Check className="w-4 h-4" /> : step.num}
                    </div>
                    <span className="text-sm font-medium">{step.label}</span>
                  </div>
                  {idx < 3 && (
                    <div className={`w-8 h-0.5 ${currentStep > step.num ? 'bg-cyan-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {currentStep === 1 && (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 lg:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              Profile Information
            </h2>

            <div className="space-y-6">
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
                    Company *
                  </label>
                  <input
                    type="text"
                    value={stepOneData.company}
                    onChange={(e) => setStepOneData({ ...stepOneData, company: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.company ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                    placeholder="Enter company name"
                  />
                  {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                </div>
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
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Date of Joining *
                  </label>
                  <input
                    type="date"
                    value={stepOneData.dateOfJoining}
                    onChange={(e) => setStepOneData({ ...stepOneData, dateOfJoining: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.dateOfJoining ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                  />
                  {errors.dateOfJoining && <p className="text-red-500 text-sm mt-1">{errors.dateOfJoining}</p>}
                </div>
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
        )}

        {currentStep === 2 && (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 lg:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              Current Address
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Country *</label>
                  <select
                    value={stepAddressData.currentAddress.country}
                    onChange={(e) => updateCurrentAddress('country', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors['current.country'] ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                  >
                    <option value="">Select country</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                  {errors['current.country'] && <p className="text-red-500 text-sm mt-1">{errors['current.country']}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">State *</label>
                  <select
                    value={stepAddressData.currentAddress.state}
                    onChange={(e) => updateCurrentAddress('state', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors['current.state'] ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                  >
                    <option value="">Select state</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                  {errors['current.state'] && <p className="text-red-500 text-sm mt-1">{errors['current.state']}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">City *</label>
                  <select
                    value={stepAddressData.currentAddress.city}
                    onChange={(e) => updateCurrentAddress('city', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg border ${errors['current.city'] ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                  >
                    <option value="">Select city</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Kolkata">Kolkata</option>
                  </select>
                  {errors['current.city'] && <p className="text-red-500 text-sm mt-1">{errors['current.city']}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Area</label>
                <input
                  type="text"
                  value={stepAddressData.currentAddress.area}
                  onChange={(e) => updateCurrentAddress('area', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500"
                  placeholder="e.g. Andheri West"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Address *</label>
                <textarea
                  value={stepAddressData.currentAddress.address}
                  onChange={(e) => updateCurrentAddress('address', e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-2.5 rounded-lg border ${errors['current.address'] ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500 resize-none`}
                  placeholder="Full address"
                />
                {errors['current.address'] && <p className="text-red-500 text-sm mt-1">{errors['current.address']}</p>}
              </div>

              <div className="sm:w-1/3">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Pin Code *</label>
                <input
                  type="text"
                  value={stepAddressData.currentAddress.pincode}
                  onChange={(e) => updateCurrentAddress('pincode', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-lg border ${errors['current.pincode'] ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500`}
                  placeholder="400001"
                />
                {errors['current.pincode'] && <p className="text-red-500 text-sm mt-1">{errors['current.pincode']}</p>}
              </div>
            </div>

            {/* Same as Permanent Address */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={stepAddressData.sameAsCurrent}
                  onChange={toggleSameAsCurrent}
                  className="w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Same as permanent address</span>
              </label>
            </div>

            {/* Permanent Address - only shown when NOT same as current */}
            {!stepAddressData.sameAsCurrent && (
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                  Permanent Address
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Country</label>
                      <select
                        value={stepAddressData.permanentAddress.country}
                        onChange={(e) => setStepAddressData({ ...stepAddressData, permanentAddress: { ...stepAddressData.permanentAddress, country: e.target.value } })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500"
                      >
                        <option value="">Select country</option>
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">State</label>
                      <select
                        value={stepAddressData.permanentAddress.state}
                        onChange={(e) => setStepAddressData({ ...stepAddressData, permanentAddress: { ...stepAddressData.permanentAddress, state: e.target.value } })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500"
                      >
                        <option value="">Select state</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">City</label>
                      <select
                        value={stepAddressData.permanentAddress.city}
                        onChange={(e) => setStepAddressData({ ...stepAddressData, permanentAddress: { ...stepAddressData.permanentAddress, city: e.target.value } })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500"
                      >
                        <option value="">Select city</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Pune">Pune</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Kolkata">Kolkata</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Area</label>
                    <input
                      type="text"
                      value={stepAddressData.permanentAddress.area}
                      onChange={(e) => setStepAddressData({ ...stepAddressData, permanentAddress: { ...stepAddressData.permanentAddress, area: e.target.value } })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500"
                      placeholder="e.g. Andheri West"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Address</label>
                    <textarea
                      value={stepAddressData.permanentAddress.address}
                      onChange={(e) => setStepAddressData({ ...stepAddressData, permanentAddress: { ...stepAddressData.permanentAddress, address: e.target.value } })}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500 resize-none"
                      placeholder="Full address"
                    />
                  </div>

                  <div className="sm:w-1/3">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Pin Code</label>
                    <input
                      type="text"
                      value={stepAddressData.permanentAddress.pincode}
                      onChange={(e) => setStepAddressData({ ...stepAddressData, permanentAddress: { ...stepAddressData.permanentAddress, pincode: e.target.value } })}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-50 focus:border-cyan-600 dark:focus:border-cyan-500"
                      placeholder="400001"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 lg:p-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Create Credentials
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
                  value={stepCredentialsData.officialEmail}
                  onChange={(e) => setStepCredentialsData({ ...stepCredentialsData, officialEmail: e.target.value })}
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
                  value={stepCredentialsData.password}
                  onChange={(e) => setStepCredentialsData({ ...stepCredentialsData, password: e.target.value })}
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
                  value={stepCredentialsData.confirmPassword}
                  onChange={(e) => setStepCredentialsData({ ...stepCredentialsData, confirmPassword: e.target.value })}
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

        {currentStep === 4 && (
          <div className="space-y-6">
            {/* Module Access */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-cyan-600" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Module Access</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Select which sections {stepOneData.firstName} can view</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {modules.map(module => {
                    const hasAccess = stepPermissionsData.moduleAccess.includes(module)
                    return (
                      <button
                        key={module}
                        onClick={() => toggleModuleAccess(module)}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
                          hasAccess
                            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-sm font-medium">{module}</span>
                        {hasAccess && <Check className="w-4 h-4" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Flow Access */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-cyan-600" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Flow Access</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Select specific actions within each enabled module</p>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {stepPermissionsData.moduleAccess.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-slate-500 dark:text-slate-400">Enable at least one module above to configure flow access</p>
                  </div>
                ) : (
                  stepPermissionsData.moduleAccess.map(module => {
                    const moduleFlows = flows[module] || []
                    const enabledFlows = stepPermissionsData.flowAccess[module] || []
                    const isExpanded = expandedModule === module

                    return (
                      <div key={module} className="p-4">
                        <button
                          onClick={() => setExpandedModule(isExpanded ? null : module)}
                          className="w-full flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-slate-900 dark:text-white">{module}</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              {enabledFlows.length} of {moduleFlows.length} flows enabled
                            </span>
                          </div>
                          <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                        </button>

                        {isExpanded && moduleFlows.length > 0 && (
                          <div className="mt-4 ml-2">
                            <div className="flex items-center gap-4 mb-4">
                              <button onClick={() => selectAllFlows(module)} className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">Select All</button>
                              <button onClick={() => deselectAllFlows(module)} className="text-sm text-slate-600 hover:text-slate-700 dark:text-slate-400 font-medium">Deselect All</button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {moduleFlows.map(flow => {
                                const hasFlow = enabledFlows.includes(flow)
                                return (
                                  <button
                                    key={flow}
                                    onClick={() => toggleFlowAccess(module, flow)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
                                      hasFlow
                                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300'
                                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                                  >
                                    <div className={`w-4 h-4 rounded flex items-center justify-center ${
                                      hasFlow ? 'bg-cyan-600 text-white' : 'border border-slate-300 dark:border-slate-600'
                                    }`}>
                                      {hasFlow && <Check className="w-3 h-3" />}
                                    </div>
                                    <span>{formatFlowName(flow)}</span>
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })
                )}
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

          {currentStep < 4 ? (
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
