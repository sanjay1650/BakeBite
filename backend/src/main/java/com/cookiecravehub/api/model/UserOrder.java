package com.cookiecravehub.api.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    @Builder.Default
    @Column(nullable = false)
    private String status = "pending";

    @Column(name = "shipping_address", columnDefinition = "JSONB")
    private String shippingAddress;

    @Column(name = "stripe_payment_id")
    private String stripePaymentId;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;
}
