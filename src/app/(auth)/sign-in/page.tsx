'use-client'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import Link from "next/link"
import React, { useState } from 'react'
import { useDebounceValue } from "usehooks-ts"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const page = () => {
    const [username,setUsername] = useState('')
    const [usernameMessage,setUsernameMessage] = useState('')
    const [isCheckingusername,setISCheckingusername] = useState('')
    const [isSubmitting,setIsSubmitting] = useState(false)
    const debouncedUsername = useDebounceValue(username, 500)
    const {toast } = useToast()
    const router = useRouter();
    
  return (
    <div>page</div>
  )
}

export default page