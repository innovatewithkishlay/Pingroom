import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950">
      <SignUp 
        path="/sign-up"
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-xl rounded-2xl",
            headerTitle: "text-gray-200",
            headerSubtitle: "text-gray-400",
            socialButtonsBlockButton: "bg-gray-700 border-gray-600 hover:bg-gray-600",
            dividerLine: "bg-gray-700",
            dividerText: "text-gray-400",
            formFieldLabel: "text-gray-300",
            formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700",
            footerActionText: "text-gray-400",
            footerActionLink: "text-indigo-400 hover:text-indigo-300"
          }
        }}
      />
    </div>
  );
}
