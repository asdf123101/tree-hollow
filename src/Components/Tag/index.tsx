import React from 'react'

import { Tag } from './style'

export const TagList = ({ list }: { list: string[] }) => {
  return (
    <div>
      {list.map(item => (
        <Tag key={item}>#{item}</Tag>
      ))}
    </div>
  )
}
