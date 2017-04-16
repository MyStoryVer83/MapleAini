/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package server.events;

import java.util.concurrent.ScheduledFuture;
import net.server.Server;
import net.server.channel.Channel;
import server.TimerManager;
import server.PropertiesTable;
import server.maps.MapleMap;

public class Aviao {

public static PropertiesTable propriedades;  
private ScheduledFuture<?> Tarefa;    
public long  beginTime = 30 * 1000, rideTime = 9 * 1000; 
public MapleMap PARACDF, paracf, parakern, PARAKERNIN, outra, aa, Orbis_Station;    
    
        public Aviao () {
             /* Carrega tabela de propriedades */
            this.propriedades = new PropertiesTable();
            /* Seta mapas do Genio */
            for (Channel cserv : Server.getInstance().getAllChannels()) {
                PARACDF = cserv.getMapFactory().getMap(540010100);
                PARAKERNIN = cserv.getMapFactory().getMap(540010001);
                paracf = cserv.getMapFactory().getMap(540010101);
                parakern = cserv.getMapFactory().getMap(540010002);
                outra = cserv.getMapFactory().getMap(540010000);
                aa = cserv.getMapFactory().getMap(103000000);
            }
            scheduleNew();
        }
        
        public final void scheduleNew() {   
            propriedades.setProperty("docked", Boolean.TRUE);
            propriedades.setProperty("entry", Boolean.TRUE);
            Tarefa = TimerManager.getInstance().schedule(new Runnable() {
                      @Override
                        public void run() {
                               takeoff();
                        }
             }, beginTime);
        }

        public void takeoff() {
            propriedades.setProperty("docked", Boolean.FALSE);
            propriedades.setProperty("entry", Boolean.FALSE);
            PARACDF.setDocked(false);
            PARAKERNIN.setDocked(false);
            PARACDF.warpEveryone(paracf.getId());
            PARAKERNIN.warpEveryone(parakern.getId());
            Tarefa = TimerManager.getInstance().schedule(new Runnable() {
                      @Override
                        public void run() {
                               arrived();
                        }
             }, rideTime);
        }
        
        public static PropertiesTable getProperties() {
          return Aviao.propriedades;
        }
        
        public static boolean avini () {
            return getProperties().getProperty("entry").equals(Boolean.TRUE);
        }

        public void arrived() {
                paracf.warpEveryone(outra.getId());
                parakern.warpEveryone(aa.getId());
                scheduleNew();
        }

        public void cancelSchedule() {
        }
}