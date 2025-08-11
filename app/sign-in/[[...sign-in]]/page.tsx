"use client";

import { SignIn, useAuth, useUser } from "@clerk/nextjs"
import { useEffect } from "react";

export default function SignInPage() {
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your NainaPro account</p>
        </div>
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary hover:bg-primary/90',
              socialButtonsBlockButton: 'border-gray-200 hover:bg-gray-50',
              socialButtonsBlockButtonText: 'text-gray-600',
              formFieldInput: 'border-gray-200 focus:border-primary',
              footerActionLink: 'text-primary hover:text-primary/90'
            }
          }}
        />
      </div>
    </div>
  )
}
