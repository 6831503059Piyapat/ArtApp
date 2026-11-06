package com.example.entity;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    @Column(name = "User_id")
    private String Userid;
    
    @Column(name = "Email")
    private String email;

    @Column(name = "Token")
    private String token;

    @Column(name = "Display_name")
    private String displayName;


    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SaleRunEntity> saleRun = new ArrayList<>();

    // Getters, Setters, and Constructors
    public UserEntity() {
    }
    public UserEntity(String userid, String email, String token, String displayName) {
        this.Userid = userid;
        this.email = email;
        this.token = token;
        this.displayName = displayName;
    }
    public String getUserid() {
        return Userid;
    }
    public void setUserid(String userid) {
        this.Userid = userid;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public String getDisplayName() {
        return displayName;
    }
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
