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

public class Metro {

public static PropertiesTable propriedades;  
private ScheduledFuture<?> Tarefa;    
public long  beginTime = 30 * 1000, rideTime = 9 * 1000; 
public MapleMap PARACDF, paracf, parakern, PARAKERNIN, outra, aa, Orbis_Station;    
    
        public Metro () {
             /* Carrega tabela de propriedades */
            this.propriedades = new PropertiesTable();
            /* Seta mapas do Genio */
            for (Channel cserv : Server.getInstance().getAllChannels()) {
                PARACDF = cserv.getMapFactory().getMap(600010004);
                PARAKERNIN = cserv.getMapFactory().getMap(600010002);
                paracf = cserv.getMapFactory().getMap(600010005);
                parakern = cserv.getMapFactory().getMap(600010003);
                outra = cserv.getMapFactory().getMap(600010001);
                aa = cserv.getMapFactory().getMap(103000100);
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
          return Metro.propriedades;
        }
        
        public static boolean metroin () {
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