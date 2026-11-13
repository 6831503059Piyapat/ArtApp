package com.example.dto.request.JoinSale;

public class JoinSaleDTO {
    private String user_id;
    private String code_join;

    public JoinSaleDTO() {
    }
    public JoinSaleDTO(String user_id, String code_join) {
        this.user_id = user_id;
        this.code_join = code_join;
    }

    public String getUser_id() {
        return user_id;
    }
    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }
    public String getCode_join() {
        return code_join;
    }
    public void setCode_join(String code_join) {
        this.code_join = code_join;
    }
}

