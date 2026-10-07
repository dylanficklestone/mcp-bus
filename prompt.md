# User Prompts Log

This document records all user prompts provided during the development of the **Public Transit & Commuter Portal** project.

---

## Prompt 1: Initial App Design & Specification

```text
Build me an app with screens that look like this. You can hotlink images from the html

---
name: Public Transit & Commuter Portal
colors:
  surface: '#fbf8ff'
  surface-dim: '#dbd9e0'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2fa'
  surface-container: '#efedf4'
  surface-container-high: '#e9e7ee'
  surface-container-highest: '#e3e1e9'
  on-surface: '#1b1b20'
  on-surface-variant: '#4f434f'
  inverse-surface: '#2f3035'
  inverse-on-surface: '#f2f0f7'
  outline: '#817380'
  outline-variant: '#d2c2d0'
  surface-tint: '#8c3d9c'
  primary: '#500062'
  on-primary: '#ffffff'
  primary-container: '#6c1d7e'
  on-primary-container: '#e68ff5'
  inverse-primary: '#f5adff'
  secondary: '#a83900'
  on-secondary: '#ffffff'
  secondary-container: '#fd6b2b'
  on-secondary-container: '#5b1b00'
  tertiary: '#3f214a'
  on-tertiary: '#ffffff'
  tertiary-container: '#573762'
  on-tertiary-container: '#cba2d5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fed6ff'
  primary-fixed-dim: '#f5adff'
  on-primary-fixed: '#350041'
  on-primary-fixed-variant: '#702282'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb59a'
  on-secondary-fixed: '#380d00'
  on-secondary-fixed-variant: '#802a00'
  tertiary-fixed: '#f9d8ff'
  tertiary-fixed-dim: '#e2b8ec'
  on-tertiary-fixed: '#2c0e37'
  on-tertiary-fixed-variant: '#5b3a65'
  background: '#fbf8ff'
  on-background: '#1b1b20'
  surface-variant: '#e3e1e9'
  transit-purple-deep: '#5e1770'
  transit-purple-light: '#f4eaf7'
  cta-orange-hover: '#c8470a'
  cta-orange-subtle: '#fff3eb'
  slate-bg: '#f0f2f5'
  surface-white: '#ffffff'
  border-subtle: '#dbe0e6'
  text-primary: '#1f1f23'
  text-muted: '#686a73'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
  body-lg:
    fontFamily: Roboto Flex
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Roboto Flex
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Roboto Flex
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Roboto Flex
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Roboto Flex
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Roboto Flex
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
  button-text:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---
```

---

## Prompt 2: Git Repository Setup & Push

```text
git push https://<GITHUB_PAT>@https://github.com/dylanficklestone/mcp-bus.git
```

---

## Prompt 3: API Architecture & LTA DataMall v3 Integration

```text
1) create a /api folder under the project main to store all the apis 
2) create a /api/health.js to monitor if the apis are working 
3) integrate the LTA bus information api endpoint GET https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=04121
Header:  AccountKey:

# BusStopCode is the only required parameter.
# Add &ServiceNo=7 to ask about one service only.
# Refreshes every 20 seconds. JSON comes back by default. 
i will add the LTA_ACCOUNT_KEY in vercel environment variables later
```

---

## Prompt 4: Prompt Documentation Request

```text
create a prompt.md containing all my prompts located at project main
```
