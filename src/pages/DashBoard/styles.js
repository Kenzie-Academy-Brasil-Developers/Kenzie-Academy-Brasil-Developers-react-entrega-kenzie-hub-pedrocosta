import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;

  button {
    height: 35px;
    width: 60px;
    border-style: none;
    border-radius: var(--radius1);
    background-color: var(--gray3);
    color: var(--gray0);

    :hover {
      background-color: var(--gray1);
    }
  }
`;

export const Title = styled.h1`
  font-size: var(--fontS1);
  color: var(--primary);
  margin: 7px 0;
`;

export const Sec = styled.section`
  width: 100%;
  justify-content: center;
  border-top: solid var(--gray1) 1px;
  border-bottom: solid var(--gray1) 1px;
`;

export const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: var(--wht);
`;
