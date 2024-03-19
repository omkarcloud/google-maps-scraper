import { EuiAccordion, EuiFlexGroup, EuiFlexItem, EuiTitle } from '@elastic/eui'
import React from 'react'

type CollapsibleSectionProps = {
  title: string // The title to be shown on the accordion button
  children: React.ReactNode // The content to be shown/hidden within the accordion
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
}) => {
  const buttonContent = (
    <div>
      <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false}>
        <EuiFlexItem>
          <EuiTitle size="xs">
            <h3>{title}</h3>
          </EuiTitle>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )

  return (
    <EuiAccordion
      id={title}
      className="mt-4"
      element="fieldset"
      buttonContent={buttonContent}>
      <div className="px-4 pt-4">{children}</div>
    </EuiAccordion>
  )
}

export default CollapsibleSection
