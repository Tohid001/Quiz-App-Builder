import React, { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import { Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import getCachedState from "../utils/getCachedState";
import { NavLink } from "react-router-dom";
import { StyledGrid, StyledQuizCard } from "./Home.styled";

function Home() {
  const [quizes] = useState(getCachedState("quizes") || []);
  console.log({ quizes });
  return (
    <div>
      <Header />
      <StyledGrid>
        {quizes?.map((quiz, index) => (
          <StyledQuizCard key={quiz.id}>
            <small>{quiz.id}</small>
            <div>
              <h4>{quiz.quizeText}</h4>
            </div>
            <div>
              <p>{quiz.quizeDescription}</p>
            </div>
            <div>
              <span>
                <NavLink to={`view/${quiz.id}`}>
                  <EyeOutlined />
                </NavLink>
              </span>
            </div>
          </StyledQuizCard>
        ))}
      </StyledGrid>
    </div>
  );
}

export default Home;
