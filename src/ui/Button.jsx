import styled, { css } from 'styled-components'

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
}

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
}

// Will make the primary button lighter when it is disabled
function getButtonStyles({ $size, $variation, disabled }) {
  // const sizeStyles = sizes[$size]

  // Styles derived from props passed into the Button
  let variantStyles = variations[$variation]

  if (disabled) {
    if ($variation === 'primary') {
      variantStyles = `
        color: var(--color-brand-100);
        background-color: var(--color-brand-200);
        &:hover {
          background-color: var(--color-brand-200);
        }
      `
    }
  }

  return `
    ${sizes[$size]}
    ${variantStyles}
  `
}

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${getButtonStyles}
`

// const Button = styled.button`
//   border: none;
//   border-radius: var(--border-radius-sm);
//   box-shadow: var(--shadow-sm);

//   ${(props) => sizes[props.$size]}
//   ${(props) => variations[props.$variation]}
//   ${(props) =>
//     props.disabled && props.$variation === 'primary'
//       ? 'background-color: var(--color-brand-200)'
//       : variations[props.$variation]};
//   ${(props) =>
//     props.disabled && props.$variation === 'primary'
//       ? ' &:hover {background-color: var(--color-brand-200)}'
//       : variations[props.$variation]};
// `

// Default styles
Button.defaultProps = {
  $variation: 'primary',
  $size: 'medium',
}

export default Button
