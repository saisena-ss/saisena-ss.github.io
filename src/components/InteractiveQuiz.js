import React, { useState, useEffect } from "react";

const InteractiveQuiz = () => {
    // State variables
    const [topic, setTopic] = useState("");
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(1);
    const [history, setHistory] = useState([]);
    const [showWelcome, setShowWelcome] = useState(true);

    const sampleQuestions = {
        science: [
            { id: 1, question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2"], correct: "H2O", explanation: "Water is composed of two hydrogen atoms and one oxygen atom." },
            { id: 2, question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter"], correct: "Mars", explanation: "Mars is known as the Red Planet due to its reddish appearance." },
        ],
        history: [
            { id: 1, question: "Who discovered America?", options: ["Columbus", "Magellan", "Vespucci"], correct: "Columbus", explanation: "Christopher Columbus is credited with the discovery of America in 1492." },
            { id: 2, question: "In which year did WW2 end?", options: ["1940", "1945", "1950"], correct: "1945", explanation: "World War II ended in 1945 with the surrender of Japan." },
        ],
    };

    const handleTopicChange = (e) => {
        setTopic(e.target.value);
    };

    const handleChatSubmit = () => {
        if (sampleQuestions[topic.toLowerCase()]) {
            setCurrentQuestions(sampleQuestions[topic.toLowerCase()]);
            setShowWelcome(false); // Hide welcome message once the user starts chatting
        } else {
            alert("No questions available for this topic!");
        }
    };

    const handleAnswerChange = (questionId, selectedOption) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: selectedOption,
        }));
    };

    // Submit the round and calculate score
    const submitRound = () => {
        // Check if all questions are answered
        const allAnswered = currentQuestions.every((q) => answers[q.id] !== undefined);
        if (!allAnswered) {
            alert("Please answer all questions before submitting the round.");
            return;
        }

        let roundScore = 0;
        const evaluatedQuestions = currentQuestions.map((q) => ({
            ...q,
            userAnswer: answers[q.id],
            isCorrect: answers[q.id] === q.correct,
        }));

        evaluatedQuestions.forEach((q) => {
            if (q.isCorrect) roundScore += 1;
        });

        setHistory((prev) => [...prev, { round, questions: evaluatedQuestions }]);
        setScore((prev) => prev + roundScore);
        setRound((prev) => prev + 1);
        setCurrentQuestions([]);
        setAnswers({});
        alert(`Round ${round} completed! Score: ${roundScore}`);
    };

    return (
        <div style={styles.container}>
            {/* Left side: Scoreboard */}
            <div style={styles.scoreboard}>
                <h3>Scoreboard</h3>
                <p>Total Score: {score}</p>
                <p>Current Round: {round}</p>
            </div>

            {/* Main screen: Chat-like Quiz Area */}
            <div style={styles.chatWindow}>
                {/* Chat area */}
                <div style={styles.chatArea}>
                    {showWelcome && (
                        <div style={styles.welcomeMessage}>
                            <h3>Welcome to the Interactive Quiz!</h3>
                            <p>Enter a topic to start the quiz.</p>
                        </div>
                    )}

                    {history.map((entry, index) => (
                        <div key={index} style={styles.history}>
                            <h4>Round {entry.round} - Questions</h4>
                            {entry.questions.map((q) => (
                                <div key={q.id} style={styles.questionBlock}>
                                    <p>
                                        <strong>Q: {q.question}</strong>
                                    </p>
                                    {q.options.map((option) => (
                                        <div key={option}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value={option}
                                                    checked={q.userAnswer === option}
                                                    disabled
                                                />
                                                {option}
                                            </label>
                                        </div>
                                    ))}
                                    <p>Your Answer: {q.userAnswer || "Not Answered"}</p>
                                    <p>
                                        Correct Answer:{" "}
                                        <span style={{ color: q.isCorrect ? "green" : "red" }}>{q.correct}</span>
                                    </p>
                                    {q.isCorrect ? (
                                        <p style={{ color: "green" }}>{q.explanation}</p>
                                    ) : (
                                        <p style={{ color: "red" }}>Wrong Answer. {q.explanation}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}

                    {currentQuestions.length > 0 && (
                        <div style={styles.history}>
                            <h4>Round {round} - Questions</h4>
                            {currentQuestions.map((q) => (
                                <div key={q.id} style={styles.questionBlock}>
                                    <p>
                                        <strong>{q.question}</strong>
                                    </p>
                                    {q.options.map((option) => (
                                        <div key={option}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`question-${q.id}`}
                                                    value={option}
                                                    checked={answers[q.id] === option}
                                                    onChange={() => handleAnswerChange(q.id, option)}
                                                />
                                                {option}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Input area */}
                <div style={styles.inputArea}>
                    {currentQuestions.length === 0 ? (
                        <>
                            <input
                                type="text"
                                placeholder="Enter a topic (e.g., Science, History)"
                                value={topic}
                                onChange={handleTopicChange}
                                style={styles.input}
                            />
                            <button onClick={handleChatSubmit} style={styles.sendButton}>
                                Send
                            </button>
                        </>
                    ) : (
                        <button onClick={submitRound} style={styles.submitButton}>
                            Submit Round
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        flexWrap: "wrap",
    },
    scoreboard: {
        width: "16%",
        padding: "20px",
        background: "#f0f0f0",
        borderRight: "1px solid #ddd",
    },
    chatWindow: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        backgroundColor: "#ffffff",
    },
    chatArea: {
        flex: 1,
        overflowY: "auto",
        marginBottom: "20px",
    },
    inputArea: {
        display: "flex",
        alignItems: "center",
        borderTop: "1px solid #ddd",
        padding: "10px",
        gap: "10px",
    },
    input: {
        flex: 1,
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ddd",
        borderRadius: "5px",
    },
    sendButton: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    submitButton: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    questionBlock: {
        marginBottom: "20px",
    },
    history: {
        marginBottom: "30px",
        padding: "10px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "5px",
    },
    welcomeMessage: {
        textAlign: "center",
        // background: "lightgrey",
        padding: "10px",
        borderRadius: "5px",
        // border: "1px solid #ddd",
    },
};

export default InteractiveQuiz;