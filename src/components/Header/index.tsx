import React from "react";
import { styled } from "styled-components";
export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  min-height: 60px;
  background-color: inherit;
  top: 0;
`;
export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Header = () => {
  return (
    <Head>
      <LinkContainer>
        <img src={require("../../assets/photoeditorsdk-export.png")} alt="" />
      </LinkContainer>
    </Head>
  );
};

export default Header;
