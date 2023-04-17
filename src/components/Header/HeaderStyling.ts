import styled from "styled-components/native";

export const HeaderContainer = styled.View`
  width: 100%;
  max-width: 500px;
  margin-vertical: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
`;

export const HeaderItem = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const HeaderTitle = styled.Text`
  margin: 0;
  font-size: 60px;
  font-weight: bold;
  color: ${(props) => props.theme.mainText};
`;

export const HeaderSubtitle = styled.Text`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.mainText};
`;

export const HeaderScores = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
`;

export const HeaderScore = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box;
  position: relative;
  border-radius: 4px;
  height: 80px;
  min-width: 100px;
  background-color: ${(props) => props.theme.scoreBack};
`;

export const HeaderScoreTitle = styled.Text`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${(props) => props.theme.subText};
`;

export const HeaderScoreSubtitle = styled.Text`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${(props) => props.theme.subText};
`;

export const HeaderButton = styled.View`
  border: none;
  border-radius: 4px;
  padding-horizontal: 20px;
  height: 40px;
  width: 100%;
  max-width: 150px;
  text-align: center;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.newGameButton};
`;
