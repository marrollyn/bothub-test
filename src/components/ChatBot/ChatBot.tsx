import { Configuration, OpenAIApi } from "openai-edge";
import React, { useState } from "react";

// Конфигурация API
const configuration = new Configuration({
    apiKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MGE2ZTgxLTRiMDMtNGQxNC1hMGQxLWI3N2RkZjlkMDY2ZiIsImlzRGV2ZWxvcGVyIjp0cnVlLCJpYXQiOjE3MjA1Mjk0NDgsImV4cCI6MjAzNjEwNTQ0OH0.Dm8QJpXfX2ChWcYZ5c0SLNzGpmEmh1dYPAMW3wz4v5M",
    basePath: "https://bothub.chat/api/v2/openai/v1",
});

const openai = new OpenAIApi(configuration);

// // Функция для отправки сообщения и получения ответа
// async function sendMessage(messages) {
//     try {
//         const completion = await openai.createChatCompletion({
//             messages: messages,
//             model: "gemini-pro",
//         });
//         const message = (await completion.json()).choices[0].message.content;
//         return message;
//     } catch (error) {
//         console.error("Ошибка при получении ответа:", error);
//         return "Извините, произошла ошибка.";
//     }
// }

// // Пример использования функции
// (async () => {
//     const messages = [
//         { role: "user", content: "Привет! Как дела?" },
//         { role: "assistant", content: "Супер!" },
//         { role: "user", content: "Создай мне небольшой туду лист на React!" },
//     ];

//     const response = await sendMessage(messages);
//     console.log("Ответ от модели:", response);
// })();

interface Message {
    role: "user" | "assistant";
    content: string;
}

export function ChatBot() {
    
    const startMessages: Message[] = [
        { role: "user", content: "Привет! Как дела?" },
        { role: "assistant", content: "Супер!" },
        { role: "user", content: "Создай мне небольшой туду лист на React!" },
        {role: "assistant", content: "Готово :) Чем еще помощь?"}
    ];
    
    const [messages, setMessages] = useState<Message[]>(startMessages);
    const [input, setInput] = useState("");

    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Добавляем сообщение пользователя в состояние
        const userMessage: Message = { role: "user", content: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Очищаем поле ввода
        setInput("");

        try {
            const completion = await openai.createChatCompletion({
                messages: [...messages, userMessage],
                model: "gemini-pro",
            });

            const assistantMessage = (await completion.json()).choices[0].message
                .content as string;

            setMessages((prevMessages) => [
                ...prevMessages,
                { role: "assistant", content: assistantMessage },
            ]);
        } catch (error) {
            console.error("Ошибка при получении ответа:", error);
        }
    };

    return (
        <div>
            <h1>Чат с Gemini Pro</h1>
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    height: "300px",
                    overflowY: "scroll",
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{ textAlign: msg.role === "user" ? "right" : "left" }}
                    >
                        <strong>{msg.role === "user" ? "Вы:" : "Ассистент:"}</strong>{" "}
                        {msg.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Введите ваше сообщение"
                    required
                />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
}
