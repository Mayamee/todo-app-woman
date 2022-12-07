export const HEADER_HEIGHT = 80
export const TOOLBAR_MENU_ITEM_ICON_SIZE = '25px'
export const AUTH = {
  text: {
    title: {
      login: 'Login',
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
    },
    password: {
      required: {
        message: 'Password is required',
      },
      pattern: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})$/,
        message:
          'Password must contain at least 8 characters, including uppercase, lowercase letters, numbers and special characters',
      },
    },
  },
}
