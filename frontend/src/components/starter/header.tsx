import {
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderLink,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiListGroup,
  EuiListGroupItem,
  EuiTitle,
  useEuiTheme,
  useGeneratedHtmlId,
} from '@elastic/eui'
import Image from 'next/image'
import Link from 'next/link'
import { imageLoader } from '../../lib/loader'
import { headerStyles } from './header.styles'
import { useState } from 'react'
// @ts-ignore
import Logo from '../../../public/images/logo.svg'
import Links from '../../utils/data/links'

function HeaderLogo({ header_title, white = false }) {
  const { euiTheme } = useEuiTheme()

  const styles = headerStyles(euiTheme)

  return (
    <Link href="/" passHref>
      <a css={styles.logo}>
        <Image width={24} height={24} src={Logo} alt="" loader={imageLoader} />
        {header_title && (
          <EuiTitle size="xxs" css={styles.title}>
            <span style={white ? { color: '#ffffff' } : undefined}>
              {header_title}
            </span>
          </EuiTitle>
        )}
      </a>
    </Link>
  )
}

function RightHeader({ text, link }) {
  const { euiTheme } = useEuiTheme()

  const styles = headerStyles(euiTheme)

  return link ? (
    <EuiHeaderLink style={{ color: '#ffffff' }} href={link} target="_blank">
      {text}
    </EuiHeaderLink>
  ) : (
    <EuiTitle size="xxs" css={styles.title}>
      <span style={{ color: '#ffffff' }}>{text}</span>
    </EuiTitle>
  )
}

const Header = ({ header_title, right_header }) => {
  const guideHeaderCollapsibleNavId = useGeneratedHtmlId({
    prefix: 'guideHeaderCollapsibleNav',
  })

  const [navIsOpen, setNavIsOpen] = useState(false)

  const collapsibleNav = (
    <EuiCollapsibleNav
      key="collapsible-nav"
      id={guideHeaderCollapsibleNavId}
      aria-label="Main navigation"
      isOpen={navIsOpen}
      isDocked={false}
      button={
        <EuiHeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={() => setNavIsOpen(!navIsOpen)}>
          <EuiIcon type={'menu'} size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}>
      <EuiFlexItem className="eui-yScroll">
        <EuiCollapsibleNavGroup
          className="h-full child-h-full"
          background="none">
          <EuiListGroup
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s">
            {Links.home && (
              <Link href={Links.home} passHref>
                <EuiListGroupItem label="Home" />
              </Link>
            )}
          </EuiListGroup>
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
    </EuiCollapsibleNav>
  )

  const header_items: any = [
    {
      items: [
        collapsibleNav,
        <div className="w-6" key="spacer" />, // Added key for list item
        <HeaderLogo key="logo" header_title={header_title} white />,
      ],
      borders: 'none',
    },
  ]

  if (right_header?.text) {
    header_items.push({
      items: [<RightHeader key="right-header" {...right_header} />],
      borders: 'none',
    })
  }

  return (
    <>
      <EuiHeader
        role="navigation"
        position="fixed"
        theme="dark"
        sections={header_items}
      />
    </>
  )
}

export default Header
