import { JSObject, WithId } from '@omkar111111/utils/types'

type Timespamps = {
  created_at: string
  updated_at: string
}
export type User = WithId<number> &
  Timespamps & {
    name: string
    email: string
    username: string
    bytes_used: number
  }

export type ProjectImage = WithId<number> & {
  name: string
  url: string
  hash: string
  project: number
}

export type ProjectSvg = WithId<number> & {
  name: string
  content: string
  hash: string
  project: number
}

export type Page = WithId<number> & {
  title: string
  nodes: JSObject[]
  link: string
}

export type ProjectData = {
  pages: Page[]
  homepage: string
}

export type Project = WithId<number> &
  Timespamps & {
    name: string
    data: ProjectData
    website_content: string
    images: ProjectImage[]
    svgs: ProjectSvg[]
  }

export type PostImage = WithId<number> &
  Timespamps & {
    name: string
    url: string
    hash: string
    post: number
  }

export type Post = WithId<number> &
  Timespamps & {
    title: string
    content: string
    thumbnail: null | number
    project: number
    images: PostImage[]
  }
