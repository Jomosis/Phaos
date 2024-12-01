import React, { useState, useEffect } from 'react'
import ChatInterface from '~/components/ChatInterface'
import MessageInput from '~/components/MessageInput'
import { Message } from '~/types/message'
import { addMessage, getMessages, removeMessage, updateMessageReadCount } from '~/lib/messageUtils'

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const storedMessages = getMessages()
    setMessages(storedMessages)

    const interval = setInterval(() => {
      const currentTime = new Date().getTime()
      const updatedMessages = storedMessages.filter((msg: Message) => {
        const messageAge = currentTime - msg.timestamp
        const shouldRemove = messageAge > msg.expiresIn * 60 * 1000 || msg.readCount >= msg.maxReads
        if (shouldRemove) {
          removeMessage(msg.id)
        }
        return !shouldRemove
      })
      setMessages(updatedMessages)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = (content: string, maxReads: number, expiresIn: number) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().getTime(),
      readCount: 0,
      maxReads,
      expiresIn,
    }
    addMessage(newMessage)
    setMessages((prevMessages) => [...prevMessages, newMessage])
  }

  const handleReadMessage = (id: string) => {
    updateMessageReadCount(id)
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, readCount: msg.readCount + 1 } : msg
      )
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4 text-center">Phaos 阅后即焚聊天</h1>
      <ChatInterface messages={messages} onReadMessage={handleReadMessage} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  )
}

export default App

