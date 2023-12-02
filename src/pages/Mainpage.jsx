import React, { useState } from "react";
import styled from "styled-components";

//components
import LyricsItem from "../components/common/LyricsItem";
import EmotionList from "../components/common/EmotionList";
import DropDownBox from "../components/common/DropDownBox";

import Topbar from "../components/common/MainPage/Topbar";

const MainPage = () => {
  return (
    <Wrapper>
      <Topbar />
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled.div``;
