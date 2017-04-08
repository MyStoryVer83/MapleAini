package server.partyquest.mcpq;

import client.MapleCharacter;
import java.awt.Point;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.life.MobSkill;
import server.life.MobSkillFactory;
import server.life.SpawnPoint;
import server.maps.MapleMap;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.maps.MapleReactor;
import server.maps.MapleReactorFactory;
import tools.MaplePacketCreator;
import tools.MonsterCarnivalPacket;

public class MCBattlefield {

    private MapleMap map;
    private MCWZData wzData;
    private int numGuardiansSpawned = 0;
    private int numMonstersSpawned = 0;
    // These map Guardian IDs (aka codes for status) to the guardian position.
    private Map<Integer, MCWZData.MCGuardianGenPos> redGuardianIdToPos = new HashMap<>();
    private Map<Integer, MCWZData.MCGuardianGenPos> blueGuardianIdToPos = new HashMap<>();
    // These map Reactor Object IDs to guardian objects.
    private Map<Integer, MCGuardian> redReactors = new HashMap<>();
    private Map<Integer, MCGuardian> blueReactors = new HashMap<>();
    // used for divided maps
    // we use an arraylist here for easier random element lookup.
    private List<MCWZData.MCGuardianGenPos> originalRedGuardianSpawns = new ArrayList<>();
    private List<MCWZData.MCGuardianGenPos> originalBlueGuardianSpawns = new ArrayList<>();
    // used for undivided map
    private List<MCWZData.MCGuardianGenPos> originalGuardianSpawns = new ArrayList<>();

    // used for divided maps
    // we use an arraylist here for easier random element lookup.
    private List<MCWZData.MCMobGenPos> originalRedSpawns = new ArrayList<>();
    private List<MCWZData.MCMobGenPos> originalBlueSpawns = new ArrayList<>();
    // use for undivided map
    private List<MCWZData.MCMobGenPos> originalUnifiedSpawns = new ArrayList<>();

    private List<SpawnPoint> originalSpawns = new ArrayList<>();
    private List<SpawnPoint> addedSpawns = new ArrayList<>();
    
    public MCBattlefield(MapleMap battleInstance) {
        this.map = battleInstance;
        fetchCarnivalData();
        getOriginalSpawnPoints();
        populateGuardianSpawns();
        populateMobSpawns();
    }

    private void fetchCarnivalData() {
        wzData = this.map.getMCPQData();
        if (wzData == null) {
            MCTracker.log("[MCPQ] Fetching carnival failed for map " + map.getId());
        }
    }

    private void getOriginalSpawnPoints() {
        for (SpawnPoint sp : this.map.getSpawnPoints()) {
            originalSpawns.add(sp);
        }
    }

    private void populateGuardianSpawns() {
        for (MCWZData.MCGuardianGenPos gpos : wzData.guardianGenPosList) {
            switch (gpos.team) {
                case 0:
                    originalRedGuardianSpawns.add(gpos);
                    break;
                case 1:
                    originalBlueGuardianSpawns.add(gpos);
                    break;
                default:
                    originalGuardianSpawns.add(gpos);
            }
        }
    }

    private void populateMobSpawns() {
        for (MCWZData.MCMobGenPos mpos : wzData.mobGenPosList) {
            switch (mpos.team) {
                case 0:
                    originalRedSpawns.add(mpos);
                    break;
                case 1:
                    originalBlueSpawns.add(mpos);
                    break;
                default:
                    originalUnifiedSpawns.add(mpos);
            }
        }
    }

    public void addSpawn(MapleCharacter chr, int num) {
        if (numMonstersSpawned > wzData.mobGenMax) {
            chr.getClient().announce(MonsterCarnivalPacket.CPQMessage(3));
            return;
        }

        MCWZData.MCSummonMob mobToSummon = wzData.summons.get(num);
        MCWZData.MCMobGenPos spawnPos = getRandomSpawnPos(chr.getMCPQTeam());

        MCField.MCTeam team = chr.getMCPQTeam();
        if (spawnPos == null) { // all positions used
            chr.getClient().announce(MonsterCarnivalPacket.CPQMessage(2));
            return;
        }

        int spendCp = mobToSummon.spendCP;
        if (spendCp > chr.getAvailableCP()) {
            readdSpawn(spawnPos, team);
            chr.getClient().announce(MonsterCarnivalPacket.CPQMessage(1));
            return;
        }

        chr.getMCPQField().loseCP(chr, spendCp);
        this.map.broadcastMessage(
                MonsterCarnivalPacket.CPQSummon(MonsterCarnival.TAB_SPAWNS, num, chr.getName()));
        numMonstersSpawned++; // TODO: AtomicInteger this

        MapleMonster monster = MapleLifeFactory.getMonster(mobToSummon.id);
        Point pos = new Point(spawnPos.x, spawnPos.y);
        SpawnPoint sp = new SpawnPoint(monster, pos, !monster.isMobile(), mobToSummon.mobTime, 0, chr.getTeam());

        addedSpawns.add(sp);
        updateMonsterBuffs();
    }

    public void useSkill(MapleCharacter chr, int num) {
        if (!wzData.skills.containsKey(num)) {
            MCTracker.log("Attempting to use a null skill.");
            return;
        }
        int realSkill = wzData.skills.get(num);
        MCSkill skill = MCSkillFactory.getMCSkill(realSkill);
        // TODO: add skill cooldowns

        int spendCp = skill.getSpendCP();
        if (spendCp > chr.getAvailableCP()) {
            chr.getClient().announce(MonsterCarnivalPacket.CPQMessage(1));
            return;
        }

        MCParty teamToApply = chr.getMCPQParty().getEnemy();
        boolean success = teamToApply.applyMCSkill(skill);

        if (success) {
            chr.getMCPQField().loseCP(chr, spendCp);
            map.broadcastMessage(
                    MonsterCarnivalPacket.CPQSummon(MonsterCarnival.TAB_DEBUFF, num, chr.getName()));
        } else {
            chr.getClient().getSession().write(MonsterCarnivalPacket.CPQMessage(5));
        }
    }
    
    public void readdSpawn(MCWZData.MCMobGenPos pos, MCField.MCTeam team) {
        List<MCWZData.MCMobGenPos> lst = null;
        if (this.wzData.mapDivided) {
            if (team == MCField.MCTeam.RED) {
                lst = originalRedSpawns;
            } else if (team == MCField.MCTeam.BLUE) {
                lst = originalBlueSpawns;
            } else {
                return;
            }
        } else {
            lst = originalUnifiedSpawns;
        }
        
        if (lst == null) {
            return;
        } 
        lst.add(pos);
    }

    /**
     * Spawns a guardian, buffing all monsters on the map.
     *   [MENTION=2000183830]para[/MENTION]m chr Character that summoned the guardian.
     *   [MENTION=2000183830]para[/MENTION]m num Which guardian was spawned (F1-F9).
     */
    public void spawnGuardian(MapleCharacter chr, int num) {
        if (numGuardiansSpawned > wzData.guardianGenMax) {
            chr.getClient().announce(MonsterCarnivalPacket.CPQMessage(3));
            return;
        }

        int guardianId = wzData.guardians.get(num);
        MCGuardian guardian = MCSkillFactory.getMCGuardian(guardianId);
        if (guardian == null) {
            MCTracker.log("Attempting to spawn invalid guardian.");
            return;
        }

        MCField.MCTeam team = chr.getMCPQTeam();
        if (team == MCField.MCTeam.RED) {
            if (redGuardianIdToPos.containsKey(guardianId)) {
                chr.getClient().announce(MonsterCarnivalPacket.CPQMessage(4));
                return;
            }
        } else if (team == MCField.MCTeam.BLUE) {
            if (blueGuardianIdToPos.containsKey(guardianId)) {
                chr.getClient().announce(MonsterCarnivalPacket.CPQMessage(4));
                return;
            }
        }
        int spendCp = guardian.getSpendCP();
        if (spendCp > chr.getAvailableCP()) {
            chr.getClient().announce(MonsterCarnivalPacket.CPQMessage(1));
            return;
        }

        chr.getMCPQField().loseCP(chr, spendCp);
        this.map.broadcastMessage(
                MonsterCarnivalPacket.CPQSummon(MonsterCarnival.TAB_GUARDIAN, num, chr.getName()));
        numGuardiansSpawned++; // TODO: AtomicInteger this
        MCWZData.MCGuardianGenPos genPos = getRandomGuardianPos(team);
        Point spawnPos = new Point(genPos.x, genPos.y);

        MapleReactor reactor;
        if (team == MCField.MCTeam.RED) {
            reactor = new MapleReactor(MapleReactorFactory.getReactor(MonsterCarnival.GUARDIAN_RED),
                    MonsterCarnival.GUARDIAN_RED);
            reactor.setPosition(spawnPos);

            redGuardianIdToPos.put(num, genPos);
        } else if (team == MCField.MCTeam.BLUE){
            reactor = new MapleReactor(MapleReactorFactory.getReactor(MonsterCarnival.GUARDIAN_BLUE),
                    MonsterCarnival.GUARDIAN_BLUE);
            reactor.setPosition(spawnPos);

            blueGuardianIdToPos.put(num, genPos);
        } else {
            return;
        }

        reactor.setDelay(-1); // do not respawn
        map.spawnReactor(reactor);

        // This must take place after spawning the reactor because it assigns
        // the reactor an object id.
        if (team == MCField.MCTeam.RED) {
            redReactors.put(reactor.getObjectId(), MCSkillFactory.getMCGuardian(num));
        } else {
            blueReactors.put(reactor.getObjectId(), MCSkillFactory.getMCGuardian(num));
        }

        map.setReactorState(reactor, (byte) 1); // trigger the reactor, make it visible -.-
        updateMonsterBuffs();
    }

    public void onGuardianHit(MapleCharacter chr, MapleReactor reactor) {
        if (MonsterCarnival.DEBUG) {
            System.out.println("STATE: " + reactor.getState());
        }
        MCField.MCTeam team = chr.getMCPQTeam();
        if (team == MCField.MCTeam.RED && reactor.getId() == MonsterCarnival.GUARDIAN_RED) {
            return;
        }
        if (team == MCField.MCTeam.BLUE && reactor.getId() == MonsterCarnival.GUARDIAN_BLUE) {
            return;
        }
        reactor.setState((byte) (reactor.getState() + 1));
        map.broadcastMessage(MaplePacketCreator.triggerReactor(reactor, reactor.getState()));

        if (reactor.getState() > 3) {
            int reactorObjId = reactor.getObjectId();
            map.destroyReactor(reactorObjId);

            MCGuardian guard;
            MCWZData.MCGuardianGenPos guardianGenPos;
            if (team == MCField.MCTeam.RED) {
                // if your team is red, you are attacking blue guardians
                guard = blueReactors.remove(reactorObjId);
                guardianGenPos = blueGuardianIdToPos.remove(guard.getType());
            } else {
                guard = redReactors.remove(reactorObjId);
                guardianGenPos = redGuardianIdToPos.remove(guard.getType());
            }
            numGuardiansSpawned--;
            
            if (MonsterCarnival.DEBUG) {
                System.out.println("Removing reactor with x = " + guardianGenPos.x);
            }
            if (wzData.mapDivided) {
                if (team == MCField.MCTeam.RED) {
                    // again, here, if you destroyed a blue guardian, then you are on the red team.
                    // it is important to note that team here refers to the character's team,
                    // not the reactor's.
                    originalBlueGuardianSpawns.add(guardianGenPos);
                } else {
                    originalRedGuardianSpawns.add(guardianGenPos);
                }
            } else {
                originalGuardianSpawns.add(guardianGenPos);
            }

            if (MonsterCarnival.DEBUG) {
                System.out.println("Attempting to remove buff " + guard.getName());
            }
            updateMonsterBuffs();
        }
    }

    /**
     * Gets a guardian position for a team. That is, if the player spawning this guardian is on the
     * red team, a position corresponding to somewhere on the blue team's side will be returned.
     * This clarification does not matter for undivided maps.
     *
     *   [MENTION=2000183830]para[/MENTION]m team Team that is summoning the guardian, and also the "team" value in the WZs.
     *   [MENTION=850422]return[/MENTION] A random generated position.
     */
    private MCWZData.MCGuardianGenPos getRandomGuardianPos(MCField.MCTeam team) {
        if (this.wzData.mapDivided) {
            if (team == MCField.MCTeam.RED) {
                int randIndex = (int) Math.floor(Math.random() * this.originalRedGuardianSpawns.size());
                return originalRedGuardianSpawns.remove(randIndex);
            } else if (team == MCField.MCTeam.BLUE) {
                int randIndex = (int) Math.floor(Math.random() * this.originalBlueGuardianSpawns.size());
                return originalBlueGuardianSpawns.remove(randIndex);
            } else {
                return null;
            }
        } else {
            int randIndex = (int) Math.floor(Math.random() * this.originalGuardianSpawns.size());
            return originalGuardianSpawns.remove(randIndex);
        }
    }

    /**
     * Gets a guardian position for a team. That is, if the player spawning this guardian is on the
     * red team, a position corresponding to somewhere on the blue team's side will be returned.
     * This clarification does not matter for undivided maps.
     *
     *   [MENTION=2000183830]para[/MENTION]m team Team that is summoning the guardian, and also the "team" value in the WZs.
     *   [MENTION=850422]return[/MENTION] A random generated position.
     */
    private MCWZData.MCMobGenPos getRandomSpawnPos(MCField.MCTeam team) {
        List<MCWZData.MCMobGenPos> lst = null;
        if (this.wzData.mapDivided) {
            if (team == MCField.MCTeam.RED) {
                lst = originalRedSpawns;
            } else if (team == MCField.MCTeam.BLUE) {
                lst = originalBlueSpawns;
            } else {
                return null;
            }
        } else {
            lst = originalUnifiedSpawns;
        }
        
        if (lst == null) {
            return null;
        } 
        if (lst.size() == 0) {
            return null;
        }
        int randIndex = (int) Math.floor(Math.random() * lst.size());
        return lst.remove(randIndex);
    }

    private void updateMonsterBuffs() {
        List<MCGuardian> redGuardians = new ArrayList<>();
        List<MCGuardian> blueGuardians = new ArrayList<>();

        for (MCGuardian g : this.redReactors.values()) {
            redGuardians.add(g);
            if (MonsterCarnival.DEBUG) {
                System.out.println("update buff red " + g.getMobSkillID());
            }
        }
        for (MCGuardian g : this.blueReactors.values()) {
            blueGuardians.add(g);
            if (MonsterCarnival.DEBUG) {
                System.out.println("update buff blue " + g.getMobSkillID());
            }
        }

        for (MapleMapObject mmo : map.getAllMonsters()) {
            if (mmo.getType() == MapleMapObjectType.MONSTER) {
                MapleMonster mob = ((MapleMonster) mmo);
                mob.dispel();

                if (mob.getTeam() == MCField.MCTeam.RED.code) {
                    applyGuardians(mob, redGuardians);
                } else if (mob.getTeam() == MCField.MCTeam.BLUE.code) {
                    applyGuardians(mob, blueGuardians);
                } else {
                    MCTracker.log("[MCPQ] Attempting to give guardians to mob without team.");
                }
            }
        }
    }

    private void giveMonsterBuffs(MapleMonster mob) {
        List<MCGuardian> redGuardians = new ArrayList<>();
        List<MCGuardian> blueGuardians = new ArrayList<>();

        for (MCGuardian g : this.redReactors.values()) {
            redGuardians.add(g);
            if (MonsterCarnival.DEBUG) {
                System.out.println("update buff red " + g.getMobSkillID());
            }
        }
        for (MCGuardian g : this.blueReactors.values()) {
            blueGuardians.add(g);
            if (MonsterCarnival.DEBUG) {
                System.out.println("update buff blue " + g.getMobSkillID());
            }
        }

        if (mob.getTeam() == MCField.MCTeam.RED.code) {
            applyGuardians(mob, redGuardians);
        } else if (mob.getTeam() == MCField.MCTeam.BLUE.code) {
            applyGuardians(mob, blueGuardians);
        } else {
            MCTracker.log("[MCPQ] Attempting to give guardians to mob without team.");
        }
    }

    private void applyGuardians(MapleMonster mob, List<MCGuardian> guardians) {
        for (MCGuardian g : guardians) {
            MobSkill sk = MobSkillFactory.getMobSkill(g.getMobSkillID(), g.getLevel());
            sk.applyEffect(null, mob, false);
        }
    }

    public void spawningTask() {
        for (SpawnPoint sp : originalSpawns) {
            if (sp.shouldSpawn()) {
                MapleMonster m = sp.getMonster();
                giveMonsterBuffs(m);
                this.map.spawnMonster(m);
            }
        }
        for (SpawnPoint sp : addedSpawns) {
            if (sp.shouldSpawn()) {
                MapleMonster m = sp.getMonster();
                giveMonsterBuffs(m);
                this.map.spawnMonster(m);
            }
        }
    } 
}  