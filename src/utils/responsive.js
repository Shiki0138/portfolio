import { css } from 'styled-components';

export const respondTo = {
  mobile: (...args) => css`
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (min-width: ${props => props.theme.breakpoints.lg}) {
      ${css(...args)}
    }
  `,
  largeDesktop: (...args) => css`
    @media (min-width: ${props => props.theme.breakpoints.xl}) {
      ${css(...args)}
    }
  `
};

export const hideOn = {
  mobile: css`
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      display: none;
    }
  `,
  tablet: css`
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      display: none;
    }
  `,
  desktop: css`
    @media (min-width: ${props => props.theme.breakpoints.lg}) {
      display: none;
    }
  `
};

export const showOn = {
  mobile: css`
    display: none;
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      display: block;
    }
  `,
  tablet: css`
    display: none;
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      display: block;
    }
  `,
  desktop: css`
    display: none;
    @media (min-width: ${props => props.theme.breakpoints.lg}) {
      display: block;
    }
  `
};