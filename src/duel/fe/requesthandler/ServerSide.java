package duel.fe.requesthandler;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;

@ServerEndpoint("/ws")
public class ServerSide {

    private HashMap<String, String> peers;

    @OnOpen
    public void open(Session s) throws IOException {
        System.out.println("WebSocket opened with ID "+s.getId());
        s.getBasicRemote().sendText("NAME");
        System.out.println();
    }

    @OnClose
    public void close(Session session, CloseReason reason){
        String reasonPhrase = reason.getReasonPhrase().isEmpty() ? "" : " because "+reason.getReasonPhrase();
        System.out.println("Connection with "+session.getId()+" closed"+reasonPhrase+".");
        System.out.println();
    }

    @OnMessage
    public void handleMessage(String message, Session session) throws IOException {
        System.out.println("Received message from session "+session.getId()+": "+message);
        System.out.println();

        String result = process(message, session);

        if(!result.equals("NULL")){
            try{ session.getBasicRemote().sendText(result); }
            catch (IOException io){ io.printStackTrace(); }
        }
    }

    private String process(String message, Session session) {
        if(message.length() > 6 && message.substring(0,6).equals("NAME")){
            peers.put(session.getId(), message.substring(6));
            System.out.println("Session "+session.getId()+" registered as "+message.substring(6));
            return "NULL";
        }
        if(message.equals("Ping")) return "Ping back!";
        return "That was not a ping >:(";
    }

}
