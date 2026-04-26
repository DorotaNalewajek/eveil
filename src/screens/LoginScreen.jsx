import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignIn } from '@clerk/clerk-react'

const AUTH_ERRORS = {
  form_password_incorrect:        'Incorrect password. Please try again.',
  form_identifier_not_found:      'No account found with this email.',
  form_param_format_invalid:      'Please enter a valid email address.',
  session_exists:                 'You are already signed in.',
  too_many_requests:              'Too many attempts. Please wait a moment.',
  strategy_for_user_invalid:      'Use Google or Apple to sign in to this account.',
  single_session_mode_violation:  'Please sign out before signing into another account.',
}

export default function LoginScreen() {
  const navigate                        = useNavigate()
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [error, setError]               = useState('')
  const [loading, setLoading]           = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isLoaded) return
    setError('')
    setLoading(true)
    try {
      const result = await signIn.create({ strategy: 'password', identifier: email, password })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        navigate('/transition')
      } else if (result.status === 'needs_second_factor') {
        setError('Two-factor authentication is not supported yet.')
      } else {
        setError('Unable to sign in. Please try again.')
      }
    } catch (err) {
      const code = err.errors?.[0]?.code
      setError(AUTH_ERRORS[code] || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
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

  return (
    <div style={S.screen}>
      <div style={S.card}>
        <div style={S.logo}>Éveil</div>

        <h1 style={S.title}>She came back. As always.</h1>
        <p  style={S.subtitle}>Vous êtes revenue. Toujours.</p>

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
              autoComplete="current-password"
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
            {loading ? '...' : 'Enter your Éveil →'}
          </button>
        </form>

        <button style={S.forgotBtn} onClick={() => {}}>
          Forgot password?
        </button>

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

        <button className="btn-link" style={{ marginTop: '1rem' }} onClick={() => navigate('/register')}>
          New here? Create an account
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
  forgotBtn: {
    background: 'transparent',
    border: 'none',
    color: 'rgba(255,250,242,0.28)',
    fontSize: '0.72rem',
    letterSpacing: '0.06em',
    cursor: 'pointer',
    textAlign: 'center',
    marginTop: '0.6rem',
    fontFamily: "'DM Sans', sans-serif",
  },
}
