import React, { useRef, useEffect,useState } from "react";
import { AiOutlineArrowUp,AiOutlineMenu } from 'react-icons/ai'; // Import the up arrow icon
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/default.css'; // Import highlight.js default theme
import styles from "../styles/styles";
import { ToastContainer, toast } from 'react-toastify';  // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for react-toastify

const InteractiveQuiz = () => {
    const chatAreaRef = useRef(null);
    const [topic, setTopic] = useState("");
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(1);
    const [messageHistory, setMessageHistory] = useState([]); // Tracks user and AI messages
    const [showWelcome, setShowWelcome] = useState(true);
    const [showScoreboard, setShowScoreboard] = useState(true);
    const [roundScore, setRoundScore] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [dots, setDots] = useState(''); // State to track the number of dots
    const baseUrl = 'https://e05e-52-15-62-98.ngrok-free.app/';
    // const baseUrl = 'http://127.0.0.1:5000/'
    useEffect(() => {
        const handleTabClose = async (event) => {
            event.preventDefault();
            try {
                const jwtToken = localStorage.getItem('jwt');
                localStorage.removeItem('jwt');
                const headers = {};
                if (jwtToken && jwtToken !== 'null' && jwtToken !== '') {
                    headers['Authorization'] =  jwtToken;
                }
                await fetch(`${baseUrl}/clear`, {
                    method: 'GET',
                    headers:headers,
                    credentials: 'include', 
                });
            } catch (error) {
                // console.error("Error calling /clear endpoint", error);
            }
        };
        window.addEventListener("beforeunload", handleTabClose);
        return () => {
            window.removeEventListener("beforeunload", handleTabClose);
        };
    }, []);

    const convertKeysToLowerCase = (obj) => {
        if (Array.isArray(obj)) {
            return obj.map(convertKeysToLowerCase);
        } else if (obj !== null && typeof obj === 'object') {
            return Object.keys(obj).reduce((acc, key) => {
                const lowerCaseKey = key.toLowerCase();
                acc[lowerCaseKey] = convertKeysToLowerCase(obj[key]); 
                return acc;
            }, {});
        }
        return obj;
    };

    const handleTopicChange = (e) => {
        setTopic(e.target.value);
    };

    const handleKeyDown = (event) => {
        if (topic && event.key === 'Enter') {
          handleChatSubmit(); // Trigger submit when Enter is pressed
        }
      };

      const isValidJson = (str) => {
        try {   
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    };

    const scrollToBottom = () => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [messageHistory,currentQuestions]);

    useEffect(() => {
        let dotInterval;

        if (isGenerating) {
            dotInterval = setInterval(() => {
                setDots((prevDots) => {
                    if (prevDots.length < 3) {
                        return prevDots + '.';
                    }
                    return '';
                });
            }, 500); // Add a dot every 500ms
        } else {
            clearInterval(dotInterval); 
        }
        return () => clearInterval(dotInterval);
    }, [isGenerating]);

    const handleChatSubmit = async () => {
        setIsGenerating(true); 
        const topicValue = topic;
        setShowWelcome(false);
        setMessageHistory((prev) => [
            ...prev,
            { sender: "user", content: topic },
        ]);
        setTopic("");
        // https://cdcb-3-145-149-38.ngrok-free.app/getresponse
        try {
            const jwtToken = localStorage.getItem('jwt');
            const headers = {
                'Content-Type': 'application/json',
            };

            if (jwtToken && jwtToken !== 'null' && jwtToken !== '') {
                headers['Authorization'] =  jwtToken;
            }
            // console.log(jwtToken);
            const response = await fetch(`${baseUrl}getresponse`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ prompt: topicValue }),
                credentials: 'include' // Include cookies
            });

            if (!response.ok) {
                toast.error("Failed to generate questions, please try again", {
                    position: "top-right",
                    autoClose: 5000,  // Auto-close after 3 seconds
                    // hideProgressBar: true,
                    closeButton: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                // throw new Error('Failed to fetch questions from API');
            }

            const token = response.headers.get('Authorization'); 
            localStorage.setItem('jwt', token);
            // Read the streaming response in chunks
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let responseData = '';
            let temp = ''
            // Process each chunk of the streamed response
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break
                }
                
                let chunk = decoder.decode(value, {stream:true});
                chunk = chunk.replace(/<br \/>/g, '\n')
                // console.log('chink',chunk);
                responseData += (chunk);
                try {
                    temp = responseData;
                    if (isValidJson(temp)) {
                        temp = JSON.parse(temp);
                        setCurrentQuestions(temp);
                    } else if (isValidJson(temp + '"}]')) {
                        temp = JSON.parse(temp + '"}]');
                        setCurrentQuestions(temp);
                    } else if (isValidJson(temp + "]")) {
                        temp = JSON.parse(temp + "]");
                        setCurrentQuestions(temp);
                    } else if (isValidJson(temp + '"]}]')) {
                        temp = JSON.parse(temp + '"]}]');
                        setCurrentQuestions(temp);
                    } else {
                        // console.error("Failed to parse accumulated JSON:", responseData);
                    }
                } catch (e) {
                    // console.error('Error parsing JSON chunk:', e, responseData);
                }
            }
            try {
                if (!responseData.startsWith('[')) {
                    // Wrap in square brackets if not already an array
                    responseData = `[${responseData}]`;
                }
                // console.log('responsedata',responseData);
                let parsedData = JSON.parse(responseData); // Convert the string to an array
                // console.log('Parsed data as array:', convertKeysToLowerCase(parsedData));
                setCurrentQuestions(convertKeysToLowerCase(parsedData)); // Update the state with the array
                // console.log(parsedData);
                parsedData = '';
                temp = '';
                responseData = '';
            } catch (error) {
                // console.error('Error parsing JSON response:', error, responseData);
            }
    
        } catch (error) {
            // console.log(error);
            toast.error("Failed to generate questions, please try again", {
                position: "top-right",
                autoClose: 5000,  // Auto-close after 3 seconds
                // hideProgressBar: true,
                closeButton: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setIsGenerating(false); // Set loading state to false
        }
    };

    const handleAnswerChange = (questionId, selectedOption) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: selectedOption,
        }));
    };

    const submitRound = () => {
        // const questions = currentQuestions.filter((q) => q.id && q.question && q.options);

        const allAnswered = currentQuestions.every((q) => answers[q.id] !== undefined);
        if (!allAnswered) {
            toast.warn("Please answer all questions before submitting", {
                position: "top-right",
                autoClose: 3000,  // Auto-close after 3 seconds
                // hideProgressBar: true,
                closeButton: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        let rScore = 0;
        const evaluatedQuestions = currentQuestions.map((q) => ({
            ...q,
            userAnswer: answers[q.id],
            isCorrect: answers[q.id] ===  q.correctanswer,
        }));
        evaluatedQuestions.forEach((q) => {
            if (q.isCorrect) rScore += 1;
        });

        setRoundScore((prev) => ([
            ...prev,
            {round: round, s:rScore}
        ]));
        toast.info(`You attempted ${rScore} correctly out of ${currentQuestions.length}`, {
            position: "top-right",
            autoClose: 5000,  // Auto-close after 3 seconds
            // hideProgressBar: true,
            closeButton: true,
            pauseOnHover: true,
            draggable: true,
        });
        setMessageHistory((prev) => [...prev, { sender: "ai", round, questions: evaluatedQuestions }]);
        setScore((prev) => prev + rScore);
        setRound((prev) => prev + 1);
        setCurrentQuestions([]);
        setAnswers({});
    };

    const toggleScoreboard = () => {
        setShowScoreboard(!showScoreboard);
    };

    
    return (

        <div style={styles.container}>
            
            <div style={{...styles.scoreboard,
            width: showScoreboard ? "16%": "16%",
            transform: showScoreboard ? "translateX(0)" : "translateX(-8%)",
             background: showScoreboard ? "#f0f0f0": "",
                            borderRight:showScoreboard? "1px solid #ddd":"",}}>
                <AiOutlineMenu size={24} onClick={toggleScoreboard} style={styles.toggleIcon}></AiOutlineMenu>
                {showScoreboard && (<>
                    <h3>Scoreboard</h3>
                    <p>Total Score: {score}</p>
                    {roundScore.map((r) => (
                        <p key={r.round}>Round {r.round} score: {r.s}</p> 
                    )) }
                    
                    </>
                    )}
            </div>

            <div style={{...styles.chatWindow, }}>
                <div ref={chatAreaRef} style={{...showWelcome ? styles.WelcomechatArea : styles.chatArea}}>
                    {showWelcome && (
                        <div style={{...styles.welcomeMessage,}}>
                            <h3>Welcome to the Interactive Quiz Generator!</h3>
                            <p>Type your topic and number of questions to start the quiz.</p>
                        </div>  )}

                    {messageHistory.map((msg,idx) => (
                        <div style={styles.messageBlock}>                 
                            <div key={idx || msg.content } style={{...msg.sender === "user" ? styles.userBlock:"",}}>
                                <p style = {{display:"flex", justifyContent: msg.sender === "user" ? "flex-end":"",
                                    width:msg.sender==="user" ? "60%":"",
                                    
                                }}>
                                <span style={{ fontWeight: "bold", color: msg.sender === "user" ? "blue" : "green",}}>
                                    {msg.sender === "user" ? "You:" : "🤖: "}&nbsp;
                                </span>{" "}
                                    {msg.content}
                                </p>
                            </div>
                        <>
                            {msg.questions &&
                                msg.questions.map((q) => (
                                    <div key={q.id} style={styles.questionBlock}>
                                         <div>
                                    <strong>Q: <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex,rehypeHighlight]}>{(q.question)}</ReactMarkdown></strong>
                                    </div>
                                        {q.options.map((option) => {
                                            const isSelected = q.userAnswer === option;
                                            const isCorrect = q.correctanswer === option;
                                            const backgroundColor = isCorrect ? "#d9f5d3" : isSelected ? "#f5d4d3" : "transparent"; 
                                            const icon = isCorrect ? "✓" : isSelected ? "✘" : "";

                                            return (
                                                <div key={option} style={{ marginBottom: "5px", backgroundColor,padding: "5px", borderRadius: "5px" }}>
                                                    <label style={{ display: "flex", alignItems: "center" }}>
                                                        <input
                                                            type="radio"
                                                            value={option}
                                                            checked={q.userAnswer === option}
                                                            disabled
                                                            style={{ marginRight: "10px" }}
                                                        />
                                                        <span><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex,rehypeHighlight]}>{option}</ReactMarkdown></span>

                                                        <span style={{ marginLeft: "10px", fontSize: "18px", color: isCorrect ? "green" : "red" }}>
                                                            {icon}
                                                        </span>
                                                    </label>
                                                </div>
                                            );
                                        })}
                                        {q.isCorrect ? (
                                            <div key ={q.id} style={{ color: "green" }}>Explanation: <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex,rehypeHighlight]}>{q.explanation}</ReactMarkdown></div>
                                        ) : (
                                            <div key={q.id} style={{ color: "red" }}>Explanation: <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex,rehypeHighlight]}>{q.explanation}</ReactMarkdown></div>
                                        )}
                                    </div>
                                ))}
                        {/* </div> */}
                        </>
                        </div>

                    ))}

                            {isGenerating && (
                                <div key='generating' style={styles.generatingMessage}>
                                    <p>Generating{dots}<span className="ellipsis"></span></p>
                                </div>
                            )}

                    {currentQuestions.length > 0 && (
                        <div key='questions' style={styles.currentQuestions}>
                            
                            <p>
                                <span style={{ fontWeight: "bold", color: "green" }}>
                                    {"🤖"}:
                                </span>{" "}
                            </p>
                            {currentQuestions.map((q) => (
                                <div key={q.id} style={styles.questionBlock}>
                                     <div key='rm'>
                                    <strong>Q: <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]}>{(q.question)}</ReactMarkdown></strong>
                                    </div>
                                    {q.options?.map((option) => (
                                        <div key={option} style={{ 
                                        borderRadius: "5px" }}>
                                            <label style={{ display: "flex", alignItems: "center" }}>
                                                <input
                                                    type="radio"
                                                    name={`question-${q.id}`}
                                                    value={option}
                                                    checked={answers[q.id] === option}
                                                    onChange={() => handleAnswerChange(q.id, option)}
                                                    style={{ marginRight: "10px" }}
                                                />
                                            <span><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex,rehypeHighlight]}>{option}</ReactMarkdown></span>
                                           
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                    {currentQuestions.length === 0 ? (
                        <div style={{...styles.inputArea, cursor:"text"}} onClick={() => document.querySelector('input[type="text"]').focus()}>
                            <input
                                type="text"
                                placeholder="Type your prompt here (e.g. Generate 5 medium-level questions on machine learning.)"
                                onChange={handleTopicChange}
                                value = {topic}
                                onKeyDown={handleKeyDown}
                                style={styles.input}
                                required
                            />
                             <div
                                    onClick={handleChatSubmit} // Submit when icon is clicked
                                    style={{
                                    ...styles.iconButton,
                                    opacity: topic.trim() ? 1 : 0.5, // Active/inactive opacity
                                    cursor: topic.trim() ? 'pointer' : 'not-allowed', // Change cursor
                                    pointerEvents: isGenerating ? 'none' : 'auto', 
                                    }}
                                >
                            <AiOutlineArrowUp size={24} /> {/* Display up arrow icon */}
                            </div>
                        </div>
                    ) : (
                        <div style={styles.submit}>
                            <button onClick={submitRound} style={styles.submitButton}>
                                Submit Round
                            </button>
                        </div>
                    )}
                
            </div>
            <ToastContainer />
        </div>
    );
};




export default InteractiveQuiz;