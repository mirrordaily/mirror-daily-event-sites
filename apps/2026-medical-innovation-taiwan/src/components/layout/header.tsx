import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { zIndex, color, breakpoint } from '~/styles/theme'
import { ShareButton } from '@readr-media/share-button'
import MirrordailyIcon from '~/icons/mirror-daily-logo.svg'
import Sidebar from '~/components/sidebar'
import NavLists from '~/components/layout/nav-lists'
import { sideBarTextColor } from '~/config'

const HeaderWrapper = styled.div<{ $isVisible: boolean }>`
  width: 100%;
  height: 53px;
  padding: 12px 12px 12px 20px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${color.headerBackground};
  z-index: ${zIndex.header};

  ${breakpoint.md} {
    transition: transform 0.2s ease-in-out;
    transform: translateY(${({ $isVisible }) => ($isVisible ? '0' : '-100%')});
  }

  ${breakpoint.xl} {
    padding: 0px 28px;
    height: 76px;
  }

  /* @readr-media/share-button */
  .share-button {
    display: none;

    ${breakpoint.md} {
      display: block;
      padding-top: 5px;
    }
  }

  .mirror-media-icon {
    width: 80px;
    height: 39px;
    display: block;

    ${breakpoint.xl} {
      width: 80px;
      height: 39px;
    }
  }
`

const Aside = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export default function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset

      if (prevScrollPos > currentScrollPos) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos])
  return (
    <HeaderWrapper $isVisible={isVisible}>
      <a
        href="https://www.mirrordaily.news/"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="mirror-media-icon"
      >
        <MirrordailyIcon />
      </a>

      <Aside>
        <NavLists />
        <Sidebar />
        <ShareButton pathColor={sideBarTextColor} />
      </Aside>
    </HeaderWrapper>
  )
}
