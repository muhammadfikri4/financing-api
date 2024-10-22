export const MESSAGES = {
  CREATED: {
    USER: {
      ACCOUNT: "User created successfully",
      INITIAL: "Initial user created successfully",
    },
    ROLE: "Role created successfully",
    DEPARTMENT: "Department created successfully",
  },
  ERROR: {
    NOT_FOUND: {
      USER: {
        ACCOUNT: "User not found",
        FCM: "FCM Token not found",
        FCM_USER: "FCM User not found",
      },
      ANGKATAN: {
        ID: "Angkatan ID not found",
        NAME: "Angkatan not found",
      },
      ROLE: "Role not found",
      DEPARTMENT: "Department not found",
      ROUTE: "Route not found, check again your endpoint",
    },
    ALREADY: {
      GLOBAL: {
        EMAIL: "Email is already exist",
        NIDN: "NIDN is already exist",
        NIM: "NIM is already exist",
      },
      USER: "User already exist",
      ROLE: "Role is already exist",
      DEPARTMENT: "Department is already exist",
    },
    INVALID: {
      GLOBAL: {
        EMAIL: "Email is invalid",
      },
      USER: {
        PASSWORD: "Password is wrong",
        PASSWORD_LENGTH: "Password must be at least 8 characters",
      },
      ID: "ID is invalid",
      ROLE_ADMIN: "Admin can't register in this app",
      TOKEN: "Token is invalid",
      INITIAL: "Initial can only be run 1 time",
      CODE: "Code is invalid",
    },
    UNAUTHORIZED: {
      AUTH: "If you are not logged in, please log in first",
      FORBIDDEN: "You are not Authorized",
      EXPIRED: "Token Expired, please log in again",
      RECOGNIZED: "Token not recognized",
      ADMIN: "Admin can't access this app",
    },
    REQUIRED: {
      EMAIL: "Email is required",
      PASSWORD: "Password is required",
      NAME: "Name is required",
      CODE: "Code is required",
      DEPARTMENT: "Department is required",
    },
    FORBIDDEN: {
      ROLE: "Role can't be access this feature"
    },
    RELATION: {
      ANGKATAN: "Angkatan cannot be deleted because it has a relationship",
    },
    SERVER_ERROR: {
      INTERNAL_SERVER_ERROR: "Internal server error",
    },
  },
  SUCCESS: {
    USER: {
      GET: "Success to get user",
      UPDATE: "Success to update user",
      DELETE: "Success to delete user",
      LOGIN: "Success to login",
      LOGOUT: "Success to logout",
    },
    PROFILE: {
GET: "Success to get profile",
    },
    DEPARTMENT: {
      GET: "Success to get department",
      CREATE: "Success to create department",
      UPDATE: "Success to update department",
      DELETE: "Success to delete department",
    },
    AUTH: {
      SIGN_IN: "Success to sign in",
    }
  },
};
