import { Message } from '@/types/message'

const MESSAGES_KEY = 'phaos_messages'

export const getMessages = (): Message[] => {
  const storedMessages = localStorage.getItem(MESSAGES_KEY)
  return storedMessages ? JSON.parse(storedMessages) : []
}

export const addMessage = (message: Message): void => {
  const messages = getMessages()
  messages.push(message)
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
}

export const removeMessage = (id: string): void => {
  const messages = getMessages()
  const updatedMessages = messages.filter((msg) => msg.id !== id)
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(updatedMessages))
}

export const updateMessageReadCount = (id: string): void => {
  const messages = getMessages()
  const updatedMessages = messages.map((msg) => {
    if (msg.id === id) {
      return { ...msg, readCount: msg.readCount + 1 }
    }
    return msg
  })
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(updatedMessages))
}

