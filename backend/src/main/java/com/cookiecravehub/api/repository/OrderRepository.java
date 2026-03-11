package com.cookiecravehub.api.repository;

import com.cookiecravehub.api.model.UserOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<UserOrder, UUID> {
    List<UserOrder> findByUserId(UUID userId);
}
