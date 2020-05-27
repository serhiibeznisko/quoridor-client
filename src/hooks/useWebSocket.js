import React, {useEffect, useState} from "react";

const useWebSocket = (roomName, onEvent) => {
    const [client, setClient] = useState(null);

    useEffect(() => {
        const socketClient = new WebSocket(
            `ws://localhost:8001/ws/room/${roomName}`
        );

        socketClient.onmessage = function(e) {
            onEvent(JSON.parse(e.data));
        };

        socketClient.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        socketClient.sendJson = (data) => {
            return socketClient.send(JSON.stringify(data));
        };

        setClient(socketClient);
    }, []);

    return client;
};


export default useWebSocket;
