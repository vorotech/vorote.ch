---
title: WSL 2, Kali Linux, Windows Terminal — Part 2
date: "2020-08-05T00:00:00.000Z"
template: "post"
draft: true
slug: "wsl-2-kali-linux-windows-terminal-part-2"
category: "Personal Development"
tags:
  - "WSL2"
  - "Kali Linux"
  - "Windows Terminal"
  - "Guidance"
description: "Configure Windows Terminal with a PowerShell Core and zshell panels representing Windows 10 and Kali Linux. Make a nice look and user experience with oh-my-posh and Oh My Zsh theme engines. And much more."
socialImage: "/media/Annotation 2020-07-11 225451.png"
---

![Windows Terminal with PowerShell and Kali Linux shells](/media/Annotation 2020-07-11 225451.png)
_Windows Terminal with PowerShell (left) and Kali Linux (right) shells_

This is a Part 2 ...

<hr>

With the release of the 2004 update of Windows 10 I decided to extend my usage of WSL:

* Configure Windows Terminal with a PowerShell Core and zshell panels representing Windows 10 and Kali Linux
* Make a nice look and user experience with oh-my-posh and Oh My Zsh theme engines
* Configure VS Code to open projects with WSL 2
* Configure Docker to integrate with WSL 2


## Install and setup Windows Terminal

https://docs.microsoft.com/en-us/windows/terminal/get-started





Customize Terminal
`Ctrl+,`

Get Windows Terminal color schemas of your choice 
https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/windowsterminal

Add to schemes array any themes you like:

```json
{
    "schemes": [
        {
        "name": "AdventureTime",
        "black": "#050404",
        "red": "#bd0013",
        "green": "#4ab118",
        "yellow": "#e7741e",
        "blue": "#0f4ac6",
        "purple": "#665993",
        "cyan": "#70a598",
        "white": "#f8dcc0",
        "brightBlack": "#4e7cbf",
        "brightRed": "#fc5f5a",
        "brightGreen": "#9eff6e",
        "brightYellow": "#efc11a",
        "brightBlue": "#1997c6",
        "brightPurple": "#9b5953",
        "brightCyan": "#c8faf4",
        "brightWhite": "#f6f5fb",
        "background": "#1f1d45",
        "foreground": "#f8dcc0"
        }
    ]
}

```

Customize profile to use the new color scheme:

```json
{
    "profiles": [
        {
            "guid": "{46ca431a-3a87-5fb3-83cd-11ececc031d2}",
            "hidden": false,
            "name": "kali-linux",
            "source": "Windows.Terminal.Wsl",
            "fontFace": "Cascadia Mono PL",
            "colorScheme": "AdventureTime"
        }
    ]
}
```

Tip: Set `hidden: true` for any profile that you want to hide from Terminal Menu.

The Font Face with embedded Powerline symbols which I use in the Terminal can be downloaded here.

https://docs.microsoft.com/en-us/windows/terminal/cascadia-code
https://github.com/microsoft/cascadia-code

Install the Font https://dev.to/expertsinside/cascadia-code-a-new-font-for-visual-studio-code-and-terminal-47oc


Background images
https://github.com/dorianpro/kali-linux-wallpapers
https://github.com/ryoid/PowerShell-Core-Wallpaper


Customize WSL


https://docs.microsoft.com/en-us/windows/terminal/tutorials/powerline-setup


https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH