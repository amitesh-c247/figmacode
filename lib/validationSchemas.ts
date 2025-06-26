import * as yup from 'yup';

// Login form validation schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  rememberMe: yup.boolean().default(false),
});

// Company form validation schema
export const companySchema = yup.object({
  name: yup
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must not exceed 100 characters')
    .required('Company name is required'),
  industry: yup
    .string()
    .min(2, 'Industry must be at least 2 characters')
    .max(50, 'Industry must not exceed 50 characters')
    .optional(),
  description: yup
    .string()
    .max(300, 'Description must not exceed 300 words')
    .optional(),
  status: yup
    .string()
    .oneOf(['active', 'inactive', 'pending'], 'Please select a valid status')
    .required('Status is required'),
  logo: yup
    .mixed()
    .test('fileType', 'Only JPEG, PNG, GIF, JPG files are allowed', (value) => {
      if (!value) return true; // Optional file
      if (value instanceof File) {
        return ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].includes(value.type);
      }
      return true;
    })
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return true; // Optional file
      if (value instanceof File) {
        return value.size <= 5 * 1024 * 1024; // 5MB
      }
      return true;
    })
    .optional(),
});

// Profile settings validation schema
export const profileSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .optional(),
  bio: yup
    .string()
    .max(500, 'Bio must not exceed 500 characters')
    .optional(),
});

// Password change validation schema
export const passwordChangeSchema = yup.object({
  currentPassword: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Current password is required'),
  newPassword: yup
    .string()
    .min(8, 'New password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
});

// User form validation schema
export const userSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  role: yup
    .string()
    .oneOf(['admin', 'manager', 'user'], 'Please select a valid role')
    .required('Role is required'),
  status: yup
    .string()
    .oneOf(['active', 'inactive', 'pending'], 'Please select a valid status')
    .required('Status is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
});

// Notification settings validation schema
export const notificationSchema = yup.object({
  emailNotifications: yup.boolean().default(true),
  pushNotifications: yup.boolean().default(false),
  weeklyReports: yup.boolean().default(true),
  marketingEmails: yup.boolean().default(false),
});

// Type exports for TypeScript
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type CompanyFormData = yup.InferType<typeof companySchema>;
export type ProfileFormData = yup.InferType<typeof profileSchema>;
export type PasswordChangeFormData = yup.InferType<typeof passwordChangeSchema>;
export type UserFormData = yup.InferType<typeof userSchema>;
export type NotificationFormData = yup.InferType<typeof notificationSchema>;