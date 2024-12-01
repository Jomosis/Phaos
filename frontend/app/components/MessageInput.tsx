import React, { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Slider } from "~/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Settings } from 'lucide-react'

interface MessageInputProps {
  onSendMessage: (content: string, maxReads: number, expiresIn: number) => void
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('')
  const [maxReads, setMaxReads] = useState(5)
  const [expiresIn, setExpiresIn] = useState(5)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message, maxReads, expiresIn)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="输入消息..."
          className="flex-grow"
        />
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>消息设置</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="maxReads">最大阅读次数: {maxReads}</Label>
                <Slider
                  id="maxReads"
                  min={1}
                  max={20}
                  step={1}
                  value={[maxReads]}
                  onValueChange={(value) => setMaxReads(value[0])}
                />
              </div>
              <div>
                <Label htmlFor="expiresIn">过期时间（分钟）: {expiresIn}</Label>
                <Slider
                  id="expiresIn"
                  min={1}
                  max={60}
                  step={1}
                  value={[expiresIn]}
                  onValueChange={(value) => setExpiresIn(value[0])}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Button type="submit">发送</Button>
      </div>
      <div className="text-sm text-gray-500">
        当前设置：最大阅读 {maxReads} 次 | 过期时间 {expiresIn} 分钟
      </div>
    </form>
  )
}

export default MessageInput

