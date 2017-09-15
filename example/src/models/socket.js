import IO from 'socket.io-client';
import _ from 'lodash';
import { socketUrl } from '../utils/config';

let __dispatch__;
let socket = { emit() {}, on() {} };

export default {
  namespace: 'socket',
  state: {
    fetching: true,
    mouseInfo: {},
    drawItems: [],
    drawI: false,
    selectItem: undefined,
    wBToolsInfo: {},
    pptConfig: {
      ppt: [
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_1.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=BanEdsHokSWPuOTVxvsDC9zExxE%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "tips": "Ask for each students name. Write it down to remember. Show enthusiasm when teaching each slide. Smile, make eye contact so students see you are engaged. Use body language to explain what you would like students to do, i.e standing up, raising hand, etc.",
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_1.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=BanEdsHokSWPuOTVxvsDC9zExxE%3D"
            }
          ],
          "id": "p10843",
          "page": 1,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_2.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=E3CH0i8tAuHjDFytQmeHh2XB088%3D",
              "video": "https://ppt-cdn.class100.com/ppts/766/G5L8_3.mp4?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=Pbp3kMaz2W5e2DAVFTdI2epKdPQ%3D"
            }
          ],
          "id": "p10845",
          "page": 2,
          "type": "video"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_4.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=uKmBKoxr86GrKyLbuuRLhVX12eI%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "tips": "Review with students the New words. \nDrill students using the Pen function to underline each word and circle the matching image. \n Listen for pronunciation. Repeat words as needed. \n Explain to students they will be using these words to practice Role playing on having a conversation about jobs.",
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_4.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=uKmBKoxr86GrKyLbuuRLhVX12eI%3D"
            }
          ],
          "id": "p10846",
          "page": 3,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_5.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=iHckrSk0qcUhET1Rf7bI9EpNZG4%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_5.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=iHckrSk0qcUhET1Rf7bI9EpNZG4%3D"
            }
          ],
          "id": "p10847",
          "page": 4,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_6.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=gsZ724R2vNOAe4WnjCPBeFAixa4%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_6.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=gsZ724R2vNOAe4WnjCPBeFAixa4%3D"
            }
          ],
          "id": "p10848",
          "page": 5,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_7.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=8hn5ENX0te%2FOsgIytVRwMnQzKUk%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_7.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=8hn5ENX0te%2FOsgIytVRwMnQzKUk%3D"
            }
          ],
          "id": "p10849",
          "page": 6,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_8.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=PAps9mnYfuLFvQ%2B5joicXYWRiqE%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_8.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=PAps9mnYfuLFvQ%2B5joicXYWRiqE%3D"
            }
          ],
          "id": "p10850",
          "page": 7,
          "type": "image"
        },
        {
          "content": [
            {
              "content": "Lucy’s mother is a housewife. Which one is her mother?",
              "id": "Q10080",
              "name": "Quiz 1",
              "options": [
                {
                  "content": "",
                  "id": "o10320",
                  "is_answer": 0,
                  "label": "A",
                  "poster": "https://ppt-cdn.class100.com/ppts/766/options/G5L8_9/a.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=Kx41uc7KpjqhXdCRpT1EEFncUYY%3D"
                },
                {
                  "content": "",
                  "id": "o10321",
                  "is_answer": 0,
                  "label": "B",
                  "poster": "https://ppt-cdn.class100.com/ppts/766/options/G5L8_9/b.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=MiahnnBVwyIA8qEVzEKGYD9QYtU%3D"
                },
                {
                  "content": "",
                  "id": "o10322",
                  "is_answer": 1,
                  "label": "C",
                  "poster": "https://ppt-cdn.class100.com/ppts/766/options/G5L8_9/c.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=%2B%2Bv4Qx1O9AVYnKnj2usr71kUzUg%3D"
                },
                {
                  "content": "",
                  "id": "o10323",
                  "is_answer": 0,
                  "label": "D",
                  "poster": "https://ppt-cdn.class100.com/ppts/766/options/G5L8_9/d.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=qoTCC0cBeyc8VvVuv3CH6s%2FFBI8%3D"
                }
              ],
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "type": "select_image"
            }
          ],
          "id": "p10851",
          "page": 8,
          "type": "question"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_10.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=IkrVXujRD38Tg4GrDR5BbfZmf70%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "tips": "Ask students if they can think of more jobs that were not listed in the previous slides. \n Type out their answers to create an additional list along side the power point slide. \n On the second “Brainstorm” slide and “Game 1” slide, drill students on each word and matching image. \n Listen for pronunciation. Repeat words as needed. \n Check for understanding. Go back to each slide and circle the image with the Pen function. Ask students, \"What is this?\"",
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_10.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=IkrVXujRD38Tg4GrDR5BbfZmf70%3D"
            }
          ],
          "id": "p10852",
          "page": 9,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_11.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=NFO234dOoZW3x1PSaPqJOmuII5I%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_11.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=NFO234dOoZW3x1PSaPqJOmuII5I%3D"
            }
          ],
          "id": "p10853",
          "page": 10,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_12.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=7vlDZo2nxns%2BVSII0Js7QJLKy1k%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_12.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=7vlDZo2nxns%2BVSII0Js7QJLKy1k%3D"
            }
          ],
          "id": "p10854",
          "page": 11,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_13.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=nzkj7XHlSPMITvn7qtuEN5qJ9uQ%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "tips": "Explain to students that these are the Key sentences they will use to have a conversation about what type of job a person has.\n Drill students on the example Key sentence.",
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_13.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=nzkj7XHlSPMITvn7qtuEN5qJ9uQ%3D"
            }
          ],
          "id": "p10855",
          "page": 12,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_14.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=8NekwEV5z9UCi5KXXKHVM6S23is%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "tips": "Choose two students to practice asking and answering. \n Drag each students’ picture to the blank space next to the Power Point. \n Rotate student participation so that all students practice. \n Toggle back to the slides that contain the jobs with matching images to help guide students as needed. \n Congratulate students for their good work.",
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_14.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=8NekwEV5z9UCi5KXXKHVM6S23is%3D"
            }
          ],
          "id": "p10856",
          "page": 13,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_15.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=la5qX4WlkgUAXUcu4NdM6urZ0fU%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_15.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=la5qX4WlkgUAXUcu4NdM6urZ0fU%3D"
            }
          ],
          "id": "p10857",
          "page": 14,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_16.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=i2noQvmiI%2B%2Ff4xBj0o06%2FwwF6mI%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_16.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=i2noQvmiI%2B%2Ff4xBj0o06%2FwwF6mI%3D"
            }
          ],
          "id": "p10858",
          "page": 15,
          "type": "image"
        },
        {
          "content": [
            {
              "content": " —— What’s your job? \n —— _____.",
              "id": "Q10081",
              "name": "Quiz 2",
              "options": [
                {
                  "content": "My job is a nurse",
                  "id": "o10324",
                  "is_answer": 0,
                  "label": "A",
                  "poster": ""
                },
                {
                  "content": "I am a nurse",
                  "id": "o10325",
                  "is_answer": 1,
                  "label": "B",
                  "poster": ""
                },
                {
                  "content": "She is a nurse",
                  "id": "o10326",
                  "is_answer": 0,
                  "label": "C",
                  "poster": ""
                },
                {
                  "content": "I want to be a nurse",
                  "id": "o10327",
                  "is_answer": 0,
                  "label": "D",
                  "poster": ""
                }
              ],
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "type": "select_text"
            }
          ],
          "id": "p10859",
          "page": 16,
          "type": "question"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_18.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=7%2FnYBuAYliznSm0F9l%2B%2FSHUR0HE%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "tips": "Explain to students practicing having a conversation about what type of job a person has using Key Words \"her\" and \"his\". \n Drill students on each word.",
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_18.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=7%2FnYBuAYliznSm0F9l%2B%2FSHUR0HE%3D"
            }
          ],
          "id": "p10860",
          "page": 17,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_19.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=IxyBHGejBB6kUz9fsMpbjc48sks%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "tips": "Choose two students to practice asking and answering. \n Drag each students’ picture to the blank space next to the Power Point. \n Rotate student participation so that all students practice. \n Congratulate students for their good work.",
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_19.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=IxyBHGejBB6kUz9fsMpbjc48sks%3D"
            }
          ],
          "id": "p10861",
          "page": 18,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_20.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=JLrx44WzEQ8Q1AjNZ393Yjk68wk%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_20.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=JLrx44WzEQ8Q1AjNZ393Yjk68wk%3D"
            }
          ],
          "id": "p10862",
          "page": 19,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_21.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=DBU9pXwQhlOrUIcpeLyK7RN0OPg%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_21.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=DBU9pXwQhlOrUIcpeLyK7RN0OPg%3D"
            }
          ],
          "id": "p10863",
          "page": 20,
          "type": "image"
        },
        {
          "content": [
            {
              "content": " —— What’s ____ job? \n —— She is an air hostess.",
              "id": "Q10082",
              "name": "Quiz 3",
              "options": [
                {
                  "content": "she’s",
                  "id": "o10328",
                  "is_answer": 0,
                  "label": "A",
                  "poster": ""
                },
                {
                  "content": "your",
                  "id": "o10329",
                  "is_answer": 0,
                  "label": "B",
                  "poster": ""
                },
                {
                  "content": "her",
                  "id": "o10330",
                  "is_answer": 1,
                  "label": "C",
                  "poster": ""
                },
                {
                  "content": "she",
                  "id": "o10331",
                  "is_answer": 0,
                  "label": "D",
                  "poster": ""
                }
              ],
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "type": "select_text"
            }
          ],
          "id": "p10864",
          "page": 21,
          "type": "question"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_23.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=S5ycqUibhOxtJYSsshBfFKtkXjE%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "tips": "Explain to students that these are the questions they will use to have a conversation about what they will be in the future and why. \n Drill students on the each question. Listen carefully for pronunciation.",
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_23.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=S5ycqUibhOxtJYSsshBfFKtkXjE%3D"
            }
          ],
          "id": "p10865",
          "page": 22,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_24.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=veVlY7xyXrxSXnKV4BiYMpC30y8%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "tips": "Drill students on each slide containing sample answers. \n Congratulate students for their good work.",
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_24.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=veVlY7xyXrxSXnKV4BiYMpC30y8%3D"
            }
          ],
          "id": "p10866",
          "page": 23,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_25.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=yJr9MaSCgepiUoWeOTN3f0ky2kA%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_25.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=yJr9MaSCgepiUoWeOTN3f0ky2kA%3D"
            }
          ],
          "id": "p10867",
          "page": 24,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_26.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=NpSn1663ituy88RZlETP1oXtlnw%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_26.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=NpSn1663ituy88RZlETP1oXtlnw%3D"
            }
          ],
          "id": "p10868",
          "page": 25,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_27.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=eBJ5RsRT7XeyUJMQba%2F7%2FDn%2FAkw%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_27.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=eBJ5RsRT7XeyUJMQba%2F7%2FDn%2FAkw%3D"
            }
          ],
          "id": "p10869",
          "page": 26,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_28.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=KWStxglPuakZ70zghBDi%2B69pmYM%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_28.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=KWStxglPuakZ70zghBDi%2B69pmYM%3D"
            }
          ],
          "id": "p10870",
          "page": 27,
          "type": "image"
        },
        {
          "content": [
            {
              "content": "I want to be a ____. Because I can cook for people.",
              "id": "Q10083",
              "name": "Quiz 4",
              "options": [
                {
                  "content": "",
                  "id": "o10332",
                  "is_answer": 0,
                  "label": "A",
                  "poster": "https://ppt-cdn.class100.com/ppts/766/options/G5L8_29/a.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=mY5AgfoVVKFnnujui2SlOrvvMEA%3D"
                },
                {
                  "content": "",
                  "id": "o10333",
                  "is_answer": 1,
                  "label": "B",
                  "poster": "https://ppt-cdn.class100.com/ppts/766/options/G5L8_29/b.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=afThScTWUw7PVzmnMOH1tKMScFg%3D"
                },
                {
                  "content": "",
                  "id": "o10334",
                  "is_answer": 0,
                  "label": "C",
                  "poster": "https://ppt-cdn.class100.com/ppts/766/options/G5L8_29/c.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=ATmTgoG6zRHTJN%2Fb9%2B7I3TejT%2Fc%3D"
                },
                {
                  "content": "",
                  "id": "o10335",
                  "is_answer": 0,
                  "label": "D",
                  "poster": "https://ppt-cdn.class100.com/ppts/766/options/G5L8_29/d.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=nsixqK2anPCiiWsjB5T3hG48eL0%3D"
                }
              ],
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "type": "select_image"
            }
          ],
          "id": "p10871",
          "page": 28,
          "type": "question"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_30.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=9WQnzNIP0iZhu5APx1PqVPuK93s%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "tips": "Explain to students that they will be playing a game about who they would take if they go to Mars. \n Drill students on the “Game” slide. Use the Pen function to circle the rocket or moon, to connect the planet Mars.",
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_30.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=9WQnzNIP0iZhu5APx1PqVPuK93s%3D"
            }
          ],
          "id": "p10872",
          "page": 29,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_31.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=DkAphTq1Ny5SI2XYgEyHQjstyQk%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "tips": "Drill students on the example. \n Using the Typing function, practice with different job types. i.e. \"if I go to Mars, I will take a teacher with me. A teacher will help me learn about Mars.\"",
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_31.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=DkAphTq1Ny5SI2XYgEyHQjstyQk%3D"
            }
          ],
          "id": "p10873",
          "page": 30,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_32.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=MAwcrQvY%2F3ySsTLQ4EFlIV4uw5g%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_32.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=MAwcrQvY%2F3ySsTLQ4EFlIV4uw5g%3D"
            }
          ],
          "id": "p10874",
          "page": 31,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_33.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=tHanItZlhIEnOCq7K%2BegM%2FgjO40%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_33.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=tHanItZlhIEnOCq7K%2BegM%2FgjO40%3D"
            }
          ],
          "id": "p10875",
          "page": 32,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_34.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=qZAUg3aJFZRBE%2Bbx8WEvMoGiZDc%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "tips": "Explain to students the homework. \n Use the Pen function to guide students through each sentence. \n Provide and example for students. \n Ask each student to write down the homework. \n Explain to students we will review this at the start of next class.",
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_34.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=qZAUg3aJFZRBE%2Bbx8WEvMoGiZDc%3D"
            }
          ],
          "id": "p10876",
          "page": 33,
          "type": "image"
        },
        {
          "content": [
            {
              "poster": "https://ppt-cdn.class100.com/ppts/766/G5L8_35.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=PWhRD619fwTQUVPv5a9CgSS1PEE%3D",
              "style": {
                "height": 600,
                "width": 800,
                "x": 0,
                "y": 0
              },
              "url": "https://ppt-cdn.class100.com/ppts/766/G5L8_35.png?Expires=1812799343&OSSAccessKeyId=LTAINwY5Hri5wwQL&Signature=PWhRD619fwTQUVPv5a9CgSS1PEE%3D"
            }
          ],
          "id": "p10877",
          "page": 34,
          "type": "image"
        },
      ],
      paused: true,
      current: 2,
    },
  },
  reducers: {
    initState(state, { mouse, wbTools, drawList }) {
      return { ...state, fetching: false, drawItems: JSON.parse(drawList) || [], wBToolsInfo: JSON.parse(wbTools) || {}, mouseInfo: JSON.parse(mouse) || {},  }
    },
    playChagne(state, { paused }) {
      return { ...state, pptConfig: { ...state.pptConfig, paused } };
    },
    setWbTools(state, { wBToolsInfo }) {
      return { ...state, wBToolsInfo: { ...state.wBToolsInfo, ...wBToolsInfo } };
    },
    setMouse(state, { mouseInfo }) {
      return { ...state, mouseInfo: { ...state.mouseInfo, ...mouseInfo } };
    },
    setDrawItems(state, { isDelete = false, drawItem = {}, deleteAll = false }) {
      if (isDelete) {
        if (deleteAll) {
          return {...state, drawItems: [] };
        } else {
          const index = _.findIndex(state.drawItems, _.matchesProperty('__ID__', drawItem.__ID__));
          if (index === -1) {
          } else {
            state.drawItems.splice(index, 1);
          }
        }
      } else {
        const index = _.findIndex(state.drawItems, _.matchesProperty('__ID__', drawItem.__ID__));
        if (index === -1) {
          state.drawItems.push(drawItem);
        } else {
          state.drawItems[index] = drawItem;
        }
      }
      return { ...state, drawItems: state.drawItems, selectItem: drawItem };
    },
    goTo(state, { current = 1 }) {
      return { ...state, pptConfig: { ...state.pptConfig, current } };
    },
  },
  effects: {
    *init() {
      socket = IO(socketUrl);
      socket.on('connect', () => {
        console.log('connect!');
      });
      socket.on('initReply', (res) => {
        const { data: { mouse, wbTools, drawList  } } = JSON.parse(res);
        __dispatch__({ type: 'initState', mouse, wbTools, drawList });
      });
      socket.on('wbToolsChangeReply', (res) => {
        const { data } = JSON.parse(res);
        __dispatch__({ type: 'setWbTools', wBToolsInfo: data });
      });
      socket.on('mouseGlobalChangeReply', (res) => {
        const { data } = JSON.parse(res);
        __dispatch__({ type: 'setMouse', mouseInfo: data });
      });
      socket.on('drawChangeReply', (res) => {
        const { data } = JSON.parse(res);
        console.log(data, 1111);
        __dispatch__({ type: 'setDrawItems', drawItem: data.item, clear: data.clear });
      });
      socket.on('deleteChangeReply', (res) => {
        const { data } = JSON.parse(res);
        __dispatch__({ type: 'setDrawItems', isDelete: true, drawItem: data.item, deleteAll: data.deleteAll });
      });

      socket.emit('init', JSON.stringify({ _EVENT_: 'initReply' }));
      window.IO = socket;
    },
    *wbToolsChange({ wBToolsInfo }, { put }) {
      try {
        yield put({ type: 'setWbTools', wBToolsInfo });
        socket.emit('wbToolsChange', JSON.stringify({ data: wBToolsInfo }));
      } catch (e) {
        console.log(e)
      }
    },
    *mouseMove({ mouseInfo }, { put }) {
      try {
        yield put({ type: 'setMouse', mouseInfo });
        socket.emit('mouseGlobalChange', JSON.stringify({ data: mouseInfo }));
      } catch (e) {
        console.log(e)
      }
    },
    *drawChange({ item }, { put }) {
      try {
        yield put({ type: 'setDrawItems', drawItem: item });
        socket.emit('drawChange', JSON.stringify({ data: { item } }));
      } catch (e) {
        console.log(e);
      }
    },
    *deleteChange({ item }, { put }) {
      try {
        yield put({ type: 'setDrawItems', isDelete: true, drawItem: item, deleteAll: item ? false : true });
        socket.emit('deleteChange', JSON.stringify({ data: { item, deleteAll: item ? false : true } }));
      } catch (e) {
        console.log(e);
      }
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      __dispatch__ = dispatch;
      // dispatch({ type: 'init' });
    },
  },
};
