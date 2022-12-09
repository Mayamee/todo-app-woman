export const HEADER_HEIGHT = 80
export const TOOLBAR_MENU_ITEM_ICON_SIZE = '25px'
export const AUTH = {
  text: {
    title: {
      login: 'Sign in',
      register: 'Sign up',
    },
    subtitle: {
      login: 'Welcome back!',
      register: 'Create your account',
    },
    form: {
      changeBlock: {
        text: {
          login: 'Don’t have an account?',
          register: 'Already have an account?',
        },
        button: {
          login: 'Sign up',
          register: 'Sign in',
        },
      },
      submitButton: {
        login: 'Login',
        register: 'Register',
      },
    },
  },
  validation: {
    login: {
      required: {
        message: 'Login is required',
      },
      minLength: {
        value: 3,
        message: 'Login must be at least 3 characters',
      },
      maxLength: {
        value: 16,
        message: 'Login must be at most 16 characters',
      },
      pattern: {
        regex: /^[a-zA-Z][a-zA-Z0-9]*$/,
        message: 'Login must start with a letter and contain only latin letters and numbers',
      },
    },
    password: {
      required: {
        message: 'Password is required',
      },
      pattern: {
        regex: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
        message:
          'Password must contain at least 8 characters, including uppercase, lowercase letters, numbers and special characters',
      },
    },
  },
}
