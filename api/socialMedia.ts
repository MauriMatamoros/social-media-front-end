import axios from 'axios'

export const socialMedia = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SOCIAL_MEDIAL_BASE_URL,
})
