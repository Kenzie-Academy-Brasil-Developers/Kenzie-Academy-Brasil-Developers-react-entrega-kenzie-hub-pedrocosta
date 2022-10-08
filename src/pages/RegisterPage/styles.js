import styled from "styled-components";

export const Sec = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: var(--fontS1);
  color: var(--primary);
  margin: 7px 0;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 20%;
  background-color: var(--gray3);
  gap: 4px;
  border-radius: var(--radius1);
  height: max-content;
  min-width: 302px;

  h3 {
    color: var(--wht);
    margin-top: 15px;
  }

  input {
    padding-left: 5px;
    background-color: var(--gray2);
    height: 30px;
    width: 90%;
    border-style: none;
    border-radius: var(--radius1);
  }

  select {
    height: 30px;
    width: 90%;
    background-color: var(--gray2);
    color: var(--gray1);
  }

  label {
    align-self: flex-start;
    color: var(--gray0);
    margin-left: 5%;
    font-size: var(--fontS3);
  }

  p {
    align-self: flex-start;
    margin-left: 20px;
    margin-right: 8px;
    color: var(--primary);
    font-size: var(--fontS3);
  }

  @media (max-width: 480px) {
    width: 90%;
    min-width: unset;
  }
`;

export const ButtonRegister = styled.button`
  background-color: var(--primary);
  border-style: none;
  border-radius: var(--radius1);
  height: 30px;
  width: 90%;
  margin-top: 15px;
  margin-bottom: 15px;
  color: var(--wht);

  :hover {
    background-color: var(--primaryFocus);
  }
`;

export const ButtonNegative = styled(ButtonRegister)`
  background-color: var(--primaryNegative);
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 20%;
  min-width: 302px;
  margin-top: 15px;

  button {
  }

  @media (max-width: 480px) {
    width: 90%;
    min-width: unset;
  }
`;

export const GoLogin = styled.button`
  height: 35px;
  width: 60px;
  border-style: none;
  border-radius: var(--radius1);
  background-color: var(--gray3);
  color: var(--gray0);

  :hover {
    background-color: var(--gray2);
  }
`;
