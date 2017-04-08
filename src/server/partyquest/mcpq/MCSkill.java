package server.partyquest.mcpq;


public class MCSkill {
    private final int id, target, mobSkillID, level, spendCP;
    private String name, desc;

    public MCSkill(int id, int target, int mobSkillID, int level, int spendCP) {
        this.id = id;
        this.target = target;
        this.mobSkillID = mobSkillID;
        this.level = level;
        this.spendCP = spendCP;
    }

    public int getId() {
        return id;
    }

    public int getTarget() {
        return target;
    }

    public int getMobSkillID() {
        return mobSkillID;
    }

    public int getLevel() {
        return level;
    }

    public int getSpendCP() {
        return spendCP;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}  