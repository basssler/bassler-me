import { ImageResponse } from 'next/og'

export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#171717',
                    color: 'white',
                }}
            >
                <svg
                    width="108"
                    height="108"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="32" height="32" rx="0" fill="#171717" />
                    <path
                        d="M22.5 10H19.5L16 20.5L12.5 10H9.5V23H12V14.5L15 23H17L20 14.5V23H22.5V10Z"
                        fill="white"
                    />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    )
}
