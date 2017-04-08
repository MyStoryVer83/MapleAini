package tools;

import client.MapleCharacter;
import net.SendOpcode;
import server.partyquest.mcpq.MCParty;
import tools.data.output.MaplePacketLittleEndianWriter;


public class MonsterCarnivalPacket {

    public static byte[] startCPQ(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendOpcode.MONSTER_CARNIVAL_START.getValue());
        mplew.write(chr.getTeam()); //team
        mplew.writeShort(chr.getAvailableCP()); //Available CP
        mplew.writeShort(chr.getTotalCP()); //Total Obtained CP
        mplew.writeShort(chr.getMCPQField().getRed().getAvailableCP()); //Available CP of the team
        mplew.writeShort(chr.getMCPQField().getRed().getTotalCP()); //Total Obtained CP of the team
        mplew.writeShort(chr.getMCPQField().getBlue().getAvailableCP()); //Available CP of the team
        mplew.writeShort(chr.getMCPQField().getBlue().getAvailableCP()); //Total Obtained CP of the team
        mplew.writeShort(0); //Probably useless nexon shit
        mplew.writeLong(0); //Probably useless nexon shit
        return mplew.getPacket();
    }

    public static byte[] updatePersonalCP(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendOpcode.MONSTER_CARNIVAL_OBTAINED_CP.getValue());
        mplew.writeShort(chr.getAvailableCP()); //Obtained CP - Used CP
        mplew.writeShort(chr.getTotalCP()); //Total Obtained CP
        return mplew.getPacket();
    }

    public static byte[] updatePartyCP(MCParty pty) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendOpcode.MONSTER_CARNIVAL_PARTY_CP.getValue());
        mplew.write(pty.getTeam().code); //Team where the points are given to.
        mplew.writeShort(pty.getAvailableCP()); //Obtained CP - Used CP
        mplew.writeShort(pty.getTotalCP()); //Total Obtained CP
        return mplew.getPacket();
    }

    public static byte[] CPQSummon(int tab, int num, String name) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendOpcode.MONSTER_CARNIVAL_SUMMON.getValue());
        mplew.write(tab); //Tab
        mplew.write(num); //Number of summon inside the tab
        mplew.writeMapleAsciiString(name); //Name of the player that summons
        return mplew.getPacket();
    }

    public static byte[] CPQDied(MapleCharacter player, int loss) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendOpcode.MONSTER_CARNIVAL_DIED.getValue());
        mplew.write(player.getTeam()); //Team
        mplew.writeMapleAsciiString(player.getName()); //Name of the player that died
        mplew.write(loss); //Lost CP
        return mplew.getPacket();
    }

    /**
     * Sends a CPQ Message
     *
     * Possible values for <code>message</code>:<br>
     * 1: You don't have enough CP to continue.
     * 2: You can no longer summon the Monster.
     * 3: You can no longer summon the being.
     * 4: This being is already summoned.
     * 5:     This request has failed due to an unknown error.
     *
     *     [MENTION=2000183830]para[/MENTION]m message Displays a message inside Carnival PQ
     **/
    public static byte[] CPQMessage(int message) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendOpcode.MONSTER_CARNIVAL_MESSAGE.getValue());
        mplew.write(message); //Message
        return mplew.getPacket();
    }

    public static byte[] leaveCPQ(int team, String name) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendOpcode.MONSTER_CARNIVAL_LEAVE.getValue());
        mplew.write(0); //Something?
        mplew.write(team); //Team
        mplew.writeMapleAsciiString(name); //Player name
        return mplew.getPacket();
    }

}  