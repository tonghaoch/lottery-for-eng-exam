import { useEffect, useState } from "react"
import WRITEN_QUESTIONS from "./constants/questions"
import { Button, Card, Space, Rate, Typography, Row, Col } from "antd"
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

  useEffect(() => {
    var setVanta = () => {
      if (window.VANTA)
        window.VANTA.NET({
          el: "body",
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: window.innerHeight,
          scale: 1.0,
          scaleMobile: 1.0,
        })
    }
    setVanta()
  }, [])

  return (
    <div
      style={{
        width: "95vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
      }}
    >
      <Title style={{ color: "white" }}>Get your Exam questions</Title>
      {/* <Slider marks={marks} defaultValue={10} max={10} /> */}
      <Button
        type="primary"
        shape="round"
        icon={<RedoOutlined />}
        iconPosition="end"
        size="large"
        onClick={() => {
          setQuestions(getRandom(5, WRITEN_QUESTIONS.length - 1))
        }}
      >
        Get Questions!
      </Button>
      <Row gutter={[16, 16]}>
        {questions.length > 0 &&
          questions.map((i) => (
            <Col
              xs={{ flex: "100%" }}
              sm={{ flex: "50%" }}
              md={{ flex: "40%" }}
              lg={{ flex: "30%" }}
              xl={{ flex: "20%" }}
              key={WRITEN_QUESTIONS[i].question}
            >
              <Card
                style={{
                  minWidth: 280,
                  height: 200,
                  fontSize: "16px",
                }}
                styles={{
                  body: {
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
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
            </Col>
          ))}
      </Row>
    </div>
  )
}

export default App
