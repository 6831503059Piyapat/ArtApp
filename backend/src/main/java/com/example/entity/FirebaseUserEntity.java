package com.example.entity;

public class FirebaseUserEntity {

    private final String uid;
    private final String email;

    public FirebaseUserEntity(String uid, String email) {
        this.uid = uid;
        this.email = email;
    }

    public String getUid() {
        return uid;
    }

    public String getEmail() {
        return email;
    }
}