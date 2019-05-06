import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 5px 20px -5px #222;
  margin: 0 10px;

  display: flex;
  flex-direction: column;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      &:nth-of-type(odd) {
        background: #f5f5f5;
      }
    }
    small {
      font-weight: normal;
      font-size: 12px;
      color: #999;
      font-style: italic;
    }
  }

  .buttonContainer {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: 0 10px;

    button {
      background: none;
      border: 0;
      width: 40px;
      height: 40px;

      font-family: sans-serif;
      font-weight: bold;
      font-size: 16px;
      color: #999;
    }
  }
`;
