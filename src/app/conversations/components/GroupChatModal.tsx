"use client"

import { Button } from "@/components/Button"
import { Modal } from "@/components/Modal"
import { Input } from "@/components/inputs/Input"
import { Select } from "@/components/inputs/Select"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface GroupChatModal {
  isOpen?: boolean
  onClose: () => void
  users: User[]
}

export const GroupChatModal = ({ isOpen, onClose, users }: GroupChatModal) => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: []
    },

  })

  const members = watch('members')

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios.post('/api/conversations', { ...data, isGroup: true })
      .then(() => {
        router.refresh()
        onClose()
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(true))
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900" >
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Create a chat with more than 2 people</p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input id="name" label="name" register={register} required disabled={isLoading} errors={errors} />
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((users) => ({
                  value: users.id,
                  label: users.name
                }))}
                onChange={(value) => setValue('members', value, { shouldValidate: true })}
                value={members}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            onClick={onClose}
            secondary
            type="button"

          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            type="submit"
          >
            Create
          </Button>
        </div>

      </form>

    </Modal>
  )
}
