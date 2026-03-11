package com.cookiecravehub.api.controller;

import com.cookiecravehub.api.dto.OrderRequest;
import com.cookiecravehub.api.model.OrderItem;
import com.cookiecravehub.api.model.Product;
import com.cookiecravehub.api.model.UserOrder;
import com.cookiecravehub.api.repository.OrderRepository;
import com.cookiecravehub.api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @PostMapping
    public ResponseEntity<UserOrder> createOrder(@RequestBody OrderRequest request) {
        UserOrder order = UserOrder.builder()
                .userId(request.getUserId())
                .totalAmount(request.getTotalAmount())
                .shippingAddress(request.getShippingAddress())
                .status("pending")
                .build();

        List<OrderItem> items = request.getItems().stream().map(itemReq -> {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            
            return OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemReq.getQuantity())
                    .priceAtPurchase(itemReq.getPrice())
                    .build();
        }).collect(Collectors.toList());

        order.setItems(items);
        return ResponseEntity.ok(orderRepository.save(order));
    }

    @GetMapping("/user/{userId}")
    public List<UserOrder> getUserOrders(@PathVariable UUID userId) {
        return orderRepository.findByUserId(userId);
    }
}
