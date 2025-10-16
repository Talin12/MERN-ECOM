import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const Message = ({ variant = 'info', children }) => {
  const isDanger = variant === 'danger';
  
  return (
    <Alert variant={isDanger ? 'destructive' : 'default'} className="my-4 bg-slate-800/50 border-slate-700 text-white">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{isDanger ? 'Error' : 'Information'}</AlertTitle>
      <AlertDescription>
        {children}
      </AlertDescription>
    </Alert>
  )
}

export default Message;