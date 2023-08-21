export type User = {
    id: number
    email: string
    name: string
    role: string
    photo: string
    following: { id: number; email: string }[]
    followedBy: { id: number; email: string }[]
    videos: { id: number; title: string }[]
    favoriteVideos: { id: number; title: string }[]
    likes: { id: number; title: string }[]
}
