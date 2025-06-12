import { useEffect, useRef, useState } from "react"
import WRITEN_QUESTIONS from "./constants/questions"
import { Button, Card, Space, Rate, Typography, Row, Col } from "antd"
import {
    PauseCircleOutlined,
    PlayCircleOutlined,
    RedoOutlined,
} from "@ant-design/icons"
import AUDIO_FILES from "./constants/audioQuestions"

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
    const [audioQuestion, setAudioQuestion] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef(null)

    const getRandomAudio = () => {
        const randomIndex = Math.floor(Math.random() * AUDIO_FILES.length)
        setAudioQuestion(AUDIO_FILES[randomIndex])
        setIsPlaying(false)
    }

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

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
                marginTop: "80px",
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
                                    width: "220px",
                                    minHeight: "195px",
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
            <Button
                type="primary"
                shape="round"
                icon={<RedoOutlined />}
                iconPosition="end"
                size="large"
                onClick={getRandomAudio}
            >
                Get Audio Question!
            </Button>
            {audioQuestion && (
                <Card style={{ minWidth: "200px", textAlign: "center" }}>
                    <Space direction="vertical">
                        <p>{audioQuestion.split(".")[0]}</p>
                        <Button
                            type="primary"
                            shape="circle"
                            size="large"
                            icon={
                                isPlaying ? (
                                    <PauseCircleOutlined />
                                ) : (
                                    <PlayCircleOutlined />
                                )
                            }
                            onClick={toggleAudio}
                        />
                        <audio
                            ref={audioRef}
                            src={`audio/${audioQuestion}`}
                            onEnded={() => setIsPlaying(false)}
                            preload="metadata"
                        />
                    </Space>
                </Card>
            )}
        </div>
    )
}

export default App
