import React from 'react'
import styled from 'styled-components'

import { breakpoint, color } from '~/styles/theme'
import { useNavLists } from '~/contexts/nav-list'

const Wrapper = styled.div`
  display: none;

  ${breakpoint.md} {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-right: 25px;
  }

  ${breakpoint.xl} {
    gap: 10px;
    margin-right: 30px;
  }
`

const Item = styled.li<{ $show: boolean }>`
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  list-style: none;
  color: ${color.text.title};
  background: ${color.navListItemBackground};
  padding: 5px 8px;
  border-radius: 4px;
  cursor: pointer;
  display: ${({ $show }) => ($show ? 'block' : 'none')};

  ${breakpoint.xl} {
    font-size: 20px;
    padding: 10px;
  }
`

export default function NavLists() {
  const navLists = useNavLists()

  return (
    <Wrapper>
      {navLists?.map((item, index) => {
        if (!item.show) {
          return null
        }

        return (
          <a key={index} href={item.href}>
            <Item $show={item.show}>{item.title}</Item>
          </a>
        )
      })}
    </Wrapper>
  )
}
