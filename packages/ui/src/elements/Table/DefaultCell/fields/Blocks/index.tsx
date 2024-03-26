'use client'
import type { CellComponentProps, DefaultCellComponentProps } from 'payload/types'

import { getTranslation } from '@payloadcms/translations'
import { useTranslation } from '@payloadcms/ui/providers/Translation'
import React from 'react'

export interface BlocksCellProps extends DefaultCellComponentProps<any> {
  blocks: CellComponentProps['blocks']
  labels: CellComponentProps['labels']
}

export const BlocksCell: React.FC<BlocksCellProps> = ({ blocks, cellData, labels }) => {
  const { i18n } = useTranslation()

  const selectedBlocks = Array.isArray(cellData) ? cellData.map(({ blockType }) => blockType) : []

  const translatedBlockLabels = blocks?.map((b) => ({
    slug: b.slug,
    label: getTranslation(b.labels.singular, i18n),
  }))

  let label = `0 ${getTranslation(labels?.plural, i18n)}`

  const formatBlockList = (blocks) =>
    blocks
      .map((b) => {
        const filtered = translatedBlockLabels.filter((f) => f.slug === b)?.[0]
        return filtered?.label
      })
      .join(', ')

  const itemsToShow = 5

  if (selectedBlocks.length > itemsToShow) {
    const more = selectedBlocks.length - itemsToShow
    label = `${selectedBlocks.length} ${getTranslation(labels?.plural, i18n)} - ${i18n.t(
      'fields:itemsAndMore',
      { count: more, items: formatBlockList(selectedBlocks.slice(0, itemsToShow)) },
    )}`
  } else if (selectedBlocks.length > 0) {
    label = `${selectedBlocks.length} ${getTranslation(
      selectedBlocks.length === 1 ? labels?.singular : labels?.plural,
      i18n,
    )} - ${formatBlockList(selectedBlocks)}`
  }

  return <span>{label}</span>
}
