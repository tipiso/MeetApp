import signalR, {HubConnection} from '@microsoft/signalr';
import { User } from "@/types/users";
import { HUB_URL } from "@/utils/constants";

const signalRHandlers = () => {
    let hubConnection:HubConnection;
    const createHubConnection = (user: User) => {
        hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(HUB_URL + 'presence', {
                accessTokenFactory: () => user.token
            })
            .withAutomaticReconnect()
            .build();

        hubConnection.start().catch(error => console.log("[SignalR] start error:", error));
        hubConnection.on("UserIsOnline", username => {
            console.log("USER IS ONLINE", username);
        });
        hubConnection.on("UserIsOffline", username => {
            console.log("USER IS OFFLINE", username);
        });
    };

    const stopHubConnection = () => {
        hubConnection.stop().catch(error => console.log("[SignalR] stop error:", error));
    };

    return { stopHubConnection, createHubConnection };
}

export { signalRHandlers };