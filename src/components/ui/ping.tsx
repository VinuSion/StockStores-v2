import React from 'react'

export interface PingProps extends React.PropsWithChildren {
  color?: string
  outline?: boolean
  enabled?: boolean
}

const Ping: React.FC<PingProps> = ({
  color = 'bg-rose-600',
  outline = false,
  enabled = true,
  ...props
}) => {
  return (
    <div className="relative inline-flex">
      {props.children}
      {enabled && (
        <div className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${
              outline && 'border-background border-[1px]'
            } ${color}`}
          ></span>
        </div>
      )}
    </div>
  )
}

export { Ping }
