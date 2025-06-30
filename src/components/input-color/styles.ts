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
  padding: 2px 4px;
  outline: none;
  font-size: 16px;
  font-family: 'Montserrat';
  height: 36px;
  cursor: pointer;
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
