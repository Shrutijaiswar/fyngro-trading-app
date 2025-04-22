"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

const questions: Question[] = [
  {
    question: "What is a Demat account?",
    options: [
      "A type of savings account",
      "An electronic account to hold securities",
      "A credit card for traders",
      "A physical vault for storing share certificates",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which of these can you trade on Fyngro?",
    options: ["Cryptocurrencies", "Real estate", "Stocks and ETFs", "Commodities"],
    correctAnswer: 3,
  },
  {
    question: "What is a watchlist used for?",
    options: [
      "To track your favorite TV shows",
      "To monitor specific stocks you're interested in",
      "To set alarms for market opening times",
      "To list stocks you've already purchased",
    ],
    correctAnswer: 4,
  },
  {
    question: "How can you add funds to your Fyngro account?",
    options: [
      "By mailing a check",
      "Through cryptocurrency transfer",
      "By visiting a Fyngro office",
      "Using net banking or UPI",
    ],
    correctAnswer: 4,
  },
  {
    question: "What is the purpose of KYC in the account creation process?",
    options: [
      "To verify your identity",
      "To test your trading knowledge",
      "To set up your trading preferences",
      "To choose your account type",
    ],
    correctAnswer: 1,
  },
]

const FlowerDrop = ({ style }: { style: React.CSSProperties }) => (
  <div
    style={{
      position: "absolute",
      fontSize: "20px",
      ...style,
    }}
  >
    🌸
  </div>
)

const Celebration = ({
  score,
  totalQuestions,
  onClose,
}: { score: number; totalQuestions: number; onClose: () => void }) => {
  const [flowers, setFlowers] = useState<React.CSSProperties[]>([])

  useEffect(() => {
    const newFlowers = Array(50)
      .fill(0)
      .map(() => ({
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 2}s`,
      }))
    setFlowers(newFlowers)
  }, [])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="text-center text-white">
        <h2 className="text-6xl font-bold mb-4">Fantastic!</h2>
        <p className="text-2xl mb-8">
          You scored {score} out of {totalQuestions}
        </p>
        <div
          className="text-9xl font-bold"
          style={{
            background: "linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradient 5s ease infinite",
          }}
        >
          Fyngro
        </div>
        <Button onClick={onClose} className="mt-8 text-xl px-8 py-4">
          Close
        </Button>
      </div>
      {flowers.map((style, index) => (
        <FlowerDrop key={index} style={style} />
      ))}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fall {
          0% {
            transform: translateY(-100%) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        div > div > div {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  )
}

export function TradingQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const handleAnswerClick = (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer - 1) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
  }

  return (
    <Card className="p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Test Your Fyngro Knowledge</h2>
      {!showScore ? (
        <>
          <p className="mb-4">
            Question {currentQuestion + 1}/{questions.length}
          </p>
          <p className="mb-2">
            Current Score: {score} out of {currentQuestion + 1}
          </p>
          <p className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</p>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerClick(index)}
                className="w-full text-left justify-start"
                variant="outline"
              >
                {option}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <Celebration score={score} totalQuestions={questions.length} onClose={resetQuiz} />
      )}
    </Card>
  )
}
