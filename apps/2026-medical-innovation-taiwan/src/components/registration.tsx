import styled from 'styled-components'
import { defaultBlockStyle } from '~/styles/shared-style'
import ContentBlock from '~/components/shared/content-block'
import { color, breakpoint } from '~/styles/theme'

const Wrapper = styled.div`
  ${defaultBlockStyle}
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
  gap: 16px;
`

const ApplyButton = styled.div`
  cursor: pointer;
  background-color: #282dad;
  color: ${color.white};
  font-size: 16px;
  font-weight: 700;
  line-height: 100%;
  text-align: center;
  padding: 12px;
  gap: 10px;
  border-radius: 16px;

  ${breakpoint.xl} {
    font-size: 20px;
  }
`

type RegistrationProps = {
  content: string
}
export default function Registration({ content }: RegistrationProps) {
  //Error Handle
  const shouldShowJsx = Boolean(typeof content !== 'string' || content.trim())
  if (!shouldShowJsx) {
    return null
  }

  return (
    <Wrapper id="registration">
      <h1>報名資訊</h1>
      <ContentBlock content={content} />
      {/* 因為報名截止了所以先隱藏，未來考慮設定截止時間！？ */}
      {false && (
        <ButtonWrapper>
          <a
            href="https://mirrordaily.oen.tw/events/3HOf7Bm5flk2DieiLxE9QdPOtT7"
            target="_blank"
          >
            <ApplyButton>報名網址</ApplyButton>
          </a>
        </ButtonWrapper>
      )}
    </Wrapper>
  )
}
