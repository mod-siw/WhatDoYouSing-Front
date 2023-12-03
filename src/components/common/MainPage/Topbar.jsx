import React, { useState, useEffect } from "react";
import { styled, css } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const ITEM_LIST = [
  {
    id: 0,
    name: "홈",
    path: "/",
  },
  {
    id: 1,
    name: "검색",
    path: "/search",
  },
  {
    id: 2,
    name: "추천",
    path: "/recommend",
  },
];

const Topbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const currentTabId = ITEM_LIST.findIndex((item) => item.path === pathname);
    setCurrentTab(currentTabId !== -1 ? currentTabId : 0);
  }, [pathname]);

  const handleItemClick = (id) => {
    setCurrentTab(id);
    navigate(ITEM_LIST[id].path);
  };

  return (
    <Wrapper>
      <Container>
        <NavBar>
          {ITEM_LIST.map(({ id, name, path }) => (
            <NavItem
              key={id}
              onClick={() => handleItemClick(id)}
              selected={currentTab === id}
            >
              {name}
            </NavItem>
          ))}
        </NavBar>
        <UserProfile></UserProfile>
      </Container>
      <RoundDiv />
    </Wrapper>
  );
};

export default Topbar;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-end;

  width: 100%;
  height: 11.6rem;
  background: var(--black);

  color: var(--white);
  z-index: 9999;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 0 1.6rem 2.7rem;

  @media (min-width: 1100px) {
    padding: 0 16.8rem 2.7rem;
  }
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
`;

const NavItem = styled.div`
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  letter-spacing: -0.016rem;
  cursor: pointer;

  ${({ selected }) =>
    selected &&
    css`
      color: var(--pointPink);
    `};
`;

const UserProfile = styled.div`
  width: 4rem;
  height: 4rem;
  flex-shrink: 0;
  background-color: var(--gray);

  border-radius: 50%;
`;

const RoundDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 1.6rem;
  background-color: var(--white);
  border-radius: 1.6rem 1.6rem 0 0;
  z-index: 1;
`;
