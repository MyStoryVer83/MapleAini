/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package server.events;

import client.MapleCharacter;
import java.util.Iterator;
import java.util.concurrent.ScheduledFuture;
import net.server.Server;
import net.server.channel.Channel;
import server.TimerManager;
import server.PropertiesTable;
import server.maps.MapleMap;

/**
 * @author JavaScriptz
 * Elevador
 * Removido Elevator.js
 */
public class Elevador {

public static PropertiesTable propriedades;    
public MapleMap elevator_s, elevator_m, returnMap, arrive;
private ScheduledFuture<?> Tarefa;

        public Elevador () {
            /* Carrega tabela de propriedades */
            this.propriedades = new PropertiesTable();
            for (Channel cserv : Server.getInstance().getAllChannels()) {
                elevator_m = cserv.getMapFactory().getMap(222020211);
            }
            propriedades.setProperty("isUp", Boolean.FALSE);
            propriedades.setProperty("isDown", Boolean.FALSE);
            /* Registra as tarefas */
            onDown();
            
        }


        public final void onDown() {
            for (Channel cserv : Server.getInstance().getAllChannels()) {
                cserv.getMapFactory().getMap(222020100).resetReactors();
                arrive = cserv.getMapFactory().getMap(222020100);
                returnMap = cserv.getMapFactory().getMap(222020100);
                elevator_s = cserv.getMapFactory().getMap(222020110);
                elevator_m = cserv.getMapFactory().getMap(222020111);
            }
            propriedades.setProperty("isDown", Boolean.TRUE);
            Tarefa = TimerManager.getInstance().schedule(new Runnable() {
                @Override
                public void run() {
                       goingUp();
                }
            }, 60000);
            warpToD();
        }

        public void goingUp() {
            warpToM();
            propriedades.setProperty("isDown", Boolean.FALSE);
            Tarefa = TimerManager.getInstance().schedule(new Runnable() {
                @Override
                public void run() {
                       onUp();
                }
            }, 50000);
        }

        public void onUp() {
            for (Channel cserv : Server.getInstance().getAllChannels()) {
                cserv.getMapFactory().getMap(222020200).resetReactors();
                arrive = cserv.getMapFactory().getMap(222020200);
                returnMap = cserv.getMapFactory().getMap(222020200);
                elevator_s = cserv.getMapFactory().getMap(222020210);
                elevator_m = cserv.getMapFactory().getMap(222020211);
            }
            propriedades.setProperty("isUp", Boolean.TRUE);
            Tarefa = TimerManager.getInstance().schedule(new Runnable() {
                @Override
                public void run() {
                       goingDown();
                }
            }, 60000);
            warpToD();
        }

        public void goingDown() {
            propriedades.setProperty("isUp", Boolean.FALSE);
            Tarefa = TimerManager.getInstance().schedule(new Runnable() {
                @Override
                public void run() {
                       onDown();
                }
            }, 50000);
            warpToM();
        }

        public void warpToD() { 
            Iterator<MapleCharacter> temp1 = elevator_m.getCharacters().iterator();
            while(temp1.hasNext()) {
                temp1.next().changeMap(arrive, arrive.getPortal(0));
            }
        } 
        
        public static PropertiesTable getProperties() {
          return Elevador.propriedades;
        }
        
        public static boolean ElevadorDescendo() {
         return getProperties().getProperty("isDown").equals(Boolean.TRUE);
        }
        
        public static boolean ElevadorSubindo() {
         return getProperties().getProperty("isUp").equals(Boolean.TRUE);
        }
        
        public void warpToM() { 
            Iterator<MapleCharacter> temp1 = elevator_s.getCharacters().iterator();
            while(temp1.hasNext()) {
                temp1.next().changeMap(elevator_m, elevator_m.getPortal(0));
            }
        } 

        public void cancelSchedule() {
        }
}