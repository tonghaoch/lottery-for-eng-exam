import { useState } from "react"
import WRITEN_QUESTIONS from "./constants/questions"
import { Button, Card, Space, Rate, Typography } from "antd"
import { RedoOutlined } from "@ant-design/icons"

const { Title } = Typography

function getRandom(n, total) {
  const numbers = Array.from({ length: total }, (_, i) => i + 1)

  // Shuffle using Fisher-Yates algorithm
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[numbers[i], numbers[j]] = [numbers[j], numbers[i]]
  }

  return numbers.slice(0, n)
}

function App() {
  const [questions, setQuestions] = useState([])

  return (
    <div
      style={{
        width: "80vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
        justifySelf: "center",
      }}
    >
      <Title>Get your Exam questions</Title>
      {/* <Slider marks={marks} defaultValue={10} max={10} /> */}
      <Button
        type="primary"
        shape="round"
        icon={<RedoOutlined />}
        iconPosition="end"
        size="large"
        onClick={() => {
          setQuestions(getRandom(5, WRITEN_QUESTIONS.length - 1))
          // setC2EAudios(getRandom(1, C2E_AUDIOS.length))
          // setE2CAudios(getRandom(1, E2C_AUDIOS.length))
        }}
      >
        Get Questions!
      </Button>
      <Space direction="horizontal" size={16}>
        {questions.length > 0 &&
          questions.map((i) => (
            <Card
              key={WRITEN_QUESTIONS[i].question}
              style={{
                width: 250,
                height: 200,
              }}
              styles={{
                body: {
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                },
              }}
            >
              <p>{WRITEN_QUESTIONS[i].question}</p>
              <Rate
                disabled
                allowHalf
                defaultValue={WRITEN_QUESTIONS[i].score}
              />
            </Card>
          ))}
      </Space>
    </div>
  )
}

export default App
