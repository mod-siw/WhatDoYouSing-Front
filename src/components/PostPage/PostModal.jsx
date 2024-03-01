import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// import IntroTopbar from "../IntroTopbar";
import ModalTopbar from "./ModalTopbar";
import PostInput from "./PostInput";
import SearchTrackModal from "./SearchTrackModal";
import SelectLyricModal from "./SelectLyricModal";

const PostModal = ({
  newPost,
  setNewPost,
  lyricInputModal,
  setLyricInputModal,
}) => {
  const [requiredFieldsValid, setRequiredFieldsValid] = useState(false);
  const onBtn = (requiredFieldsValid) => {
    setRequiredFieldsValid(requiredFieldsValid);
  };

  const [postId, setPostId] = useState("");
  const handlePostIdReceived = (receivedPostId) => {
    setPostId(receivedPostId);
  };

  // 가사 검색/선택 모달 관리
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isSelectOpen, setSelectOpen] = useState(false);

  // 사용자가 선택한 음악 정보 관리
  const [selectedTrack, setSelectedTrack] = useState(null);
  console.log(selectedTrack);

  return (
    <>
      <Wrapper>
        <ModalTopbar
          text="게시글 작성"
          delPath="/"
          actBtn={true}
          btnText="게시하기"
          isFilled={requiredFieldsValid}
          onPostIdReceived={handlePostIdReceived}
          newPost={newPost}
          setNewPost={setNewPost}
        />
        <PostInput
          onBtn={onBtn}
          lyricInputModal={lyricInputModal}
          setLyricInputModal={setLyricInputModal}
          isLyricSearchOpen={isSearchOpen}
          setIsLyricSearchOpen={setSearchOpen}
          newPost={newPost}
          selectedTrack={selectedTrack}
          setSelectedTrack={setSelectedTrack}
        />
      </Wrapper>

      {isSearchOpen && (
        <SearchTrackModal
          {...{ setSearchOpen, setSelectOpen, isSelectOpen, setSelectedTrack }}
        />
      )}

      {isSelectOpen && (
        <SelectLyricModal
          {...{ setSearchOpen, setSelectOpen, selectedTrack, setSelectedTrack }}
        />
      )}
    </>
  );
};

export default PostModal;

const Wrapper = styled.div`
  /* width: calc(100% + 3.6rem); */
  width: 100%;
  height: 100%;
  position: fixed;
  margin-top: 7.9rem;

  overflow: scroll;
  background-color: white;
  z-index: 120;

  &::-webkit-scrollbar {
    display: none;
  }

  padding: 0 calc(100% * 1.6 / 39);

  @media (min-width: 1100px) {
    padding: 0 16.8rem;
  }
`;
