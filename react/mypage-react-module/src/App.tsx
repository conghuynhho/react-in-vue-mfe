import { Button } from '@mui/material'
import { css, Global } from '@emotion/react'


const App = () => {
  return (
    <div
      className="content"
      css={css`
        display: flex;
        min-height: 100vh;
        line-height: 1.1;
        text-align: center;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <Global styles={css`
        body {
          margin: 0;
          color: #fff;
          font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
          background-image: linear-gradient(to bottom, #020917, #101725);
        }
      `} />
      <h1 css={css`
        font-size: 3.6rem;
        font-weight: 700;
      `}>Rsbuild with React</h1>
      <p css={css`
        font-size: 1.2rem;
        font-weight: 400;
        opacity: 0.5;
      `}>Start building amazing things with Rsbuild. hello</p>
      <Button variant="contained">
        Click me hahahahaha adslfkasdlfkjs aldskfjalskdjflks 19802319823
      </Button>
    </div>
  )
}

export default App
