import { AlertCircle, Terminal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const Message = ({ variant = 'info', children }) => {
  const isDanger = variant === 'danger';
  
  return (
    <Alert variant={isDanger ? 'destructive' : 'default'} className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{isDanger ? 'Error' : 'Information'}</AlertTitle>
      <AlertDescription>
        {children}
      </AlertDescription>
    </Alert>
  )
}

export default Message;