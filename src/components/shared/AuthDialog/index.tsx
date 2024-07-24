"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"
import { AuthStep } from "./constant"
import { Input } from "@/components/ui/input"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios'
import {encryptOTP} from "@/utils/crypto"

type AuthDialogProps = {
    isOpen: boolean
    setIsOpen: (val: boolean) => void
}

const AuthDialog: React.FC<AuthDialogProps> = ({ isOpen, setIsOpen }) => {
    const [step, setStep] = useState<AuthStep>("SELECT_AUTH")
    const [email, setEmail] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")
    const [otp, setOtp] = useState<string>("")
    const [otpError, setOtpError] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [newPasswordError, setNewPasswordError] = useState<string>("")
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("")
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState<string>("")
    const router = useRouter()
    const {toast} = useToast()
    const [providedOtp, setProvidedOtp] = useState<string>("")
    const [resendTimer, setResendTimer] = useState<number>(0)
    const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(String(email).toLowerCase())
    }

    const generateTitle = () => {
        if (step === 'SELECT_AUTH' || step === 'SELECT_OTHER_AUTH') {
            return <DialogTitle>Sign In / Register</DialogTitle>
        }
        return <div></div>
    }

    useEffect(()=>{
        setStep("SELECT_AUTH")
    },[isOpen])

    const handleLoginGoogle = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.href
            },
        });

        if (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    const handleEmailCheck = async () => {
        setEmailError("")
        if (!email) {
            setEmailError("Email is required")
            return
        }
        if (!validateEmail(email)) {
            setEmailError("Invalid email address")
            return
        }

        const supabase = createClient();
        const { data: existingUser, error: fetchError } = await supabase
        .from('user')
        .select('*')
        .eq('email', email);

        if(fetchError){
            console.log(fetchError)
        }

        if (existingUser && existingUser.length > 0) {
            setStep("INPUT_PASSWORD");
        } else {
            generateOtpService()
            setStep("EMAIL_OTP_VERIFICATION");
        }
    };

    const generateOtp = (length: number = 6): string => {
      const digits = '0123456789';
      let otp = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
      }
      return otp;
    };

    const generateOtpService = async () => {
      const otp = generateOtp();
      setProvidedOtp(otp);
      const encryptedOtp = encryptOTP(otp)
      setResendTimer(60);
      setIsResendDisabled(true); 
      toast({ description: "The OTP code has been sent to your email. If you don't find it, please check your spam folder." });
      await axios.post("/api/send-otp", {email, otp:encryptedOtp})
       // Start the 60-second countdown
      
    };

    const handleResendOtp = () => {
        if (resendTimer === 0 && !isResendDisabled) {
          generateOtpService();
        }
      };

      useEffect(() => {
        let interval: NodeJS.Timeout;
        if (resendTimer > 0) {
          interval = setInterval(() => {
            setResendTimer((prevTimer) => {
              if (prevTimer === 1) {
                setIsResendDisabled(false); // Mengaktifkan kembali tombol resend ketika timer mencapai 0
              }
              return prevTimer - 1;
            });
          }, 1000);
        }
        return () => clearInterval(interval);
      }, [resendTimer]);

    const handlePasswordSubmit = async () => {
        setPasswordError("")
        if (!password) {
            setPasswordError("Password is required")
            return
        }

        const supabase = createClient()
        const {data, error} = await supabase.auth.signInWithPassword({email: email, password: password})
        if(data.user){
          router.refresh()
        }
        else{
          toast({description:"Email and password are not match", variant:"destructive"})
        }
    };

    const handleOtpSubmit = async () => {
        setOtpError("")
        if (!otp) {
            setOtpError("OTP is required")
            return
        }
        console.log("HERE")

        if(otp === providedOtp){
          setStep("CREATE_PASSWORD")
        }else{
            toast({description:"OTP yang Anda masukkan tidak tepat.", variant:"destructive"})
        }
    };

    const handleNewPasswordSubmit = async () => {
        setNewPasswordError("")
        setConfirmNewPasswordError("")
        if (!newPassword) {
            setNewPasswordError("New password is required")
            return
        }
        if (!confirmNewPassword) {
            setConfirmNewPasswordError("Please confirm your new password")
            return
        }
        if (newPassword !== confirmNewPassword) {
            setConfirmNewPasswordError("Passwords do not match")
            return
        }
        const supabase = createClient()
        console.log("Ini emailmu anak ajg  ",email, newPassword)
        const {data, error} = await supabase.auth.admin.createUser({email, password:newPassword, email_confirm:true})
        if(data.user){
            const newUser = {
                id: data.user.id,
                email: data.user.email,
                display_name: data.user.user_metadata.full_name || null,
                phone_num: data.user.user_metadata.phone || null
              };
          
            const { data: insertedUser, error: insertError } = await supabase
                .from('user')
                .insert(newUser)
                .select()
                .single();
            await supabase.auth.signInWithPassword({email, password:newPassword})
            router.replace(window.location.href)
        }
        if(error){
            console.log(error)
            toast({ description: `${error.message}`, variant:"destructive" });
            return
        }
        
    };

    const generateLabel = () => {
        if (step === 'SELECT_AUTH' || step === 'SELECT_OTHER_AUTH') {
            return <div className="flex w-full justify-center text-center px-4">
                <Label className="text-secondary text-sm">By registering, you agree to the applicable Terms & Conditions and you have read our Privacy Policy.</Label>
            </div>
        }

        if (step === 'INPUT_EMAIL') {
            return <div className="flex w-full justify-center text-center px-4">
                <Label className="text-secondary text-sm">We will not share your email with others or use it to send spam.</Label>
            </div>
        }
        return <div></div>
    }

    const generateContent = () => {
        if (step === 'SELECT_AUTH' || step === 'SELECT_OTHER_AUTH') {
            return <div className="grid gap-4 py-4 px-4">
                <div className="flex w-full">
                    <Button onClick={handleLoginGoogle} className="w-full bg-[#282828]">
                        <div className="flex items-center space-x-2">
                            <img src="/google-icon.svg" />
                            <p>Continue with Google</p>
                        </div>
                    </Button>
                </div>
                {step === 'SELECT_AUTH' && <>
                    <div onClick={() => setStep("SELECT_OTHER_AUTH")} className="flex w-full">
                        <div className="w-full bg-transparent text-primary border-0">
                            <div className="flex items-center space-x-2 justify-center">
                                <p className="font-semibold">Use other method</p>
                            </div>
                        </div>
                    </div>
                </>}
                {step === 'SELECT_OTHER_AUTH' && <>
                    <div className="grid gap-2">
                        <Button onClick={() => setStep("INPUT_EMAIL")} variant={"outline"} className="w-full border-[#282828]">
                            <div className="flex items-center space-x-2">
                                <p>Continue with Email</p>
                            </div>
                        </Button>
                    </div>
                </>}
            </div>
        }

        if (step === 'INPUT_EMAIL') {
            return <div className="grid gap-4 px-4">
                <DialogTitle className="text-center">Enter your email</DialogTitle>
                <div className="relative">
                    <Input
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                </div>
                <Button onClick={handleEmailCheck} className="w-full bg-primary">Continue</Button>
            </div>
        }

        if (step === 'EMAIL_OTP_VERIFICATION') {
            return <div className="grid space-y-4 px-4">
                <DialogTitle className="text-center">Enter the OTP code you received</DialogTitle>
                <p className="text-sm text-gray-600 flex items-center justify-center text-center">
                    {`We've sent a 6-digit code to ${email}`}<span onClick={() => { setStep("INPUT_EMAIL") }} className="ml-2"><img src="/pencil-icon.svg" /></span>
                </p>
                <Input
                    type="text"
                    placeholder="OTP Code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="text-center"
                />
                {otpError && <p className="text-red-500 text-sm">{otpError}</p>}
                <Button onClick={handleOtpSubmit} className="w-full">
                    Continue
                </Button>
                <div 
                    className={`w-full text-center text-sm ${!isResendDisabled && resendTimer === 0 ? 'text-blue-500 cursor-pointer' : 'text-gray-400'}`}
                    onClick={handleResendOtp}
                >
                    {!isResendDisabled && resendTimer == 0 ? 'Resend OTP' : `Resend OTP (${resendTimer} seconds)`}
                </div>
            </div>
        }

        if (step === 'INPUT_PASSWORD') {
            return <div className="grid space-y-4 px-4">
                <DialogTitle className="text-center">Enter your password</DialogTitle>
                <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                <Button onClick={handlePasswordSubmit} className="w-full bg-primary">Continue</Button>
            </div>
        }

        if (step === 'CREATE_PASSWORD') {
            return <div className="grid space-y-4 px-4">
                <h2 className="text-xl font-semibold text-center">Create New Password</h2>
                <p className="text-base text-secondary text-center">
                    Create a password for {email}. This will help you sign-in faster next time.
                </p>
                <Input
                    type="password"
                    placeholder="Create New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-gray-100"
                />
                {newPasswordError && <p className="text-red-500 text-sm">{newPasswordError}</p>}
                <Input
                    type="password"
                    placeholder="Retype New Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="bg-gray-100"
                />
                {confirmNewPasswordError && <p className="text-red-500 text-sm">{confirmNewPasswordError}</p>}
                <Button onClick={handleNewPasswordSubmit} className="w-full bg-primary">Create New Password</Button>
            </div>
        }

        return <div></div>
    }

    return (
      <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-screen md:max-w-[425px] px-0 py-5 "
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        >
          <DialogHeader className="px-4">
            {generateTitle()}
          </DialogHeader>
          <Separator className="mt-1"/>
          {generateContent()}
          {generateLabel()}
        </DialogContent>
      </Dialog>
    </div>
    )
}

export default AuthDialog