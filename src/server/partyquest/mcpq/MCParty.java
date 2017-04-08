package server.partyquest.mcpq;

import client.MapleCharacter;
import client.MapleDisease;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Random;
import net.server.Server;
import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;
import server.life.MobSkill;
import server.life.MobSkillFactory;
import server.maps.MapleMap;
import server.partyquest.mcpq.MCField.MCTeam;
import tools.MaplePacketCreator;
import tools.MonsterCarnivalPacket;

/**
 * Provides an interface for Monster Carnival-specific party methods and variables.
 *
 * @author s4nta
 */
public class MCParty {

    private MapleParty party;
    private List<MapleCharacter> characters = new ArrayList<>();
    private int availCP = 0;
    private int totalCP = 0;
    private MCField.MCTeam team = MCField.MCTeam.NONE;
    private MCField field;
    private MCParty enemy;

    public MCParty(MapleParty party) {
        this.party = party;
        for (MaplePartyCharacter chr : party.getMembers()) {
            if (!chr.isOnline()) continue;
            MapleCharacter c = Server.getInstance().getChannel(chr.getWorld(), chr.getChannel()).getPlayerStorage().getCharacterById(chr.getId());

            characters.add(c);
        }
    }

    public int getSize() {
        return this.characters.size();
    }

    /**
     * Checks if the underlying MapleParty still exists in the same way it did when it was created.
     * That is, if there were no players who left the party.
     *
     * [MENTION=850422]return[/MENTION] True if the underlying MapleParty still exists in its original format.
     */
    public boolean exists() {
        Collection<MapleCharacter> members = getMembers();
        for (MapleCharacter chr : members) {
            if (chr.getParty() == null || chr.getParty() != this.party) {
                return false;
            }
        }
        return true;
    }

    public int getAverageLevel() {
        int sum = 0, num = 0;
        for (MapleCharacter chr : getMembers()) {
            sum += chr.getLevel();
            num += 1;
        }
        return sum / num;
    }

    public boolean checkLevels() {
        if (MonsterCarnival.DEBUG) {
            return true;
        }
        for (MapleCharacter chr : getMembers()) {
            int lv = chr.getLevel();
            if (lv < MonsterCarnival.MIN_LEVEL || lv > MonsterCarnival.MAX_LEVEL) {
                return false;
            }
        }
        return true;
    }

    public boolean checkChannels() {
        if (MonsterCarnival.DEBUG) {
            return true;
        }
        for (MapleCharacter chr : getMembers()) {
            if (chr.getClient().getChannel() != party.getLeader().getChannel()) return false;
        }
        return true;
    }

    public boolean checkMaps() {
        if (MonsterCarnival.DEBUG) {
            return true;
        }
        for (MapleCharacter chr : getMembers()) {
            if (chr.getMapId() != MonsterCarnival.MAP_LOBBY) return false;
        }
        return true;
    }

    public void warp(int map) {
        for (MapleCharacter chr : getMembers()) {
            chr.changeMap(map);
        }
    }

    public void warp(MapleMap map) {
        for (MapleCharacter chr : getMembers()) {
            chr.changeMap(map, map.getPortal(0));
        }
    }

    public void warp(MapleMap map, String portal) {
        for (MapleCharacter chr : getMembers()) {
            chr.changeMap(map, map.getPortal(portal));
        }
    }

    public void warp(MCField.MCMaps type) {
        MapleMap m = this.field.getMap(type);
        for (MapleCharacter chr : getMembers()) {
            chr.changeMap(m, m.getPortal(0));
        }
    }

    public void clock(int secs) {
        for (MapleCharacter chr : getMembers()) {
            chr.getClient().announce(MaplePacketCreator.getClock(secs));
        }
    }

    public void notice(String msg) {
        broadcast(MaplePacketCreator.serverNotice(6, msg));
    }

    public void broadcast(byte[] pkt) {
        for (MapleCharacter chr : getMembers()) {
            chr.getClient().announce(pkt);
        }
    }

    /**
     * Sets MCPQTeam, MCPQParty, and MCPQField for a given character.
     * [MENTION=2000183830]para[/MENTION]m chr Character to update.
     */
    public void updatePlayer(MapleCharacter chr) {
        chr.setMCPQTeam(this.team);
        chr.setMCPQParty(this);
        chr.setMCPQField(this.field);
    }

    /**
     * Sets MCPQTeam, MCPQParty, and MCPQ field for all characters in the party.
     * Unlike deregisterPlayers, this method does NOT warp players to the lobby map.
     */
    public void updatePlayers() {
        for (MapleCharacter chr : getMembers()) {
            this.updatePlayer(chr);
        }
    }

    /**
     * Resets MCPQ variables for a given character.
     * [MENTION=2000183830]para[/MENTION]m chr Character to reset.
     */
    public static void deregisterPlayer(MapleCharacter chr) {
        chr.setMCPQTeam(MCTeam.NONE);
        chr.setMCPQParty(null);
        chr.setMCPQField(null);

        chr.setAvailableCP(0);
        chr.setTotalCP(0);
    }

    /**
     * Resets MCPQ variables for all characters in the party.
     * Unlike updatePlayers, this method DOES warp players to the lobby map.
     */
    public void deregisterPlayers() {
        for (MapleCharacter chr : getMembers()) {
            MCParty.deregisterPlayer(chr);
            chr.changeMap(MonsterCarnival.MAP_EXIT);
        }
    }

    public void removePlayer(MapleCharacter chr) {
        characters.remove(chr);
        deregisterPlayer(chr);
    }

    public void startBattle() {
        for (MapleCharacter chr : characters) {
            chr.getClient().getSession().write(MonsterCarnivalPacket.startCPQ(chr));
        }
    }

    /**
     * Uses some amount of available CP.
     * [MENTION=2000183830]para[/MENTION]m use A positive integer to be subtracted from available CP.
     */
    public void loseCP(int use) {
        // TODO: locks?
        if (use < 0) {
            System.err.println("Attempting to use negative CP.");
        }
        this.availCP -= use;
    }

    public void gainCP(int gain) {
        // TODO: locks?
        this.availCP += gain;
        this.totalCP += gain;
    }

    public MCParty getEnemy() {
        return enemy;
    }

    public void setEnemy(MCParty enemy) {
        this.enemy = enemy;
    }

    /**
     * Applies a MCSkill to the entire team. This is used on the team's own players
     * because it is called when the enemy team uses a debuff/cube of darkness.
     * [MENTION=2000183830]para[/MENTION]m skill Skill to apply.
     * [MENTION=850422]return[/MENTION] True if skill was applied, false otherwise.
     */
    public boolean applyMCSkill(MCSkill skill) {
        MobSkill s = MobSkillFactory.getMobSkill(skill.getMobSkillID(), skill.getLevel());
        MapleDisease disease = MapleDisease.getType(skill.getMobSkillID());
        if (disease == null) {
            disease = MapleDisease.DARKNESS;
            s = MobSkillFactory.getMobSkill(121, 6); // HACK: darkness
        } else if (disease == MapleDisease.POISON) {
            return false;
        }

        // We only target players on the battlefield map.
        if (skill.getTarget() == 2) {
            for (MapleCharacter chr : getMembers()) {
                if (MonsterCarnival.isBattlefieldMap(chr.getMapId())) {
                    chr.giveDebuff(disease, s);
                }
            }
            return true;
        } else {
            if (getRandomMember() != null) {
                getRandomMember().giveDebuff(disease, s);
                return true;
            } else {
                return false;
            }
        }
    }

    public void setField(MCField field) {
        this.field = field;
    }

    public void setTeam(MCTeam newTeam) {
        this.team = newTeam;
    }

    public MCTeam getTeam() {
        return team;
    }

    /**
     * Returns a collection of online members in the party.
     * [MENTION=850422]return[/MENTION] Online MCParty members.
     */
    public Collection<MapleCharacter> getMembers() {
        return this.characters;
    }

    public MapleCharacter getRandomMember() {
        List<MapleCharacter> chrsOnMap = new ArrayList<>();
        for (MapleCharacter chr : this.characters) {
            if (MonsterCarnival.isBattlefieldMap(chr.getMapId())) {
                chrsOnMap.add(chr);
            }
        }
        if (chrsOnMap.isEmpty()) {
            return null;
        }
        return chrsOnMap.get(new Random().nextInt(chrsOnMap.size()));
    }

    public int getAvailableCP() {
        return availCP;
    }

    public int getTotalCP() {
        return totalCP;
    }
}  