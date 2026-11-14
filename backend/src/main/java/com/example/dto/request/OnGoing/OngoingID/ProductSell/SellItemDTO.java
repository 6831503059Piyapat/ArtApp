package com.example.dto.request.OnGoing.OngoingID.ProductSell;
import java.util.List;
import com.example.entity.PaymentMethod;
public class SellItemDTO {
    private String saleRunId;
    private String assistanceName;
    private PaymentMethod paymentMethod;
    private List<CartDTO> cart;

    public SellItemDTO() {}
    public SellItemDTO(String assistanceName, List<CartDTO> cart, String saleRunId) {
        this.assistanceName = assistanceName;
        this.cart = cart;
        this.saleRunId = saleRunId;
    }
    public String getAssistanceName() {
        return assistanceName;
    }
    public void setAssistanceName(String assistanceName) {
        this.assistanceName = assistanceName;
    }
    public List<CartDTO> getCart() {
        return cart;
    }
    public void setCart(List<CartDTO> cart) {
        this.cart = cart;
    }
    public String getSaleRunId() {
        return saleRunId;
    }
    public void setSaleRunId(String saleRunId) {
        this.saleRunId = saleRunId;
    }
    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }
    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
