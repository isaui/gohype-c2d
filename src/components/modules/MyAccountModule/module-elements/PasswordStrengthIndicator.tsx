

function PasswordStrengthIndicator({ password }: { password: string }) {
  const hasMinLength = password.length >= 8
  const hasMaxLength = password.length <= 50
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Indicator accepted={hasMinLength && hasMaxLength} />
        <span className="text-sm">
          Use 8-50 characters
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Indicator accepted={hasSpecialChar} />
        <span className="text-sm">
          Use special characters
        </span>
      </div>
    </div>
  )
}

function Indicator({ accepted }: { accepted: boolean }) {
  return (
    <div className={`w-3 h-3 rounded-full flex items-center justify-center
      ${accepted ? 'bg-blue-500' : 'bg-gray-300'}`}>
    </div>
  )
}

export default PasswordStrengthIndicator