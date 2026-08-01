import { Heart } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { PATHS } from '@/routes/paths'

interface FieldErrors {
  username?: string
  password?: string
}

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  // derived data — không lưu vào state
  const canSubmit = useMemo(
    () => username.trim().length > 0 && password.trim().length > 0,
    [username, password],
  )

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {}
    if (!username.trim()) errors.username = 'Vui lòng nhập tên đăng nhập.'
    if (!password.trim()) errors.password = 'Vui lòng nhập mật khẩu.'
    else if (password.length < 6) errors.password = 'Mật khẩu phải có ít nhất 6 ký tự.'
    return errors
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    setFormError('')

    const errors = validate()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    if (!login(username, password)) {
      setFormError('Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.')
      setPassword('')
      return
    }

    navigate(PATHS.invitation, { replace: true })
  }

  const handleChange = (setter: (value: string) => void) => (value: string) => {
    setter(value)
    if (submitted) {
      setFieldErrors({})
      setFormError('')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-rose-50/60 px-4">
      <Card className="w-full max-w-sm border-rose-100 shadow-sm">
        <CardHeader className="text-center">
          <Heart className="mx-auto size-8 fill-rose-400 text-rose-400" />
          <CardTitle className="mt-2 text-xl">Sweet 24th Birthday</CardTitle>
          <CardDescription>Đăng nhập để xem thiệp mời của bạn</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                value={username}
                onChange={(event) => handleChange(setUsername)(event.target.value)}
                placeholder="huyentrang"
                autoComplete="username"
                aria-invalid={Boolean(fieldErrors.username)}
                className={cn(fieldErrors.username && 'border-rose-400')}
              />
              {fieldErrors.username && (
                <p className="text-xs text-rose-600">{fieldErrors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => handleChange(setPassword)(event.target.value)}
                placeholder="••••••"
                autoComplete="current-password"
                aria-invalid={Boolean(fieldErrors.password)}
                className={cn(fieldErrors.password && 'border-rose-400')}
              />
              {fieldErrors.password && (
                <p className="text-xs text-rose-600">{fieldErrors.password}</p>
              )}
            </div>

            {formError && (
              <div
                role="alert"
                className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
              >
                {formError}
              </div>
            )}

            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full bg-rose-500 hover:bg-rose-600"
            >
              Đăng nhập
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
