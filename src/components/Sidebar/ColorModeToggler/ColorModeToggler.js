import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Switch from 'rc-switch';

const ColorModeToggler = () => (
    <ThemeToggler>
        {({ theme, toggleTheme }) => (
            <Switch
                onChange={checked => toggleTheme(checked ? 'dark' : 'light')}
                onClick={checked => toggleTheme(checked ? 'dark' : 'light')}
                checked={theme === 'dark'}
                checkedChildren="💡"
                unCheckedChildren="🌙"
            />
        )}
    </ThemeToggler>
)

export default ColorModeToggler;
