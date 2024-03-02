import React, { useState, useEffect } from "react";
import { styled, css } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import { ReactComponent as Delete } from "../../images/delete.svg";
import { ReactComponent as Back } from "../../images/back.svg";

//recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { PostLyrics } from "../../apis/lyrics";
import {
  SignupState,
  ProfileState,
  PasModifyState,
  NicModifyState,
  LyricState,
  PasCheckState,
  postCheckModal,
  setPostCheckModal,
} from "../../assets/recoil/apiRecoil";

//modal
import { useToggleModal } from "../../hooks/useToggleModal";
import {
  modalContent1,
  modalContent2,
  modalState1,
  modalState2,
} from "../../assets/recoil/modal";
import PostModal from "./PostModal";
import LyricInput from "./LyricInput";

const ModalTopbar = ({
  text = "로그인",
  del = true,
  actBtn = false,
  btnText = "다음으로",
  isFilled = false,
  newPost,
  setNewPost,
  isOpen1,
  saveInputLyric,
  setCheckPost,
  uploCheckModal,
  setUploCheckModal,
  setSelectedTrack,
}) => {
  const navigate = useNavigate();
  const newLyricPost = useRecoilValue(LyricState);

  // modal close
  const { openModal } = useToggleModal();
  const { openModal2 } = useToggleModal();

  const [postModalItem, setPostModalItem] = useRecoilState(modalContent1);
  const [lyricModalItem, setLyricModalItem] = useRecoilState(modalContent2);

  const handlePostModal = () => {
    setPostModalItem(<PostModal />);
    openModal();
    // console.log("handlePostModal");
    setSelectedTrack((prevTrack) => ({
      ...prevTrack,
      lyric: "",
      name: "",
      artist: "",
    }));
  };

  const handleLyricModal = () => {
    setLyricModalItem(<LyricInput />);
    openModal2();
    // console.log("handleLyricModal");
  };

  const handleClick = async () => {
    if (isFilled) {
      switch (text) {
        case "직접 가사 입력하기":
          saveInputLyric();
          handleLyricModal();
          break;
        case "게시글 작성":
          const response = await PostLyrics(
            newLyricPost.lyrics,
            newLyricPost.content,
            newLyricPost.title,
            newLyricPost.singer,
            newLyricPost.link,
            newLyricPost.sings_emotion
          );
          const postId = response.data.id;

          if (response.data.message === "가사 작성 실패") {
            setCheckPost(true);
            console.log("setCheckPost: ", setCheckPost);
          }
          console.log(newLyricPost);
          console.log(postId);
          navigate(`/detail/${postId}`);
          break;
      }
    } else {
      setUploCheckModal(!uploCheckModal);
      console.log(uploCheckModal);
    }
  };

  return (
    <Wrapper>
      <Container>
        <ImgDiv>
          {del ? (
            <Delete
              onClick={() => {
                handlePostModal();
              }}
            />
          ) : (
            <Back
              onClick={() => {
                handleLyricModal();
              }}
            />
          )}
        </ImgDiv>
        <Title>{text}</Title>
        {actBtn ? (
          <NextBtn
            className="buttonDiv"
            isFilled={isFilled}
            onClick={handleClick}
          >
            {btnText}
          </NextBtn>
        ) : (
          <></>
        )}
      </Container>
    </Wrapper>
  );
};

export default ModalTopbar;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-end;

  width: 100%;
  height: 7.9rem;
  background: var(--white);

  color: var(--black);
  z-index: 260;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 0 1.6rem 2.7rem;

  @media (min-width: 1100px) {
    padding: 0 16.8rem 2.7rem;
  }
`;

const ImgDiv = styled.div`
  position: absolute;
  left: 1.6rem;

  cursor: pointer;

  @media (min-width: 1100px) {
    left: 16.8rem;
  }
`;

const Title = styled.div`
  color: var(--Black, #262121);
  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 800;
`;

const NextBtn = styled.button`
  position: absolute;
  display: flex;
  width: 8.1rem;
  height: 4.1rem;
  padding: 1.2rem 1.6rem;
  justify-content: center;
  align-items: center;
  right: 1.6rem;

  @media (min-width: 1100px) {
    right: 16.8rem;
  }

  flex-shrink: 0;
  border-radius: 1.6rem;
  background-color: ${(props) =>
    props.isFilled ? "var(--black)" : "var(--lightGray)"};
  color: ${(props) => (props.isFilled ? "var(--white)" : "var(--darkGray)")};
  text-align: center;

  font-size: 1.4rem;
  font-weight: 500;

  &:active {
    background-color: ${(props) =>
      props.isFilled ? "var(--pointPink)" : "var(--lightGray)"};
  }
`;
