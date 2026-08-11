package com.avantika.quiz_platform_backend.service;


import com.avantika.quiz_platform_backend.entity.Category;
import com.avantika.quiz_platform_backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category createCategory(String name, String description) {

        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Category name is required");
        }

        String categoryName = name.trim();

        if (categoryRepository.existsByNameIgnoreCase(categoryName)) {
            throw new IllegalArgumentException(
                    "Category already exists"
            );
        }

        Category category = new Category(
                categoryName,
                description
        );

        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id) {

        return categoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Category not found"
                        )
                );
    }

    @Override
    public Category updateCategory(
            Long id,
            String name,
            String description
    ) {

        Category category = getCategoryById(id);

        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Category name is required"
            );
        }

        String categoryName = name.trim();

        categoryRepository
                .findByNameIgnoreCase(categoryName)
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new IllegalArgumentException(
                                "Category already exists"
                        );
                    }
                });

        category.setName(categoryName);
        category.setDescription(description);

        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id) {

        Category category = getCategoryById(id);

        categoryRepository.delete(category);
    }
}
