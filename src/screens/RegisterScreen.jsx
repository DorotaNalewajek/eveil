import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignUp, useSignIn } from '@clerk/clerk-react'

const AUTH_ERRORS = {
  form_identifier_exists:    'This email is already registered. Sign in instead.',
  form_password_too_short:   'Password must be at least 8 characters.',
  form_password_pwned:       'This password is too common. Please choose a stronger one.',
  form_param_format_invalid: 'Please enter a valid email address.',
  form_code_incorrect:       'Incorrect code. Please try again.',
  verification_expired:      'Code expired. Request a new one below.',
  verification_failed:       'Verification failed. Please try again.',
}

export default function RegisterScreen() {
  const navigate                          = useNavigate()
  const { isLoaded, signUp, setActive }   = useSignUp()
  const { signIn }                        = useSignIn()
  const [email, setEmail]                 = useState('')
  const [password, setPassword]           = useState('')
  const [verifyCode, setVerifyCode]       = useState('')
  const [step, setStep]                   = useState('register')
  const [error, setError]                 = useState('')
  const [loading, setLoading]             = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isLoaded) return
    setError('')
    setLoading(true)
    try {
      const result = await signUp.create({ emailAddress: email, password })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        navigate('/transition')
      } else {
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
        setStep('verify')
      }
    } catch (err) {
      const code = err.errors?.[0]?.code
      setError(AUTH_ERRORS[code] || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!isLoaded) return
    setError('')
    setLoading(true)
    try {
      const result = await signUp.attemptEmailAddressVerification({ code: verifyCode })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        navigate('/transition')
      } else {
        setError('Verification incomplete. Please try again.')
      }
    } catch (err) {
      const code = err.errors?.[0]?.code
      setError(AUTH_ERRORS[code] || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setError('')
    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
    } catch {
      setError('Could not resend code. Please try again.')
    }
  }

  const handleOAuth = async (strategy) => {
    if (!signIn) return
    await signIn.authenticateWithRedirect({
      strategy,
      redirectUrl:         `${window.location.origin}/sso-callback`,
      redirectUrlComplete: '/transition',
    })
  }

  if (step === 'verify') {
    return (
      <div style={S.screen}>
        <div style={S.card}>
          <div style={S.logo}>Éveil</div>
          <h1 style={S.title}>Check your inbox.</h1>
          <p style={S.subtitle}>Entrez votre code.</p>

          <form onSubmit={handleVerify} style={{ width: '100%' }}>
            <div className="auth-field" style={{ textAlign: 'center' }}>
              <label>Verification Code</label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={verifyCode}
                onChange={e => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                style={S.codeInput}
                autoFocus
              />
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button
              className="btn-primary"
              type="submit"
              disabled={loading || verifyCode.length < 6}
              style={{ marginTop: '0.6rem' }}
            >
              {loading ? '...' : 'Verify →'}
            </button>
          </form>

          <button className="btn-link" style={{ marginTop: '1.2rem' }} onClick={handleResend}>
            Didn't receive it? Resend →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={S.screen}>
      <div style={S.card}>
        <div style={S.logo}>Éveil</div>

        <h1 style={S.title}>This is your moment.</h1>
        <p  style={S.subtitle}>C'est votre moment.</p>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button
            className="btn-primary"
            type="submit"
            disabled={loading}
            style={{ marginTop: '0.6rem' }}
          >
            {loading ? '...' : 'Begin my journey →'}
          </button>
        </form>

        <div className="auth-divider">
          <span /><p>or continue with</p><span />
        </div>

        <button
          className="btn-social"
          style={{ marginBottom: '0.7rem' }}
          onClick={() => handleOAuth('oauth_google')}
        >
          G&nbsp;&nbsp; Continue with Google
        </button>
        <button
          className="btn-social"
          onClick={() => handleOAuth('oauth_apple')}
        >
          ⌘&nbsp;&nbsp; Continue with Apple
        </button>

        <button className="btn-link" style={{ marginTop: '1rem' }} onClick={() => navigate('/login')}>
          Already have an account? Sign in
        </button>
      </div>
    </div>
  )
}

const S = {
  screen: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: '#1C1008',
    overflowY: 'auto',
  },
  card: {
    width: '100%',
    maxWidth: 340,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingBlock: '1rem',
  },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: 'italic',
    fontWeight: 300,
    fontSize: '2.4rem',
    color: '#FFFAF2',
    textAlign: 'center',
    letterSpacing: '0.03em',
    marginBottom: '0.25rem',
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: 'italic',
    fontWeight: 300,
    fontSize: '1.65rem',
    color: '#FFFAF2',
    textAlign: 'center',
    marginBottom: '0.2rem',
  },
  subtitle: {
    fontSize: '0.72rem',
    letterSpacing: '0.16em',
    color: 'rgba(255,250,242,0.34)',
    textAlign: 'center',
    marginBottom: '1.8rem',
  },
  codeInput: {
    fontSize: '1.5rem',
    letterSpacing: '0.35em',
    textAlign: 'center',
    fontFamily: "'Cormorant Garamond', serif",
  },
}
