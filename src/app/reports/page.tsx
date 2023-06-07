import { AuthHOC } from '@/components/auth/AuthHOC'
import React from 'react'

const page = () => {
  return (
    <AuthHOC>

        <div>Report page</div>
    </AuthHOC>
  )
}

export default page