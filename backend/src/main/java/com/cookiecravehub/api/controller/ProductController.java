package com.cookiecravehub.api.controller;

import com.cookiecravehub.api.model.Product;
import com.cookiecravehub.api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) UUID categoryId) {
        if (search != null) {
            return productRepository.findByNameContainingIgnoreCase(search);
        }
        if (categoryId != null) {
            return productRepository.findByCategoryId(categoryId);
        }
        return productRepository.findAll();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Product> getProductBySlug(@PathVariable String slug) {
        return productRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable UUID id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable UUID id, @RequestBody Product productDetails) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(productDetails.getName());
                    product.setSlug(productDetails.getSlug());
                    product.setDescription(productDetails.getDescription());
                    product.setPrice(productDetails.getPrice());
                    product.setImageUrl(productDetails.getImageUrl());
                    product.setStock(productDetails.getStock());
                    product.setCategory(productDetails.getCategory());
                    product.setDietaryTags(productDetails.getDietaryTags());
                    product.setIsFeatured(productDetails.getIsFeatured());
                    return ResponseEntity.ok(productRepository.save(product));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        return productRepository.findById(id)
                .map(product -> {
                    productRepository.delete(product);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
