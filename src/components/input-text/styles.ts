import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  border-color: var(--primary-color);
  padding: 6px 14px;
  outline: none;
  font-size: 16px;
  font-family: 'Montserrat';
`;

export const Label = styled.label`
  font-size: 12px;
  display: block;
`;

export const Error = styled.div`
  font-size: 12px;
  display: block;
  color: var(--error-color);
`;
