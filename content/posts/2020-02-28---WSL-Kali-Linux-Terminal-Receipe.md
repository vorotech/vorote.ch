---
title: WSL, Kali Linux, Termial Recipe
date: "2020-06-28T00:00:00.000Z"
template: "post"
draft: false
slug: "wsl-kali-linux-terminal-receipe"
category: "Personal Development"
tags:
  - "WSL2"
  - "Kali Linux"
  - "Windows Terminal"
  - "Guidence"
description: "Configure Windows Terminal with a PowerShell Core and zshell panels representing Windows 10 and Kali Linux. Make a nice look and user experience with oh-my-posh and Oh My Zsh theme engines. And much more."
socialImage: "/media/Annotation 2020-07-11 225451.png"
---

![Windows Terminal with PowerShell and Kali Linux shells](/media/Annotation 2020-07-11 225451.png)
_Windows Terminal with PowerShell (left) and Kali Linux (right) shells_

During this year my work OS is Windows 10 Pro. I haven't decided yet weather I want to switch to other OS.
Our team still support couple of the full .NET Framework components requiring Windows 10 and also
a daily work with Ansible and Python 3. Thus Windows Subsytem for Linux (WSL) running Ubuntu 18.04 
was a real salvation before I configured Kali Linux.

<hr>

With the release of the 2004 update of Windows 10 I decided to extend my usage of WSL:

* Update to WSL 2
* Install Kali Linux distro and make it default
* Configure all packages required for daily usage
  * Windows packages
  * Linux packages
  * Configure virtualenv to manage pip dependencies
  * Sharing SSH keys from Windows
* Delete Ubuntu-18.04 distro once all settings migrated
* Configure Windows Terminal with a PowerShell Core and zshell panels representing Windows 10 and Kali Linux
* Make a nice look and user experience with oh-my-posh and Oh My Zsh theme engines
* Configure VS Code to open projects with WSL 2
* Configure Docker to integrate with WSL 2

## Install WSL 2

There is a full [Installation Guide](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to bring WSL 2 available at Microsot Docs portal.

To save you time most likely if you had WSL 1 installed while following the Microsoft instructions you will see a message:

_WSL 2 requires an update to its kernel component. For information please visit https://aka.ms/wsl2kernel. Please follow the link (https://aka.ms/wsl2kernel) and install the MSI from that page on our documentation to install a Linux kernel on your machine for WSL 2 to use. Once you have the kernel installed, please run the command again and it should complete successfully without showing the message._

So, follow the link and get your system updated first.


## Install Kali Linux distro and make it default

If you want to avoid canceling the Microsoft Store prompts to Sign In you can install `<distro>.appx` package directly.
See the list of the available packages for download [here](https://docs.microsoft.com/en-us/windows/wsl/install-manual#downloading-distros).

Since Windows 10 Spring 2018 Update (or later) includes the popular curl command-line utility you can do the following:

```powershell
$ curl.exe -L -o kali.appx https://aka.ms/wsl-kali-linux-new
$ Add-AppxPackage .\kali.appx
$ rm .\kali.appx
```

Once the distribution is installed, find it in the Start menu and proceed creating a new user.

When finished check the distribution version installed:

```shell
$ cat /etc/os-release
PRETTY_NAME="Kali GNU/Linux Rolling"
NAME="Kali GNU/Linux"
ID=kali
VERSION="2020.2"
VERSION_ID="2020.2"
VERSION_CODENAME="kali-rolling"
ID_LIKE=debian
ANSI_COLOR="1;31"
HOME_URL="https://www.kali.org/"
SUPPORT_URL="https://forums.kali.org/"
BUG_REPORT_URL="https://bugs.kali.org/"
```

You can check all your distros in PowerShell:

```powershell
$  wsl -l -v
  NAME                   STATE           VERSION
* kali-linux             Running         2
  Ubuntu-18.04           Stopped         2
  docker-desktop         Running         2
  docker-desktop-data    Running         2
```

Run the following command in PowerShell to set WSL 2 as the default version when installing a new Linux distribution:

```pwoeshell
$ wsl --set-default-version 2
```

Run the following command in PowerShell to convert existing distro to WSL 2:

```powershell
$ wsl --set-version Ubuntu-18.04 2
```

Run the following command in PowerShell to change default distribution:

```powershell
$ wsl --set-default kali-linux
```

To open other distribution from the PowerShell you can run:

```powershell
$ wsl -d Ubuntu-18.04
```

To logout the opened distribution press `Ctrl+D`.


## Configure all packages required for daily usage

### Windows packages

Few years ago a friend of mine suggested to try the [Scoop](https://scoop.sh/) command-line packages installer instead of very popular Chocolatey. 
Tried once and I never come back to using a `choco` again.

[Scoop](https://scoop.sh/) installs programs from the command line with a minimal amount of friction. It tries to eliminate things like:

* Permission popup windows. It installs programs to your home directory by default.
* GUI wizard-style installers
* Path pollution from installing lots of programs
* Unexpected side-effects from installing and uninstalling programs
* The need to find and install dependencies
* The need to perform extra setup steps to get a working program

Scoop Installation (PowerShell)

```powershell
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
```

My minimal packages list:

```powershell
$ scoop list
Installed apps:

  7zip 19.00
  bat 0.15.4
  git 2.27.0.windows.1
  helm 3.2.4
  mkcert 1.4.1 [extras]
  nodejs 14.5.0
  oh-my-posh 2.0.443 [extras]
  posh-git 0.7.3.1 [extras]
  pulumi 2.5.0
  python 3.8.3
  robo3t 1.3.1 [extras]
  sudo 0.2020.01.26
  vscode 1.46.1 [extras]
  yarn 1.22.4
```

I've experienced few issues with `dotnet` (.NET Core) SDKs and runtime, so have them [installed from Microsoft website](https://dotnet.microsoft.com/download),
but I'd not blame Scoop here 🤣

### Linux packages

I was always lacking a visibility over the installed packages and their dependencies while working with Linux before. 
This is no longer an issue after I found out about the [Aptitude](https://wiki.debian.org/Aptitude), command-line based front-end to numerous Apt libraries.

```shell
$ sudo apt-get update -y
$ sudo apt-get install -y aptitude
```

Once **aptitude** installed get the following packages (my minimal setup) with their dependencies installed as well:

```
git
docker
golang-go
python3.8
python3-pip
nodejs
npm
zip
unzip
yarn
zsh
htop
```

Btw, to get the list of packages installed by Aptitude (or Apt) not including their dependencies, you can run:

```shell
$ aptitude search '~i!~M'
```

This will also include a brief description of the packages.


### Configure virtualenv to manage pip dependencies

Good practice when working with python is to isolate each project in the virtual environments, the sandbox where all pips specific to project are installed.

For myself I've chosen the [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/).
It is a set of extensions to Ian Bicking’s [virtualenv](https://pypi.python.org/pypi/virtualenv) tool.
The extensions include wrappers for creating and deleting virtual environments and otherwise managing your development workflow,
making it easier to work on more than one project at a time without introducing conflicts in their dependencies.

Get started with it in few simple steps:

```shell
$ pip install virtualenvwrapper
```

After installed edit your `.bashrc` or `.zshrc` or any other and add the following lines to the end:

```shell
# virtualenvwrapper
export WORKON_HOME=~/.virtualenvs
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
export VIRTUALENV_PYTHON=/usr/bin/python3
source $HOME/.local/bin/virtualenvwrapper.sh
```

You might need to add the `$HOME/.local/bin` to the `$PATH`, so find where the `PATH` is exported. You should have something similar to:

```shell
$ export PATH=$HOME/bin:$HOME/.local/bin:/usr/local/bin:$PATH
```

The `WORKON_HOME` tells where all virtual environments will be stored. I prefer to have them stored in some central space, rather than project space.
As you will see further it allows to run `workon` command from any system folder to list the available virtual environments, thus you can have not only 
project specific setups, but common as well (e.g. `ansible` environment might have the Ansible and its dependencies pre-configured).


Now, let's give it a try. Assume we need to setup new environment with the Ansible and some dependencies:

```shell
$ cd /your-projects-space
$ workon ansible
ERROR: Environment 'ansible' does not exist. Create it with 'mkvirtualenv ansible'.

$ mkvirtualenv ansible
# creates new environment and switches to it

(ansible) $ pip install ansible
# installs Ansible pip package of latest version

$ deactivate
# exits the current virtual environment

$ workon
ansible
# lists all available environments

$ workon ansible
# activate ansible environment one more time
```

You got the idea. See the [command references](https://virtualenvwrapper.readthedocs.io/en/latest/command_ref.html) page for the full list of commands.

### Sharing SSH keys from Windows

To let applications running from Windows and WSL reuse the same SSH keys (e.g. access your GitHub repositories) and to avoid managing the second pair of keys,
the generated keys can be shared in couple of ways.

If keys hasn't been generated yet:

```shell
$ export WIN_USER=replace
$ ssh-keygen -f /mnt/c/Users/${WIN_USER}/.ssh/id_rsa -b 4096
```

Option 1, create symlinks:

```shell
$ ln -sf /mnt/c/Users/${WIN_USER}/.ssh/id_rsa ${HOME}/.ssh/id_rsa
$ ln -sf /mnt/c/Users/${WIN_USER}/.ssh/id_rsa.pub ${HOME}/.ssh/id_rsa.pub
```

Option 2 (my choice), set `identityFile` inside the `~/.ssh/config`:

```txt
Host * 
    IdentityFile /mnt/c/Users/${WIN_USER}/.ssh/id_rsa
```

In case you see the `WARNING: UNPROTECTED PRIVATE KEY FILE!` you need to fix the permissions of the SSH keys:

```shell
$ chmod 600 /mnt/c/Users/${WIN_USER}/.ssh/id_rsa
$ chmod 644 /mnt/c/Users/${WIN_USER}/.ssh/id_rsa.pub
$ chmod 700 /mnt/c/Users/${WIN_USER}/.ssh
```

## Delete Ubuntu-18.04 distro once all settings migrated

At the beginning I was mentioning that I installed the WSL2 with Kali Linux to Windows 10 with exiting Ubuntu-18.04 distro. 
I've played around and even converted the Ubuntu to WSL2, but it's time to remove it.
At this stage I'm happy with current Kali Linux configuration. 

While Linux distributions can be installed through the Microsoft store, they can't be uninstalled through the store.

Caution: Once unregistered, all data, settings, and software associated with that distribution will be permanently lost. 
So don't forget to copy any important files if you have them stored elsewhere in Linux Subsystem.

```shell
$ wsl --unregister Ubuntu-18.04
```

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

Customise profile to use the new color scheme:

```
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