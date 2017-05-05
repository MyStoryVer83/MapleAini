/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package server.maps;

import client.MapleClient;

import java.awt.Rectangle;
import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import scripting.reactor.ReactorScriptManager;
import server.TimerManager;
import tools.MaplePacketCreator;
import tools.Pair;

/**
 *
 * @author Lerk
 */
public class MapleReactor extends AbstractMapleMapObject {

    private int rid;
    private MapleReactorStats stats;
    private byte state;
    private int delay;
    private MapleMap map;
    private String name;  
    private boolean alive;
    private boolean shouldCollect;
    private Lock reactorLock = new ReentrantLock(true);

    public MapleReactor(MapleReactorStats stats, int rid) {
        this.stats = stats;
        this.rid = rid;
        alive = true;
    }

    public void setShouldCollect(boolean collect) {
        this.shouldCollect = collect;
    }

    public boolean getShouldCollect() {
        return shouldCollect;
    }
    
    public void lockReactor() {
       reactorLock.lock();
    }
    
    public void unlockReactor() {
       reactorLock.unlock();
    }   
    
    public void setState(byte state) {
        this.state = state;
    }
      
    public byte getState() {
        return state;
    }
    
    public MapleReactorStats getStats() {
        return stats;
    }
    
    public int getId() {
        return rid;
    }

    public void setDelay(int delay) {
        this.delay = delay;
    }

    public int getDelay() {
        return delay;
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.REACTOR;
    }

    public int getReactorType() {
        return stats.getType(state);
    }

    public void setMap(MapleMap map) {
        this.map = map;
    }

    public MapleMap getMap() {
        return map;
    }

    public Pair<Integer, Integer> getReactItem(byte index) {
        return stats.getReactItem(state, index);
    }

    public boolean isAlive() {
        return alive;
    }

    public void setAlive(boolean alive) {
        this.alive = alive;
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        client.announce(makeDestroyData());
    }

    public final byte[] makeDestroyData() {
        return MaplePacketCreator.destroyReactor(this);
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        client.announce(makeSpawnData());
    }

    public final byte[] makeSpawnData() {
        return MaplePacketCreator.spawnReactor(this);
    }

    public void forceHitReactor(final byte newState) {
        this.lockReactor();
        try {
            setState((byte) newState);
            this.setShouldCollect(true);
        } finally {
            this.unlockReactor();
        }
        map.broadcastMessage(MaplePacketCreator.triggerReactor(this, (short) 0));
    }

    public void delayedHitReactor(final MapleClient c, long delay) {
        TimerManager.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                hitReactor(c);
            }
        }, delay);
    }

    public void hitReactor(MapleClient c) {
        hitReactor(0, (short) 0, 0, c);
    }

    public synchronized void hitReactor(int charPos, short stance, int skillid, MapleClient c) {
        try {
            if (!this.isAlive()) {
                return;
            }
            if (c.getPlayer().getMCPQField() != null) {
                c.getPlayer().getMCPQField().onGuardianHit(c.getPlayer(), this);
                return;
            }
            int reactorType = stats.getType(state);
            if (reactorType < 999 && reactorType != -1) {//type 2 = only hit from right (kerning swamp plants), 00 is air left 02 is ground left
                if (!(reactorType == 2 && (stance == 0 || stance == 2))) { //get next state
                    for (byte b = 0; b < stats.getStateSize(state); b++) {//YAY?
                        List<Integer> activeSkills = stats.getActiveSkills(state, b);
                        if (activeSkills != null) {
                            if (!activeSkills.contains(skillid)) {
                                continue;
                            }
                        }
                        state = stats.getNextState(state, b);
                        if (stats.getNextState(state, b) == -1) {//end of reactor
                            if (stats.getType(state) < 100) {//reactor broken
                                if (delay > 0) {
                                    map.destroyReactor(getObjectId());
                                } else {//trigger as normal
                                    map.broadcastMessage(MaplePacketCreator.triggerReactor(this, stance));
                                }
                            } else {//item-triggered on final step
                                map.broadcastMessage(MaplePacketCreator.triggerReactor(this, stance));
                            }
                            ReactorScriptManager.getInstance().act(c, this);
                        } else { //reactor not broken yet
                            map.broadcastMessage(MaplePacketCreator.triggerReactor(this, stance));
                            if (state == stats.getNextState(state, b)) {//current state = next state, looping reactor
                                ReactorScriptManager.getInstance().act(c, this);
                            }
                            setShouldCollect(true);
                        }
                        break;
                    }
                }
            } else {
                state++;
                map.broadcastMessage(MaplePacketCreator.triggerReactor(this, stance));
                ReactorScriptManager.getInstance().act(c, this);
                setShouldCollect(true);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Rectangle getArea() {
        return new Rectangle(getPosition().x + stats.getTL().x, getPosition().y + stats.getTL().y, stats.getBR().x - stats.getTL().x, stats.getBR().y - stats.getTL().y);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
