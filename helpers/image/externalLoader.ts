import type { ImageLoaderProps } from 'next/image'

export const externalLoader = ({ src }: ImageLoaderProps): string => src
