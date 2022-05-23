import React from 'react';
import ReactPlayer from 'react-player/youtube';

const About = () => {
  return (
    <div class="about">
      <h3>My work </h3>
      <p>
        The first page of this website was made by folowing this lesson on Youtube
      </p>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=f0X1Tl8aHtA&ab_channel=FromScratch-D%C3%A9veloppementWeb"
          controls
          className="react__player" 
        />
      <p>
        Then I add the Quizz page which was a good way for me to learn more about some react behaviour
      </p>
    </div>
  );
};

export default About;
