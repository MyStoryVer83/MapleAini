package net.server.channel.handlers;

import client.MapleCharacter;
import client.MapleClient;
import net.AbstractMaplePacketHandler;
import server.partyquest.mcpq.MCField;
import server.partyquest.mcpq.MCTracker;
import server.partyquest.mcpq.MonsterCarnival;
import tools.data.input.SeekableLittleEndianAccessor;

public class MonsterCarnivalHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        int tab = slea.readByte();
        int num = slea.readByte();
        MapleCharacter chr = c.getPlayer();

        if (MonsterCarnival.DEBUG) {
            MCTracker.log("[MCHandler] " + chr.getName() + " used tab "  + tab + " num " + num);
            System.out.println("[MCHandler] " + chr.getName() + " used tab "  + tab + " num " + num);
        }

        if (chr.getMCPQField() == null || chr.getMCPQParty() == null) {
            MCTracker.log("[MCHandler] " + chr.getName() + " attempting to use Monster Carnival handler without being in Monster Carnival");
            return;
        }

        MCField field = chr.getMCPQField();
        if (tab == 0) {
            field.onAddSpawn(c.getPlayer(), num);
        } else if (tab == 1) {
            field.onUseSkill(c.getPlayer(), num);
        } else if (tab == 2) { // status
            field.onGuardianSummon(c.getPlayer(), num);
        }
    }
}  