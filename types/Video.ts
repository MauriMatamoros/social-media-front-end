import { User } from '@/types/User'

export type Video = {
    id: number
    title: string
    src: string
    published: boolean
    authorId: string
    createdAt: string
    favoritedBy: Partial<User>[]
    likedBy: Partial<User>[]
}
