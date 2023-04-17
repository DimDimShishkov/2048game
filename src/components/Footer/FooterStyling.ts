import styled from "styled-components/native";

export const FooterContainer = styled.View`
  width: 100%;
  max-width: 500px;
  margin-vertical: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const FooterTitle = styled.Text`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.mainText};
`;
