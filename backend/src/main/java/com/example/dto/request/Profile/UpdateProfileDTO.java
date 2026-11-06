package com.example.dto.request.Profile;

public class UpdateProfileDTO {
    private String uid;
    private String displayName;
    private String stallAlias;

    // Getters and Setters
    public String getUid() { return uid; }
    public void setUid(String uid) { this.uid = uid; }
    

    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }


    public String getStallAlias() { return stallAlias; }
    public void setStallAlias(String stallAlias) { this.stallAlias = stallAlias; }
}