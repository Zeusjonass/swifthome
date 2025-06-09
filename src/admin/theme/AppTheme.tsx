import { JSX } from "react"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { mainTheme } from "./MainTheme"

interface AppThemeProps {
    children: JSX.Element
}

export const AppTheme = ({children}: AppThemeProps) => {
  return (
    <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
}
