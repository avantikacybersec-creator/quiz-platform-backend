package com.avantika.quiz_platform_backend.controller;

import com.avantika.quiz_platform_backend.dto.CategoryRequest;
import com.avantika.quiz_platform_backend.entity.Category;
import com.avantika.quiz_platform_backend.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(
            @RequestBody CategoryRequest request
    ) {

        Category category =
                categoryService.createCategory(
                        request.getName(),
                        request.getDescription()
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(category);
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {

        return ResponseEntity.ok(
                categoryService.getAllCategories()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategory(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                categoryService.getCategoryById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(
            @PathVariable Long id,
            @RequestBody CategoryRequest request
    ) {

        Category category =
                categoryService.updateCategory(
                        id,
                        request.getName(),
                        request.getDescription()
                );

        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(
            @PathVariable Long id
    ) {

        categoryService.deleteCategory(id);

        return ResponseEntity.noContent().build();
    }
}
