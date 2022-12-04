import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './AuthPopup.module.scss'
import { ReactComponent as BgImage } from '../../assets/images/bg-auth.svg'
import { ReactComponent as AlertIcon } from '../../assets/images/alert.svg'
import { AUTH } from '../../constants/Static'
import TooltipButton from '../shared/UI/TooltipButton/TooltipButton'
type Profile = {
  login: string
  password: string
}

export const AuthPopup: FC<unknown> = () => {
  const [isLogin, setIsLogin] = useState(true)
  const authTextKey = isLogin ? 'login' : 'register'
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Profile>({
    defaultValues: {
      login: '',
      password: '',
    },
  })
  const onSubmit = handleSubmit((data) => {
    console.log({
      login: data.login,
      password: data.password,
    })
    reset()
  })
  return (
    <div className={styles['popup-wrapper']}>
      <div className={styles['popup-bg-frame']}>
        <BgImage />
      </div>
      <div className={styles['popup']}>
        <div className={styles['popup-body']}>
          <div className={styles['popup-title']}>{AUTH.text.title[authTextKey]}</div>
          <div className={styles['popup-subtitle']}>{AUTH.text.subtitle[authTextKey]}</div>
          <form className={styles['popup-form']} onSubmit={onSubmit}>
            <div className={styles['popup-form-input-container']}>
              <div className={styles['popup-form-input']}>
                <input
                  type="text"
                  placeholder="Login"
                  {...register('login', {
                    required: AUTH.validation.login.required.message,
                  })}
                />
                {errors.login ? (
                  <TooltipButton
                    tooltipContent={errors.login?.message || 'Invalid login'}
                    icon={<AlertIcon />}
                    cursor="help"
                    place="top"
                    effect="solid"
                    getContent={(content) => <div className={styles['tooltip']}>{content}</div>}
                    size={20}
                  />
                ) : null}
              </div>
            </div>
            <div className={styles['popup-form-input-container']}>
              <div className={styles['popup-form-input']}>
                <input
                  type="password"
                  placeholder="Password"
                  {...register('password', {
                    required: AUTH.validation.password.required.message,
                    pattern: {
                      message: AUTH.validation.password.pattern.message,
                      value: AUTH.validation.password.pattern.regex,
                    },
                  })}
                />
                {errors.password ? (
                  <TooltipButton
                    tooltipContent={errors.password?.message || 'Invalid password'}
                    icon={<AlertIcon />}
                    cursor="help"
                    place="top"
                    effect="solid"
                    getContent={(content) => <div className={styles['tooltip']}>{content}</div>}
                    size={20}
                  />
                ) : null}
              </div>
            </div>
            <div className={styles['popup-form-change']}>
              <div className={styles['popup-form-change-text']}>
                {AUTH.text.form.changeBlock.text[authTextKey]}
              </div>
              <button
                type="button"
                className={styles['popup-form-change-button']}
                onClick={() => {
                  setIsLogin((p) => !p)
                  reset()
                }}
              >
                {AUTH.text.form.changeBlock.button[authTextKey]}
              </button>
            </div>
            <button type="submit" className={styles['popup-form-submit']}>
              {AUTH.text.form.submitButton[authTextKey]}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
