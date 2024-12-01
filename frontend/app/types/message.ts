export interface Message {
  id: string
  content: string
  timestamp: number
  readCount: number
  maxReads: number
  expiresIn: number
}

